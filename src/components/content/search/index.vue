<template>
  <b-poptip
    ref="searchPoptip"
    trigger="focus"
    :theme="getTheme"
    placement="bottom-start"
    max-length="400px"
  >
    <b-input
      v-model="keywords"
      search
      @search="goSearchDetailPage"
      @keyupEnter="goSearchDetailPage"
    />
    <template v-slot:content>
      <hot-search-list v-show="!isSearch" @hidden="closePopover" />
      <search-suggest
        :keywords="keywords"
        v-show="isSearch"
        @hidden="closePopover"
      />
    </template>
  </b-poptip>
</template>

<script>
import { theme } from "mixin/global/theme.js";
import HotSearchList from "./hot-search-list";
import SearchSuggest from "./search-suggest";
export default {
  mixins: [theme],
  components: { HotSearchList, SearchSuggest },
  data() {
    return {
      keywords: "",
      isSearch: false, //是否在搜索
    };
  },
  methods: {
    goSearchDetailPage() {
      this.$router.push(`/search-detail/${this.keywords}`);
      this.$refs.searchPoptip.hidden();
    },
    closePopover() {
      this.$refs.searchPoptip.hidden();
    },
  },
  watch: {
    /**监听搜索关键词 ，控制热搜列表显示隐藏*/
    keywords() {
      if (this.keywords != "" && !this.isSearch) {
        this.isSearch = true;
      }
      /**搜索关键词为空，并且isSearch为true时设置isSearch为false显示热搜列表 */
      if (this.keywords == "" && this.isSearch) {
        this.isSearch = false;
      }
    },
  },
};
</script>

<style>
</style>