<template>
  <div
    :class="['player-list', `${'player-list-' + theme}`]"
    v-if="musicList && musicList.length"
    @mouseenter="handleRefresh"
  >
    <scroll class="scroll" ref="scroll">
      <div class="player-list-top">
        <h4>播放列表</h4>
        <b-button
          type="text"
          class="vbestui-iconfont icon-close"
          width="30px"
          color="var(--text-main-color)"
          transparent
          @click="closePlayerList"
        ></b-button>
      </div>
      <song-list :music-list="musicList" :lines="lines" player />
    </scroll>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme";
import {forcible} from "mixin/components/forcible-refresh"
import SongList from "common/song-list/song-list";
import Scroll from "common/scroll/Scroll";
export default {
  name: "PlayerList",
  mixins: [theme,forcible],
  components: { SongList, Scroll },
  props: {
    musicList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      lines: [true, false, true, true, false, true],
    };
  },
  methods: {
    closePlayerList() {
      this.$parent.isShowList = false;
    },
  },
  watch: {
    musicList() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.player-list {
  width: 500px;
  height: 500px;
  border-radius: 6px;
  overflow: hidden;
  position: absolute;
  box-shadow: 0 0 2px var(--border-tt);
  &-dark {
    background: var(--dark-bg-color);
  }
  &-light,
  &-green {
    background: #fff;
  }
  h4 {
    text-align: center;
  }
  &-top {
    height: 35px;
  }
}
.icon-close {
  position: absolute;
  right: 0px;
  top: 0px;
}
.scroll {
  height: 500px;
}
</style>