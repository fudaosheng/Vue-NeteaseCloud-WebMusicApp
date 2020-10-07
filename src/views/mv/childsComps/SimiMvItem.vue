<template>
  <div class="simi">
    <div
      class="simi-item"
      v-for="(item, index) in mvList"
      :key="index"
      @click="playMV(item.id)"
    >
      <div class="left">
        <img :src="item.cover" alt="" />
        <div class="count">
          <i class="iconfont icon-shipin"></i>
          <div class="play-count">{{ item.count }}</div>
        </div>
      </div>
      <div class="right">
        <div class="name">
          <b-tag color="var(--main-color)" plain class="tag">MV</b-tag>
          {{ item.name }}
        </div>
        <div class="artist">{{ item.artist }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SimiMvItem",
  props: {
    mvList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    playMV(id) {
      this.$router.push("/mv-detail/" + id);
    },
  },
};
</script>
<style scoped>
.simi {
  width: 100%;
}
.simi-item {
  width: 100%;
  margin-top: 15px;
  display: flex;
}
.left {
  width: 150px;
  position: relative;
}
.left img {
  width: 100%;
}
.left .count {
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  height: 20px;
  padding: 3px 5px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25));
  color: #fff;
  font-size: 13px;
}
.icon-shipin {
  margin-right: 8px;
}
.right {
  flex: 1;
  padding-left: 10px;
  font-size: 14px;
  position: relative;
}
.right .name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.tag{
    width:30px;
    height: 25px;
    font-size: 13px;
}
.artist {
  position: absolute;
  bottom: 5px;
  font-size: 13px;
}
</style>