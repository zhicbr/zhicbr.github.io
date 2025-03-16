## 自定义下载路径

ollama官网下载ollama

下载到指定位置而不是C盘，在想要下载的位置打开终端，输入：/DIR后是想要下载的位置

G:\ollama>OllamaSetup.exe /DIR=G:\ollama

## 模型下载到指定位置

添加环境变量OLLAMA_MODELS为自己想要模型下载的路径就行了



## 取消开机自启

C:\Users\28195\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup

在这里删掉ollama

更简单的方法：

设置->应用->启动

里面关掉就行了







### 参考

[自定义Ollama安装路径 - 不愿透露姓名的菜鸟 - 博客园](https://www.cnblogs.com/LaiYun/p/18696931)

[如何关闭Windows下Ollama开机自启动_ollama关闭开机自启-CSDN博客](https://blog.csdn.net/birdfly2015/article/details/144282954)