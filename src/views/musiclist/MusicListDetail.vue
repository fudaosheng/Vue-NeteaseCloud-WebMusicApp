<template>
  <div :class="detailClass">
    <scroll class="scroll" ref="scroll" :theme="getTheme">
      <base-info :base-info="baseInfo" />
      <b-menu :menu="list" :active-color="getActiveColor"></b-menu>
      <table-list class="music-list" :music-list="musiclist"></table-list>
    </scroll>
  </div>
</template>
<script>
import {
  _getMusicListDetail,
  baseInfo,
  _getSongsDetail,
  songDetail,
  _getRecommends,
  _getSub,
} from "network/detail";

import { theme } from "mixin/global/theme.js";
import Scroll from "common/scroll/Scroll";
import BaseInfo from "./childsComps/baseInfo";
import TableList from "common/table/TableList";
export default {
  name: "MusicListDetail",
  mixins: [theme],
  components: { Scroll, BaseInfo, TableList },
  computed: {
    detailClass() {
      return [
        `${this.program + "detail"}`,
        `${this.program + "detail-" + this.theme}`,
      ];
    },
  },
  data() {
    return {
      id: null,
      limit: 20,
      list: [],
      baseInfo: {},
      musiclist: [],
    };
  },
  created() {
    this.id = this.$route.params.id;

    _getMusicListDetail(this.id).then((res) => {
      //   this.musicListDetail = res.data;
      console.log(res.data);
      /**保存歌单基础信息 */
      this.baseInfo = new baseInfo(res.data.playlist);
      let str = "评论(" + res.data.playlist.commentCount + ")";
      this.list = ["歌曲列表", str, "收藏者"];

      /**遍历查询歌单所有歌曲详情 */
      for (let i of res.data.playlist.trackIds) {
        _getSongsDetail(i.id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.musiclist.push(song);
        });
      }
      console.log(this.musiclist);
    });
  },
};
</script>
<style lang="less" scoped>
.dance-music-detail {
  height: 100%;
}
.music-list {
  padding-top: 10px;
}
</style>