<template>
  <div class="artist-mvs">
    <div class="artist-mvs-item" v-for="(item, index) in mvList" :key="index">
      <div class="artist-mvs-item-container">
        <div class="artist-mvs-item-top">
          <i class="iconfont icon-shipin"></i>
          <span>{{ item.count.toString().slice(0, 2) + "万" }}</span>
        </div>
        <img v-lazy="item.cover" alt="" />
        <div class="artist-mvs-item-duration">
          {{ item.duration }}
        </div>
      </div>
      <div class="artist-mvs-item-desc">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ArtistMvs",
  props: {
    mvList: {
      type: Array,
      default: [],
    },
  },
};
</script>
<style lang="less" scoped>
.artist-mvs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  &-item {
    width: calc(100% / 6);
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