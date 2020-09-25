<template>
  <div id="app">
    <layout-header />
    <layout-aside />
    <layout-article />
    <layout-footer />
  </div>
</template>
<script>
import LayoutHeader from "layout/Header";
import LayoutAside from "layout/Aside";
import LayoutArticle from "layout/Article";
import LayoutFooter from "layout/Footer";
export default {
  name: "App",
  components: {
    LayoutHeader,
    LayoutAside,
    LayoutArticle,
    LayoutFooter,
  },
};
</script>

<style lang="less">
@import url("./styles/index.css");
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
