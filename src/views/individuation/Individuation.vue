<template>
  <div :class="indiviClass">
    <div class="dance-music-group">
      <swiper :banner="banner" class="swiper" />
      <h4
        :class="[
          `${program + 'indivi-h4'}`,
          `${program + 'indivi-h4-' + theme}`,
        ]"
      >
        推荐歌单
      </h4>
      <music-list :music-list="personalized" @refresh="handleRefresh" />
      <private-content :pri="privateContent" />
      <new-songs :music-list="songList" @newSongImgLoad="handleRefresh" />
    </div>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
import {
  _getNewSong,
  _getPersonalized,
  _getPrivateContent,
  _getBanner,
  _getRecommendResource,
} from "network/discover";

import Swiper from "common/swiper/Swiper";
import MusicList from "content/musiclist/MusicList";
import PrivateContent from "./childsComps/PrivateContent";
import NewSongs from "./childsComps/newSongs";
export default {
  name: "Individuation",
  mixins: [theme],
  components: { Swiper, PrivateContent, NewSongs, MusicList },
  computed: {
    indiviClass() {
      return [
        `${this.program + "indivi"}`,
        `${this.program + "-indivi-" + this.theme}`,
      ];
    },
  },
  data() {
    return {
      banner: null, //轮播图数据
      limit: 10, //一次获取的歌单数量
      personalized: null, //保存获取到的推荐歌单
      privateContent: null, //独家放送
      songList: null, //每日新歌
      musiclist: [],
    };
  },
  created() {
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 11;
    }
    /**轮播图数据 */
    _getBanner().then((res) => {
      this.banner = res.data.banners.slice(0, 6);
    });
    /**推荐歌单*/
    _getPersonalized(this.limit).then((res) => {
      this.personalized = res.data.result;
    });

    /**独家放送*/
    _getPrivateContent().then((res) => {
      this.privateContent = res.data;
    });

    _getNewSong().then((res) => {
      this.songList = res.data.result;
    });
  },
  methods: {
    handleRefresh() {
      // this.$refs.scroll.refresh();
    },
    playMusic(index) {
      this.musiclist = [];
      for (let i in this.songList) {
        _getSongsDetail(this.songList[i].id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.musiclist.push(song);
          if (i == this.songList.length - 1) {
            this.PlayMusic(index);
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-indivi {
  width: 100%;
  height: 100%;
  .swiper {
    width: calc(100% - 20px);
    margin-left: 10px;
  }
  &-h4-dark {
    color: var(--dark-text-color);
  }
}
</style>