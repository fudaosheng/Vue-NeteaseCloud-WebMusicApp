<template>
  <div class="newSongs">
    <div class="top">最新音乐</div>
    <div class="content">
      <div class="item" v-for="(item,index) in songList" :key="index" @dblclick="playMusic(index)">
        <div class="number">{{index+1}}</div>
        <div class="title">
          <img :src="item.picUrl" alt @load="newSongImgLoad" />
          <div class="icon">
            <img src="~assets/img/playmusic/bofang.svg" alt />
          </div>
        </div>
        <div class="mess">
          <div>{{item.name}}</div>
          <br />
          <div class="bottom">{{item.song.album.company}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { imgLoadMixin } from "assets/common/mixin";
export default {
  name: "newSongs",
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mixins: [imgLoadMixin],
  methods: {
    newSongImgLoad() {
      /**类似于防抖函数功能*/
      if (this.imgCount == this.songList.length) this.$emit("newSongImgLoad");
      this.imgCount++;
    },
    playMusic(index) {
      this.$emit("playMusic", index);
    }
  }
};
</script>
<style scoped>
.newSongs {
  width: 100%;
}
.top {
  font-size: 20px;
  border-bottom: 1px solid #b8b6b6;
}
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  padding: 10px 10px;
  width: 45%;
  height: 70px;
  display: flex;
}
.number {
  height: 70px;
  width: 40px;
  text-align: center;
  line-height: 70px;
}
.title {
  position: relative;
  height: 100%;
}
.title img {
  height: 100%;
}
.icon {
  background: rgba(00, 0, 0, 0.3);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.icon img {
  width: 100%;
}
.mess {
  flex: 1;
  margin-left: 10px;
  font-size: 13px;
  position: relative;
}
.mess .bottom {
  position: absolute;
  bottom: 0px;
}
</style>