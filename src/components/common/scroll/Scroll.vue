<template>
  <div class="scroll">
    <b-scroll
      ref="scroll"
      class="b-scroll"
      :theme="getTheme"
      :speed="speed"
      :disable-bar="disableBar"
      :height="height"
      :disable-wheel="disableWheel"
      :track-color="trackColor"
      :thumb-color="thumbColor"
      @moveStart="moveStart"
      @moveEnd="moveEnd"
      @pullingUp="pullingUp"
    >
      <slot></slot>
    </b-scroll>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme";
export default {
  name: "Scroll",
  mixins: [theme],
  props: {
    speed: {
      type: Number,
      default: 30,
    },
    disableBar: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: "",
    },
    disableWheel: {
      type: Boolean,
      default: false,
    },
    trackColor: {
      type: String,
      default: "",
    },
    thumbColor: {
      type: String,
      default: "",
    },
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
    /**鼠标按下进度条小球 */
    moveStart() {
      this.$emit("moveStart");
    },
    /**鼠标释放进度条小球 */
    moveEnd() {
      this.$emit("moveEnd");
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