<template>
  <div :class="asideClass">
    <b-menu
      :menu="menuList"
      vertical
      item-width="100%"
      :text-color="theme=='dark'?'var(--dark-text-color)':''"
      :active-color="getActiveColor"
    ></b-menu>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
export default {
  name: "LayoutAside",
  mixins: [theme],
  data() {
    return {
      menuList: [
        { link: "/individuation", icon: "iconfont icon-music", content: "个性推荐" },
        { link: "", icon: "iconfont icon-gedan", content: "歌单" },
        {
          link: "",
          icon: "iconfont icon-PCbofangye_paihangbang",
          content: "排行榜",
        },
        { link: "", icon: "iconfont icon-mansingle", content: "歌手" },
        {
          link: "",
          icon: "iconfont icon-musicnoteeighth",
          content: "最新音乐",
        },
        { link: "", icon: "iconfont icon-shipin", content: "最新MV" },
        { link: "", icon: "iconfont icon-MV", content: "全部MV" },
      ],
    };
  },
  computed: {
    asideClass() {
      return [
        `${this.program + "aside"}`,
        `${this.program + "aside-" + this.theme}`,
      ];
    },
    getActiveColor() {
      let color = "";
      color =
        this.theme == "dark"
          ? "var( --dark-border-active-color)"
          : this.theme == "green"
          ? "var(--green-bg-color)"
          : "var(--primary)";
      return color;
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-aside {
  height: calc(100% - 58px - 60px);
  width: 18%;
  float: left;
  padding-left: 1px;
  &-light {
    background: var(--light-aside-bg-color);
  }
  &-dark {
    background: var(--dark-aside-bg-color);
  }
  &-green {
    background: var(--green-aside-bg-color);
  }
}
</style>