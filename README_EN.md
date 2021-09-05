### Preface

The liver code is not easy. If it is published online, please indicate the source. In addition, friends who pass by are invited to order a :star:. This project is for learning only.

- [中文](README.md)

[Github Adress](https://github.com/daoshengfu/Vue-NeteaseCloud-WebMusicApp)

### Project Introduction
The project is based on the NetEase Cloud Music PC version app, which basically realizes all the functions of official music playback and MV playback.

The project have four branches now:
```js
----master  
//Master branch, second version code

----version1  
//The first version of the code, when I wrote the first version, I was still very good at it, so many places may not be friendly enough
Project technology stack：
vue+vuex+vue-router+axios+better-scroll

----version2  //第二版代码
Highlights: Supports three theme colors, the page is more friendly, and it is compatible with different sizes of screens. Compared with the first version, the internal code has a relatively large optimization.Technology stack：
vue+vuex+vue-router+axios+element-ui+vbest-ui(Own packaged component library)+postcss-pxtorem+vue-lazyload

----dev-player  //During development, the goal is to package an independent music player
Technology stack：react+ts+hooks+mobx+antd
```

### Backend API
All the back-end data of this project comes from the open source project NeteaseCloudMusicApi, and the back-end open source project address and documents are attached below.

[Backend API Adress](https://github.com/Binaryify/NeteaseCloudMusicApi)     

[API doc](https://neteasecloudmusicapi.vercel.app/#/)

### Run
1. Run backed repo
   ```
    //git clone This warehouse address
    git clone https://github.com/daoshengfu/Vue-NeteaseCloud-WebMusicApp
    //npm install
    npm install
    //node start
    node app
   ```
2. Run this repo code
   ```
    
    git clone https://github.com/daoshengfu/Vue-NeteaseCloud-WebMusicApp
    //npm install
    npm install
    //node start
    node run serve
   ```

### Question Exchange Group

Welcome to join the group to discuss.

![输入图片说明](https://images.gitee.com/uploads/images/2020/0915/095720_2490a5ae_7602838.jpeg "qrcode_1600134831290.jpg")

### Preview

#### Theme

| light theme ![light主题](https://images.gitee.com/uploads/images/2021/0220/010130_4d87a5cc_7602838.png "屏幕截图.png") |dark theme ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/010446_948f5ca8_7602838.png "屏幕截图.png")  |greentheme ![green主题](https://images.gitee.com/uploads/images/2021/0220/010217_f5b63600_7602838.png "屏幕截图.png")  |
|---|---|---|

#### Songlist

| song list ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012658_5ed1ddbd_7602838.png "屏幕截图.png")  | song list ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012731_f5e25966_7602838.png "屏幕截图.png")  | song list ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012757_ff06b553_7602838.png "屏幕截图.png")  |
|---|---|---|

#### Leaderboard

| leaderboard ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012935_bfaa3065_7602838.png "屏幕截图.png") |  leaderboard  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/012953_9857b7de_7602838.png "屏幕截图.png") |leaderboard  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013025_ab2d440c_7602838.png "屏幕截图.png") |
|---|---|---|

#### Singer & Singer Details

|Singer Details-Biography ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013344_9814ade8_7602838.png "屏幕截图.png")  |Similar singers ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013406_7e7f7857_7602838.png "屏幕截图.png")  |Singers ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013535_bcfe5162_7602838.png "屏幕截图.png")  |
|---|---|---|

|Singers ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013125_8983bc8c_7602838.png "屏幕截图.png")  |Singers detials ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013215_106bb0f4_7602838.png "屏幕截图.png")  |Singers MV![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013229_77cba857_7602838.png "屏幕截图.png")   |
|---|---|---|

#### MV & MV player

|MV ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013609_7afb2cbd_7602838.png "屏幕截图.png") |MV Leaderboard ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013638_8e75f908_7602838.png "屏幕截图.png")  |Total MV ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013700_f95da2ea_7602838.png "屏幕截图.png")  |
|---|---|---|

|MV Play page ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/013833_1052918e_7602838.png "屏幕截图.png")   |MV Play  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/014010_56ae1105_7602838.png "屏幕截图.png") | MV Play  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/014044_e582c372_7602838.png "屏幕截图.png")|
|---|---|---|

#### Player

|Player  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/014825_ee2d1475_7602838.png "屏幕截图.png") |Player ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/014929_db8070a9_7602838.png "屏幕截图.png")  |Player![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/020325_1b835cc2_7602838.png "屏幕截图.png")|
|---|---|---|

#### Search

|Hot search list  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/020400_1de6b893_7602838.png "屏幕截图.png") | Search suggestions ![](https://images.gitee.com/uploads/images/2021/0220/020436_e04c6aec_7602838.png "屏幕截图.png")  |Search details  ![输入图片说明](https://images.gitee.com/uploads/images/2021/0220/020512_2b796716_7602838.png "屏幕截图.png") |
|---|---|---|

#### Other

For other page effects, please refer to the version1 branch, because the upload image requirements cannot exceed 2M, so I will not upload them one by one if it is too troublesome...