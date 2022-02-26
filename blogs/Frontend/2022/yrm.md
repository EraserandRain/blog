---
title: yarn 的源管理器
author: EraserRain
date: '2022-02-25'
tags: yarn
categories: Frontend
---
## 1. 安装

`npm` 安装

```bash
npm install -g @sunweibin/yrm
```

`yarn` 安装

```bash
yarn global add yrm
```

查看版本

```bash
yrm --version
```

## 2. 使用

列出可选择的源

```bash
yrm ls
```

查看当前使用的源

```bash
yrm now
yrm use now -n
	## -n, --npm:同步显示npm使用的源
```

添加与删除源

```bash
yrm add [repo] [url]
	## 添加源

yrm del [repo]
```

切换使用的源

```bash
yrm use [repo]
	## -n, --npm:同步显示npm使用的源
```