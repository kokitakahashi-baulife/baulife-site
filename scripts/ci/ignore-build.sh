#!/bin/bash
# Vercel の Ignored Build Step(vercel.json の ignoreCommand)。0 を返すとビルドしない、0 以外でビルドする。
# 本番(main)は、最新のコミットに [deploy] の目印があるときだけビルドする。
# 目印の付いた空コミットは、毎日1回 .github/workflows/daily-deploy.yml が送る(前回から変更があった日だけ)。
# すぐ出したいときは、自分のコミットのメッセージに目印を書く。
# main 以外の枝はビルドしない(プレビューの控えも保存容量に数えられるため)。
# ⚠️ 説明の文に目印の文字列をそのまま書かない(反応してビルドが走る)
if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then
  echo "main 以外の枝なのでビルドしません"; exit 0
fi
if git log -1 --pretty=%B | grep -qF '[deploy]'; then
  echo "目印があるのでビルドします"; exit 1
fi
echo "目印がないのでビルドしません(毎日1回まとめて公開します)"; exit 0
