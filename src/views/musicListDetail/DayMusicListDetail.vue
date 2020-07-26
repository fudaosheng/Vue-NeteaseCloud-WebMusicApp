<template>
  <div class="daydetail">
    <scroll class="day-scroll">
      <day-base-info @allPlay="PlayMusic()" />
      <music-item :musiclist="musiclist" @musicItemClick="PlayMusic"/>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import DayBaseInfo from "./childComps/DayBaseInfo";
import MusicItem from "./childComps/MusicItem";
import { _getRecommendResource } from "network/discover";
import {
  _getSongsDetail,
  songDetail,
} from "network/detail";
import {indexMixin} from "./indexMixin"
export default {
  name: "DayMusicListDetail",
  data() {
    return {
      musiclist: []
    };
  },
  components: {
    Scroll,
    DayBaseInfo,
    MusicItem
  },
  mixins:[loadingMixin,indexMixin],
  created() {
    let cookie = this.$store.state.cookie;
    if (cookie != "" && cookie != null) {
      _getRecommendResource(cookie, this.$store.state.uid).then(res => {
        for (let i of res.data.data.dailySongs) {
          _getSongsDetail(i.id).then(res => {
            let song = new songDetail(res.data.songs);
            this.musiclist.push(song);
          });
        }

      });
    }
  },
};
</script>
<style scoped>
.daydetail {
  width: 100%;
  height: 100%;
  padding: 35px 35px 0px 35px;
  background: #16181c;
  color: #dcdde4;
  overflow: hidden;
}
.day-scroll {
  height: 100%;
}
</style>