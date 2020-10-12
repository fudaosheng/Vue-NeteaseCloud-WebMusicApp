<template>
  <div class="player-cover" v-if="song">
    <div
      class="player-cover-left"
      @mouseenter="isShade = true"
      @mouseleave="isShade = false"
      @click="togglePlayerPure"
    >
      <b-avatar shape="square" size="60px" class="avatar">
        <img v-lazy="song.pic||song.picUrl" alt="" />
        <b-mask icon="iconfont icon-zuidahua" size="36px" v-show="isShade" />
      </b-avatar>
    </div>
    <div class="player-cover-right">
      <div class="player-cover-right-title">{{ song.name }}</div>
      <div class="player-cover-right-artist">{{ song.artist }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlayerCover",
  props: {
    song: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShade: false, //是否是纯净模式
    };
  },
  methods: {
    togglePlayerPure() {
      this.$parent.isPure = !this.$parent.isPure;
    },
  },
};
</script>
<style lang="less" scoped>
.player-cover {
  width: 18%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: -100%;
  left: 0px;
  display: flex;
  &-left {
    padding: 0px 10px 0px 5px;
    height: 60px;
    .avatar {
      position: relative;
    }
  }
  &-right {
    flex: 1;
    font-size: 13px;
    padding: 0px 10px;
    position: relative;
    &-title {
      font-weight: 600;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    &-artist {
      position: absolute;
      bottom: 0px;
    }
  }
}
</style>