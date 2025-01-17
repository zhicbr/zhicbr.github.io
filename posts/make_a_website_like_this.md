## 注册一个github账号

使用qq邮箱即可

## 创建一个仓库

仓库名设置如下：

```
username.github.io
```

其中username为你的github用户名

将空项目拉取到本地

## 搭建博客基本框架

使用bolt.new直接生成一个静态的博客网页，放入刚才的项目中，push到github上，然后访问username.github.io就可以看到自己的博客了。



![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image1.png)



## 关于图片

将图片放到项目里，然后上传到github，图片就可以通过链接访问
然后将博客里的链接换成上述链接就行了
即前缀(https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/)加上文件名

````

## 更新博客
在posts文件夹下添加.md文件，图片放到images文件夹推送后获取连接，
在articles.json中添加新博客信息即可。
