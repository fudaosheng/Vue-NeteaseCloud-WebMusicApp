<template>
  <div class="live" v-if="subs != null">
    <div class="content">
      <div class="item" v-for="(item, index) in subs" :key="index">
        <img :src="item.avatarUrl" alt="" @load="handleImgLoad" />
        <div class="nickname">{{ item.nickname }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { imgLoadMixin } from "mixin/global/imgLoad";
export default {
  name: "MusicListLive",
  mixins: [imgLoadMixin],
  props: {
    subs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    handleImgLoad() {
      if (this.imgCount == this.subs.length) this.$emit("refresh");
      this.imgCount++;
    },
  },
};
</script>
<style scoped>
.live {
  width: 100%;
}
.live .content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.content .item {
  width: calc(10%);
  font-size: 12px;
  text-align: center;
  padding: 15px 10px;
}
.item img {
  width: 60%;
  border-radius: 50%;
}
.nickname {
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>