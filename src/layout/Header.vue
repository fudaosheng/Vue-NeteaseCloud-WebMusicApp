<template>
  <div :class="headClass">
    <div :class="program+'header-title'">
      <div
        :class="program+'header-title-left'"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="item">
          <transition name="header-side">
            <i class="iconfont icon-home" v-show="isShow" />
          </transition>
        </div>
        <div class="item">
          <transition name="header-side">
            <i class="iconfont icon-zuixiaohua" v-show="isShow" />
          </transition>
        </div>
        <div class="item">
          <transition name="header-side">
            <i class="iconfont icon-zuidahua" v-show="isShow" />
          </transition>
        </div>
      </div>
      <div :class="program+'header-title-right'">
        <div :class="[`item vbestui-iconfont icon-hou`,`${'header-'+theme+'-title-icon'}`]"></div>
        <div :class="[`item vbestui-iconfont icon-qian`,`${'header-'+theme+'-title-icon'}`]"></div>
      </div>
    </div>
    <div :class="program+'header-main'">
      <div class="left">
        <b-input search></b-input>
      </div>
      <div class="right">
        <b-avatar size="35px" class="avatar"></b-avatar>
        <div class="item">
          <b-poptip max-length="180px" placement="bottom-start">
            <b-button
              :class="[`iconfont icon-icon-huanfu`,`${theme+'-huanfu-icon'}`]"
              width="60px"
              height="30px"
              type="text"
              transparent
            />
            <div slot="title" class="poptip-title">主题</div>
            <div class="huanfu" slot="content">
              <div class="theme-item" @click="handleThemeLight">优雅白</div>
              <div class="theme-item" @click="handleThemeDark">炫酷黑</div>
              <div class="theme-item" @click="handleThemeGreen">清新绿</div>
            </div>
          </b-poptip>
        </div>
        <a href="https://gitee.com/fudaosheng">
          <b-tooltip :theme="getTheme">
            <div :class="['item',`${theme+'-item'}`]">G</div>
            <div slot="content">作者Gitee主页</div>
          </b-tooltip>
        </a>
        <a href="https://gitee.com/fudaosheng">
          <b-tooltip :theme="getTheme">
            <div :class="[`${theme+'-item'}`,'item iconfont icon-github']"></div>
            <div slot="content">作者Github主页</div>
          </b-tooltip>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
export default {
  name: "LayoutHeader",
  mixins: [theme],
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    headClass() {
      return [`${this.program + this.theme + "-header"}`, "dance-music-header"];
    },
    getTheme() {
      let theme = "";
      this.theme != "dark" ? (theme = "light") : (theme = "dark");
      return theme;
    },
  },
  methods: {
    handleMouseEnter() {
      this.isShow = true;
    },
    handleMouseLeave() {
      this.isShow = false;
    },
    handleThemeLight() {
      this.$store.commit("setTheme", "light");
    },
    handleThemeDark() {
      this.$store.commit("setTheme", "dark");
    },
    handleThemeGreen() {
      this.$store.commit("setTheme", "green");
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-header {
  display: flex;
  align-items: center;
  height: 58px;
  width: 100%;
  &-title {
    width: 18%;
    height: 100%;
    text-align: center;
    display: flex;
    &-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .item {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        line-height: 18px;
        overflow: hidden;
        i {
          display: inline-block;
        }
      }
      .item:nth-child(1) {
        background: #ed655a;
      }
      .item:nth-child(2) {
        background: #e0c04c;
      }
      .item:nth-child(3) {
        background: #72be47;
      }
    }
    &-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .item {
        flex: 1;
        text-align: center;
      }
    }
  }
  &-main {
    width: 82%;
    height: 100%;
    display: flex;
    .left {
      flex: 2;
      text-align: center;
      line-height: 58px;
    }
    .right {
      flex: 7;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .avatar {
        margin-right: 60px;
      }
      a {
        text-decoration: none;
      }
      .item {
        width: 60px;
        text-align: center;
        font-size: 22px;
      }
      .iconfont {
        font-size: 24px;
      }
      .poptip-title {
        font-size: 16px;
        text-align: left;
      }
      .huanfu {
        display: flex;
        height: 60px;
        width: 100%;
        cursor: pointer;
        .theme-item {
          flex: 1px;
          line-height: 60px;
          text-align: center;
          font-size: 13px;
        }
        .theme-item:nth-child(1) {
          background: var(--light-bg-color);
          color: var(--dark-bg-color);
        }
        .theme-item:nth-child(2) {
          background: #292c32;
          color: #fff;
        }
        .theme-item:nth-child(3) {
          background: #449e60;
        }
      }
    }
  }
}
.iconfont {
  font-size: 12px;
}
.header-side-enter-active {
  animation: slideInDown 0.4s;
}
.header-side-leave-active {
  animation: slideInDown 0.4s reverse;
}
// light主题
.dance-music-light-header {
  background: var(--light-bg-color);
}
// dark主题
.dance-music-dark-header {
  background: var(--dark-header-bg-color);
}
//green主题
.dance-music-green-header {
  background: var(--green-bg-color);
}
// 换肤图标主题
.light-huanfu-icon {
  color: var(--dark-bg-color) !important;
}
.dark-huanfu-icon {
  color: #ccc !important;
}
// header 右边图标主题
.light-item{
  color: var(--light-text-color);
}
.dark-item {
  color: #ccc;
}
.green-item {
  color: #f6f6f6;
}
// header 左边图标主题
.header-dark-title-icon{
  color: #ccc;
}
.header-green-title-icon{
  color:  #f6f6f6;
}
</style>