<template>
  <!-- <scroll class="scroll" ref="scroll"> -->
  <div class="dance-music-newsongs">
    <div class="newsongs-title">
      <b-menu
        class="newsongs-menu"
        :menu="areas"
        item-height="30px"
        item-width="45px"
        :active-color="getActiveColor"
        @click="handleAreasClick"
      />
      <split />
      <song-list :music-list="musicList" newsongs />
    </div>
  </div>
  <!-- </scroll> -->
</template>
<script>
import { theme } from "mixin/global/theme";
import { _getTopSongs } from "network/discover";
import { _getSongsDetail, songDetail } from "network/detail";
// import Scroll from "common/scroll/Scroll";
import Split from "common/split/split";
import SongList from "common/song-list/song-list";
export default {
  name: "NewSongs",
  mixins: [theme],
  components: {
    Split,
    SongList,
  },
  data() {
    return {
      areas: [
        { value: 0, content: "全部" },
        { value: 7, content: "华语" },
        { value: 96, content: "欧美" },
        { value: 16, content: "韩国" },
        { value: 8, content: "日本" },
      ],
      currentArea: 0,
      page: 1,
      musicList: [],
    };
  },
  created() {
    this.getTopSongs();
  },
  computed: {},
  methods: {
    handleAreasClick(index) {
      this.currentArea = this.areas[index].value;
      this.getTopSongs();
    },
    // handleRefresh() {
    //   this.$refs.scroll.refresh();
    // },
    getTopSongs() {
      this.musicList = [];
      _getTopSongs(this.currentArea).then((res) => {
        let list = res.data.data;
        for (let i in list) {
          _getSongsDetail(list[i].id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
            // if (i == list.length - 1) {
            //   this.$nextTick(()=>{
            //       this.handleRefresh();
            //   })
            // }
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: calc(100vh - 58px - 60px);
}
.dance-music-newsongs {
  padding: 10px 50px 0px 50px;
}
::v-deep .vbestui-menu-item-container i {
  margin-right: 0px !important;
}
.newsongs {
  &-title {
    font-size: 14px;
  }
}
</style>