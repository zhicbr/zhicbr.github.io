## 前提

安装了node.js和npm

## 初始化项目

创建项目文件夹

执行`npm init -y`来生成`package.json`文件，并且使用`npm install electron --save-dev`命令安装了Electron作为开发依赖项。

## 配置启动脚本

```
"scripts": {
    "start": "electron ."
}
```

## 创建必要的项目文件

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的Electron应用</title>
</head>
<body>
    <h1>你好，这是一个Electron应用！</h1>
</body>
</html>
```



### index.js

```js
const { app, BrowserWindow } = require('electron');

function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 加载index.html文件
  win.loadFile('index.html');
}

// 当Electron完成初始化后，将调用此方法并开始加载第一个窗口
app.whenReady().then(createWindow);

// 在所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当点击Dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```



## 启动项目

使用命令`npm star`t即可启动项目



## 打包

安装

`npm install electron-builder --save-dev`

package.json如下：

```json
{
  "name": "music_player_electron",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron .",
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
  },
  "devDependencies": {
    "electron": "^34.1.1",
    "electron-builder": "^25.1.8"
  },
  "build": {
    "appId": "com.example.yourapp",
    "productName": "YourAppName",
    "directories": {
        "output": "dist"
    },
    "mac": {
        "category": "your.app.category.type"
    },
    "win": {},
    "linux": {}
}
}

```



使用命令

### `npm run pack`

其作用是打包你的Electron应用程序到一个指定的目录中，但不会创建最终的安装包。这意味着它会将应用所需的资源（包括HTML、CSS、JavaScript文件以及任何静态资源）和Electron运行时一起准备就绪，但是以一种未封装的形式存放。这种形式便于开发阶段快速测试构建结果是否正常工作，而无需等待完整的安装包制作过程完成。这对于想要快速验证构建产物是否正确，或者需要检查构建输出的人来说非常有用。

也就是，使用pack，在目录里会生成一个dist文件夹，里面的win-unpacked里有能直接运行这个项目的exe文件

### `npm run dist`

直接使用`electron-builder`命令（没有`--dir`参数），则会执行默认的行为，即生成针对不同平台优化后的可分发安装包。这些安装包格式依据目标操作系统有所不同，例如Windows上的`.exe`或`.msi`安装程序，macOS上的`.dmg`磁盘映像，或是Linux上的AppImage、deb等格式。此过程不仅包含了所有必要的资源和代码，还会进行优化处理（如代码压缩、图标嵌入等），并按照目标操作系统的规范对应用进行封装，以便于用户能够轻松安装和使用。

也就是说，使用dist，在dist文件夹里, 有一个安装程序exe，可以将其直接发布，点击之后开始安装程序，在最简单的项目情况下，安装到了默认地址"C:\Users\28195\AppData\Local\Programs",并在桌面有一个快捷方式，点击即为项目的应用程序。

### 注意

npm run dist可能第一次会失败

解决方法：使用管理员权限打开cmd，进入项目，再执行npm run dist, 以后在cmd执行就行。

过程如下（管理员权限下）：

```cmd

C:\Windows\System32>e:

E:\>cd workspace3

E:\workspace3>cd music_player_electron

E:\workspace3\music_player_electron>npm run dist

> music_player_electron@1.0.0 dist
> electron-builder

  • electron-builder  version=25.1.8 os=10.0.26100
  • loaded configuration  file=package.json ("build" field)
  • description is missed in the package.json  appPackageFile=E:\workspace3\music_player_electron\package.json
  • writing effective config  file=dist\builder-effective-config.yaml
  • executing @electron/rebuild  electronVersion=34.1.1 arch=x64 buildFromSource=false appDir=./
  • installing native dependencies  arch=x64
  • completed installing native dependencies
  • packaging       platform=win32 arch=x64 electron=34.1.1 appOutDir=dist\win-unpacked
  • updating asar integrity executable resource  executablePath=dist\win-unpacked\YourAppName.exe
  • default Electron icon is used  reason=application icon is not set
  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z size=5.6 MB parts=1
  • downloaded      url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z duration=4.787s
  • signing with signtool.exe  path=dist\win-unpacked\YourAppName.exe
  • no signing info identified, signing is skipped  signHook=false cscInfo=null
  • building        target=nsis file=dist\YourAppName Setup 1.0.0.exe archs=x64 oneClick=true perMachine=false
  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z size=1.3 MB parts=1
  • downloaded      url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z duration=3.331s
  • signing with signtool.exe  path=dist\win-unpacked\resources\elevate.exe
  • no signing info identified, signing is skipped  signHook=false cscInfo=null
  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z size=731 kB parts=1
  • downloaded      url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z duration=3.165s
  • signing with signtool.exe  path=dist\__uninstaller-nsis-music_player_electron.exe
  • no signing info identified, signing is skipped  signHook=false cscInfo=null
  • signing with signtool.exe  path=dist\YourAppName Setup 1.0.0.exe
  • no signing info identified, signing is skipped  signHook=false cscInfo=null
  • building block map  blockMapFile=dist\YourAppName Setup 1.0.0.exe.blockmap

E:\workspace3\music_player_electron>

```





## 参考

[electron builder打包时，出现errorOut=ERROR: Cannot create symbolic link-CSDN博客](https://blog.csdn.net/vifaceeeeee/article/details/134693524)