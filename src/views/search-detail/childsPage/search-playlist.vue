<template>
  <div class="search-playlist">
      <music-list empty-desc :music-list="playlists"/>
  </div>
</template>
<script>
import { _Search } from "network/search";
import { search } from "mixin/components/search";

import MusicList from "content/musiclist/MusicList"
export default {
  name: "SearchPlaylist",
  mixins: [search],
  components:{MusicList},
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
    Search() {
      console.log("playlist");
      _Search(this.keywords, this.searchType).then((res) => {
        this.playlists=res.data.result.playlists;
        console.log(this.playlists);
        this.listCount=this.playlists.length;
        this.$emit('setData',this.listCount,"歌单");
      });
    },
  },
};
</script>
<style scoped>
</style>