<template>
  <div class="dance-music-artist-list">
    <div
      class="dance-music-artist-list-item"
      v-for="(item, index) in artistList"
      :key="index"
      @click="enterArtistDetail(item)"
    >
      <img
        v-lazy="item.picUrl || item.coverImgUrl"
        alt=""
        @load="handleRefresh"
      />
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
  methods: {
    handleRefresh() {
      if (this.imgCount == this.artistList.length) this.$emit("refresh");
      this.imgCount++;
    },
    enterArtistDetail(item) {
      this.$router.push({
        path: "/artist-detail",
        query: {
          // id: item.id,
          // name:item.name,
          // musicSize: item.musicSize,
          // albumSize: item.albumSize,
          // picUrl: item.picUrl,
          artist:item
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
    img {
      width: 100%;
    }
    &-desc {
      font-size: 13px;
    }
  }
}
</style>