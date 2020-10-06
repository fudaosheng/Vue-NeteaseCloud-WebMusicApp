<template>
  <div class="album-list">
    <artist-hot50
      :id="id"
      @refresh="handleRefresh"
      @mouseenter.native="handleEnter"
      @mouseleave.native="handleLeave"
    />
    <album-detail
      v-for="(item, index) in hotAlbums"
      :key="index"
      :album="item"
    />
  </div>
</template>
<script>
import { _getArtistAlbum } from "network/artist";
import ArtistHot50 from "../childsComps/artist-hot50";
import AlbumDetail from "../childsComps/album-detail";
export default {
  name: "AlbumList",
  components: { ArtistHot50, AlbumDetail },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      hotAlbums: [],
    };
  },
  created() {
    this.initRequest();
  },
  methods: {
    /**鼠标进入热门50首 */
    handleEnter() {
      this.$parent.isWheel = true;
    },
    handleLeave() {
      this.$parent.isWheel = false;
    },
    handleRefresh() {
      this.$emit("refresh");
    },
    /**artist-detail网络请求 */
    initRequest() {
      _getArtistAlbum(this.id).then((res) => {
        /**热门专辑 */
        this.hotAlbums = res.data.hotAlbums;
        console.log(this.hotAlbums);
      });
    },
  },
  watch:{
    id(){
      this.initRequest();
    }
  }
};
</script>
<style lang="less" scoped>
.album-list {
  width: 100%;
  padding: 10px 0px;
}
</style>