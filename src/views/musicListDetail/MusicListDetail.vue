<template>
  <div class="detail">
    <scroll class="detail-scroll">
      <detail-base-info :baseInfo="baseInfo" @allPlay="PlayMusic()" />
      <detail-bar :list="list" @detailBarClick="detailBarClick" />
      <music-item :musiclist="musiclist" v-show="isShow=='music'" @musicItemClick="PlayMusic"/>
      <recommends :recommends="recommends" :id="id" v-show="isShow=='recommend'" />
      <music-list-live v-show="isShow=='sub'" :subs="subs" />
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import DetailBaseInfo from "./childComps/DetailBanseInfo";
import DetailBar from "./childComps/DetailBar";
import MusicItem from "./childComps/MusicItem";
import Recommends from "./childComps/Recommends";
import MusicListLive from "./childComps/MusicListLive";

import {
  _getMusicListDetail,
  baseInfo,
  _getSongsDetail,
  songDetail,
  _getRecommends,
  _getSub,
} from "network/detail";
import {indexMixin} from "./indexMixin"
export default {
  name: "MusicListDetail",
  data() {
    return {
      id: null,
      musicListDetail: null, //歌单详情信息
      baseInfo: null,
      list: [],
      musiclist: [], //歌单歌曲
      isShow: "music",
      recommends: null,
      limit: 20,
      subs: null
    };
  },
  components: {
    Scroll,

    DetailBaseInfo,
    DetailBar,
    MusicItem,
    Recommends,
    MusicListLive
  },
  mixins:[indexMixin],
  created() {
    this.id = this.$route.params.id;

    _getMusicListDetail(this.id).then(res => {
      this.musicListDetail = res.data;
      /**保存歌单基础信息 */
      this.baseInfo = new baseInfo(this.musicListDetail.playlist);
      let str = "评论(" + this.musicListDetail.playlist.commentCount + ")";
      this.list = ["歌曲列表", str, "收藏者"];

      /**遍历查询歌单所有歌曲详情 */
      for (let i of this.musicListDetail.playlist.trackIds) {
        _getSongsDetail(i.id).then(res => {
          let song = new songDetail(res.data.songs);
          this.musiclist.push(song);
        });
      }

      /**获取歌单评论 */
      _getRecommends(this.id, this.limit).then(res => {
        this.recommends = res.data.comments;
      });

      /**获取歌单收藏者 */
      _getSub(this.id, 30).then(res => {
        this.subs = res.data.subscribers;
      });
    });
  },
  methods: {
    detailBarClick(str) {
      this.isShow = str;
    },
  }
};
</script>
<style scoped>
.detail {
  width: 100%;
  height: 100%;
  padding: 35px 35px 0px 35px;
  background: #16181c;
  color: #dcdde4;
  overflow: hidden;
}
.detail-scroll {
  height: 100%;
}
</style>