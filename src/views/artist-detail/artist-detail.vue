<template>
  <scroll class="scroll" ref="scroll">
    <div :class="[`${program + 'artist-detail'}`]">
      <artist-baseinfo :artist="getArtist" />
      <b-menu
        :menu="list"
        :active-color="getActiveColor"
        @click="handleMenuClick"
      ></b-menu>
    </div>
  </scroll>
</template>
<script>
import { theme } from "mixin/global/theme";
import { _getArtistAlbum } from "network/artist";
import Scroll from "common/scroll/Scroll";

import ArtistBaseinfo from "./childsComps/artist-baseinfo";
export default {
  name: "ArtistDetail",
  mixins: [theme],
  components: { Scroll, ArtistBaseinfo },
  data() {
    return {
      artist: null,
      list: ["专辑", "MV", "歌手详情", "相似歌手"],
      hotAlbums:[],
    };
  },
  created() {
    this.artist = this.$route.params;
    this.initRequest();
  },
  computed: {
    /**获取歌曲初始数据 */
    getArtist() {
      return (this.artist = this.$route.params);
    },
    getArtistId() {
      if (this.artist.id) return this.artist.id;
    },
  },
  methods: {
    handleMenuClick() {},
    /**artist-detail网络请求 */
    initRequest() {
      _getArtistAlbum(this.getArtistId).then((res) => {
        this.hotAlbums=res.data.hotAlbums;
      });
    },
  },
  watch: {
    $route() {
      this.artist = this.$route.params;
      this.initRequest();
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