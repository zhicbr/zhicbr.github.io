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

使用命令npm start即可启动项目



## 打包

安装

npm install electron-builder --save-dev

使用命令

npm run pack

npm run dist