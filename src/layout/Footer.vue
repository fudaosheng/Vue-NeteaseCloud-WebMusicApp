<template>
  <div :class="footerClass">
    <player />
  </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
import Player from "player/Player";
export default {
  name: "LayoutFooter",
  mixins: [theme],
  components: { Player },
  computed: {
    footerClass() {
      return [
        `${this.program + "footer"}`,
        `${this.program + "footer-" + this.theme}`,
      ];
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  &-light {
    background: var(--light-footer-bg-color);
  }
  &-dark {
    background: var(--dark-footer-bg-color);
    color: var(--dark-article-color);
  }
  &-green {
    background: var(--green-footer-bg-color);
  }
}
</style>