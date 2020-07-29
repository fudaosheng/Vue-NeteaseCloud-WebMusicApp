<template>
  <div class="search-list">
    <scroll class="search-scroll">
      <div class="title" v-if="this.key!=''&&this.musiclist.length!=0">
        搜索
        <span>"{{key}}"</span>,找到
        <span>{{this.musiclist.length}}</span>首单曲
      </div>
      <div class="bar">
        <div
          class="bar-item"
          v-for="(item,index) in list"
          :class="{action:currentIndex==index}"
          :key="index"
          @click="barClick(index)"
        >{{item}}</div>
      </div>
      <music-item :musiclist="musiclist" @musicItemClick="musicItemClick" v-show="isShow=='music'" />
      <artist-item :artistslist="artistslist" v-show="isShow=='artist'" />
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import MusicItem from "views/musicListDetail/childComps/MusicItem";
import ArtistItem from "./childComps/ArtistItem";

import { distinct } from "assets/common/tool";
import { indexMixin } from "views/musicListDetail/indexMixin";
import { _Search } from "network/search";
import { _getSongsDetail, songDetail } from "network/detail";
export default {
  name: "SearchList",
  data() {
    return {
      key: "",
      artistslist: [],
      mlist: [],
      musiclist: [],
      list: ["单曲", "歌手"],
      currentIndex: 0,
      isShow: "music"
    };
  },
  components: {
    Scroll,
    MusicItem,
    ArtistItem
  },
  mixins: [indexMixin],
  created() {
    this.key = this.$route.params.key;
    if (this.key != null && this.key != "") {
      _Search(this.key).then(res => {

        let list = res.data.result.songs;
        for (let i in list) {
          this.artistslist.push(list[i].artists[0]);
          this.mlist.push(list[i].id);
          if (i == list.length - 1) {
            /**查询 歌曲详情*/
            for (let i of this.mlist) {
              _getSongsDetail(i).then(res => {
                //   console.log(res);
                let song = new songDetail(res.data.songs);
                this.musiclist.push(song);
              });
            }
            this.artistslist = distinct(this.artistslist);

          }
        }
      });
    }
  },
  methods: {
    barClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.isShow = "music";
          break;
        case 1:
          this.isShow = "artist";
          break;
      }
    },
    musicItemClick(index) {
      this.PlayMusic(index);
    }
  }
};
</script>
<style scoped>
.search-list {
  width: 100%;
  height: 100%;
  padding: 10px 40px;
}
.search-scroll {
  height: 100%;
  overflow: hidden;
}
.title {
  font-size: 14px;
  padding: 20px 0px;
}
.title span {
  color: #2e6bb0;
  padding: 0px 10px;
}
.bar {
  width: 100%;
  height: 49px;
  line-height: 49px;
  display: flex;
  border-bottom: 1px solid #1c1e23;
  margin-bottom: 15px;
}
.bar-item {
  padding: 0px 20px;
}
.action {
  color: #b82525;
  border-bottom: 3px solid #b82525;
}
</style>