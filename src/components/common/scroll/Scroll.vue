<template>
  <div class="scroll">
    <b-scroll
      ref="scroll"
      :theme="getTheme"
      :speed="speed"
      :disable-bar="disableBar"
      class="b-scroll"
      @pullingUp="pullingUp"
      :height="height"
    >
      <slot></slot>
    </b-scroll>
  </div>
</template>
<script>
import {theme} from "mixin/global/theme"
export default {
  name: "Scroll",
  mixins:[theme],
  props: {
    speed: {
      type: Number,
      default: 30,
    },
    disableBar: {
      type: Boolean,
      default: false,
    },
    height:{
        type:String,
        default:""
    }
  },
  methods: {
    refresh() {
      this.$refs.scroll.refresh();
    },
    scrollTo(y, duration, judge = true) {
      this.$refs.scroll.scrollTo(y, duration, judge);
    },
    /**上拉加载更多 */
    pullingUp() {
      this.$emit("pullingUp");
    },
  },
};
</script>
<style scoped>
.scroll {
  width: 100%;
}
.b-scroll {
  height: 100%;
}
</style>