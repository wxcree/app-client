#!/usr/bin/env sh

# 终止一个错误
set -e
# 构建
npm run build

# 复制CNAME文件
cp ./CNAME ./dist

# 进入生成的构建文件夹
cd dist

git init
git add -A
git commit -m "初始化项目"
git remote add origin git@github.com:hz199/reactAdmin.io.git
git push -f origin master

cd -