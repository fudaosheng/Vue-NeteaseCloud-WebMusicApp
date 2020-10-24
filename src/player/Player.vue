<template>
  <div :class="playerClass">
    <!-- 播放器歌曲封面 -->
    <player-cover :song="playList[currentIndex]" />
    <lyric
      :lyric="lyric"
      :disable-bar="true"
      :currentTime="currentTime"
      height="40px"
      ref="lyric"
      class="player-lyric-simple"
      v-show="isShowLyric"
    />
    <transition name="player-side">
      <player-list
        class="player-list"
        :music-list="musicList"
        v-show="isShowList"
      />
    </transition>
    <transition name="player-pure-side">
      <player-pure
        :song="playList[currentIndex]"
        :lyric="lyric"
        :current-time="currentTime"
        v-show="isPure"
      />
    </transition>
    <audio
      :src="getSongSrc"
      autoplay
      :loop="schemaIndex === 2 ? true : false"
      ref="audio"
      @timeupdate="audioTimeUpdate()"
      @pause="musicPause()"
      @ended="musicEnded()"
      @play="playLoad()"
      @playing="musicPlaying()"
      @error="musicErr()"
    ></audio>
    <div class="player-toggle" :class="[`${'player-toggle-' + theme}`]">
      <div class="player-pre player-toggle-item" @click="preMusic">
        <i class="player-icon iconfont icon--previous"></i>
      </div>
      <div class="player-player-type player-toggle-item" @click="toggle()">
        <i class="player-icon-type iconfont icon-bofang1" v-show="!isPlay"></i>
        <i class="player-icon-type iconfont icon-zanting" v-show="isPlay"></i>
      </div>
      <div class="player-next player-toggle-item" @click="nextMusic">
        <i class="player-icon iconfont icon-next"></i>
      </div>
    </div>
    <div class="player-progress">
      <div class="player-progress-current-time">{{ getCurrentTime }}</div>
      <div class="player-progress-main">
        <b-progress
          :percent.sync="percent"
          :stroke-width="4"
          :track-base-color="getProgressBaseColor"
          :track-color="iconActiveColor"
          show-thumb
          hover-show-thumb
          allow-click
          allow-drag
          is-active
          :disable-transition="currentTime == 0"
          @click="handleAudioProgress"
          @dragend="handleAudioDragEnd"
          @dragbegin="handleAudioBeginDrag"
        />
      </div>
      <div class="player-progress-time">{{ getDurationTime }}</div>
    </div>
    <div class="player-volumn">
      <span @click="toggleVolume">
        <i class="player-small-icon iconfont icon-V" v-show="!isVolume" />
        <i class="player-small-icon iconfont icon-jingyin" v-show="isVolume" />
      </span>
      <div class="player-volumn-progress">
        <b-progress
          :percent.sync="volumnPercent"
          :stroke-width="3"
          :track-base-color="getProgressBaseColor"
          :track-color="iconActiveColor"
          show-thumb
          hover-show-thumb
          allow-click
          allow-drag
          is-active
          @click="handleVolumn"
          @dragend="handleVolumn"
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
      <div class="player-tool-lyric" @click="toggleLyric">
        <a href="#" title="歌词"
          ><i
            class="player-small-icon iconfont icon-lyric"
            :class="[this.isShowLyric ? `${'player-icon-' + theme}` : '']"
        /></a>
      </div>
      <div class="player-tool-list" @click="toggleMusicList">
        <a href="#" title="歌单"
          ><i
            class="player-small-icon iconfont icon-gedan"
            :class="[this.isShowList ? `${'player-icon-' + theme}` : '']"
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

import PlayerCover from "./player-cover";
import Lyric from "./player-lyric";
import PlayerList from "./player-list";
import PlayerPure from "./player-pure";
export default {
  name: "Player",
  mixins: [theme],
  components: { PlayerCover, Lyric, PlayerList, PlayerPure },
  data() {
    return {
      prefixCls: prefixCls,
      isPlay: false, //true正在播放
      percent: 0, //音乐进度百分比
      volumnPercent: 100, //音量百分比
      currentTime: 0, //当前音乐播放时间
      duration: 0, //音乐总时间
      schemaIndex: 0, //音乐播放方式--0:顺序、1：随机、2：单曲
      playList: [] /**播放列表
      @params {
      this.index=index;
      this.name=song.name;
      this.artist=song.artist;
      this.src=url;
      this.pic=song.pic;
      this.id=id;
      }
      */,
      currentIndex: 0, //当前播放音乐
      musicList: [], //歌单
      isMusicDrag: false, //是否音乐进度条正在拖拽正在拖拽
      isVolume: false, //是否静音true静音
      preVolumnPercent: 0, //在设置音量切换时暂时保存之前音量百分比
      lyric: null, //歌词
      isShowLyric: false, //是否显示歌词,
      isShowList: false, //是否显示播放列表
      isPure: false, //是否是纯净模式
      id:null,//接收传来的播放列表唯一标识
    };
  },
  computed: {
    /**获取歌词播放地址 */
    getSongSrc() {
      return (
        (this.playList[this.currentIndex] &&
          this.playList[this.currentIndex].src) ||
        ""
      );
    },
    /**格式化audio currentTime => 'MM:dd' */
    getCurrentTime() {
      /* new Date()传入的是毫秒，而$refs.audio.currentTime返回的是秒*/
      return formatDate(new Date(this.currentTime * 1000), "mm:ss") || "00:00";
    },
    /**格式化duration => 'mm:dd' */
    getDurationTime() {
      return formatDate(new Date(this.duration * 1000), "mm:ss") || "00:00";
    },
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
    this.$bus.$on("playMusic", (playList, index, musicList,id) => {
      this.id=id;
      this.musicList = musicList;
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

      /**在请求歌曲的时候可能有的歌曲不可用，或丢失。导致在播放器中的歌曲列表和页面展示存在差异，可能会出现指定的播放歌曲不服
       * 用一次查找解决问题
       */
      this.setCurrentIndex(index);
    });

    /**监听子组件播放列表双击切换歌曲 */
    this.$bus.$on("PlayMusicListItem", index => {
      this.setCurrentIndex(index);
    });
  },
  methods: {
    /**音乐进度条正在拖拽
     * isMusicDrag设置为true,关闭audio的timeupdate设置进度
     */
    handleAudioBeginDrag() {
      this.isMusicDrag = true;
    },
    /**音乐进度条拖拽结束 */
    handleAudioDragEnd() {
      this.isMusicDrag = false;
      this.setMusicCurrent();
    },
    /**处理音乐进度条点击 */
    handleAudioProgress() {
      this.setMusicCurrent();
    },
    /**音量进度条点击、拖拽事件 */
    handleVolumn() {
      this.setVolume();
    },
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
        /**获取currentTime */
        this.currentTime = this.$refs.audio.currentTime;
        /**计算音乐播放进度百分比
         * 在拖拽时不设置
         */
        if (!this.isMusicDrag)
          this.percent = (this.currentTime / this.duration) * 100;
      }
    },
    /**监听音乐加载 */
    playLoad() {
      /**获取歌曲时长 */
      this.duration = this.$refs.audio.duration;
      _getLyric(this.playList[this.currentIndex].id).then((res) => {
        this.lyric = (res.data.lrc && res.data.lrc.lyric) || "暂无歌词";
      });
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
        this.playList[this.currentIndex].name,
        this.id
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
    /**监听音乐播放结束、并判断播放方式 */
    musicEnded() {
      console.log("end:" + this.schemaIndex);
      switch (this.schemaIndex) {
        case 0:
          this.currentIndex >= this.playList.length - 1
            ? 0
            : this.currentIndex++; //循环播放
          break;
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.playList.length); //随机播放
          break;
        case 2: //单曲循环
          this.currentIndex = this.currentIndex;
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
    setVolume() {
      if (this.$refs.audio) this.$refs.audio.volume = this.volumnPercent / 100;
    },
    /**设置音乐进度
     * @param 设置的百分比
     */
    setMusicCurrent() {
      this.$refs.audio.currentTime =
        (this.percent / 100) * this.$refs.audio.duration;
      this.percent =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
    },
    /**切换音量
     * 静音--恢复
     */
    toggleVolume() {
      this.isVolume = !this.isVolume;
      /**设置静音 */
      if (this.isVolume) {
        /**保存之前音量 */
        this.preVolumnPercent = this.volumnPercent;
        this.$refs.audio.volume = 0.0;
        this.volumnPercent = 0;
      } else {
        this.$refs.audio.volume = this.preVolumnPercent / 100;
        this.volumnPercent = this.preVolumnPercent;
      }
    },
    toggleLyric() {
      this.isShowLyric = !this.isShowLyric;
    },
    toggleMusicList() {
      this.isShowList = !this.isShowList;
    },
    PlayerRouter() {
      this.isPlayerShow = !this.isPlayerShow;
    },
  },
  watch: {
    $route() {
      /**路由切换关闭一些播放器选项 */
      this.isPure = false;
      this.isShowList = false;
    },
  },
};
</script>
<style lang="less" scoped>
.player {
  width: 100%;
  height: 60px;
  display: flex;
  position: relative;
  a {
    text-decoration: none;
    color: inherit;
  }
  &-icon-light {
    color: var(--light-icon-active-color);
  }
  &-icon-dark {
    color: var(--dark-icon-active-color);
  }
  &-icon-green {
    color: var(--green-icon-active-color);
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
    cursor: pointer;
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
  cursor: pointer;
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
/**toggle图标 */
.player-icon-type {
  font-size: 30px;
}
// 右侧小图标
.player-icon {
  font-size: 24px;
}

// 歌词
.player-lyric-simple {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 70px;
  margin: auto;
}
.player-list {
  position: absolute;
  right: 0px;
  bottom: 60px;
  z-index: 9;
}
.player-side-enter-active {
  animation: slideInRight var(--animation-base-time);
}
.player-side-leave-active {
  animation: slideInRight var(--animation-base-time) reverse;
}
.player-pure-side-enter-active {
  animation: slideInUp var(--animation-base-time);
}
.player-pure-side-leave-active {
  animation: slideInUp var(--animation-base-time) reverse;
}
</style>