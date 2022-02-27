#!/bin/bash
export LC_ALL=C
current_date=$(date -d '0 day' '+%Y%m%d')
set -e
yarn build
cd ./public/
echo "基于 vuepress + github-pages 的个人博客" > README.md
git init
git add -A
git commit -m "deploy_${current_date}"
git push -f git@github.com:EraserandRain/EraserandRain.github.io.git master:master
cd -
echo 'deploy success!'
exit 0