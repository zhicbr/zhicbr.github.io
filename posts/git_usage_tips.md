

## workflow

开发前先更新

vscode

![image-20250120115142748](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images//image-20250120115142748.png)

idea

![image-20250120115214065](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250120115214065.png)

如果是master，直接update到最新就行了

如果是分支a，切换到master，然后update到最新，再切换回分支a，a分支与master落后提交，即需要将master的更新同步到a分支，在本地分支，Merge'master' into 'a',然后push到a的远程分支，即可实现a分支同步更新。

![image-20241201104844136](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20241201104844136.png)



在a分支上实现功能，先推送到远程a分支，然后发起pull request，即将a分支的更新应用于主分支，通过代码审查人员审查后，实现master同步新功能





## git

查密码,姓名,邮箱

```
git config user.password
git config user.name
git config user.email
```

让项目push时不用每次都写用户名和密码

```
git config --global credential.helper store

```

然后会跳出一个git应用让你填写用户名和密码，填写之后就行了

这里的用户名和密码是远程仓库，也就是gitee或github里设置的用户名和密码，gitee里面用户名是qq邮箱



- **Git的用户名和邮箱**：用于标识提交者，记录在提交日志中，不用于认证。
- **远程仓库的用户名和密码（或令牌）**：用于认证，确保你有权限访问和操作远程仓库。推荐使用个人访问令牌（PAT）代替密码，以提高安全性。



## Merge remote-tracking branch 'origin/master'

当你看到 `Merge remote-tracking branch 'origin/master'` 这个消息时，这意味着你正在将远程仓库的 `master` 分支（或 `main` 分支，取决于你的默认分支名称）合并到你当前所在的本地分支。具体来说，这个操作通常发生在以下几种情况之一：

1. **拉取远程更改**：
   - 当你执行 `git pull` 命令时，Git 会自动从远程仓库获取最新的更改，并尝试将这些更改合并到你当前的本地分支。如果远程仓库的 `master` 分支有新的提交，Git 会创建一个合并提交来整合这些更改。
   - 例如，如果你在本地的 `master` 分支上工作，并且远程的 `origin/master` 有新的提交，那么执行 `git pull` 后，你会看到类似 `Merge remote-tracking branch 'origin/master'` 的消息。

2. **手动合并**：
   - 你也可以手动执行 `git merge origin/master` 来将远程 `master` 分支的更改合并到当前的本地分支。这通常在你想要显式地控制合并过程时使用。
   - 例如，如果你在 `feature-branch` 上工作，并且想将 `origin/master` 的最新更改合并进来，你可以切换到 `feature-branch` 并运行 `git merge origin/master`。

3. **解决冲突**：
   - 如果在合并过程中出现冲突（即本地和远程分支对同一部分代码进行了不同的修改），Git 会提示你解决这些冲突。你需要手动编辑文件以解决冲突，然后标记为已解决（通过 `git add`），最后完成合并（通过 `git commit`）。

### 示例

假设你在本地 `master` 分支上工作，并且远程 `origin/master` 有新的提交，你可以执行以下命令来更新你的本地分支：

```bash
# 切换到 master 分支
git checkout master

# 拉取并合并远程 master 分支的最新更改
git pull origin master
```

或者，如果你想手动进行合并：

```bash
# 切换到 master 分支
git checkout master

# 获取远程最新的更改
git fetch origin

# 手动合并远程 master 分支
git merge origin/master
```

### 总结

`Merge remote-tracking branch 'origin/master'` 表示 Git 正在将远程仓库的 `master` 分支的更改合并到你当前的本地分支。这是一个常见的操作，用于保持本地代码与远程代码同步。







## 访问github设置代理

执行了以下命令

```
git config --global http.https://github.com.proxy socks5://127.0.0.1:7890
```

现在是可以挂梯子正常上传不报错了。     7890和clash中的配置有关

取消如下：

```
git config --global --unset http.https://github.com.proxy
```

确认当前代理设置：

````
git config --global --get http.https://github.com.proxy
````

查看所有git配置：

```
git config --global -l
```



另可以修改host文件实现访问github。







## 端口相关



1. **443端口**：

- 这是 HTTPS 协议的标准端口
- 用于你的 Git 客户端和 GitHub 服务器之间的加密通信
- 这个端口是在 GitHub 服务器端开放的

```plaintext
你的电脑 ----> GitHub服务器:443
```

2. **代理端口（如1080）**：

- 这是你本地代理软件使用的端口
- 用于在你的电脑和代理服务器之间建立连接
- 这个端口是在你本地电脑上的

```plaintext
完整的连接路径：
你的Git客户端 -> 本地1080端口 -> 代理服务器 -> GitHub:443
```

3. **在git push过程中的工作流程**：

```plaintext
[你的Git客户端] ---> [本地代理:1080] ---> [代理服务器] ---> [GitHub:443]
     |                     |                    |                |
     |                     |                    |                |
  发起推送            通过配置的本地端口     转发请求      接收加密数据
                     连接代理服务器
```

所以：

- 1080端口（或其他代理端口）是用来"翻墙"的
- 443端口是用来进行安全通信的
- 这两个端口在整个过程中承担不同的职责，互不影响

## git和浏览器处理代理

1. **浏览器的代理设置**：

- 浏览器会自动读取系统的代理设置或其自身的代理设置
- 当你开启代理软件（如 Clash）时，它会自动配置系统代理
- 浏览器会自动识别并使用这些系统代理设置
- 所以你不需要额外配置，开启代理后就能直接访问

2. **Git 的代理处理**：

- Git 是一个命令行工具，默认不会读取系统的代理设置
- 它需要单独配置自己的代理设置
- 这样设计的原因是：
  - 提供更灵活的控制
  - 允许对不同的远程仓库使用不同的代理
  - 确保在不同环境下（如服务器）有可预测的行为

3. **如何让 Git 自动使用系统代理**：
   如果你想让 Git 也使用系统代理，可以设置环境变量：

```bash
# Windows
set http_proxy=socks5://127.0.0.1:1080
set https_proxy=socks5://127.0.0.1:1080

# Linux/Mac
export http_proxy=socks5://127.0.0.1:1080
export https_proxy=socks5://127.0.0.1:1080
```

这种独立的设计虽然需要额外配置，但提供了更多的灵活性和控制能力。



## 凭据管理器

使用命令

```
git config --global credential.helper store 
```

- `git config`：是 Git 用于配置 Git 环境和设置的命令。
- `--global`：表示该配置是全局的，会影响用户在整个系统上的 Git 操作，而不是只针对某个具体的 Git 仓库。
- `credential.helper store`：`credential.helper` 是 Git 用于处理凭证（如用户名和密码）的辅助工具，而 `store` 是一种凭证存储方式。
- Git 会将你首次输入的用户名和密码存储在本地文件系统中（通常存储在 `~/.git-credentials` 文件中），后续与远程仓库进行操作时，会自动使用存储的凭证信息，无需再次手动输入，为用户提供了便利。

远程仓库身份认证，不必每次上传都使用用户名和密码

![image-20250120115442352](https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/image-20250120115442352.png)