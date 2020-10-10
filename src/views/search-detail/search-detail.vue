<template>
  <scroll class="scroll" ref="scroll">
    <div class="dance-music-search-detail">
      <div class="search-detail-title">
        <div class="search-detail-keyword">
        <span class="keyword">{{keyword}}</span>共找到<span class="count">{{count}}</span>个结果
        </div>
        <b-menu
          class="search-menu"
          :menu="menuList"
          item-height="30px"
          item-width="55px"
          :active-color="getActiveColor"
        />
      </div>
      <div class="search-detail-container">
        <song-list :music-list="musicList" @refresh="handleRefresh"/>
      </div>
    </div>
  </scroll>
</template>
<script>
import { theme } from "mixin/global/theme";
import { _SearchMultimatch, _Search } from "network/search";
import { _getSongsDetail, songDetail } from "network/detail";
import Scroll from "common/scroll/Scroll";
import SongList from "common/song-list/song-list";

import { menuList } from "./data";
export default {
  name: "SearchDetail",
  mixins: [theme],
  components: { Scroll, SongList },
  data() {
    return {
      keyword: "",
      count:0,
      menuList,
      musicList: [], //单曲
      album: [],
      artist: [],
      mv: [],
      video: [],
      orders: [], //返回结果有几项
    };
  },
  methods: {
    handleRefresh(){
      this.$refs.scroll.refresh();
    },
    Search() {
      if(this.keyword=='')return;
      this.musicList=[];
      _Search(this.keyword).then((res) => {
        console.log(res.data);
        let list = res.data.result.songs;
        for (let i in list) {
          _getSongsDetail(list[i].id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
            if(i==list.length-1){
              console.log(this.musicList);
            }
          });
        }
      });
      /**搜索多重匹配 */
      _SearchMultimatch(this.keyword).then((res) => {
        const { album, artist, mv, orders, video } = res.data.result;
        console.log(res.data);
        this.album = album;
        this.artist = artist;
        this.mv = mv;
        this.orders = orders;
        this.video = video;
        // console.log(this.album);
        // console.log(this.artist);
        // console.log(this.mv);
        // console.log(this.video);
      });
    },
  },
  watch: {
    $route: {
      handler() {
        this.keyword = this.$route.params.keyword;
        console.log(this.keyword);
        this.Search();
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: calc(100vh - 58px - 60px);
}
.dance-music-search-detail {
  padding: 10px 30px 0px 30px;
}
.search-menu {
  font-size: 15px;
  padding-bottom: 10px;
}
.search-menu ::v-deep .vbestui-menu-item-container i {
  margin-right: 0px !important;
}
.search-detail{
  &-keyword{
    padding:10px 0px;
    .keyword{
      font-size: 18px;
      color: var(--tag-color);
      margin-right: 5px;
    }
    .count{
      padding: 0px 3px;
            color: var(--tag-color);
    }
  }
}
</style>