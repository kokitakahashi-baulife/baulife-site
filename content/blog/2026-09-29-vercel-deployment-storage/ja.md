---
title: Vercelの保存容量が8.33GBまで膨らんだので、デプロイを1日1回にしたら523MBになった
date: 2026-09-29
summary: AIが毎日記事を書いて自動でpushするサイトで、Vercelのデプロイ保存容量が無料枠を超えそうになりました。pushは自由なまま、ビルドだけを1日1回に間引く仕組みで解決した記録です。
project: BAUDOG
tags: [vercel, buildinpublic, 自動化]
numbers:
  - デプロイ保存容量 | 8.33GB → 523MB | 9日間で
  - 本番ビルド | 1日1回 | 変更がない日は0回
  - かかった費用 | ¥0 | 無料プランのまま
---

犬のしつけメディア「BAUDOG」は、AI（Claude）が記事を書き、毎日の計測データも自動でコミットされる仕組みで動いています。ある日Vercelの管理画面を見ると、このサイトひとつで **Deployment Storage（デプロイの保存容量）が 8.33GB** になっていました。

無料プランのまま、長く放っておいても収まる形にしたい。そう考えて手を入れた結果、9日後には **523MB** まで下がり、その後も同じ水準を保っています。

![Before：pushのたびにビルドして30日保管／After：pushは自由、ビルドは1日1回](/images/blog/2026-09-29-vercel-deployment-storage/flow.png)

## まず結論（この3つで直ります）

1. Vercel の **Project Settings → Build and Deployment → Ignored Build Step** に、「最新のコミットメッセージに `[deploy]` がなければ `exit 0`（＝ビルドしない）」スクリプトを設定する
2. **1日1回だけ** `[deploy]` 付きの空コミットを送る（GitHub Actions の定期実行など。変更がない日は送らない）
3. 同じ画面の **Deployment Retention Policy** を「本番1週間・それ以外1日」に短くする

コードと設定の中身は、下の「やったこと」にそのまま貼れる形で載せています。

## なぜ膨らんでいたのか

Vercelは、GitHubにpushするたびに本番のビルドとデプロイを自動で行います。便利な反面、このサイトでは

- 記事の修正
- 毎日の計測データの更新
- レポートの追記

と、1日に何十回もpushが起きていました。調べていくと、デプロイ1回ごとに**変更した差分ではなく、サイト全体の出力がまるごと保存**されているように見えました。しかもそれが既定で30日間残ります。

保存容量は「日ごとの保存量を、請求期間ぶん足し合わせる」数え方です（Vercel公式ドキュメント「Deployment Storage」より）。pushの多い自動運用のサイトほど、黙っていても積み上がる構造でした。

## 最初に考えたこと

一瞬「Vercelを選んだのが間違いだったのか」とも考えました。デプロイを完全に手動にする案も出ましたが、それだと公開し忘れが起きます。**AIが毎日回している仕組みを、人の手で止めることになる**ので却下しました。

落としどころは「pushはいつでも自由。でも本番のビルドは1日1回にまとめる」です。

## やったこと（3つ）

### 1. `[deploy]` の目印がないpushはビルドしない

Vercelには「Ignored Build Step」という設定があり、ビルドの前に自分のスクリプトを走らせて、続けるか止めるかを決められます。コミットメッセージに `[deploy]` が入っているときだけビルドするようにしました。

```bash
# scripts/ci/ignore-build.sh
# Vercelの規約：0を返すとビルドをスキップ、0以外を返すとビルドを実行
MSG=$(git log -1 --pretty=%B)
if echo "$MSG" | grep -qF '[deploy]'; then
  exit 1   # ビルドする
else
  exit 0   # スキップ
fi
```

設定は Project Settings → Build and Deployment → Ignored Build Step で「Run my Bash script」を選び、`bash scripts/ci/ignore-build.sh` を指定するだけです。

![スキップされたデプロイの実際のログ。[deploy] がないのでビルドされずCanceledになる](/images/blog/2026-09-29-vercel-deployment-storage/log.png)

### 2. 1日1回だけ、自動で `[deploy]` を付ける

もともと毎晩動いているGitHub Actions（計測ジョブ）の最後に、**前回の `[deploy]` から変更があれば、`[deploy]` 付きの空コミットを1つ送る**手順を足しました。変更がなければ何もしないので、その日のビルドは0回です。

```bash
LAST_DEPLOY=$(git log origin/main --grep='\[deploy\]' -1 --pretty=%H)
CURRENT=$(git rev-parse origin/main)
if [ "$LAST_DEPLOY" = "$CURRENT" ]; then
  echo "前回のデプロイから変更なし。今日はデプロイしません"; exit 0
fi
git commit --allow-empty -m "chore: 1日1回のデプロイ $(date -u +%Y-%m-%d) [deploy]"
git push
```

急いで出したい記事があるときは、自分のコミットメッセージに `[deploy]` を書けばすぐ公開されます。

![実際のコミット履歴。日中のpushはビルドされず、夜の [deploy] コミットだけがビルドされる](/images/blog/2026-09-29-vercel-deployment-storage/gitlog.png)

### 3. 古いデプロイを長く残さない

同じ設定画面の「Deployment Retention Policy」で、保管期間を短くしました。

| 種類 | 変更前 | 変更後 |
|---|---|---|
| 本番（Production） | 30日 | 1週間 |
| プレビュー（Pre-Production） | 30日 | 1日 |
| 失敗（Errored） | 30日 | 1日 |
| 中止（Canceled） | 30日 | 1日 |

本番を1週間残しておけば、何かあっても前の版に戻せます。

## 結果

9日間、毎日1回だけビルドされる動きがそのまま続き、保存容量は **8.33GB → 523MB** になりました。無料プランのままです。記事の更新やデータの自動コミットは、以前と同じ頻度で続いています。

## ひとつだけハマったこと

仕組みを試すとき、「`[deploy]`**なし**でpushしたらビルドされないこと」を確かめるテストコミットを作りました。ところがメッセージに「（[deploy]なし）」と書いたせいで、その文字列に反応して**本当にビルドが走りました**。仕組みとしては正しい動きです。目印の文字は、説明文の中にも書かないのが安全です。

## 同じことをしたい人へ

- **pushが多い自動運用のサイトほど効きます。** AIに記事を書かせている、データを毎日コミットしている、などのケースです
- 設定は「Ignored Build Step」と「Deployment Retention Policy」の2か所だけです。GitHub Actionsがなくても、手動で `[deploy]` を付ける運用で同じ効果があります
- 1日1回にすると、公開が最大で半日ほど遅れます。すぐ出したいときの抜け道（手動の `[deploy]`）を用意しておくと困りません
