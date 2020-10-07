<template>
  <scroll ref="scroll" class="scroll">
    <div class="artist-hot50" @mouseenter="handleRefresh">
      <div class="artist-hot50-left">
        <img v-lazy="getPic" alt="" />
      </div>
      <div class="artist-hot50-right">
        <p>热门50首</p>
        <song-list :music-list="musicList" :lines="lines" :show-head="false" />
      </div>
    </div>
  </scroll>
</template>
<script>
import { _getArtistHot50 } from "network/artist";
import { _getSongsDetail, songDetail } from "network/detail";
import {forcible} from "mixin/components/forcible-refresh" 

import SongList from "common/song-list/song-list";
import Scroll from "common/scroll/Scroll";
export default {
  name: "ArtistHot50",
  mixins:[forcible],
  components: { SongList, Scroll},
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      musicList: [],
      lines: [true, true, true, false, false, true],
    };
  },
  created() {
    this.initRequest();
  },
  computed: {
    getPic() {
      if (this.musicList.length) return this.musicList[0].pic;
    },
  },
  methods: {
    initRequest() {
      _getArtistHot50(this.id).then((res) => {
        let songs = res.data.songs;
        for (let i in songs) {
          _getSongsDetail(songs[i].id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
            if (i == songs.length - 1) {
              this.$emit("refresh");
              this.$nextTick(() => {
                this.$refs.scroll.refresh();
              });
            }
          });
        }
      });
    },
    reset(){
      this.musicList=[];
    }
  },
  watch: {
    id() {
      this.reset();
      this.initRequest();
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: 350px;
  margin: 10px 0px;
}
.artist-hot50 {
  display: flex;
  align-items: flex-start;
  &-left {
    width: 150px;
    padding-right: 10px;
    img {
      width: 100%;
    }
  }
  &-right {
    p {
      font-size: 14px;
      padding-bottom: 8px;
    }
    flex: 1;
    padding: 0px 10px;
  }
}
</style>