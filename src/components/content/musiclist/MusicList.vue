<template>
  <div :class="program+'musiclist'">
    <div
      class="list-item"
      v-for="(item,index) in musicList"
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
        <img v-lazy="item.picUrl || item.coverImgUrl" @load="handleRefresh"/>
        <div class="title" :class="[`${program+'musiclist-title-'+theme}`]">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
import { imgLoadMixin } from "mixin/global/imgLoad.js";
export default {
  name: "MusicList",
  mixins: [theme,imgLoadMixin],
  props: {
    musicList: {
      type: Array,
      default: [],
    },
    disableSlide:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      currentIndex:null,
    };
  },
  methods: {
    handleEnter(index) {
      if(this.disableSlide)return;
      this.currentIndex = index;
    },
    handleLeave(index) {
      if(this.disableSlide)return;
      this.currentIndex = null;
    },
    enterMusicListDetail(index) {
      this.$router.push("/musiclistdetail/" + this.musicList[index].id+'/'+new Date().getTime());
    },
    /**处理图片加载刷新 */
    handleRefresh(){
      if(this.imgCount==this.musicList.length)this.$emit('refresh');
      this.imgCount++;
    },
  },
  watch:{
    musicList(){
      this.imgCount=1;
    },
  }
};
</script>
<style lang="less" scoped>
.dance-music-musiclist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .list-item {
    width: calc(20%);
    padding: 5px 10px;
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