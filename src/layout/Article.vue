<template>
  <div :class="articleClass">
    <keep-alive>
      <router-view />
    </keep-alive>
    <b-loading
      icon="vbestui-iconfont icon-loading2"
      size="large"
      fix
      v-show="isLoading"
      :color="getLoadingColor"
    />
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
    isLoading() {
      return this.$store.state.isloading;
    },
    getLoadingColor() {
      let color = "";
      color =
        this.theme == "dark"
          ? "var(--main-color)"
          : this.theme == "green"
          ? "var(--green-main-color)"
          : "";
      return color;
    },
    getRequestType(){
      return this.$store.getters.getRequestType;
    }
  },
  watch:{
    getRequestType(){
      this.$Notice.error({
        title:'系统提示',
        desc:'网络错误，请重新打开网站，给您带来的不便敬请谅解。'
      })
    }
  }
};
</script>
<style lang="less" scoped>
.dance-music-article {
  width: 82%;
  height: calc(100% - 58px - 60px);
  float: left;
  &-dark {
    background: var(--dark-bg-color);
    color: var(--dark-article-color);
  }
}
</style>