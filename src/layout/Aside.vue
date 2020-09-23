<template>
  <div :class="asideClass">
    <div class="menu">
      <b-menu
      :menu="menuList"
      vertical
      item-width="100%"
      :text-color="theme=='dark'?'var(--dark-text-color)':''"
      :active-color="getActiveColor"
    ></b-menu>
    <div class="my-music-list" v-if="false">
      <p class="title">创建的歌单</p>
      <ul class="my-music-list-main">
        <li></li>
      </ul>
    </div>
    </div>
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
.menu{
  height: 420px;
}
.my-music-list{
  height: calc(100% - 420px);
  padding: 10px 0px;
  .title{
    font-size: 13px;
  }
  &-main{
    list-style-type: none;
    padding-left: 20px ;
    li{
      height: 60px;
      border: 1px solid red;
    }
  }
}
</style>