<template>
  <scroll class="scroll" ref="scroll" :theme="getTheme">
    <div :class="detailClass">
      <base-info :base-info="baseInfo" @playMusic="playMusic" />
      <b-menu
        :menu="list"
        :active-color="getActiveColor"
        @click="handleMenuClick"
      ></b-menu>
      <div :class="program + 'detail-container'">
        <table-list
          :music-list="musicList"
          :length="length"
          v-show="isShow == 'music'"
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
    </div>
  </scroll>
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
import { playMusic } from "mixin/global/play-music";

import Scroll from "common/scroll/Scroll";
import BaseInfo from "./childsComps/baseInfo";
import TableList from "common/table/TableList";
import Recommends from "./childsComps/Recommends";
import MusicListLive from "./childsComps/MusicListLive";
export default {
  name: "MusicListDetail",
  /**Vue中最好别全大写 */
  mixins: [theme, playMusic],
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
      musicList: [],
      isShow: "music", //控制显示歌单、评论、收藏者
      recommends: null,
      subs: null,
      length:null,//获取歌曲列表长度，用于刷新scroll
    };
  },
  created() {
    this.getDetailRequestDate();
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
    init() {
      this.limit = 20;
      this.list = [];
      this.baseInfo = {};
      this.musicList = [];
      this.isShow = "music"; //控制显示歌单、评论、收藏者
      this.recommends = null;
      this.subs = null;
    },
    /**获取歌单详情网络数据 */
    async getDetailRequestDate() {
      this.id = this.$route.params.id;
      if (!this.id) return;

      this.init();
      const res = await _getMusicListDetail(this.id);
      /**保存歌单基础信息 */

      this.baseInfo = new baseInfo(res.data && res.data.playlist);
      let str = "评论(" + res.data.playlist.commentCount + ")";
      this.list = ["歌曲列表", str, "收藏者"];

      /**遍历查询歌单所有歌曲详情 */
      const trackIds = res.data.playlist.trackIds;
      /**获取歌曲列表长度 */
      this.length=trackIds.length;
      for (let i=0,length=trackIds.length;i<length;i++) {
        _getSongsDetail(trackIds[i].id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.musicList.push(song);
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
    },
  },
  watch: {
    /**监听导航变化重新发送请求 */
    $route() {
      this.getDetailRequestDate();
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-detail {
  height: 100%;
  padding: 10px 30px 0px 30px;
  &-container {
    padding-top: 10px;
    border-top: 1px solid var(--border);
  }
}
</style>