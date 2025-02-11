

vscode可以在项目命令行中使用`code .` 快捷命令打开，其原理是vscode的bin目录写进了环境变量，bin目录中有code这个可执行文件,可以直接运行vscode，接受一个参数 `.`表示当前目录。

同样的，cursor也可以使用快捷命令在命令行中打开，在cursor的命令面板中执行`Shell Command: Install 'cursor' command`或者直接将cursor的bin目录添加到环境变量中。

但是，由于cursor的bin目录中cursor和code都有（如下图），导致使用`code .`时也会用cursor打开，故需要删掉cursor的bin目录下的code和code.cmd。最终实现`code .`打开vscode，`cursor .` 打开cursor。

![](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250211120446870.png)

###### 参考文献

[cursor IDE 编辑器从命令行打开 - sunday](https://sundaysto.club/archives/cursor-IDE-bian-ji-qi-cong-ming-ling-xing-da-kai)

[安装Cursor后VS Code的终端启动命令code失效 – 泰仆阿梵](https://www.tapafun.com/share/安装cursor后vs-code的终端启动命令code失效/)



