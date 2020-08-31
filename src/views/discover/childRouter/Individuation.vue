<template>
  <div class="individuation">
    <scroll ref="scroll" class="indici-scroll">
      <swiper :banner="banner" />
      <p>推荐歌单</p>
      <music-list :personList="personalized" @imgLoad="imgLoad" />
      <private-content :pri="privateContent" @priImgLoad="priImgLoad" />
      <new-songs :songList="songList" @newSongImgLoad="newSongImgLoad" @playMusic="playMusic" />
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import MusicList from "components/content/musiclist/MusicList";
import Swiper from "components/common/swiper/Swiper";
import PrivateContent from "views/discover/childComps/PrivateContent";
import newSongs from "views/discover/childComps/newSongs";

import {
  _getNewSong,
  _getPersonalized,
  _getPrivateContent,
  _getBanner,
  _getRecommendResource
} from "network/discover";
import { _getSongsDetail, songDetail } from "network/detail";
import { debounce } from "assets/common/tool";
import { imgLoad } from "./indexMixin";
import { indexMixin } from "views/musicListDetail/indexMixin";
export default {
  name: "Individuation",
  data() {
    return {
      banner: null,
      limit: 12,
      personalized: null,
      privateContent: null,
      songList: null,
      musiclist: []
    };
  },
  components: {
    Scroll,
    Swiper,
    MusicList,
    PrivateContent,
    newSongs
  },
  mixins: [imgLoad, indexMixin],
  created() {
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 11;
    }
    _getBanner().then(res => {
      this.banner = res.data.banners.slice(0, 6);
    });
    _getPersonalized(this.limit).then(res => {
      this.personalized = res.data.result;
    });

    _getPrivateContent().then(res => {
      this.privateContent = res.data;
      console.log(this.privateContent);
    });

    _getNewSong().then(res => {
      this.songList = res.data.result;
    });
  },
  methods: {
    priImgLoad() {
      this.$refs.scroll.refresh();
    },
    newSongImgLoad() {
      this.$refs.scroll.refresh();
    },
    playMusic(index) {
      this.musiclist = [];
      for (let i in this.songList) {
        _getSongsDetail(this.songList[i].id).then(res => {
          let song = new songDetail(res.data.songs);
          this.musiclist.push(song);
          if (i == this.songList.length - 1) {
            this.PlayMusic(index);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.individuation {
  width: 100%;
  height: 100%;
}
.indici-scroll {
  width: 100%;
  height: 100%;
}
</style>