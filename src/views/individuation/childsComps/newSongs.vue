<template>
  <div class="newSongs" :class="[`${program + 'newsongs-' + theme}`]">
    <h4 class="top">最新音乐</h4>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in musicList"
        :key="index"
        @dblclick="playMusic(index)"
      >
        <div class="number">
          <span v-show="!(playId=='no-id'&&index == playIndex && item.name == playName)">{{
            index + 1
          }}</span>
          <i
            class="iconfont icon-V"
            v-show="playId=='no-id'&&index == playIndex && item.name == playName"
            :class="`${'icon-' + theme}`"
          ></i>
        </div>
        <div class="title">
          <img v-lazy="item.picUrl" alt @load="newSongImgLoad" />
          <div class="icon">
            <i class="iconfont icon-bofang"></i>
          </div>
        </div>
        <div class="mess">
          <div>{{ item.name }}</div>
          <br />
          <div class="bottom">{{ item.song.album.company }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { imgLoadMixin } from "mixin/global/imgLoad.js";
import { theme } from "mixin/global/theme.js";
import { playMusic } from "mixin/global/play-music";
import { playing } from "player/playing";
export default {
  name: "newSongs",
  props: {
    musicList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [imgLoadMixin, theme, playMusic, playing],
  computed:{
    isPlay(){
      /**判断是否处于播放状态 */
      return this.playId=='no-id'&&index == playIndex && item.name == playName;
    }
  },
  methods: {
    newSongImgLoad() {
      /**类似于防抖函数功能*/
      if (this.imgCount == this.musicList.length) this.$emit("newSongImgLoad");
      this.imgCount++;
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-newsongs {
  &-dark {
    color: var(--dark-article-color);
  }
}
.newSongs {
  width: 100%;
}
.top {
  border-bottom: 1px solid #b8b6b6;
}
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  padding: 10px 0px;
  width: 50%;
  height: 70px;
  display: flex;
  cursor: pointer;
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
  // background: rgba(00, 0, 0, 0.3);
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
.icon-bofang {
  color: var(--dark-article-color);
}
</style>