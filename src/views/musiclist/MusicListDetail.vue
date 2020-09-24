<template>
  <div :class="detailClass">
    <scroll class="scroll" ref="scroll" :theme="getTheme">
      <base-info :base-info="baseInfo" />
      <b-menu
        :menu="list"
        :active-color="getActiveColor"
        @click="handleMenuClick"
      ></b-menu>
      <div :class="program + 'detail-container'">
        <table-list
          :music-list="musiclist"
          v-show="isShow == 'music'"
          @refresh="handleRefresh"
        />
        <recommends
          :recommends="recommends"
          :id="id"
          v-show="isShow == 'recommend'"
          @refresh="handleRefresh"
        />
        <music-list-live
          :subs="subs"
          v-show="isShow == 'sub'"
          @refresh="handleRefresh"
        />
      </div>
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
import Recommends from "./childsComps/Recommends";
import MusicListLive from "./childsComps/MusicListLive";
export default {
  name: "MusicListDetail",
  mixins: [theme],
  components: { Scroll, BaseInfo, TableList, Recommends, MusicListLive },
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
      isShow: "music", //控制显示歌单、评论、收藏者
      recommends: null,
      subs: null,
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
      /**获取歌单评论 */
      _getRecommends(this.id, this.limit).then((res) => {
        this.recommends = res.data.comments;
      });

      /**获取歌单收藏者 */
      _getSub(this.id, 30).then((res) => {
        this.subs = res.data.subscribers;
      });
    });
  },
  methods: {
    /**musiclist数据加载完刷新scroll */
    handleRefresh() {
      this.$refs.scroll.refresh();
    },
    /**根据导航切换 */
    handleMenuClick(index) {
      switch (index) {
        case 0:
          this.isShow = "music";
          break;
        case 1:
          this.isShow = "recommend";
          break;
        case 2:
          this.isShow = "sub";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-detail {
  height: 100%;
  &-container {
    padding-top: 10px;
    border-top: 1px solid var(--border);
  }
}
</style>