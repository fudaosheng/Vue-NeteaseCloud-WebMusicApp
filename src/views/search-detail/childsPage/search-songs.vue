<template>
  <div class="search-songs">
    <template v-if="songCount">
      <song-list :music-list="musicList" />
    </template>
    <template v-else>
      <empty />
    </template>
  </div>
</template>
<script>
import { _Search } from "network/search";
import { _getSongsDetail, songDetail } from "network/detail";
import { search } from "mixin/components/search";
import SongList from "common/song-list/song-list";

import empty from "common/empty/empty";
export default {
  name: "SearchSongs",
  mixins: [search],
  components: { SongList ,empty},
  data() {
    return {
      searchType: 1,
      songCount: 0,
      musicList: [],
    };
  },
  created() {
    this.Search();
  },
  methods: {
    /**获取搜索单曲 */
    Search() {
      if (this.keywords == "") return;
      this.musicList = [];
      _Search(this.keywords, this.searchType).then((res) => {
        let list = res.data.result.songs;
        for (let i in list) {
          _getSongsDetail(list[i].id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
            if (i == list.length - 1) {
              this.songCount = this.musicList.length;
              /**设置search-detail 搜索信息 */
              this.$emit("setData", this.songCount, "单曲");
              this.$nextTick(() => {
                this.$emit("refresh");
              });
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>