<template>
  <div class="search-album">
    <template v-if="albumCount">
      <album-item
        v-for="(item, index) in albums"
        :key="index"
        :album="albums[index]"
      />
    </template>
    <template v-else>
      <empty />
    </template>
  </div>
</template>
<script>
import { _Search } from "network/search";
import { search } from "mixin/components/search";

import AlbumItem from "content/album-item/album-item";
import empty from "common/empty/empty";
export default {
  name: "SearchAlbum",
  mixins: [search],
  components: { AlbumItem, empty },
  data() {
    return {
      albumCount: 0,
      searchType: 10,
      albums: [], //存放专辑列表
    };
  },
  created() {
    this.Search();
  },
  methods: {
    Search() {
      _Search(this.keywords, this.searchType).then((res) => {
        this.albums = res.data.result.albums;
        this.albumCount = this.albums.length;
        this.$emit("setData", this.albumCount, "专辑");
      });
    },
  },
};
</script>
<style scoped>
</style>