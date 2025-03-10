## wsl

[【Linux】自定义WSL2安装位置，安装到其他磁盘(非C盘)_wsl2安装到其他盘-CSDN博客](https://blog.csdn.net/weixin_48076899/article/details/135214749)

根据上述博客，将ubuntu安装到了G盘。

```
Installing, this may take a few minutes...
wsl: 检测到 localhost 代理配置，但未镜像到 WSL。NAT 模式下的 WSL 不支持 localhost 代理。
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username: chenbaorui
New password:
Retype new password:
passwd: password updated successfully
Installation successful!
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

Welcome to Ubuntu 24.04 LTS (GNU/Linux 5.15.167.4-microsoft-standard-WSL2 x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Sat Mar  1 13:38:32 CST 2025

  System load:  0.06                Processes:             63
  Usage of /:   0.1% of 1006.85GB   Users logged in:       0
  Memory usage: 5%                  IPv4 address for eth0: 172.17.241.228
  Swap usage:   0%


This message is shown once a day. To disable it please create the
/home/chenbaorui/.hushlogin file.
chenbaorui@anlinling:~$

```



由于虚拟机“详见下文冲突”，关闭了wsl，应该再次开启就可以了。



## 虚拟机安装ubuntu

下载虚拟机，下载ubuntu iso，安装到G盘

下载后，选择中文，这时候文件夹是中文。在设置里修改语言为英文，重启后，会提示是将文件夹切换为英文，选择是，再将系统语言切换为中文，重启，系统仍然提示是否切换文件夹为中文，选择否。这样文件夹就是英文，而系统是中文，也有中文输入法。



![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/PixPin_2025-03-05_14-32-11.png)



ubuntu复制粘贴：

ctrl+shift+c

ctrl+shift+v

或：左键选中，滚轮点击后复制

虚拟机中全屏：ctrl+alt+enter

虚拟机和主机共享剪切板（[VMware虚拟机和主机间复制粘贴共享剪贴板 - 知乎](https://zhuanlan.zhihu.com/p/665154528)）：

安装open-vm-tools

```text
sudo apt-get install open-vm-tools
```

安装open-vm-tools-desktop

```text
sudo apt-get install open-vm-tools-desktop
```

这样就可以共享剪切板了

### docker

### 安装

sudo snap install docker

docker version

如果报错：permission denied while trying to connect to the Docker daemon socket

按照以下命令,username换成自己的用户名

```
sudo groupadd docker               #添加用户组
sudo gpasswd -a username docker    #将当前用户添加至用户组
newgrp docker                      #更新用户组
```

设置后一定要重启（使用移动硬盘不要动，移动就断了，然后只好重启，不过也正是这样才发现设置后必须重启）

[linux中docker报错：ERROR: Got permission denied while trying to connect to the Docker daemon socket。-CSDN博客](https://blog.csdn.net/qq_45097352/article/details/116105246)



```
$ docker version
Client:
 Version:           27.2.0
 API version:       1.47
 Go version:        go1.21.13
 Git commit:        3ab4256
 Built:             Tue Dec 17 12:23:46 2024
 OS/Arch:           linux/amd64
 Context:           default

Server:
 Engine:
  Version:          27.2.0
  API version:      1.47 (minimum version 1.24)
  Go version:       go1.21.13
  Git commit:       3ab5c7d
  Built:            Tue Dec 17 12:24:21 2024
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          v1.7.21
  GitCommit:        472731909fa34bd7bc9c087e4c27943f9835f111
 runc:
  Version:          1.1.13
  GitCommit:        
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
chenbaorui@chenbaorui-VMware-Virtual-Platform:~$ 


```

### 使用docker镜像下载jupyter：

[Docker/DockerHub 国内镜像源/加速列表（3月25日更新-长期维护） - 知乎](https://zhuanlan.zhihu.com/p/24461370776)

[毫秒镜像](https://1ms.run/)

```text
docker pull docker.1ms.run/jupyter/base-notebook
```

### 命令

docker images 查看已有镜像

docker run 基于该镜像创建并运行容器

docker ps    查看正在运行的容器

docker logs <容器 ID 或名称>   查看对应容器的日志

docker stop <容器 ID 或容器名>    停止容器

docker rmi <镜像 ID 或镜像名:标签>     删除本地镜像



```
docker ps
```

能看到：

```
CONTAINER ID   IMAGE                                  COMMAND                   CREATED          STATUS                             PORTS                                       NAMES
e6cc0987bbf8   docker.1ms.run/jupyter/base-notebook   "tini -g -- start-no…"   13 seconds ago   Up 10 seconds (health: starting)   0.0.0.0:8888->8888/tcp, :::8888->8888/tcp   beautiful_cannon

```

这个names是分配的，下面的logs就用这个beautiful_cannon或者id

```
docker run -p 8888:8888 -d docker.1ms.run/jupyter/base-notebook
docker logs beautiful_cannon

```

找到：

​      http://127.0.0.1:8888/lab?token=35547aea047d7f8ebb1988935a3d3e7f6d711801b4468c5b

在浏览器里输入网址：http://localhost:8888

需要密码就是上面的token

输入后就进入了jupyter notebook。

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250305163141656.png)

### 通过宿主机访问

没成功呢，下次试试



### qiskit

首次

```
docker pull docker.1ms.run/aldrinebaroi/qiskit

1) docker run -p 8888:8888 aldrinebaroi/qiskit
使用镜像应为：docker run -p 8888:8888 -d docker.1ms.run/aldrinebaroi/qiskit
2) http://localhost:8888/lab?token=qiskit
```

非首次

```
docker start 上次创建的镜像编号

http://localhost:8888/lab?token=qiskit
```



docker ps -a  看所有容器



## shell

```
touch test.sh
vim test.sh
在vim中写入：
#!/bin/bash
echo "hello world"
显示权限：
ll test.sh
修改权限：
chmod +x test.sh
执行：
./test.sh


```









## 冲突

由于虚拟机里的ubuntu经常卡死，开启了：

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250308111345401.png)



但是虚拟机开机时提示“此平台不支持虚拟化的 Intel VT-x/EPT”。



好像wsl和虚拟机冲突？？

以下是修改的地方：

关闭了

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250308104417041.png)

禁止了

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250308104514056.png)

在cmd以管理员身份运行：

修改系统启动配置来禁用 Hyper-V 虚拟化平台的自动启动，告诉 Windows 在启动时不加载 Hyper-V 虚拟机监控程序（hypervisor）。这在一些情况下是必要的，比如当你想要运行某些不兼容 Hyper-V 的软件或游戏，或者你需要使用其他类型的虚拟化技术（如 VMware 或 VirtualBox），而这些技术可能与 Hyper-V 不能很好地共存。

```
bcdedit /set hypervisorlaunchtype off
```

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250308105307959.png)



重启

虚拟化：

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/1737119909998.jpg)

systmeinfo（之前Hyper-V要求显示“已检测到虚拟机监控程序,将不显示Hyper-V”）![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250308110124571.png)



现在开启了虚拟化Intel VT-x/EPT也能开机了

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250308110502100.png)



之后，到目前为止没有卡死的情况出现



## 虚拟机中使用虚拟专用网络

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250309155421668.png)

ipconfig  查ipv4地址： 192.168.65.1

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250309154429021.png)

clash中的端口号，开启LAN

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250309155155029.png)

系统设置->网络->网络代理，前面填写上面的ip，后面填写vpn的端口

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250309154848899.png)

即可在虚拟机中使用vpn

## 扩容

ubuntu20G快要用完了，需要扩容



[VMware虚拟机扩容磁盘，有很详细图文_虚拟机硬盘空间-CSDN博客](https://blog.csdn.net/hktkfly6/article/details/123302335)



![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250310194148401.png)







关机后，



![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250310194332160.png)

在虚拟机中下载sudo apt-get install gparted，

进入gparted

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250310195018937.png)

主分区：

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250310195355944.png)

留2000

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250310195535282.png)



点击应用

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250310195934468.png)

扩容后：

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250310200236595.png)



由于我一开始并没有逻辑空间和扩展空间，我之后只是留了2000mb，并没有创建……







参考：

[VMware虚拟机和主机间复制粘贴共享剪贴板 - 知乎](https://zhuanlan.zhihu.com/p/665154528)

[linux中docker报错：ERROR: Got permission denied while trying to connect to the Docker daemon socket。-CSDN博客](https://blog.csdn.net/qq_45097352/article/details/116105246)

[Docker/DockerHub 国内镜像源/加速列表（3月25日更新-长期维护） - 知乎](https://zhuanlan.zhihu.com/p/24461370776)

[【Linux】自定义WSL2安装位置，安装到其他磁盘(非C盘)_wsl2安装到其他盘-CSDN博客](https://blog.csdn.net/weixin_48076899/article/details/135214749)

[Windows11VMware 17 运行虚拟机报错 “此平台不支持虚拟化的 Intel VT-x/EPT_vmware此平台不支持虚拟化的 intel vt-CSDN博客](https://blog.csdn.net/m0_62166372/article/details/139127960)

[VMware Ubuntu虚拟机 使用主机VPN 配置（简单、可行）-CSDN博客](https://blog.csdn.net/nomoremorphine/article/details/138738065)

[VMware虚拟机经常性卡死，打开运行一段时间后卡死，CPU占比增至100% - 知乎](https://zhuanlan.zhihu.com/p/28163971030)

[VMware虚拟机扩容磁盘，有很详细图文_虚拟机硬盘空间-CSDN博客](https://blog.csdn.net/hktkfly6/article/details/123302335)
