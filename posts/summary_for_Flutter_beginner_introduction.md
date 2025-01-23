## 开始之前

由于之前已经使用过idea和as，android sdk，和jdk已经下载了。

[解决android sdk中找不到tools目录Android sdkmanager tool not found (D:\Android\SDK\tools\bin\sdkmanager)._android sdk安装没有tools-CSDN博客](https://blog.csdn.net/qq_36983458/article/details/105194433)

sdkManager位置："E:\development\Android\sdk\tools\bin\sdkmanager.bat"

flutter的SDK通过官网下载

flutter入门问题

使用命令flutter doctor检查

1.:exclamation: cmdline-tools component is missing

缺少sdk命令行工具

2.:exclamation:   Android license status unknown.

许可证状态未知

[Flutter开发环境配置踩坑之cmdline-tools component is missing_flutter cmdline-tools component is missing-CSDN博客](https://blog.csdn.net/ZXHL_hxf/article/details/121208026)

3.:exclamation:A network error occurred while checking "https://github.com/": 信号灯超时时间已到



1.

把 `E:\development\Android\sdk\tools\bin` 这个目录添加到系统环境变量 `PATH` 中，添加后重新打开命令行窗口，就可以通过 `sdkmanager --install "cmdline - tools;latest"` 命令来安装所需的 `cmdline - tools` 组件了。

或者直接用AS->settings->Languages&Frameworks->Android SDK,其中的SDK tools,直接下载cmdline - tools。

2.

flutter doctor --android-licenses

一直选y就行了

3.

修改hosts文件，添加20.205.243.166 github.com

4.

其他命令：

flutter config

输出的是命令的帮助文档

flutter config --list

如果android sdk路径有错，使用以下命令手动设置：

flutter config --android-sdk /path/to/android/sdk





5.

环境变量

由

C:\Users\28195>adb --version
Android Debug Bridge version 1.0.41
Version 35.0.0-11411520
Installed as E:\development\Android\sdk\platform-tools\adb.exe
Running on Windows 10.0.26100

C:\Users\28195>java -version
java version "1.8.0_152"
Java(TM) SE Runtime Environment (build 1.8.0_152-b16)
Java HotSpot(TM) 64-Bit Server VM (build 25.152-b16, mixed mode)

可知，

E:\development\Android\sdk\platform-tools

C:\Program Files\Java\jdk1.8.0_152

写进了环境变量里

另外，flutter的bin也写进环境变量。



配置全局 Flutter 镜像（环境变量）

C:\Users\28195>echo %PUB_HOSTED_URL%
https://pub.flutter-io.cn

C:\Users\28195>echo %FLUTTER_STORAGE_BASE_URL%
https://storage.flutter-io.cn

上面这个没有维护了  ..( ＿ ＿)ノ｜壁，报错： Illegal character in authority at index 8: https://storage.flutter-io.cn，不是url有错，就是没有维护了，靠北了。

换成清华的镜像就好了，记得重启vscode

```
FLUTTER_STORAGE_BASE_URL="https://mirrors.tuna.tsinghua.edu.cn/flutter"
PUB_HOSTED_URL="https://mirrors.tuna.tsinghua.edu.cn/dart-pub"
```

6.

没魔法，flutter使用国内镜像，github连接修改hosts，gradle可以直接下载……？！这方面还不清除，可能之前设置过，还没搞清楚gradle，maven在flutter里的关系和作用。



## 第一个项目

flutter create app_name

cd app_name

flutter run

记得在run之前连接手机并开启usb调试，就可以在手机上测试。或者使用网页/桌面应用。


## 依赖
在pubspec.yaml中添加依赖

flutter pub get 下载依赖





## 参考

[在中国网络环境下使用 Flutter | Flutter 中文文档 - Flutter 中文开发者网站 - Flutter](https://docs.flutter.cn/community/china/)

[快速入门Flutter：从零开始构建你的第一个应用_flutter快速入门-CSDN博客](https://blog.csdn.net/gygkhd/article/details/139646716)

[【Flutter】flutter doctor network resources 报错，解决国内开发环境问题_flutter network resources-CSDN博客](https://blog.csdn.net/PxFuture/article/details/134112244)

[几个Flutter常见诊断错误与解决Android toolchain - develop for Android devices X Unable to locate Android SDK-CSDN博客](https://blog.csdn.net/qq_28550263/article/details/132869987)

[Flutter环境安装(超详细)_flutter安装教程-CSDN博客](https://blog.csdn.net/qq_40976321/article/details/121806555)

[flutter：国内镜像https://storage.flutter-io.cn/ 用不了了-CSDN博客](https://blog.csdn.net/MarkeyMark/article/details/111031751)

[Gradle配置全局替换国内镜像 (2024版) 操作指南_gradle 国内镜像-CSDN博客](https://blog.csdn.net/vvvae1234/article/details/141565822)

[macports-distfiles-gradle安装包下载_开源镜像站-阿里云](https://mirrors.aliyun.com/macports/distfiles/gradle/)

[flutter报错： Gradle threw an error while downloading artifacts from the network. Retrying-CSDN博客](https://blog.csdn.net/qq_36413371/article/details/113618602)