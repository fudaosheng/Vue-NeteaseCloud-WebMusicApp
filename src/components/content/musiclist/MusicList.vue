<template>
  <div :class="program + 'playlist'">
    <div
      class="playlist-item"
      v-for="(item, index) in musicList"
      :key="index"
      @mouseenter="handleEnter(index)"
      @mouseleave="handleLeave(index)"
      @click="enterMusicListDetail(index)"
    >
      <div class="playlist-item-container">
        <!-- 内部图片容器 -->
        <div class="playlist-item-container-group">
          <!-- 当item.copywriter内容为空时，不显示提示内容，只显示播放数，且播放书滑动进入 -->
          <template v-if="!emptyDesc">
            <transition name="playlist-slide">
              <div class="playlist-desc" v-show="currentIndex == index">
                {{ item.copywriter }}
              </div>
            </transition>
          </template>
          <transition name="playlist-slide">
            <div
              class="playlist-count"
              v-show="
                emptyDesc ? currentIndex == index : currentIndex != index
              "
            >
              <div>
                <i class="iconfont icon-erji"></i>
                {{ item.playCount }}
              </div>
            </div>
          </transition>
          <img v-lazy="item.picUrl || item.coverImgUrl" @load="handleRefresh" />
          <transition name="dance-music-opacity">
            <div class="playlist-play" v-show="currentIndex == index">
              <i class="iconfont icon-icon_play"></i>
            </div>
          </transition>
        </div>
        <div
          class="playlist-name"
          :class="[`${program + 'playlist-name-' + theme}`]"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
import { imgLoadMixin } from "mixin/global/imgLoad.js";
export default {
  name: "MusicList",
  mixins: [theme, imgLoadMixin],
  props: {
    musicList: {
      type: Array,
      default: [],
    },
    /**当描述信息为空时，播放数量滑动显示出来 */
    emptyDesc: {
      type: Boolean,
      default: false,
    },
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
    enterMusicListDetail(index) {
      this.$router.push(
        "/musiclistdetail/" +
          this.musicList[index].id +
          "/" +
          new Date().getTime()
      );
    },
    /**处理图片加载刷新 */
    handleRefresh() {
      if (this.imgCount == this.musicList.length) {
        this.$emit("refresh");
      }
      this.imgCount++;
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
.dance-music-playlist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .playlist-item {
    width: calc(20%);
    padding: 5px 10px;
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  &-playlist-name-dark {
    color: #ffffff;
  }
}
.playlist-item-container {
  cursor: pointer;
  overflow: hidden;
  &-group {
    position: relative;
  }
}
.playlist-name {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
}
.playlist-desc {
  width: 100%;
  padding: 5px 0px;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 13px;
}
.playlist-count {
  width: 100%;
  padding: 3px 0px;
  text-align: right;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  position: absolute;
  top: 0px;
  right: 0;
  color: #f6f6f6;
  font-size: 13px;
}
.playlist-play {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 5px;
  bottom: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .icon-icon_play {
    font-size: 18px;
    color: var(--main-color);
  }
}
.playlist-slide-enter-active {
  animation: slideInDown 0.4s;
}
.playlist-slide-leave-active {
  animation: slideInDown 0.4s reverse;
}
</style>