<template>
  <div :class="playerClass">
    <player-cover  :song="playList[currentIndex]"/>
    <audio
      v-if="playList[currentIndex].src"
      :src="playList[currentIndex].src"
      autoplay
      ref="audio"
      @timeupdate="audioTimeUpdate()"
      @pause="musicPause()"
      @ended="musicEnded()"
      @play="playLoad()"
      @playing="musicPlaying()"
      @error="musicErr()"
    ></audio>
    <div class="player-toggle" :class="[`${'player-toggle-' + theme}`]">
      <div class="player-pre player-toggle-item">
        <i class="player-icon iconfont icon--previous"></i>
      </div>
      <div class="player-player-type player-toggle-item" @click="toggle()">
        <i class="player-icon-type iconfont icon-bofang1" v-show="!isPlay"></i>
        <i class="player-icon-type iconfont icon-zanting" v-show="isPlay"></i>
      </div>
      <div class="player-next player-toggle-item">
        <i class="player-icon iconfont icon-next"></i>
      </div>
    </div>
    <div class="player-progress">
      <div class="player-progress-current-time">{{ currentTime }}</div>
      <div class="player-progress-main">
        <b-progress
          :percent.sync="percent"
          pro-width="4px"
          :base-color="getProgressBaseColor"
          :stroke-color="iconActiveColor"
          show-loadbar
          allow-click
          allow-drag
          is-active
        />
      </div>
      <div class="player-progress-time">{{ duration }}</div>
    </div>
    <div class="player-volumn">
      <i class="player-small-icon iconfont icon-V"></i>
      <div class="player-volumn-progress">
        <b-progress
          :percent.sync="volumnProgress"
          pro-width="3px"
          :base-color="getProgressBaseColor"
          :stroke-color="iconActiveColor"
          show-loadbar
          allow-click
          allow-drag
          is-active
        />
      </div>
    </div>
    <div class="player-tool">
      <div class="player-tool-schema" @click="toggleSchema()">
        <a href="#" title="顺序播放" v-show="schemaIndex == 0"
          ><i class="player-small-icon iconfont icon-shunxu"
        /></a>
        <a href="#" title="随机播放" v-show="schemaIndex == 1"
          ><i class="player-small-icon iconfont icon-suiji"
        /></a>
        <a href="#" title="单曲播放" v-show="schemaIndex == 2"
          ><i class="player-small-icon iconfont icon-danqu"
        /></a>
      </div>
      <div class="player-tool-lyric">
        <a href="#" title="歌词"
          ><i class="player-small-icon iconfont icon-lyric"
        /></a>
      </div>
      <div class="player-tool-list">
        <a href="#" title="歌单"
          ><i class="player-small-icon iconfont icon-gedan"
        /></a>
      </div>
    </div>
  </div>
</template>
<script>
const prefixCls = "player";
import { theme } from "mixin/global/theme";
import { _getLyric } from "network/detail";
import { formatDate } from "utils/tool";

import PlayerCover from "./player-cover"
export default {
  name: "Player",
  mixins: [theme],
  components:{PlayerCover},
  data() {
    return {
      prefixCls: prefixCls,
      isPlay: false, //true正在播放
      percent: 10, //音乐进度百分比
      volumnProgress: 20, //音量百分比
      currentTime: "00:00", //当前音乐播放时间
      duration: "00:00", //音乐总时间
      schemaIndex: 0, //音乐播放方式--0:顺序、1：随机、2：单曲
      playList: [
        {
          name: "爱存在（抖音版）（翻自 魏奇奇）",
          artist: "如懿",
          index: "0",
          lyric: "",
          src: "",
          pic: "",
        },
      ], //播放列表
      currentIndex: 0, //当前播放音乐
    };
  },
  computed: {
    /**播放器class样式 */
    playerClass() {
      return [`${this.prefixCls}`];
    },
    /**进度条背景颜色 */
    getProgressBaseColor() {
      let color = "";
      color = this.theme == "dark" ? "#171719" : "";
      return color;
    },
  },
  mounted() {
    /**list是音乐列表，index是要播放的音乐在列表中的位置，path是当前播放音乐的路由路径,musicList是歌单信息*/
    this.$bus.$on("playMusic", (playList, index, musicList) => {
      /**初始化播放列表 */
      this.playList = [];
      /**对playList进行处理 */
      let transferList = [];
      /**过滤掉没有音乐地址的歌曲 */
      transferList = playList.filter((item) => {
        return item.src;
      });
      /**对数组进行排序 */
      transferList = transferList.sort((a, b) => {
        return a.index - b.index;
      });
      this.playList = transferList;
    });
  },
  methods: {
    /**设置要播放的音乐 */
    setCurrentIndex(index) {
      for (let i in this.playList) {
        if (this.playList[i].index == index) {
          this.currentIndex = i;
          break; //break跳出循环------continue跳出本次循环
        }
      }
    },
    /**暂停或播放音乐 */
    toggle() {
      this.isPlay = !this.isPlay;
      if (this.isPlay && this.$refs.audio.readyState == 4)
        this.$refs.audio.play();
      else {
        this.$refs.audio.pause();
      }
    },
    /**返回当前的播放时间 */
    audioTimeUpdate() {
      if (this.$refs.audio != null) {
        /**获取currentTime和duration */
        let currentTime = this.$refs.audio.currentTime;
        let duration = this.$refs.audio.duration;

        /**格式化currentTime和duration
         * new Date()传入的是毫秒，而$refs.audio.currentTime返回的是秒*/
        this.currentTime = formatDate(new Date(currentTime * 1000), "mm:ss");
        this.duration = formatDate(
          new Date(this.$refs.audio.duration * 1000),
          "mm:ss"
        );
        /**计算音乐播放进度百分比 */
        this.percent = (currentTime / duration) * 100;

        /**歌词滚动 */
        // if (this.$refs.audio.currentTime !== null) {
        //   this.$refs.lyric.scrollLyric(this.$refs.audio.currentTime);
        //   this.$refs.player.$refs.playerLyric.maxScroll(
        //     this.$refs.audio.currentTime
        //   );
        // }
      }
    },
    /**监听音乐加载 */
    playLoad() {
      _getLyric(this.playList[this.currentIndex].id).then((res) => {
        this.lyric = res.data.lrc.lyric;
      });
      // console.log(this.$refs.player.refs);
    },
    /**监听音乐已开始播放 */
    musicPlaying() {
      this.isPlay = true;
      /**currentIndex并不等于歌单里音乐，music数组里每个属性index才对应歌单里的顺序 */

      /**音乐播放时发射playing事件
       * @param1 对应歌单正在播放音乐的歌曲下标
       * @param2 正在播放歌曲的音乐名字
       */
      this.$bus.$emit(
        "Playing",
        this.playList[this.currentIndex].index,
        this.playList[this.currentIndex].name
      );
      if (this.$refs.player != null) this.$refs.player.isPlay = true;
    },
    /**对播放暂停进行监视 */
    musicPause() {
      this.isPlay = false;
      if (this.$refs.player != null) this.$refs.player.isPlay = false;
    },
    /**音乐出现错误 */
    musicErr() {
      console.log("err");
      this.$Toast.error("当前音频不可用");
      this.currentIndex++;
    },
    /**对音乐播放结束进行监视 */
    /**播放方式 */
    toggleSchema() {
      if (this.schemaIndex >= 2) this.schemaIndex = 0;
      else this.schemaIndex++;
    },
    musicEnded() {
      switch (this.schemaIndex) {
        case 0:
          this.currentIndex >= this.playList.length - 1
            ? 0
            : this.currentIndex++; //循环播放
          break;
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.playList.length); //随机播放
          break;
        case 3: //单曲循环
          break;
      }
    },
    /**加载下一首音乐 */
    nextMusic() {
      if (this.currentIndex >= this.playList.length - 1) this.currentIndex = 0;
      else this.currentIndex++;
      this.$refs.audio.src = this.playList[this.currentIndex].src;
    },
    preMusic() {
      if (this.currentIndex <= 0) this.currentIndex = this.playList.length - 1;
      else this.currentIndex--;
      this.$refs.audio.src = this.playList[this.currentIndex].src;
    },

    /**设置浏览器音量 */
    setVolume(scale) {
      this.$refs.audio.volume = scale;
    },
    /**设置音乐进度
     * @param 设置的百分比
     */
    setMusicCurrent(scale) {
      this.$refs.audio.currentTime = scale * this.$refs.audio.duration;
    },
    toggleVolume() {
      this.isVolume = !this.isVolume;
      if (this.isVolume) {
        this.$refs.audio.volume = 0.0;
      } else {
        this.$refs.audio.volume = 0.8;
        this.$refs.volume_pro && this.$refs.volume_pro.setProgress(0.8);
      }
    },
    toggleLyric() {
      this.isLyric = !this.isLyric;
    },
    toggleMusicList() {
      this.isMusicList = !this.isMusicList;
    },
    PlayerRouter() {
      this.isPlayerShow = !this.isPlayerShow;
    },
  },
};
</script>
<style lang="less" scoped>
.player {
  width: 100%;
  height: 60px;
  display: flex;
  a {
    text-decoration: none;
    color: inherit;
  }
}
.player-toggle {
  width: 18%;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-item {
    padding: 0px 20px;
    text-align: center;
  }
  &-light {
    color: var(--light-main-color);
  }
  &-dark {
    color: var(--dark-main-color);
  }
  &-green {
    color: var(--green-main-color);
  }
}
.player-progress {
  flex: 1;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  &-current-time {
    width: 50px;
    text-align: left;
  }
  &-time {
    width: 50px;
    text-align: right;
  }
  &-main {
    flex: 1;
  }
}
.player-volumn {
  width: 150px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  &-progress {
    flex: 1;
    padding: 0px 0px 0px 15px;
  }
}
.player-tool {
  width: 200px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  text-align: center;
  &-schema {
    width: calc(33%);
  }
  &-lyric {
    width: calc(33%);
  }
  &-list {
    width: calc(33%);
  }
}
/**player iconfont */
.player-icon {
  font-size: 26px;
}
.player-icon-type {
  font-size: 30px;
}
// 右侧小图标
.player-icon {
  font-size: 24px;
}
</style>