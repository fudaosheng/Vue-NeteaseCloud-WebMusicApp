<template>
  <!-- <scroll class="scroll" ref="scroll"> -->
  <div class="dance-music-search-detail">
    <div class="search-detail-title">
      <div class="search-detail-keywords">
        <span class="keywords">{{ keywords }}</span>
        共找到
        <span class="count">{{ count }}</span
        >个
        <span class="count">{{ searchType }}</span>
      </div>
      <b-menu
        class="search-menu"
        :menu="menuList"
        item-height="30px"
        item-width="55px"
        :active-color="getActiveColor"
        @click="handleChildrenRouter"
      />
    </div>
    <div class="search-detail-container">
      <keep-alive>
        <router-view @setData="handlesetData" />
      </keep-alive>
    </div>
  </div>
  <!-- </scroll> -->
</template>
<script>
import { theme } from "mixin/global/theme";
import Scroll from "common/scroll/Scroll";

import { menuList } from "./data";
export default {
  name: "SearchDetail",
  mixins: [theme],
  components: { Scroll },
  /**provide对组件内data不能响应，要传入this */
  provide() {
    return {
      search: this,
    };
  },
  data() {
    return {
      keywords: "",
      count: 0,
      searchType: "单曲", //搜索类型
      menuList,
    };
  },
  methods: {
    /**子路由 */
    handleChildrenRouter(index) {},
    forword(path, keywords = this.keywords) {
      this.$router.push({
        path,
        query: {
          keywords,
        },
      });
    },
    /**子路由反馈处理
     * @param count        搜索项个数
     * @param type         搜索结果类型--->如search-songs反馈单曲
     */
    handlesetData(count, type) {
      this.count = count;
      this.searchType = type;
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.path.indexOf("/search-detail") >= 0) {
          this.keywords = this.$route.params.keywords;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: calc(100vh - 58px - 60px);
}
.dance-music-search-detail {
  padding: 10px 30px 0px 30px;
}
.search-menu {
  font-size: 15px;
  padding-bottom: 10px;
}
.search-menu ::v-deep .vbestui-menu-item-container i {
  margin-right: 0px !important;
}
.search-detail {
  &-keywords {
    padding: 10px 0px;
    .keywords {
      font-size: 18px;
      color: var(--tag-color);
      margin-right: 5px;
    }
    .count {
      padding: 0px 3px;
      color: var(--tag-color);
    }
  }
}
</style>