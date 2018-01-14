# 程序环境安装说明

##### **预览地址：[https://music.io-code.com](https://music.io-code.com "https://music.io-code.com")**
<br/>

> 注意：以下过程花费5-10分钟，取决于网络环境和电脑性能，如果发生错误，请重试，如果多次错误，请放弃构建，直接查看代码和[部署好的网站](https://music.io-code.com "部署好的网站")

## 一. 安装Node.js 和 npm/yarn

#### 1. 下载Node.js

Windows：[https://npm.taobao.org/mirrors/node/v8.9.4/node-v8.9.4-x64.msi](https://npm.taobao.org/mirrors/node/v8.9.4/node-v8.9.4-x64.msi "https://npm.taobao.org/mirrors/node/v8.9.4/node-v8.9.4-x64.msi")
Linux：[https://npm.taobao.org/mirrors/node/v8.9.4/node-v8.9.4-linux-x64.tar.xz](https://npm.taobao.org/mirrors/node/v8.9.4/node-v8.9.4-linux-x64.tar.xz "https://npm.taobao.org/mirrors/node/v8.9.4/node-v8.9.4-linux-x64.tar.xz")
Mac：[https://npm.taobao.org/mirrors/node/v8.9.4/node-v8.9.4.pkg](https://npm.taobao.org/mirrors/node/v8.9.4/node-v8.9.4.pkg "https://npm.taobao.org/mirrors/node/v8.9.4/node-v8.9.4.pkg")
#### 2. 安装Node.js
下载安装包之后, 打开安装包进行常规安装
> 备注： 安装过程中要把Node.js和npm加入到环境变量中，
否则以下所有命令都会失效

#### 3. 安装yarn
在命令行执行命令
```bash
npm i -g yarn
```
#### 4. 切换npm/yarn镜像源头
在命令行执行命令
```bash
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```
或者
```bash
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
## 二. 程序构建
#### 1. 切换到项目根目录
首先解压源代码压缩包，然后在命令行里使用```cd```命令切换到项目根目录下
#### 2. 安装依赖库
在命令行里执行命令
```bash
yarn install
```
或者
```bash
npm install
```
#### 3. 直接查看
在命令行里执行命令
```bash
yarn start
```
或者
```bash
npm start
```
浏览器打开 [http://localhost:8080](http://localhost:8080 "http://localhost:8080") 即可查看到开发环境的WebAPP
> 备注：请保证8080端口不被占用

#### 4. 打包编译
在命令行里执行命令
```bash
yarn build
```
或者
```bash
npm build
```
编译和压缩过的代码被放在项目根目录下的dist目录下

## 三. 服务器部署
> 不必操作，查看即可

#### 1. 静态资源部署
在nginx上新建域名，将打包编译后dist目录下的所有文件放到域名目录下。
#### 2. 后端API部署
在命令行里执行命令安装pm2
```bash
yarn global pm2
```
或者
```bash
npm install -g pm2
```
然后下载实现写好的部署接口文件并执行
```bash
pm2 --name "music_api" -f start app.js
```
#### 3. 后端Django部署
