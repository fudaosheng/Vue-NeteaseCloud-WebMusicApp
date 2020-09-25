<template>
  <div class="base-info" v-if="Object.keys(baseInfo).length">
    <div class="left">
      <img v-lazy="baseInfo.img" alt />
    </div>
    <div class="right">
      <h3>
        <b-tag color="var(--main-color)" plain>歌单</b-tag>
        {{baseInfo.name}}
      </h3>
      <div class="right-item">
        <b-avatar :src="baseInfo.creatorAvatar" size="30px"></b-avatar>
        <span class="creator-name">{{baseInfo.creatorName}}</span>
        <span>创建时间：{{getCreateDate}}</span>
      </div>
      <div class="right-item">
        <b-button
          background="var(--main-color)"
          color="#fff"
          :style="{border:`none`}"
          round
          class="button"
          @click="handlePlayMusic"
        >
          <i class="iconfont icon-bofang" />播放全部
        </b-button>
        <b-button round class="button">
          <i class="iconfont icon-shoucang" />
          收藏({{baseInfo.subscribedCount}})
        </b-button>
        <b-button round class="button">
          <i class="iconfont icon-fenxiang" />
          分享({{baseInfo.shareCount}})
        </b-button>
      </div>
      <div class="desc">
        <p>
          标签：
          <span>{{getTags}}</span>
        </p>
        <p class="desc-title">简介：{{baseInfo.title}}}}</p>
      </div>
    </div>
    <div class="play">
      <div class="play-left">
        歌曲数
        <br />
        {{baseInfo.trackCount}}
      </div>
      <div class="play-right">
        播放数
        <br />
        {{getPlayCount}}
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "utils/tool.js";
export default {
  name: "BaseInfo",
  props: {
    baseInfo: {
      type: Object,
      default: {},
    },
  },
  computed: {
    getCreateDate() {
      return formatDate(new Date(this.baseInfo.createTime), "yyyy-MM-dd");
    },
    getTags() {
      return this.baseInfo.tags && this.baseInfo.tags.join("/");
    },
    getPlayCount() {
      return (
        this.baseInfo.playCount &&
        this.baseInfo.playCount.toString().slice(0, 2) + "万"
      );
    },
  },
  methods:{
    handlePlayMusic(){
      this.$emit('playMusic');
    }
  }
};
</script>
<style lang="less" scoped>
.base-info {
  width: 100%;
  padding: 10px 0px;
  display: flex;
  position: relative;
  .left {
    width: 200px;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    padding-left: 35px;
    h3 {
      padding: 5px 0px;
    }
    &-item {
      padding: 5px 0px;
      display: flex;
      align-items: center;
      font-size: 14px;
      .creator-name {
        margin: 0px 10px;
      }
      .iconfont {
        margin-right: 8px;
      }
      .button {
        margin-right: 15px;
      }
    }
  }
}
.desc {
  padding: 10px 0px;
  font-size: 13px;
  span {
    color: var(--tag-color);
  }
  &-title {
    padding-top: 5px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
.play {
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 13px;
  &-left {
    padding: 5px;
    border-right: 1px solid var(--border);
  }
  &-right {
    padding: 5px;
  }
}
</style>