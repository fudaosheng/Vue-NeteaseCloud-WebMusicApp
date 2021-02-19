### 项目介绍

项目参考于网易云音乐PC版app，基本实现官方音乐播放、MV播放所有功能

项目目前共四个分支：

```js
----master  //主分支,第二版代码

----version1  //第一版代码，写第一版时自己还很菜，所以可能很多地方不够友好
    项目技术栈：vue+vuex+vue-router+axios+better-scroll

----version2  //第二版代码
    亮点：支持三种主题颜色，页面更友好，对不同尺寸屏幕也做了一定兼容，内部代码相较于第一版也有比较大的优化
    技术栈：vue+vuex+vue-router+axios+element-ui+vbest-ui(自己封装的组件库)+postcss-pxtorem+vue-lazyload

----R-player  //正在开发中，目标是封装一个独立的音乐播放器
    技术栈：react+hooks+mobx+antd
```

### 后端API

本项目后端所有数据来自开源项目NeteaseCloudMusicApi，下面附有后端开源项目地址、文档

[后端API仓库地址](https://github.com/Binaryify/NeteaseCloudMusicApi)     

[API文档](https://neteasecloudmusicapi.vercel.app/#/)

### 运行项目

1. 运行后端仓库
1.1. git clone 后端仓库地址
1. 1. 1.     1.2. cnpm install
1. 1. 1.     1.3. node app
1. 1. 1. 2. 运行本仓库代码
1. 1. 1.     2.1. git clone 本仓库地址
1. 1. 1.     2.2. cnpm install
1. 1. 1.     2.3. npm run serve




### 项目效果预览

| light主题 ![light主题](https://images.gitee.com/uploads/images/2021/0220/010130_4d87a5cc_7602838.png "屏幕截图.png") |dark主题 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/010446_948f5ca8_7602838.png "屏幕截图.png")  |green主题 ![green主题](https://images.gitee.com/uploads/images/2021/0220/010217_f5b63600_7602838.png "屏幕截图.png")  |
|---|---|---|

其他页面效果请参考version1分支，因为上传图片要求不能超过2M，太麻烦我就不一一上传了