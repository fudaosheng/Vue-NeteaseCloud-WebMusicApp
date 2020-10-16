<template>
  <div class="search-mv">
    <template v-if="mvCount">
      <mv-list :mv-list="mvs" @refresh="handleRefresh" />
    </template>
    <template v-else>
      <empty />
    </template>
  </div>
</template>
<script>
import { _Search } from "network/search";
import { search } from "mixin/components/search";
import MvList from "content/mv-list/mv-list";
import empty from "common/empty/empty";
export default {
  name: "SearchMv",
  mixins: [search],
  components: { MvList, empty },
  data() {
    return {
      searchType: 1004,
      mvCount: 0,
      mvs: [],
    };
  },
  created() {
    this.Search();
  },
  methods: {
    Search() {
      _Search(this.keywords, this.searchType).then((res) => {
        this.mvs = res.data.result.mvs;
        this.mvCount = this.mvs.length;
        this.$emit("setData", this.mvCount, "MV");
      });
    },
    handleRefresh() {
      this.$emit("refresh");
    },
  },
};
</script>
<style scoped>
</style>