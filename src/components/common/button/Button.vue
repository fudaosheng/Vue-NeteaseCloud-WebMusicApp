<template>
  <b-button
    class="dance-music-button"
    :slidable="slidable"
    :background="getBackground"
    :height="height"
    :width="width"
    :size="size"
    :color="getColor"
    :round="round"
  >
    <slot></slot>
  </b-button>
</template>
<script>
import { theme } from "mixin/global/theme";
export default {
  name: "DButton",
  mixins: [theme],
  props: {
    slidable: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "default",
    },
    height: {
      type: String,
      default: "",
    },
    round: {
      type: Boolean,
      default: false,
    },
    width:{
      type: String,
      default: "",
    }
  },
  computed: {
    getBackground() {
      let bg = "";
      bg = this.theme == "dark" ? "var(--dark-block-bg-color)" : "";
      return bg;
    },
    getColor() {
      let bg = "";
      bg = this.theme == "dark" ? " #dcdde4" : "";
      return bg;
    },
  },
};
</script>
<style scoped>
.dance-music-button{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>