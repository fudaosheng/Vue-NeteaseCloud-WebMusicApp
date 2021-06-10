### 前言

肝代码不易，若是在网上发表请标明出处，另外请路过的朋友们随手点个Star。本项目仅用于学习。 

[Github地址](https://github.com/daoshengfu/Vue-NeteaseCloud-WebMusicApp)

### 头条内推（前端）

[北京日常实习](https://job.toutiao.com/s/eYLjJcG)     [北京社招](https://job.toutiao.com/s/eYLf5vy)

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

----dev-player  //正在开发中，目标是封装一个独立的音乐播放器
    技术栈：react+ts+hooks+mobx+antd
```

### 后端API

本项目后端所有数据来自开源项目NeteaseCloudMusicApi，下面附有后端开源项目地址、文档

[后端API仓库地址](https://github.com/Binaryify/NeteaseCloudMusicApi)     

[API文档](https://neteasecloudmusicapi.vercel.app/#/)

### 运行项目

1. 运行后端仓库

    1.1. git clone 后端仓库地址

    1.2. cnpm install

    1.3. node app

2. 运行本仓库代码

    2.1. git clone 本仓库地址

    2.2. cnpm install

    2.3. npm run serve


#### 问题交流群

欢迎加群一起讨论

![输入图片说明](https://images.gitee.com/uploads/images/2020/0915/095720_2490a5ae_7602838.jpeg "qrcode_1600134831290.jpg")

### 项目效果预览

#### theme

| light主题 ![light主题](https://images.gitee.com/uploads/images/2021/0220/010130_4d87a5cc_7602838.png "屏幕截图.png") |dark主题 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/010446_948f5ca8_7602838.png "屏幕截图.png")  |green主题 ![green主题](https://images.gitee.com/uploads/images/2021/0220/010217_f5b63600_7602838.png "屏幕截图.png")  |
|---|---|---|

#### 歌单

|歌单 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012658_5ed1ddbd_7602838.png "屏幕截图.png")  |歌单 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012731_f5e25966_7602838.png "屏幕截图.png")  |歌单 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012757_ff06b553_7602838.png "屏幕截图.png")  |
|---|---|---|

#### 排行榜

| 排行榜 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012935_bfaa3065_7602838.png "屏幕截图.png") |排行榜  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012953_9857b7de_7602838.png "屏幕截图.png") |排行榜  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013025_ab2d440c_7602838.png "屏幕截图.png") |
|---|---|---|

#### 歌手 & 歌手详情

|歌手详情-生平简介 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013344_9814ade8_7602838.png "屏幕截图.png")  |相似歌手 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013406_7e7f7857_7602838.png "屏幕截图.png")  |歌手 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013535_bcfe5162_7602838.png "屏幕截图.png")  |
|---|---|---|

|歌手 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013125_8983bc8c_7602838.png "屏幕截图.png")  |歌手详情 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013215_106bb0f4_7602838.png "屏幕截图.png")  |歌手MV![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013229_77cba857_7602838.png "屏幕截图.png")   |
|---|---|---|

#### MV & MV播放

|MV ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013609_7afb2cbd_7602838.png "屏幕截图.png") |MV排行榜 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013638_8e75f908_7602838.png "屏幕截图.png")  |全部MV ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013700_f95da2ea_7602838.png "屏幕截图.png")  |
|---|---|---|

|MV播放页面 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013833_1052918e_7602838.png "屏幕截图.png")   |MV播放  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/014010_56ae1105_7602838.png "屏幕截图.png") | MV播放  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/014044_e582c372_7602838.png "屏幕截图.png")|
|---|---|---|

#### 播放器

|播放器  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/014825_ee2d1475_7602838.png "屏幕截图.png") |播放器 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/014929_db8070a9_7602838.png "屏幕截图.png")  |播放器![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/020325_1b835cc2_7602838.png "屏幕截图.png")|
|---|---|---|

#### 搜索

|热搜列表  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/020400_1de6b893_7602838.png "屏幕截图.png") | 搜索建议 ![](https://images.gitee.com/uploads/images/2021/0220/020436_e04c6aec_7602838.png "屏幕截图.png")  |搜索详情  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/020512_2b796716_7602838.png "屏幕截图.png") |
|---|---|---|

#### 其他

其他页面效果请参考version1分支，因为上传图片要求不能超过2M，太麻烦我就不一一上传了