---
title: rsyslog 服务配置系统日志
author: EraserRain
date: '2022-02-25'
tags: syslog
categories: Ops
---
## **1. 介绍**

<aside>
💡 rsyslog：Rocket-fast system for log

</aside>

Centos 6 版本之后，系统默认安装 rsyslog 服务。

```bash
rpm -aq |grep rsyslog
	## 查看是否安装
```

### 组件

- 主程序：`/usr/sbin/rsyslogd`
- 配置文件：**`/etc/rsyslog.conf`，**`/etc/rsyslog.d*.conf`
- 库文件：`/lib64/rsyslog/*.so`

## **2. 配置文件**

rsyslog 服务的配置文件（`/etc/rsyslog.conf`）由 MODULES（模块），GLOBAL DIRECTIVES（全局设置），RULES（规则）组成，会覆盖系统syslog配置（`/etc/syslog.conf`）。

```bash
rsyslogd -f /etc/rsyslog.conf -N1
	## 检查 rsyslog.conf 配置
```

### **MODULES**

rsyslog 为模块化设计，可以支持导入多种模块。

| MODULES | Description |
| --- | --- |
| omsnmp | SNMP trap 输出模块 |
| omgssapi | GSS-enabled syslog 输出模块 |
| ommysql | MySQL 输出模块 |
| imfile | 文本文件输入模块 |
| imudp | UDP syslog 输入插件 |
| imtcp | 普通 TCP syslog 输入插件，服务端需要打开这个模块，rsyslog才能接收客户端的日志。 |

### **GLOBAL DIRECTIVES**

### RULES

由 `Facility`，`Priority`，`Target` 组成，配置格式如下：

```bash
#### RULES ####
Facility1.Proirity1;Fcility2.Priority2...			Target
```

- `Facility`：打印日志信息的模块名，可自定义。
    
    
    | Facility（设施） | Description |
    | --- | --- |
    | auth | PAM产生的日志，认证日志 |
    | authpriv | FTP,SSH等登陆认证日志 |
    | mail | 邮件日志 |
    | cron | 计划任务（时钟进程） |
    | kern | 内核启动日志 |
    | FTP | FTP日志信息 |
    | USER | 默认，生成用户级别消息 |
    | SYSLOG | 系统日志信息 |
    | ***** | 所有的facility |
- `Priority`：指明日志重要性级别（从上到下递减，先左后右递减）
    
    
    | Priority | Description |
    | --- | --- |
    | emerg | 系统不可用 |
    | alert | 闭幕马上采取措施 |
    | crit | 关键事件 |
    | err | 错误事件 |
    | warn | 警告事件 |
    | notice | 具有重要性的普通事件 |
    | info | 有用事件 |
    | debug | 调试信息 |
    | ***** | 所有级别 |
    | none | 不记录 |
- `Target`：存储与指定日志文件中
    
    
    | Target | Description |
    | --- | --- |
    | 指定的文件路径 |  |
    | 日志服务器 | `@ip`，UDP方式将日志送往指定远程服务器记录；`@@ip` 是TCP方式|
    | 管道 | 转发给其他命令处理 |

## **3. 客户端配置输出到服务端**

行尾新增以下内容，修改后重启服务即可。

```bash
#### RULES ####
*.* @@remote-IP:514
	## 转发配置文件中所有模块到 remote-IP 的 514 端口
```

## **4. 指定程序日志转发**

```bash
#### MODULES ####
module(load="imfile" PollingInterval="5")
	## 加载 imfile 模块
input(type="imfile"
				## 模块类型
		  File=""
				## 指定程序日志生成的路径
		  Tag=""
		  Severity=""
				## 重要性级别，见 Priority 中的内容
		  Facility="facility_name")
```

多个 imfile 模块导入 添加多个 input 即可。

> 注：符号链接会破坏 imfile 读取，可能引起 `imfile: '' is FILE but DIRECTORY expected - ignored)` 报错，input 中 imfile 文件路径不能包含符号链接。
> 

### 指定采集 mysql 日志转发

配置 `/etc/my.cnf` 添加如下

```bash
[mysqld]
general-log-file=/var/log/syslog/mysql-general.log
[mysqld_safe]
syslog
```

`[mysqld]` 中定义的为常规日志和慢查询日志，`[mysqld_safe]` 中定义的为错误日志。

> 注意：`mysqld` 中设置的文件及其目录归属为 `mysql:mysql`，权限 664 即可。
> 

`/etc/rsyslog.conf` 引入 mysql 模块

```bash
#### MODULES ####
module(load="imfile" PollingInterval="1")

input(type="imfile"
    File="/var/log/syslog/mysql-general.log"
    Tag="mysql-general"
    Severity="warning"
    Facility="local1")

#### RULE ####
local1.* @@remote_IP:514
```

## 5. Reference

【[rsyslog 配置简介 — blog.clanzx.net 0.1 文档](https://blog.clanzx.net/software/rsyslog.html)】

【[日志管理Rsyslog - 简书 (jianshu.com)](https://www.jianshu.com/p/e129ed893362)】

【[Centos对Rsyslog日志远程转发和Mysql日志存储_宇文忠的博客-CSDN博客](https://blog.csdn.net/weixin_31789689/article/details/108556277)】

【[0015565: imfile and symlinks not working - CentOS Bug Tracker](https://bugs.centos.org/view.php?id=15565)】

【[RSyslog Documentation - rsyslog](https://www.rsyslog.com/doc/v8-stable/configuration/modules/imfile.html)】