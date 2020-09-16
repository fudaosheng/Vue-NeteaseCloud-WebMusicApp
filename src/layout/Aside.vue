<template>
  <div :class="asideClass"></div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
export default {
  name: "LayoutAside",
  mixins: [theme],
  computed: {
    asideClass() {
      return [
        `${this.program + "aside"}`,
        `${this.program + "aside-" + this.theme}`,
      ];
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-aside {
  height: calc(100% - 58px - 60px);
  width: 18%;
  float: left;
  &-light {
    background: var(--light-aside-bg-color);
  }
  &-dark{
      background: var(--dark-aside-bg-color);
  }
  &-green{
      background: var(--green-aside-bg-color);
  }
}
</style>