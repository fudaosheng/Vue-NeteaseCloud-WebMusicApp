<template>
  <div class="dance-music-menu">
    <div class="dance-music-menu-item">
      <div class="dance-music-menu-item-title">语种：</div>
      <b-menu
        class="item-menu"
        :menu="areas"
        item-height="30px"
        item-width="80px"
        :active-show-border="false"
        :active-color="getActiveColor"
        @click="handleAreasClick"
      />
    </div>
    <div class="dance-music-menu-item">
      <div class="dance-music-menu-item-title">分类：</div>
      <b-menu
        :menu="types"
        class="item-menu"
        item-height="30px"
        item-width="80px"
        :active-show-border="false"
        :active-color="getActiveColor"
        @click="handleTypesClick"
      />
    </div>
    <div class="dance-music-menu-item">
      <div class="dance-music-menu-item-title">排序：</div>
      <b-menu
        :menu="orders"
        class="item-menu"
        item-height="30px"
        item-width="80px"
        :active-show-border="false"
        :active-color="getActiveColor"
        @click="handleOrdersClick"
      />
    </div>
  </div>
</template>
<script>
import {theme} from "mixin/global/theme"
export default {
  name: "MvBar",
  mixins:[theme],
  data() {
    return {
      areas: ["全部", "内地", "港台", "欧美", "韩国", "日本"],
      types: ["全部", "官方版", "原声", "现场版", "网易出品"],
      orders: ["上升最快", "最热", "最新"],
      currentArea: "全部",
      currentType: "全部",
      currentOrder: "上升最快",
    };
  },
  methods: {
    handleAreasClick(index) {
      this.currentArea = this.areas[index];
      this.$emit(
        "change",
        this.currentArea,
        this.currentType,
        this.currentOrder
      );
    },
    handleTypesClick(index) {
      this.currentType = this.types[index];
      this.$emit(
        "change",
        this.currentArea,
        this.currentType,
        this.currentOrder
      );
    },
    handleOrdersClick(index) {
      this.currentOrder = this.orders[index];
      this.$emit(
        "change",
        this.currentArea,
        this.currentType,
        this.currentOrder
      );
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-menu{
  &-item {
    margin: 5px 0px;
    padding-left: 10px;
    font-size: 13px;
    display: flex;
    align-items: center;
    &-title {
      height: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        display: inline-block;
        background: #8f9096;
        padding: 3px 5px;
        border-radius: 4px;
      }
    }
    .item-menu {
      width: calc(100% - 80px);
    }
  }
}
</style>