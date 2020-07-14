<template>
  <div class="musiclist">
    <div
      class="list-item"
      v-for="(item,index) in artistList"
      :key="index"
      @click="enterArtistDetail(item)"
    >
      <img :src="getImgUrl(item)" alt @load="imgLoad" />
      <div class="title">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
import { imgLoadMixin } from "assets/common/mixin";
export default {
  name: "MusicList",
  props: {
    artistList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mixins: [imgLoadMixin],
  methods: {
    getImgUrl(item) {
      return item.picUrl || item.coverImgUrl;
    },
    imgLoad() {
      /**类似于防抖函数功能*/
      if (this.imgCount == this.artistList.length) this.$emit("imgLoad");
      this.imgCount++;
    },
    enterArtistDetail(artist) {
      this.$router.push({
        path: "/artist",
        query: {
          artist: artist
        }
      });
      this.$store.commit('addArtist',artist);
    }
  }
};
</script>
<style scoped>
.musiclist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.musiclist .list-item {
  position: relative;
  margin: 5px 6px;
  width: 150px;
  padding-bottom: 10px;
  font-size: 13px;
}
.list-item img {
  width: 100%;
}
</style>