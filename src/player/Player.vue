<template>
  <div :class="playerClass">
    <div class="player-toggle" :class="[`${'player-toggle-' + theme}`]">
      <div class="player-pre player-toggle-item">
        <i class="player-icon iconfont icon--previous"></i>
      </div>
      <div class="player-player-type player-toggle-item" @click="toggle()">
        <i class="player-icon-type iconfont icon-bofang1" v-show="!isPlay"></i>
        <i class="player-icon-type iconfont icon-zanting" v-show="isPlay"></i>
      </div>
      <div class="player-next player-toggle-item">
        <i class="player-icon iconfont icon-next"></i>
      </div>
    </div>
    <div class="player-progress"></div>
    <div class="player-volumn"></div>
    <div class="player-tool"></div>
  </div>
</template>
<script>
const prefixCls = "player";
import { theme } from "mixin/global/theme";
export default {
  name: "Player",
  mixins: [theme],
  data() {
    return {
      prefixCls: prefixCls,
      isPlay: false, //true正在播放
    };
  },
  computed: {
    playerClass() {
      return [`${this.prefixCls}`];
    },
  },
  methods: {
    /**暂停或播放音乐 */
    toggle() {
      this.isPlay = !this.isPlay;
      //   if (this.isPlay && this.$refs.audio.readyState == 4)
      //     this.$refs.audio.play();
      //   else {
      //     this.$refs.audio.pause();
      //   }
    },
  },
};
</script>
<style lang="less" scoped>
.player {
  width: 100%;
  height: 60px;
  display: flex;
}
.player-toggle {
  width: 18%;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-item {
    padding: 0px 20px;
    text-align: center;
  }
  &-light {
    color: var(--light-main-color);
  }
  &-dark {
    color: var(--dark-main-color);
  }
  &-green {
    color: var(--green-main-color);
  }
}
.player-progress {
  flex: 1;
  padding: 0px 10px;
  background: chartreuse;
}
.player-volumn {
  width: 150px;
  background: red;
  padding: 0px 10px;
}
.player-tool {
  width: 280px;
  background: purple;
  padding: 0px 10px;
}
/**player iconfont */
.player-icon {
  font-size: 26px;
}
.player-icon-type {
  font-size: 30px;
}
</style>