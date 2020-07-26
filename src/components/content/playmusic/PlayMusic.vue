<template>
  <div class="play-music" v-if="playList!==null">
    <player v-show="isPlayerShow" ref="player" :music="playList[currentIndex]" :lyric="lyric" />
    <div class="top">
      <div
        class="music-top-icon"
        v-if="playList[currentIndex]!=null"
        @mouseenter="isShade=true"
        @mouseleave="isShade=false"
        @click="PlayerRouter()"
      >
        <img :src="playList[currentIndex].pic" alt />
        <div class="music-max" v-show="isShade">
          <img src="~assets/img/playmusic/max.svg" alt />
        </div>
      </div>
      <div class="music-top-center" v-if="playList[currentIndex]!=null">
        <div class="music-title">{{playList[currentIndex].title}}</div>
        <div class="music-artist">{{playList[currentIndex].artist}}</div>
      </div>
    </div>
    <play-music-list class="paly-music-list" v-show="isMusicList" :music-list="musicList" />
    <lyric class="play-music-lyric" ref="lyric" :lyric="lyric" v-show="isLyric" />

    <div class="player-music-left">
      <div class="pre" @click="preMusic()">
        <img src="~assets/img/playmusic/pre.png" alt />
      </div>
      <div class="play" @click="toggle()">
        <img src="~assets/img/playmusic/play.png" alt v-show="!isPlay" />
        <img src="~assets/img/playmusic/play2.png" alt v-show="isPlay" />
      </div>
      <div class="netx" @click="nextMusic()">
        <img src="~assets/img/playmusic/next.png" alt />
      </div>
    </div>
    <div class="play-music-right" v-if="playList[currentIndex]!=null">
      <audio
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

      <div class="music-pro">
        <div class="currentTime">{{currentTime}}</div>
        <music-progress class="music-pro-progress" ref="music_pro" @childclick="setMusicCurrent" />
        <div class="totalTime">{{duration}}</div>
      </div>
      <div class="volumn">
        <div class="volumn-icon" @click="toggleVolume()">
          <img src="~assets/img/playmusic/volumn.svg" alt v-show="!isVolume" />
          <img src="~assets/img/playmusic/novolumn.svg" alt class="vol-img" v-show="isVolume" />
        </div>
        <volumn-progress ref="volume_pro" @childclick="setVolume" />
      </div>
      <div class="icon">
        <div class="schema" @click="toggleSchema()">
          <a href="#" title="顺序播放" v-show="schemaIndex==0">
            <img src="~assets/img/playmusic/sunxubofang.svg" />
          </a>
          <a href="#" title="随机播放" v-show="schemaIndex==1">
            <img src="~assets/img/playmusic/suijibofang.svg" />
          </a>
          <a href="#" title="单曲循环" v-show="schemaIndex==2">
            <img src="~assets/img/playmusic/danquxunhuan.svg" />
          </a>
        </div>
        <div class="music-lyric" @click="toggleLyric()">
          <a href="#" title="歌词">
            <img src="~assets/img/playmusic/lyric.svg" v-show="!isLyric" />
          </a>
          <a href="#" title="歌词">
            <img src="~assets/img/playmusic/lyric-click.svg" v-show="isLyric" />
          </a>
        </div>
        <div class="music-list" @click="toggleMusicList()">
          <a href="#" title="歌单">
            <img src="~assets/img/playmusic/list.svg" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Player from "./Player";
import MusicProgress from "components/common/progress/Progress";
import VolumnProgress from "components/common/progress/Progress";
import PlayMusicList from "./PlayMusicList";
import Lyric from "./Lyric";
import { formatDate } from "assets/common/tool";
import { _getLyric } from "network/detail";
export default {
  name: "PlayMusic",
  data() {
    return {
      isPlay: false, //true正在播放
      isVolume: false,
      isLyric: false,
      isMusicList: false,
      isShade: false,
      isPlayerShow: false,
      path: "",
      currentIndex: 0,
      schemaIndex: 0,
      currentTime: "00:00",
      duration: "00:00",
      lyric: "",
      playList: [
        {
          title: "爱存在（抖音版）（翻自 魏奇奇）",
          artist: "如懿",
          index: "0",
          lrc: "",
          src:
            "http://m8.music.126.net/20200708181541/dc873a2b4b00f9a2713fced8afe9cd72/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2839783247/945a/f45b/fa89/87264bf976128116dd2394e5f97c807a.mp3",
          pic:
            "https://p1.music.126.net/Y3MgpdL1iMno2g0yDnfMXQ==/109951165054657451.jpg"
        }
      ],
      musicList: []
    };
  },
  components: {
    Player,
    MusicProgress,
    VolumnProgress,
    PlayMusicList,
    Lyric
  },
  watch: {
    music() {
      if (this.$refs.audio != null) {
        this.$refs.audio.load();
      }
    }
  },
  mounted() {
    /**list是音乐列表，index是要播放的音乐在列表中的位置，path是当前播放音乐的路由路径,musicList是歌单信息*/
    this.$bus.$on("playMusic", (list, index, path, musicList) => {
      this.playList = [];
      this.path = path;
      this.playList = list;
      this.musicList = musicList;
      //   this.music = list.filter(item => {
      //     return item.src !== "";
      //   });
      /**对数组进行排序 */
      this.playList = this.playList.sort((a, b) => {
        return a.index - b.index;
      });
      /**在请求歌曲的时候可能有的歌曲不可用，或丢失。导致在播放器中的歌曲列表和页面展示存在差异，可能会出现指定的播放歌曲不服
       * 用一次查找解决问题
       */
      this.setCurrentIndex(index);
    });

    this.$bus.$on("PlayMusicListItem", index => {
      this.setCurrentIndex(index);
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
        //     /**new Date()传入的是毫秒，而$refs.audio.currentTime返回的是秒*/
        this.currentTime = formatDate(
          new Date(this.$refs.audio.currentTime * 1000),
          "mm:ss"
        );
        this.duration = formatDate(
          new Date(this.$refs.audio.duration * 1000),
          "mm:ss"
        );
        let scale = this.$refs.audio.currentTime / this.$refs.audio.duration;
        this.$refs.music_pro.setProgress(scale);

        /**歌词滚动 */
        if (this.$refs.audio.currentTime !== null) {
          this.$refs.lyric.scrollLyric(this.$refs.audio.currentTime);
          this.$refs.player.$refs.playerLyric.maxScroll(
            this.$refs.audio.currentTime
          );
        }
      }
    },
    /**监听音乐加载 */
    playLoad() {
      _getLyric(this.playList[this.currentIndex].id).then(res => {
        this.lyric = res.data.lrc.lyric;
      });
      // console.log(this.$refs.player.refs);
    },
    /**监听音乐已开始播放 */
    musicPlaying() {
      this.isPlay = true;
      /**currentIndex并不等于歌单里音乐，music数组里每个属性index才对应歌单里的顺序 */
      this.$bus.$emit(
        "Playing",
        this.playList[this.currentIndex].index,
        this.path
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
      this.$Message.error("当前音频不可用");
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

    setVolume(scale) {
      this.$refs.audio.volume = scale;
    },
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
    }
  }
};
</script>
<style scoped>
.play-music {
  width: 100%;
  height: 59px;
  background: #212124;
  position: relative;
  z-index: 3;
  bottom: 0;
}
.top {
  width: 15%;
  height: 100%;
  position: absolute;
  left: 0px;
  bottom: 59px;
  display: flex;
  background: #191b1f;
}
.paly-music-list {
  position: absolute;
  right: 0px;
  bottom: 59px;
}
.play-music-lyric {
  width: 460px;
  height: 30px;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 59px;
  z-index: 999;
  margin: auto;
}
.music-top-icon {
  height: 100%;
}
.music-top-icon img {
  height: 100%;
}
.music-max {
  position: relative;
  bottom: 64px;
  z-index: 4;
  width: 59px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.music-max img {
  opacity: 0.5;
}
.music-top-center {
  width: 100px;
  font-size: 13px;
  position: relative;
  left: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.music-title {
  position: absolute;
  top: 0px;
}
.music-artist {
  position: absolute;
  bottom: 0px;
}
.player-music-left {
  display: flex;
  float: left;
  width: 15%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}
.player-music-left div {
  cursor: pointer;
}
.player-music-left .play img {
  width: 55px;
  height: 55px;
}
.play-music-right {
  width: 85%;
  height: 100%;
  float: right;
}
.play-music-right .music-pro {
  width: 70%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  text-align: center;
}
.music-pro .currentTime,
.music-pro .totalTime {
  width: 60px;
}
.music-pro .music-pro-progress {
  flex: 1;
}
.play-music-right .volumn {
  width: 10%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
}
.volumn-icon img {
  width: 15px;
  margin-right: 10px;
}
.vol-img {
  width: 21px !important;
}
.play-music-right .icon {
  padding: 0px 20px;
  width: 20%;
  height: 100%;
  margin-top: 3px;
  float: left;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.icon .schema {
  width: 30px;
}
.icon .schema img {
  width: 20px;
  height: 20px;
}
.icon .schema img:nth-child(2) {
  width: 18px;
  height: 18px;
}
.music-lyric {
  width: 20px;
}
.music-lyric img {
  width: 100%;
}
.music-list {
  width: 20px;
}
.music-list img {
  width: 100%;
}
</style>