<template>
  <div class="play-music" v-if="music!==null">
    <div class="top">
      <div class="music-top-icon" v-if="music[currentIndex]!=null">
        <img :src="music[currentIndex].pic" alt />
      </div>
      <div class="music-top-center" v-if="music[currentIndex]!=null">
        <div class="music-title">{{music[currentIndex].title}}</div>
        <div class="music-artist">{{music[currentIndex].artist}}</div>
      </div>
    </div>
    <div class="paly-music-left">
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
    <div class="play-music-right" v-if="music[currentIndex]!=null">
      <audio
        :src="music[currentIndex].src"
        autoplay
        ref="audio"
        @timeupdate="audioTimeUpdate()"
        @pause="musicPause()"
        @ended="musicEnded()"
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
      <div class="icon" @click="toggleSchema()">
        <div class="schema">
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
      </div>
    </div>
  </div>
</template>
<script>
import MusicProgress from "components/common/progress/Progress";
import VolumnProgress from "components/common/progress/Progress";
import { formatDate } from "assets/common/tool";
export default {
  name: "PlayMusic",
  data() {
    return {
      isPlay: false, //true正在播放
      isVolume: false,
      currentTime: "00:00",
      duration: "00:00",
      musicProWidth: 0,
      currentIndex: 0,
      path: "",
      schemaIndex: 0,
      music: [
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
      ]
    };
  },
  components: {
    MusicProgress,
    VolumnProgress
  },
  watch: {
    music() {
      if (this.$refs.audio != null) {
        this.$refs.audio.load();
      }
      // if (this.$refs.volume_pro !== null&&this.$refs.audio!=null) {
      //   this.$refs.audio.volume = 0.8;
      //   this.$refs.volume_pro.setProgress(0.8);
      // }
    }
  },
  mounted() {
    /**list是音乐列表，index是要播放的音乐在列表中的位置，path是当前播放音乐的路由路径 */
    this.$bus.$on("playMusic", (list, index, path) => {
      console.log("playindex," + list.length + "," + index + "," + path);
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
    if (this.$refs.audio.volume !== null && this.$refs.volume_pro !== null) {
      this.$refs.audio.volume = 0.8;
      this.$refs.volume_pro.setProgress(0.8);
    }
  },
  methods: {
    /**暂停或播放音乐 */
    toggle() {
      this.isPlay = !this.isPlay;
      if (this.isPlay && this.$refs.audio.readyState == 4)
        this.$refs.audio.play();
      else {
        this.$refs.audio.pause();
      }
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
      }
    },
    /**监听音乐已开始播放 */
    musicPlaying() {
      this.isPlay = true;
      /**currentIndex并不等于歌单里音乐，music数组里每个属性index才对应歌单里的顺序 */
      this.$bus.$emit(
        "Playing",
        this.music[this.currentIndex].index,
        this.path
      );
    },
    /**对播放暂停进行监视 */
    musicPause() {
      this.isPlay = false;
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
          this.currentIndex >= this.music.length - 1 ? 0 : this.currentIndex++; //循环播放
          break;
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.music.length); //随机播放
          break;
        case 3: //单曲循环
          break;
      }
    },
    setVolume(scale) {
      this.$refs.audio.volume = scale;
    },
    setMusicCurrent(scale) {
      this.$refs.audio.currentTime = scale * this.$refs.audio.duration;
    },
    /**加载下一首音乐 */
    nextMusic() {
      if (this.currentIndex >= this.music.length - 1) this.currentIndex = 0;
      else this.currentIndex++;
      this.$refs.audio.src = this.music[this.currentIndex].src;
    },
    preMusic() {
      if (this.currentIndex <= 0) this.currentIndex = this.music.length - 1;
      else this.currentIndex--;
      this.$refs.audio.src = this.music[this.currentIndex].src;
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
.music-top-icon {
  height: 100%;
}
.music-top-icon img {
  height: 100%;
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
.paly-music-left {
  display: flex;
  float: left;
  width: 15%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}
.paly-music-left div {
  cursor: pointer;
}
.paly-music-left .play img {
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
  float: left;
  line-height: 59px;
  display: flex;
}
.icon .schema {
  width: 30px;
  margin-top: 5px;
}
.icon .schema img {
  width: 16px;
  height: 16px;
}
.icon .schema img:nth-child(2) {
  width: 18px;
  height: 18px;
}
</style>