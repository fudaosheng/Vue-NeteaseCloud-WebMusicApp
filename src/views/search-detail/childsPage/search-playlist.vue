<template>
  <div class="search-playlist">
    <template v-if="listCount">
      <music-list empty-desc :music-list="playlists" @refresh="handleRefresh" />
    </template>
    <template v-else>
      <empty />
    </template>
  </div>
</template>
<script>
import { _Search } from "network/search";
import { search } from "mixin/components/search";

import MusicList from "content/musiclist/MusicList";
import empty from "common/empty/empty";
export default {
  name: "SearchPlaylist",
  mixins: [search],
  components: { MusicList ,empty},
  data() {
    return {
      searchType: 1000, //搜索类型
      listCount: 0,
      playlists: [], //搜索结果
    };
  },
  created() {
    this.Search();
  },
  methods: {
    handleRefresh() {
      this.$emit("refresh");
    },
    Search() {
      _Search(this.keywords, this.searchType).then((res) => {
        this.playlists = res.data.result.playlists;
        this.listCount = this.playlists.length;
        this.$emit("setData", this.listCount, "歌单");
      });
    },
  },
};
</script>
<style scoped>
</style>