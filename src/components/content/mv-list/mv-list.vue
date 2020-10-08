<template>
  <div class="dance-music-mvs">
    <div class="dance-music-mvs-item" :style="itemStyle" v-for="(item, index) in mvList" :key="index"
    @click="enterMvDetail(item)">
      <div class="dance-music-mvs-item-container">
        <div class="dance-music-mvs-item-top">
          <i class="iconfont icon-shipin"></i>
          <span>{{ item.count.toString().slice(0, 2) + "万" }}</span>
        </div>
        <img v-lazy="item.cover" alt="" @load="handleLoad"/>
        <div class="dance-music-mvs-item-duration">
          <!-- {{ item.duration }} -->
        </div>
      </div>
      <div class="dance-music-mvs-item-desc">
        <p>{{ item.name }}</p>
        <span v-if="showArtist">{{item.artist}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {imgLoadMixin} from "mixin/global/imgLoad"
export default {
  name: "MvList",
  mixins:[imgLoadMixin],
  props: {
    mvList: {
      type: Array,
      default: [],
    },
    lineNum:{
      type:Number,
      default:4
    },
    showArtist:{
      type:Boolean,
      default:true,
    }
  },
  computed:{
    itemStyle(){
      return{
        width:`calc(100% / ${this.lineNum})`
      }
    }
  },
  methods:{
    handleLoad(){
      if(this.imgCount==this.mvList.length)this.$emit('refresh');
      this.imgCount++;
    },
    /**跳转到mv播放页面 */
    enterMvDetail(item){
      this.$router.push('/mv-detail/'+item.id);
    }
  },
  watch:{
    mvList(){
      this.imgCount=1;
    }
  }
};
</script>
<style lang="less" scoped>
.dance-music-mvs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  &-item {
    width: calc(100% / 4);
    padding: 5px 20px;
    &-container {
      position: relative;
    }
    &-top {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.3)
      );
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #fff;
      .iconfont {
        margin-right: 5px;
      }
    }
    &-desc {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      span{
        font-size: 12px;
        opacity: .6;
      }
    }
    &-duration {
      // background: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
      color: #fff;
      padding: 5px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
    }
    img {
      width: 100%;
    }
  }
}
</style>