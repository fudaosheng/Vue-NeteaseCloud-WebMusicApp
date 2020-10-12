<template>
  <div class="dance-music-artist-list">
    <div
      class="dance-music-artist-list-item"
      v-for="(item, index) in artistList"
      :key="index"
      @mouseenter="handleEnter(index)"
      @mouseleave="handleLeave"
      @click="enterArtistDetail(item)"
    >
      <div class="dance-music-artist-list-item-container">
        <img
          v-lazy="item.picUrl || item.coverImgUrl"
          alt=""
          @load="handleRefresh"
        />
        <transition name="dance-music-opacity">
          <div class="container-detail" v-show="currentIndex==index">
          <i class="iconfont icon-homeicondetails" :class="[`icon-${theme}`]"></i>
        </div>
        </transition>
      </div>
      <div class="dance-music-artist-list-item-desc">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import { imgLoadMixin } from "mixin/global/imgLoad";
export default {
  name: "ArtistList",
  mixins: [imgLoadMixin],
  props: {
    artistList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed:{
    theme(){
      return this.$store.getters.getTheme;
    }
  },
  data() {
    return {
      currentIndex: null, //控制描述信息、播放次数显示隐藏
    };
  },
  methods: {
    handleEnter(index) {
      // if (this.emptyDesc) return;
      this.currentIndex = index;
    },
    handleLeave(index) {
      // if (this.emptyDesc) return;
      this.currentIndex = null;
    },
    handleRefresh() {
      if (this.imgCount == this.artistList.length) this.$emit("refresh");
      this.imgCount++;
    },
    /**进入歌手详情页面 */
    enterArtistDetail(item) {
      this.$router.push({
        path: "/artist-detail",
        query: {
          // id: item.id,
          // name:item.name,
          // musicSize: item.musicSize,
          // albumSize: item.albumSize,
          // picUrl: item.picUrl,
          artist: item,
        },
      });
    },
  },
  watch: {
    musicList() {
      this.imgCount = 1;
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-artist-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  &-item {
    width: calc(100% / 6);
    padding: 5px 10px;
    cursor: pointer;
    &-container {
      position: relative;
      .container-detail {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-homeicondetails {
          // color: var(--main-color);
          font-size: 1.4em;
        }
      }
    }
    img {
      width: 100%;
      border-radius: 4px;
    }
    &-desc {
      font-size: 13px;
    }
  }
}
</style>