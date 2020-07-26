<template>
  <div class="mv-bar">
    <div class="type">
      地区：
      <div
        class="item"
        v-for="(item,index) in area"
        :key="index"
        :class="{action:index==areaIndex}"
        @click="areaClick(index)"
      >{{item}}</div>
    </div>
    <div class="type">
      类型：
      <div
        class="item"
        v-for="(item,index) in type"
        :key="index"
        :class="{action:index==typeIndex}"
        @click="typeClick(index)"
      >{{item}}</div>
    </div>
    <div class="type">
      排序：
      <div
        class="item"
        v-for="(item,index) in order"
        :key="index"
        :class="{action:index==orderIndex}"
        @click="orderClick(index)"
      >{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MvBar",
  data() {
    return {
      area: ["全部", "内地", "港台", "欧美", "韩国", "日本"],
      type: ["全部", "官方版", "原声", "现场版", "网易出品"],
      order: ["上升最快", "最热", "最新"],
      areaIndex: 0,
      typeIndex: 0,
      orderIndex: 0,
    };
  },
  methods: {
    areaClick(index) {
      this.areaIndex = index;
      this.$parent.$parent.allMv(this.area[this.areaIndex],this.type[this.typeIndex],this.order[this.orderIndex]);
    },
    typeClick(index) {
      this.typeIndex = index;
      this.$parent.$parent.allMv(this.area[this.areaIndex],this.type[this.typeIndex],this.order[this.orderIndex]);
    },
    orderClick(index) {
      this.orderIndex = index;
      this.$parent.$parent.allMv(this.area[this.areaIndex],this.type[this.typeIndex],this.order[this.orderIndex]);
    }
  }
};
</script>
<style scoped>
.mv-bar {
  width: 100%;
  font-size: 13px;
  color: var(--color-text-an);
  padding-bottom: 20px;
  border: 1px solid #23262c;
}
.type {
  display: flex;
  margin-top: 10px;
}
.item {
  padding: 0px 10px;
  text-align: center;
  margin-left: 10px;
}
.action {
  color: #000000;
  background: #54575f;
}
</style>