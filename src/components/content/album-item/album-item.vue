<template>
  <div
    :class="[`album-item`, `album-item-${getTheme}`]"
    @click="enteralbumDesc"
  >
    <div class="left">
      <img v-lazy="album.picUrl" alt="" v-if="album.picUrl" />
      <b-avatar size="calc(100vh /12)" shape="square" v-else />
    </div>
    <div class="right">
      <div class="right-name">{{ album.name }}</div>
      <div class="right-item">
        发行时间：<span>{{ getTime }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from "utils/tool"
export default {
  name: "AlbumItem",
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
    getTime(){
        return formatDate(new Date(this.album.publishTime),'yyyy-MM-dd')
    }
  },
  props: {
    album: {
      type: Object,
      default: {},
    },
  },
  methods: {
    enteralbumDesc() {
      this.$router.push({
        path: "/album-detail",
        query: {
          album: this.album,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.album-item {
  padding: 8px 0px;
  display: flex;
  cursor: pointer;
  &-light:hover,
  &-green :hover {
    background: var(--light-hover-bg-color);
  }
  &-dark:hover {
    background: var(--dark-hover-bg-color);
  }
  .left {
    width: calc(100vh / 12);
    height: calc(100vh / 12);
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .right {
    height: calc(100vh / 12);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right-item {
      font-size: 12px;
      span {
        color: var(--tag-color);
      }
    }
  }
}
</style>