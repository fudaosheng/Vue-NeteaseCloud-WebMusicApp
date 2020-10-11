<template>
  <div class="search-artist">
    <template v-if="artistCount">
        <artist-item v-for="(item,index) in artists" :key="index" :artist="artists[index]"/>
    </template>
    <div class="empty" v-else>
        数据为空~~
    </div>
  </div>
</template>
<script>
import { _Search } from "network/search";
import { search } from "mixin/components/search";

import ArtistItem from "content/artist-item/artist-item"
export default {
  name: "SearchArtist",
  components:{ArtistItem},
  mixins: [search],
  data() {
    return {
      searchType: 100, //搜索类型
      artists:[],//搜索结果
      artistCount:0,
    };
  },
  created() {
    this.Search();
  },
  methods: {
    Search() {
      console.log('artist');
      _Search(this.keywords, this.searchType).then((res) => {
        this.artists=res.data.result.artists;
        console.log(this.artists);
        this.artistCount=res.data.result.artistCount;
        this.$emit('setData',this.artistCount,"歌手")
      });
    },
  },
};
</script>
<style scoped>
</style>