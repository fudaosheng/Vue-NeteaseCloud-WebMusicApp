### 小符音乐-高仿网易云音乐

 **前言**

肝代码不易，本项目还是比较能拿的出手的，若是在网上发表请标明出处，另外跪求Star。另外本项目仅用于学习。 

Gitee地址：https://gitee.com/fudaosheng/vue-fds_music

 **特别感谢** 

@北京-张嘉利 给出的解决“点击相似歌手,切换到对应歌手详情页，但是歌手基础信息不变的问题”。

 **项目简介** 

本项目后端接口是Github大神Binaryify的开源项目（项目地址：[https://github.com/Binaryify/NeteaseCloudMusicApi](http://)），接口文档直接在百度搜索“网易云音乐API”作者是Binaryify。

本项目前端均是本人独立自主开发，所用技术栈：Vue全家桶+better-scroll+axios。

项目演示：（b站)[https://www.bilibili.com/video/BV1ui4y137Xr/](http://)随手点个赞吧 :tw-1f339: 

下面也有项目效果图

 **项目准备：** 

后端API官方文档：[https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi
](http://)

 **API安装步骤：** 

1. git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

(不会使用git的小伙伴可以直接去接口仓库下载哦，接口仓库地址：[https://github.com/Binaryify/NeteaseCloudMusicApi](http://))

2.$ npm install

3。cd api文件夹

4.node app.js

![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/093904_5acf461a_7602838.png "屏幕截图.png")

以上是运行成功的效果

 **项目知识点介绍：Mixin** 

![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/094104_d9a27d78_7602838.png "屏幕截图.png")

了解详细Mixin请去vue官网。

 **项目优点** 

个人觉得本项目最大的优点在于如何触发音乐播放器。一般触发音乐播放器有三种方法，$emit、vuex、$bus。

1.$emit：缺点：音乐播放器和要播放的音乐所在组件必须有父子关系，而明显在一个音乐app中这是不现实的。

2.vuex：利用vuex的话可以先将要播放的音乐放在vuex中(假设放在state的musiclist中)，然后在音乐播放器组件生命周期函数中监听musiclist的状态，当音乐列表不为空时播放音乐.

缺点:(1)会存在musiclist不为空但是监听到的是空的现象,个人感觉是页面渲染先后问题。（2）修改musiclist都要通过mutations比较麻烦.

3.$bus，本项目采用的就是$bus。使用$bus这样不论音乐播放器和要播放的音乐所在组件是何种关系，都可以监听到要播放的音乐。

 **本项目核心--如何播放音乐** ：

```
import { _getMusicUrl, _getLyric } from "network/detail"
import { playList } from "components/content/playmusic/playList";
export const indexMixin = {
    methods: {
        PlayMusic(index = 0) {
            let path = this.$route.path;
            let musiclist;
            if (this.musiclist.length >= 200) {
                musiclist = this.musiclist.slice(0, 199);
            }
            else musiclist = this.musiclist;
            let url = null,
                lyric = null,
                currentLength = 0;
            let playlist = [];
            for (let i = 0, length = musiclist.length; i < length; i++) {
                let getUrl = _getMusicUrl(musiclist[i].id).then(res => {
                    url = res.data.data[0].url;
                    return url;
                });
                let getLyric = _getLyric(musiclist[i].id).then(res => {
                    lyric = res.data.tlyric.lyric;
                    return lyric;
                });
                Promise.all([getUrl, getLyric])
                    .then(results => {
                        let song = new playList(i, musiclist[i], results[0], results[1]);
                        playlist.push(song);
                        currentLength++;
                        /**每次完成两个网络请求都判断是否满足要求，满足才发送事件 */

                        if (i == musiclist.length - 1) {

                            this.$bus.$emit("playMusic", playlist, index, path);
                        }
                    })
                    .catch(err => {
                        this.$Message.warning('数据加载中，请稍等');
                    });
            }
        },
    }
}
```

之所以将其放在mixin中，是因为这样我在任何一个页面都能使用这个方法，降低了代码的重复性。

 **在音乐播放器组件中接收时：** 


```
mounted() {
 /**list是音乐列表，index是要播放的音乐在列表中的位置，path是当前播放音乐的路由路径 */
    this.$bus.$on("playMusic", (list, index, path) => {
      this.music = [];
      this.path = path;
      this.music = list;
      //   this.music = list.filter(item => {
      //     return item.src !== "";
      //   });
      /**对数组进行排序 */
      this.music = this.music.sort((a, b) => {
        return a.index - b.index;
      });
      /**在请求歌曲的时候可能有的歌曲不可用，或丢失。导致在播放器中的歌曲列表和页面展示存在差异，可能会出现指定的播放歌曲不服
       * 用一次查找解决问题
       */
      for (let i in this.music) {
        if (this.music[i].index == index) {
          this.currentIndex = i;
          break; //break跳出循环------continue跳出本次循环
        }
      }
    });
  },
```

 **项目中存在的一些问题** 

1.歌手详情页面刷新没有数据：

 _问题原因_ ：路由跳转的时候我传入的是一个歌手信息对象，歌手详情的数据都是根据这个对象的信息，id获取的。

先给大家上代码吧


```
 enterArtistDetail(artist) {
      this.$router.push({
        path: "/artist",
        query: {
          artist: artist
        }
      });
      this.$store.commit('addArtist',artist);
    }
```


 _我当初为什么这样写_ ：

（1)没选params当然是用params传参会报错啦，报错的原因：通过path进行传值的时候，报传的参数过大，而通过name进行传值确实能传，但是因为还有子路由，用name会导致后续无法重定向子路由。

（2）为什么不直接传个id然后再在路由中获取信息，是因为我看了API文档发现并没有根据id获取歌手的基础信息接口。这也是搜索结果页面歌手头像都一样的原因，它给我的数据就是那样的，而且没有歌手基础信息的接口。

（3）额外用vuex保存歌手信息，是因为我当初测试的时候发现路由直接传参，子路由重定向的时候会存在拿不到传过来的值的问题。


 **关于本项目** 

本项目还有许多值得改进的地方，各位小伙伴们有好的解决方案及时在下面评论或者Pull Requests我， **让我们一起完善改进本项目** 

关于项目的不足各位小伙伴可以在lssues里提出，或者在下面评论，看到我都会逐渐改进。

项目下一步方向：由于音乐播放器是我自己封装的，还存在许多改进地方，和一些功能没有开发，所以目前打算主要改进播放器方面。

 **项目目录介绍** 

|  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/110643_de0f7a27_7602838.png "屏幕截图.png")|
|--|


 **项目效果图：** 

 **首页** 
| ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/102010_987b4b6e_7602838.png "屏幕截图.png")  | ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/102037_714c901c_7602838.png "屏幕截图.png")  |
|---|---|

 **搜索** 

|热搜列表![热搜列表](https://images.gitee.com/uploads/images/2020/0713/102255_0207e611_7602838.png "屏幕截图.png")| 搜索建议  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/102336_e0b8bb31_7602838.png "屏幕截图.png")|
|---|---|

 **搜索结果** 

| 双击歌曲可播放 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/102433_e1d331c7_7602838.png "屏幕截图.png") |点击对应的歌手可进入该歌手的详细页面  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/102507_086200c5_7602838.png "屏幕截图.png") |
|---|---|

 **歌单** 

|   ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/102751_6f17b546_7602838.png "屏幕截图.png")|   ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/102813_85bb40fc_7602838.png "屏幕截图.png")|
|---|---|

 **歌单详细** 

|歌单歌曲简介  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103021_8b208a86_7602838.png "屏幕截图.png") |歌单评论，登陆可评论  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103052_1521844b_7602838.png "屏幕截图.png") |
|---|---|

 **登陆** 

| 登陆页面 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103257_ec8fa433_7602838.png "屏幕截图.png") |登陆成功,显示私人歌单，信息 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103324_a44f6825_7602838.png "屏幕截图.png")  |
|---|---|

 **排行榜** 

|![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103456_df9a2e88_7602838.png "屏幕截图.png")   | ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103533_0dbad57f_7602838.png "屏幕截图.png")  |
|---|---|

 **歌手** 

| 歌手首页 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103644_49366062_7602838.png "屏幕截图.png") |分类可选择喜欢的歌手  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103733_f863173a_7602838.png "屏幕截图.png") |
|---|---|

 **歌手详情** 

| 歌手首页简介![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103906_8419d742_7602838.png "屏幕截图.png")  |歌手详情 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/103936_056a2644_7602838.png "屏幕截图.png")  |
|---|---|
|  相似歌手，需要登陆![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/104058_8f6d2b32_7602838.png "屏幕截图.png")   |歌手MV ![输入图片说明](https://images.gitee.com/uploads/images/2020/0721/165258_126b274d_7602838.png "屏幕截图.png")  |
|---|---|

 **最新歌曲** 
| 点击播放全部或双击单曲播放 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/104226_b125fecd_7602838.png "屏幕截图.png") |可上拉加载更多 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/104247_f3913cbb_7602838.png "屏幕截图.png")  |
|---|---|

 **播放器功能** 

| 播放器歌单 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0716/110240_8edcf752_7602838.png "屏幕截图.png") |播放器歌词功能 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0717/090113_4a050b0f_7602838.png "屏幕截图.png")  |
|---|---|

| **纯净模式上线，听歌看评论**   ![输入图片说明](https://images.gitee.com/uploads/images/2020/0718/095732_be583e10_7602838.png "屏幕截图.png") |  **纯净模式和播放器歌单更配哦**  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0718/100014_0c4fcb10_7602838.png "屏幕截图.png")|
|---|---|

 **MV** 

| 推荐MV ![输入图片说明](https://images.gitee.com/uploads/images/2020/0721/153001_c36028ff_7602838.png "屏幕截图.png") | 所有MV ![输入图片说明](https://images.gitee.com/uploads/images/2020/0721/153047_d279ca8e_7602838.png "屏幕截图.png") |
|---|---|

|MV播放页面  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0721/153156_d3032761_7602838.png "屏幕截图.png") |MV播放页面  ![输入图片说明](https://images.gitee.com/uploads/images/2020/0721/153331_687ce1f3_7602838.png "屏幕截图.png") |
|---|---|

 **音乐不能播放问题** 

1.要播放的音乐需要vip

2.要播放的音乐url出错，可在控制台查看log日志

 **运行** 

# fds_music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
