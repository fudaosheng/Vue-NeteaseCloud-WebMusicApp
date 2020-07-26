<template>
  <div class="simi" v-if="item!=null">
    <div class="simi-item" @click="playMV()">
      <div class="left">
        <img :src="item.cover" alt />
        <div class="count">
          <img src="~assets/img/leftmenu/shiping.svg" alt />
          <div class="play-count">{{item.count}}</div>
        </div>
      </div>
      <div class="right">
        <div class="name">
          <span>MV</span>
          {{item.name}}
        </div>
        <div class="artist">{{item.artist}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SimiMvItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
    methods:{
        playMV(){
            this.$router.push('/playmv/'+this.item.id)
        }
    }
};
</script>
<style scoped>
.simi {
  width: 100%;
}
.simi-item {
  width: 100%;
  margin-top: 10px;
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
  background: rgba(0, 0, 0, 0.25);
}
.left .count img {
  height: 100%;
}
.right {
  flex: 1;
  padding-left: 10px;
}
.right span {
  padding: 1px;
  color: red;
  font-size: 13px;
  border: 1px solid red;
}
.artist {
  margin-top: 10px;
  font-size: 13px;
  color: var(--color-text-an);
}
</style>