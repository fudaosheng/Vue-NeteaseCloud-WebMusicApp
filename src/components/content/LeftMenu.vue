<template>
  <div class="leftmenu">
    <dl>
      <router-link :to="item.link" v-for="(item,index) in list" :key="index">
        <dd :class="{title:item.image=='',action:currentIndex==index}" @click="checkClick(index)">
          <div>
            <img :src="item.image" alt />
          </div>
          {{item.title}}
        </dd>
      </router-link>
        <my-song-list/>
    </dl>
  </div>
</template>
<script>
import MySongList from 'components/content/user/MySongList'
export default {
  name: "LeftMenu",
  components:{
    MySongList
  },
  data() {
    return {
      list: [
        { link: "", image: "", title: "推荐" },
        {
          link: "/discover",
          image: require("assets/img/leftmenu/music-line.svg"),
          title: "发现音乐"
        },
        {
          link: "/allmv",
          image: require("assets/img/leftmenu/mv.svg"),
          title: "全部MV"
        },
        {
          link: "",
          image: require("assets/img/leftmenu/zhibo.svg"),
          title: "直播"
        },
        {
          link: "",
          image: require("assets/img/leftmenu/shiping.svg"),
          title: "视频"
        },
        {
          link: "",
          image: require("assets/img/leftmenu/friend.svg"),
          title: "朋友"
        },
        { link: "", image: "", title: "我的音乐" },
        {
          link: "",
          image: require("assets/img/leftmenu/music.svg"),
          title: "本地音乐"
        },
        {
          link: "",
          image: require("assets/img/leftmenu/xiazai.svg"),
          title: "下载管理"
        },
        {
          link: "",
          image: require("assets/img/leftmenu/yunpan.svg"),
          title: "我的音乐云盘"
        },
        { link: "", image: "", title: "创建的歌单" },
      ],
      currentIndex: 1
    };
  },
  methods: {
    checkClick(index) {
        if(this.list[index].image=='')return;
        this.currentIndex = index;
    }
  }
};
</script>
<style scoped>
.leftmenu {
  background: #191b1f;
  width: 15%;
  height: calc(100% - 54px - 59px);
  float: left;
  border-right: 1px solid #23262c;
  color: #fff;
}
dl {
  width: 100%;
  height: 100%;
}
dl a {
  color: #fff;
  text-decoration: none;
}
.title {
  font-size: 13px;
  margin-top: 10px;
  opacity: 0.6;
  padding-left: 1px;
}
dd {
  height: 30px;
  line-height: 30px;
  padding: 5px 15px;
  font-size: 14px;
  opacity: 0.6;
  display: flex;
  align-items: center;
}
dd:hover {
  opacity: 1;
  background: #26282c;
}
dd div {
  margin-top: 10px;
  margin-right: 10px;
}
dd img {
  width: 20px;
  height: 20px;
}
.action {
  border-left: 2px solid #b82525;
  background: #26282c;
}
</style>