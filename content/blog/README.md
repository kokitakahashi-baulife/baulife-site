# Build in Public ブログの記事

公開先: https://baulife.world/blog （英語: /en/blog）

## 1記事 = 1フォルダ

```
content/blog/2026-09-29-start/
  ja.md   … 日本語（/blog/2026-09-29-start）
  en.md   … 英語  （/en/blog/2026-09-29-start）
```

フォルダ名がURLになる。`YYYY-MM-DD-英小文字とハイフン` で付ける。

## frontmatter

```
---
title: 記事タイトル
date: 2026-09-29
summary: 一覧とSNSカードに出る1〜2文
project: Artherapy          # 任意。どの事業の話か
tags: [buildinpublic, ios]  # 任意
numbers:                    # 任意。「今回の数字」ボックス。ラベル | 値 | 補足
  - 月の売上 | ¥120,000 | 前月比 +20%
  - DL数 | 340
draft: true                 # 任意。true の間は本番に出ない（next dev では見える）
---

本文は Markdown。
```

main に push すると Vercel が本番に反映する。
