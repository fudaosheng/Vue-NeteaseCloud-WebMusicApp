<template>
  <div :class="program+'musiclist'">
    <div
      class="list-item"
      v-for="(item,index) in personalized"
      :key="index"
      @mouseenter="handleEnter(index)"
      @mouseleave="handleLeave(index)"
      @click="enterMusicListDetail(index)"
    >
      <div class="group">
        <transition name="musiclist-slide">
          <div class="desc" v-show="currentIndex==index">{{item.copywriter}}</div>
        </transition>
        <div class="count" v-show="currentIndex!=index">
          <div>
            <i class="iconfont icon-erji"></i>
            {{item.playCount}}
          </div>
        </div>
        <img v-lazy="item.picUrl || item.coverImgUrl" />
        <div class="title" :class="[`${program+'musiclist-title-'+theme}`]">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
export default {
  name: "MusicList",
  mixins: [theme],
  props: {
    personalized: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      currentIndex:null,
    };
  },
  methods: {
    handleEnter(index) {
      this.currentIndex = index;
    },
    handleLeave(index) {
      this.currentIndex = null;
    },
    enterMusicListDetail(index) {
      this.$router.push("/musiclistdetail/" + this.personalized[index].id+'/'+new Date().getTime());
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-musiclist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .list-item {
    width: calc(20%);
    padding: 0px 10px;
    img {
      width: 100%;
    }
  }
  &-title-dark {
    color: #ffffff;
  }
}
.group {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
.title {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
}
.desc {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 13px;
}
.count {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: right;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  position: absolute;
  top: 0px;
  right: 0;
  color: #f6f6f6;
  font-size: 13px;
}
.musiclist-slide-enter-active {
  animation: slideInDown 0.4s;
}
.musiclist-slide-leave-active {
  animation: slideInDown 0.4s reverse;
}
</style>