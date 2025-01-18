## 概述
本文记录vue3+springboot的前后端分离项目的部署过程。

## 1.服务器

使用阿里云的云服务器ECS免费试用（个人版）
https://ecs.console.aliyun.com/home
创建试用实例
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_11-47-09.png)
选择操作系统
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_11-47-53.png)
创建好的实例如下：
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_11-49-50.png)

## 2.安装宝塔面板

远程连接
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_12-57-30.png)

密码登录
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_12-58-00.png)
进入命令行
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_12-59-55.png)
安装宝塔面板
宝塔面板：https://www.bt.cn/new/download.html
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_13-34-52.png)
将图中的命令复制到workbench中，回车执行，
执行完毕后，会显示以下内容：
```
========================================
正在开启面板SSL，请稍等............ 
========================================
证书开启成功！
========================================
Stopping Bt-Tasks...    done
Stopping Bt-Panel...    done
Starting Bt-Panel... Bt-Panel (pid 13068) already running
Starting Bt-Tasks...    done
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
Package firewalld-0.6.3-13.el7_9.noarch already installed and latest version
Nothing to do
Created symlink from /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service to /usr/lib/systemd/system/firewalld.service.
Created symlink from /etc/systemd/system/multi-user.target.wants/firewalld.service to /usr/lib/systemd/system/firewalld.service.
success
==================================================================
Congratulations! Installed successfully!
=============注意：首次打开面板浏览器将提示不安全=================

 请选择以下其中一种方式解决不安全提醒
 1、下载证书，地址：https://dg2.bt.cn/ssl/baota_root.pfx，双击安装,密码【www.bt.cn】
 2、点击【高级】-【继续访问】或【接受风险并继续】访问
 教程：https://www.bt.cn/bbs/thread-117246-1-1.html
 mac用户请下载使用此证书：https://dg2.bt.cn/ssl/mac.crt

========================面板账户登录信息==========================

 【云服务器】请在安全组放行 11249 端口
 外网面板地址: https://8.154.20.139:11249/31d43bf2
 内网面板地址: https://172.20.38.248:11249/31d43bf2
 username: 0k5jzmaj
 password: 4b4fc2b1

 浏览器访问以下链接，添加宝塔客服
 https://www.bt.cn/new/wechat_customer
==================================================================
Time consumed: 1 Minute!
[root@iZbp1dil0zv0wkl8033dcgZ ~]# 
```


安全组放行相应端口
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_13-42-10.png)

此时即可通过外网面板地址访问并登录面板
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_13-45-24.png)

## 3.软件及环境
软件商店中安装以下软件：

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_17-09-53.png)

安装JDK
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_17-12-10.png)

## 4.项目打包
我是将前端代码打包后放到springboot的resource目录下，用springboot托管静态资源，前端请求使用相对路径。

### 4.1 前端代码打包
执行npm run build，打包后的文件在dist文件夹下
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_17-31-55.png)

将生成的dist文件夹下的所有文件放到springboot的resource目录下
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_17-35-38.png)
### 4.2后端代码打包
后端代码中添加以下路由处理器，用于将根路径和未知路径都转发到index.html
```java
@Controller
public class BasicController {

    @GetMapping("/")
    public String redirect() {
        return "forward:static/index.html";
    }

    @RequestMapping(value = "/**/{path:[^\\.]*}", method = RequestMethod.GET)
    public String redirectAll() {
        return "forward:/index.html";
    }
}

```

先clean，再package，得到jar包
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_17-47-45.png)

在生成的target目录下：
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_17-49-17.png)

我的配置文件如下：
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_17-51-06.png)
其中application.yml已经打包进jar包，而application-dev.yml需要和jar包一起上传服务器。这里没有区分prod环境，所以只需要上传dev环境的配置文件。


## 5.部署

### 5.1 部署数据库
导出本地数据库
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_18-02-54.png)
服务器创建数据库
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_18-05-29.png)
导入数据库
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_18-07-30.png)
修改数据库密码
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_18-28-11.png)
服务器和宝塔放行端口3306
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_18-27-47.png)
使用phpmyadmin管理服务器数据库
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_18-08-10.png)
### 5.2 部署项目
新建文件夹，上传项目文件（application-dev.yml、jar包）
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_18-12-29.png)
添加java项目
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_18-32-16.png)
项目启动命令：
```
/www/server/java/jdk-11.0.19/bin/java -jar  -Xmx1024M -Xms256M /www/atm_server/atmsys-0.0.1-SNAPSHOT.jar  --server.port=8090
```
配置项目
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_19-42-40.png)
```
ATM:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://8.154.20.139:3306/atm_database
    username: atm_database
    password: 123456
```
启动项目
安全组和宝塔都放行端口8090
访问网址：http://8.154.20.139:8090
![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-01-18_20-41-23.png)
                                                                                                   


## 参考博客
[使用宝塔面板中的Nginx部署前端Vue项目_宝塔nginx部署vue项目-CSDN博客](https://blog.csdn.net/anle18715747466/article/details/137676043)

[springboot+vue项目从第一行代码到上线部署全流程_springboot+vue项目部署-CSDN博客](https://blog.csdn.net/2301_82067992/article/details/143587818)

[Vue打包文件dist放在SpringBoot项目下运行（正确实现全过程）（上）_dist文件放在springboot的resource下-CSDN博客](https://blog.csdn.net/qq_37758497/article/details/140179289)

[【前后端分离项目部署】关于“vue3+SpringBoot+阿里云服务器+宝塔操作”的打包部署全流程配置_宝塔部署vue3项目-CSDN博客](https://blog.csdn.net/m0_60935824/article/details/133918912)