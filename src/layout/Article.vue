<template>
  <div :class="articleClass">
    <keep-alive include="AllMV">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
export default {
  name: "LayoutArticle",
  mixins: [theme],
  computed: {
    articleClass() {
      return [
        `${this.program + "article"}`,
        `${this.program + "article-" + this.theme}`,
      ];
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-article {
  width: 82%;
  height: calc(100% - 58px - 60px);
  padding: 0px 80px;
  float: left;
  &-dark {
    background: var(--dark-bg-color);
  }
}
</style>