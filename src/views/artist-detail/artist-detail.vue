<template>
  <!-- <scroll class="scroll" ref="scroll" :disable-wheel="getIsWheel"> -->
    <div :class="[`${program + 'artist-detail'}`]">
      <artist-baseinfo :artist="getArtist" :mv-count="getMvCount" />
      <b-menu
        :class="[`${program + 'artist-detail-menu'}`]"
        :menu="list"
        :active-color="getActiveColor"
        @click="handleMenuClick"
      ></b-menu>
      <album-list
        v-show="isShow === 'album'"
        :id="getArtistId"
        @enter="handleEnter"
        @leave="handleLeave"
      />
      <artist-mvs
        :show-artist="false"
        :line-num="6"
        :mv-list="mvList"
        v-show="isShow === 'MV'"
      />
      <artist-desc-detail
        :id="getArtistId"
        :name="artist.name"
        v-show="isShow === 'desc'"
      />
      <artist-simi
        :id="getArtistId"
        v-show="isShow === 'simi'"
      />
    </div>
  <!-- </scroll> -->
</template>
<script>
import { formatDate } from "utils/tool";
import { theme } from "mixin/global/theme";
import { _getArtistMv } from "network/artist";
import { MV } from "network/mv";

import ArtistBaseinfo from "./childsComps/artist-baseinfo";
import AlbumList from "./childsPage/album-list";
import ArtistMvs from "content/mv-list/mv-list";
import ArtistDescDetail from "./childsPage/artist-desc-detail";
import ArtistSimi from "./childsPage/artist-simi";
export default {
  name: "ArtistDetail",
  mixins: [theme],
  components: {
    ArtistBaseinfo,
    AlbumList,
    ArtistMvs,
    ArtistDescDetail,
    ArtistSimi,
  },
  data() {
    return {
      artist: null,
      list: ["专辑", "MV", "歌手详情", "相似歌手"],
      isWheel: false, //是否禁用wheel
      isShow: "album",
      mvList: [],
    };
  },
  created() {
    this.artist = this.$route.query.artist;
    this.initRequest();
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
    getIsWheel() {
      return this.isWheel;
    },
    getMvCount() {
      return this.mvList.length;
    },
  },
  methods: {
    handleMenuClick(index) {
      switch (index) {
        case 0:
          this.isShow = "album";
          break;
        case 1:
          this.isShow = "MV";
          break;
        case 2:
          this.isShow = "desc";
          break;
        case 3:
          this.isShow = "simi";
      }
    },
    // handleRefresh() {
    //   this.$refs.scroll.refresh();
    // },
    /**鼠标进入热门50首，禁用启用外层wheel */
    handleEnter() {
      this.isWheel = true;
    },
    handleLeave() {
      this.isWheel = false;
    },
    reset() {
      this.mvList = [];
      this.isShow = "album";
    },
    initRequest() {
      _getArtistMv(this.artist.id).then((res) => {
        let mvs = res.data.mvs;
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].imgurl,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount,
            formatDate(new Date(mvs[i].duration), "MM:dd")
          );
          this.mvList.push(mv);
        }
      });
    },
  },
  watch: {
    /**路由变化数据置空 */
    $route() {
      if (this.$route.path.indexOf("artist-detail") > 0) {
        this.artist = this.$route.query.artist;
        this.reset();
        this.initRequest();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: calc(100vh - 58px - 60px);
}
.dance-music-artist-detail {
  padding: 10px 30px 0px 30px;
  &-menu {
    padding: 0px 20px;
    margin: 0px 0px 10px 0px;
  }
}
</style>