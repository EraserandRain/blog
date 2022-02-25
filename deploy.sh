#!/bin/bash
export LC_ALL=C
current_date=$(date -d '0 day' '+%Y%m%d')
set -e
yarn build
# cd ./public/
git init
git add -A
git commit -m "deploy_${current_date}"
git push -f git@github.com:EraserandRain/EraserandRain.github.io.git master:master
cd -
echo 'deploy success!'
exit 0