<template>
  <div
    :class="['player-list', `${'player-list-' + theme}`]"
    v-if="musicList && musicList.length"
  >
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
    <table-list :music-list="musicList" height="calc(500px - 40px)" :lines="lines" />
  </div>
</template>
<script>
import { theme } from "mixin/global/theme";
import TableList from "common/table/TableList";
export default {
  name: "PlayerList",
  mixins: [theme],
  components: { TableList },
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
  &-top{
    height:35px;
  }
}
.icon-close {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>