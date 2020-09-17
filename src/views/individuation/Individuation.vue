<template>
  <div :class="indiviClass">
    <b-scroll ref="scroll" class="scroll">
      <swiper :banner="banner" />
      <h4 :class="[`${program+'indivi-h4-'+theme}`]">推荐歌单</h4>
    </b-scroll>
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
import Swiper from "components/common/swiper/Swiper";
export default {
  name: "Individuation",
  mixins: [theme],
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
      limit: 12, //一次获取的歌单数量
      personalized: null, //保存获取到的推荐歌单
      privateContent: null, //独家放送
      songList: null, //每日新歌
      musiclist: [],
    };
  },
  components: {
    Swiper,
  },
  created() {
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 11;
    }
    /**轮播图数据 */
    _getBanner().then((res) => {
      this.banner = res.data.banners.slice(0, 6);
      console.log(this.banner);
    });
    /**推荐歌单*/
    _getPersonalized(this.limit).then((res) => {
      this.personalized = res.data.result;
    });

    /**独家放送*/
    _getPrivateContent().then((res) => {
      this.privateContent = res.data;
      console.log(this.privateContent);
    });

    _getNewSong().then((res) => {
      this.songList = res.data.result;
    });
  },
  methods: {
    // priImgLoad() {
    //   this.$refs.scroll.refresh();
    // },
    // newSongImgLoad() {
    //   this.$refs.scroll.refresh();
    // },
    // playMusic(index) {
    //   this.musiclist = [];
    //   for (let i in this.songList) {
    //     _getSongsDetail(this.songList[i].id).then(res => {
    //       let song = new songDetail(res.data.songs);
    //       this.musiclist.push(song);
    //       if (i == this.songList.length - 1) {
    //         this.PlayMusic(index);
    //       }
    //     });
    //   }
    // }
  },
};
</script>
<style lang="less" scoped>
.dance-music-indivi {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  .scroll {
    height: 100%;
    border: 1px solid red;
  }
  &-h4-dark {
    color: var(--dark-text-color);
  }
}
</style>