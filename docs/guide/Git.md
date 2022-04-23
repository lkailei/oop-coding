---
title: Git
autoGroup-5: 持续集成 
---
## Git

### git概念：

Git 是分布式版本控制和源代码管理系统，重点使用和管理代码的速度。

Git 最初是由Linus Torvalds设计开发的，用于管理Linux内核开发。

Git 是根据GNU通用公共许可证版本2的条款分发的自由/免费软件 

### git术语：

​	workspace:工作区

​	index/Stage:暂存区，

​	Repository:存储库，仓库

​	remote:远程仓库

### 使用Git:

速度快，设计简单，对非对称式的强力支持，完全分布式，有能力高效管理类似 Linux 内核一样的超大规模项目(速度和数据量)Git 不按照以上方式对待或保存数据。 反之，Git 更像是把数据看作是对小型文件系统的一组快照。 每次你提交更新，或在 Git 中保存项目状态时，它主要对当时的全部文件制作一个快照并保存这个快照的索引。为了高效，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个 快照流

#### Git 有三种状态，你的文件可能处于其中之一：

`已提交(committed)、已修改(modified)和已暂存(staged)。`

- 已提交表示数据已经安全的保存在本地数据库中。
- 已修改表示修改了文件，但还没保存到数据库中。 
- 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。

####  Git 项目的三个工作区域的概念：

 `Git 仓库、工作目录以及暂存区域。
`​	

- `Git 仓库目录` 是 Git 用来保存项目的元数据和对象数据库的地方。 这是 Git 中最重要的部分，从其它计算机克隆仓库时，拷贝的就是这里的数据。
- `工作目录` 是对项目的某个版本独立提取出来的内容。 这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。
- `暂存区域`是一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中。 有时候也被称作‘索引’，不过一般说法还是叫暂存区域。

#### 基本的 Git 工作流程如下：

​		在工作目录中修改文件。

​		暂存文件，将文件的快照放入暂存区域。

​		提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。

​		如果 Git 目录中保存着的特定版本文件，就属于已提交状态。 如果作了修改并已放入暂存区域，就属于已暂存状态。

​		如果自上次取出后，作了修改但还没有放到暂存区域，就是已修改状态。 

###  linux安装Git：

​	安装命令：sudo apt-get install git 

​	查看版本：git  version 2.7.4

​	git config 工具控制Git的行为和外观的配置变量

​	/etc/gitconfig 文件: 包含系统上每一个用户及他们仓库的通用配置

​	git config --list 命令来列出所有 Git 当时能找到的配置。

### git命令：

​	`git init` 创建一个空的git仓库，或重新初始化一个现有的仓库，

​	`git add`命令将文件内容添加到索引(将修改添加到暂存区)。也就是将要提交的文件的信息添加到索引库中。

​	在对工作树进行任何更改之后，并且在运行git commit命令之前，必须使用git add命令将任何新的或修改的文件添加到索引。该命令可以在提交之前多次执行。它只在运行git add命令时添加指定文件的内容; 如果希望随后的更改包含在下一个提交中，那么必须再次运行git add将新的内容添加到索引。

​		`git clone`:  copy一个Git仓库到本地git clone [url]

​		`git status`:  查看是都有修改

​		`git pull`:  取回远程主机某个分支的更新，再与本地的指定分支合并，它的完整格式稍稍有点复杂。`git pull <远程主机名> <远程分支名>:<本地分支名>`

​		`git push`：命令用于将本地分支的更新，推送到远程主机。它的格式与git pull命令相似。git push <远程主机名> <本地分支名>:<远程分支名>

	一
		Clone就是将远程库的代码拷贝到本地
		填写远程和本地项目路径，点击“克隆“。这样就会将服务器上项目代码克隆到本地了。
	二
		提交Commit和推送Push
		commit将工作空间修改提交到本地库。
		push将本地库修改提交到远程库。
	三
		拉取pull和获取fetch
		pull 从远程拉取最新版本 到本地 自动合并 merge
		fetch 从远程获取最新版本 到本地 不会自动合并 merge
		虚线表示拉取到本地仓库
		实现表示拉取到本地仓库，并合并到工作空间
### git工作方式：

​	像 Subversion 一样，集中式工作流以中央仓库作为项目所有修改的单点实体。相比 SVN 缺省的开发分支 trunk，Git 叫做 master，所有修改提交到这个分支上。该工作流只用到 master 这一个分支。开发者开始先克隆中央仓库。在自己的项目拷贝中，像 SVN 一样的编辑文件和提交修改；但修改是存在本地的，和中央仓库是完全隔离的。开发者可以把和上游的同步延后到一个方便时间点。要发布修改到正式项目中，开发者要把本地 master 分支的修改『推（push）』到中央仓库中。这相当于 svn commit 操作，但 push 操作会把所有还不在中央仓库的本地提交都推上去。

​	如果开发者本地的提交历史和中央仓库分歧，Git会拒绝push,提交否则会覆盖已经在中央仓库中的正式提交。

​     在开发者提交自己功能修改到中央库前，需要先 fetch 在中央库的新增提交，rebase 自己提交到中央库提交历史之上。

​    这样做的意思是在说，『我要把自己的修改加到别人已经完成的修改上。』最终的结果是一个完美的线性历史，就像以前的SVN 的工作流中一样。

​     如果本地修改和上游提交有冲突，Git 会暂停 rebase 过程，给你手动解决冲突的机会。Git 解决合并冲突，用和生成提交一样的 git status 和 git add 命令，很一致方便。还有一点，
如果解决冲突时遇到麻烦，Git 可以很简单中止整个 rebase 操作，重来一次（或者让别人来帮助解决）。

`1.创建一个空的git仓库，或重新初始化一个现有的仓库，`

`2.所有人进行克隆中央仓库：git clone http://github.com/path/to/repo.git基于你后续会持续和克隆的仓库做交互的假设，克隆仓库时 Git 会自动添加远程别名 origin 指回『父』仓库`

`3.提交：`
rebase 操作过程是把本地提交一次一个地迁移到更新了的中央仓库 master 分支之上。这意味着可能要解决在迁移某个提交时出现的合并冲突，而不是解决包含了所有提交的大型合并时所出现的冲突。这样的方式让你尽可能保持每个提交的聚焦和项目历史的整洁。反过来，简化了哪里引入 Bug 的分析，如果有必要，回滚修改也可以做到对项目影响最小。

如果小红和小明的功能是相关的，不大可能在 rebase 过程中有冲突。如果有，Git 在合并有冲突的提交处暂停 rebase 过程，输出下面的信息并带上相关的指令：CONFLICT (content): Merge conflict in
git status：命令用于查看状态，及其出现问题的地方

如果执行遇到冲突：执行以下命令会回到原来的执行前的样子：`git rebase --abort`

### pull Requests:

​	Pull Requests 是 Bitbucket 上方便开发者之间协作的功能。提供了一个用户友好的 Web 界面，在集成提交的变更到正式项目前可以对变更进行讨论。	

​	开发者向团队成员通知功能开发已经完成，Pull Requests 是最简单的用法。开发者完成功能开发后，通过 Bitbucket 账号发起一个 Pull Request。这样让涉及这个功能的所有人知道，要去做 Code Review 和合并到 master 分支。

​	但是，Pull Request 远不止一个简单的通知，而是为讨论提交的功能的一个专门论坛。如果变更有任何问题，团队成员反馈在 Pull Request 中，甚至 push 新的提交微调功能。所有的这些活动都直接跟踪在 Pull Request 中。

### gitLab:

​	GitLab 是利用 Ruby on Rails 一个开源的版本管理系统，实现一个自托管的 Git 项目仓库，可通过 Web 界面进行访问公开的或者私人项目。

​	它拥有与 Github 类似的功能，能够浏览源代码，管理缺陷和注释。可以管理团队对仓库的访问，它非常易于浏览提交过的版本并提供一个文件历史库。

​	团队成员可以利用内置的简单聊天程序 (Wall) 进行交流。它还提供一个代码片段收集功能可以轻松实现代码复用，便于日后有需要的时候进行查找。

### Docker安装 gitlab：

​	先进行拉取镜像：docker pull twang2218/gitlab-ce-zh

​	用这个dockercompose启动这个：docker-compose up -d 
**​	在docker-compose.yml配置如下：**

​		hostname： 是本机的ip,

​		external_url: 是这个外部的使用   他必须和nginx的开放的端口一样
​		

```yaml
version: '3'
  services:
    gitlab:
    restart: always
    image: twang2218/gitlab-ce-zh
    hostname: '192.168.147.132'
    environment:
      TZ: 'Asia/Shanghai'
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://192.168.147.132:8080'
        gitlab_rails['gitlab_shell_ssh_port'] = 2222
        unicorn['port'] = 8888
        nginx['listen_port'] = 8080
    ports:
      - '8080:8080'
      - '8443:443'
      - '2222:22'
      volumes:
        - /usr/local/docker/gitlab/config:/etc/gitlab
        - /usr/local/docker/gitlab/data:/var/opt/gitlab
        - /usr/local/docker/gitlab/logs:/var/log/gitlab
```


## Nexus:

​	其实就是maven的私服
​	Nexus 是一个强大的仓库管理器，极大地简化了内部仓库的维护和外部仓库的访问。2016 年 4 月 6 日 Nexus 3.0 版本发布，相较 2.x 版本有了很大的改变：

​	`对低层代码进行了大规模重构，提升性能，增加可扩展性以及改善用户体验。`

`​	升级界面，极大的简化了用户界面的操作和管理。`

`​	提供新的安装包，让部署更加简单。`

`​	增加对 Docker, NeGet, npm, Bower 的支持。`

`​	提供新的管理接口，以及增强对自动任务的管理。`	

### Docker 安装Nexus:

​		在docker-compose中配置如下：

```yml
version: '3.1'
  services:
    nexus:
      restart: always
      image: sonatype/nexus3
      container_name: nexus
      ports:
        - 8081:8081
        volumes:
          - /usr/local/docker/nexus/data:/nexus-data	
```


通过：http://ip:port/用户名：密码：验证

注意：因为所有的data中需要权限创建一些文件：所以加入权限：

​	sudo chmod 777 data/

查看 内存：free -h

### 进程管理:

​	获得htop ：sudo install htop
​	htop：

默认账号密码：admin
			admin123

## 使用maven私服：

​	在maven中的settings.xml中加入；这里的密码如果修改了使用新的密码

```xml
  <server>
      <id>nexus-releases</id>
      <username>admin</username>
      <password>admin123</password>
  </server>

  <server>
      <id>nexus-snapshots</id>
      <username>admin</username>
      <password>admin123</password>
  </server>	
```

​	配置自动化部署：这里的url是nexus中的路径。

```xml
<distributionManagement>
    <repository>
        <id>nexus-releases</id>
        <name>Nexus Release Repository</name>
        <url>http://127.0.0.1:8081/repository/maven-releases/</url>
    </repository>
    <snapshotRepository>
        <id>nexus-snapshots</id>
        <name>Nexus Snapshot Repository</name>
        <url>http://127.0.0.1:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement> 
```

​	ID 名称必须要与 settings.xml 中 Servers 配置的 ID 名称保持一致。

​	项目版本号中有 SNAPSHOT 标识的，会发布到 Nexus Snapshots Repository, 否则发布到 Nexus Release Repository，并根据 ID 去匹配授权账号

​	部署到仓库：
​			mvn deploy

​	配置代理仓库：	

```xml
<repositories>
    <repository>
            <id>nexus</id>
            <name>Nexus Repository</name>
            <url>http://127.0.0.1:8081/repository/maven-public/</url>
            <snapshots>
                    <enabled>true</enabled>
            </snapshots>
            <releases>
                    <enabled>true</enabled>
            </releases>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
            <id>nexus</id>
            <name>Nexus Plugin Repository</name>
            <url>http://127.0.0.1:8081/repository/maven-public/</url>
            <snapshots>
                    <enabled>true</enabled>
            </snapshots>
            <releases>
                    <enabled>true</enabled>
            </releases>
    </pluginRepository>
</pluginRepositories>
```

