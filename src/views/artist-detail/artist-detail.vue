<template>
  <scroll class="scroll" ref="scroll" :disable-wheel="isWheel">
    <div :class="[`${program + 'artist-detail'}`]">
      <artist-baseinfo :artist="getArtist" />
      <b-menu
        :menu="list"
        :active-color="getActiveColor"
        @click="handleMenuClick"
      ></b-menu>
      <album-list :id="getArtistId"/>
    </div>
  </scroll>
</template>
<script>
import { theme } from "mixin/global/theme";
import Scroll from "common/scroll/Scroll";

import ArtistBaseinfo from "./childsComps/artist-baseinfo";
import AlbumList from "./childsPage/album-list"
export default {
  name: "ArtistDetail",
  mixins: [theme],
  components: { Scroll, ArtistBaseinfo ,AlbumList},
  data() {
    return {
      artist: null,
      list: ["专辑", "MV", "歌手详情", "相似歌手"],
      isWheel:false,//是否禁用wheel
    };
  },
  created() {
    this.artist = this.$route.params;
  },
  computed: {
    /**获取歌曲初始数据 */
    getArtist() {
      return this.artist;
    },
    /**获取歌手id */
    getArtistId() {
      if (this.artist.id) return this.artist.id;
    },
  },
  methods: {
    handleMenuClick() {},
  },
  watch: {
    $route() {
      if(this.$route.path.indexOf('artist-detail')>0){
        this.artist = this.$route.params;
      }
    },
  },
};
</script>
<style scoped>
.scroll {
  height: calc(100vh - 58px - 60px);
}
.dance-music-artist-detail {
  padding: 10px 100px 0px 100px;
}
</style>