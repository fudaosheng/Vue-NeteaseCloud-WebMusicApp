<template>
  <!-- <scroll class="scroll" ref="scroll" :theme="getTheme"> -->
    <div :class="detailClass">
      <base-info :base-info="baseInfo" @playMusic="playMusic" />
      <b-menu
        :menu="list"
        :active-color="getActiveColor"
        @click="handleMenuClick"
      ></b-menu>
      <div :class="program + 'detail-container'">
        <song-list
          ref="songList"
          :music-list="musicList"
          :length="length"
          v-show="isShow == 'music'"
        />
        <!-- 歌曲评论 -->
        <div class="detail-container-recommend" v-show="isShow == 'recommend'">
          <recommends
          ref="recommend"
            :recommends="recommends"
            :id="id"
          />
          <div class="recommend-bottom">
            <el-pagination
              background
              :current-page.sync="offset"
              :page-size.sync="limit"
              :page-count="50"
              @current-change="onPageChange"
            />
          </div>
        </div>
        <music-list-live
          :subs="subs"
          v-show="isShow == 'sub'"
        />
      </div>
    </div>
  <!-- </scroll> -->
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
import BaseInfo from "./childsComps/baseInfo";
import SongList from "common/song-list/song-list";
import Recommends from "./childsComps/Recommends";
import MusicListLive from "./childsComps/MusicListLive";
export default {
  name: "MusicListDetail",
  /**Vue中最好别全大写 */
  mixins: [theme, playMusic],
  components: {BaseInfo, SongList, Recommends, MusicListLive },
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
      limit: 30,
      offset: 1, //分页
      list: [],
      baseInfo: {},
      musicList: [],
      isShow: "music", //控制显示歌单、评论、收藏者
      recommends: null,
      recommendsCount:0,//歌单评论数
      subs: null,
      length: null, //获取歌曲列表长度，用于刷新scroll
    };
  },
  created() {
    this.getDetailRequestDate();
  },
  methods: {
    /**处理分页点击 */
    onPageChange() {
      this.getRecommends();
      // 点击评论下一页后自动滚到评论顶部
      this.$nextTick(()=>{
        let posY=this.$refs.recommend.$el.offsetTop;
        this.$refs.scroll.scrollTo(posY,0);
        this.handleRefresh();
      })
    },
    /**musiclist数据加载完刷新scroll */
    // handleRefresh() {
    //   this.$refs.scroll.refresh();
    // },
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
      /**获取歌单评论数 */
      this.recommendsCount=res.data.playlist.commentCount ;
      let str = "评论(" + this.recommendsCount + ")";
      this.list = ["歌曲列表", str, "收藏者"];

      /**遍历查询歌单所有歌曲详情 */
      const trackIds = res.data.playlist.trackIds;
      /**获取歌曲列表长度 */
      this.length = trackIds.length;
      for (let i = 0, length = trackIds.length; i < length; i++) {
        _getSongsDetail(trackIds[i].id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.musicList.push(song);
        });
      }
      /**获取歌单评论 */
      this.getRecommends();

      /**获取歌单收藏者 */
      _getSub(this.id, 30).then((res) => {
        this.subs = res.data.subscribers;
      });
    },
    /**获取歌单评论 */
    getRecommends() {
      _getRecommends(this.id, this.limit, this.offset).then((res) => {
        this.recommends = res.data.comments;
      });
    },
  },
  watch: {
    /**监听导航变化重新发送请求 */
    $route() {
      if (this.$route.path.indexOf("musiclistdetail") > 0) {
        this.getDetailRequestDate();
      }
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
.detail-container-recommend{
  .recommend-bottom{
    text-align: center;
  }
}
</style>