<template>
  <tr :class="trClass" :style="trStyle">
    <slot></slot>
  </tr>
</template>
<script>
const prefixCls = "vbestui-table-tr";
import { table } from "./table";
export default {
  name: "BTableTr",
  inject: {
    vbestTable: {
      default: {},
    },
    vbestTableHead: {
      default: {},
    },
  },
  data() {
    return {
      prefixCls: prefixCls,
      key: null,
    };
  },
  mixins: [table],
  computed: {
    trClass() {
      return [
        `${this.prefixCls}`,
        this.isSplit ? `${this.prefixCls + "-border"}` : "",
      ];
    },
    trStyle() {
      return {
        borderColor: this.getSpritColor,
        /**设置斑马线颜色 */
        background:this.isStripe?this.key%2!=0?this.getSpritColor:"":"",
      };
    },
    /**table-head split is true && table split not true */
    isOnlyHeadSplit() {
      return this.vbestTableHead.split && !this.vbestTable.split;
    },
    /**stripe */
    isStripe(){
      return this.vbestTable.stripe;
    },
    /**获取斑马线颜色 */
    getSpritColor(){
      return this.vbestTable.stripeBackgroundColor||"#f6f6f6";
    },
  },
  mounted() {
    this.key = this.$vnode.key;
  },
};
</script>
<style scoped>
.vbestui-table-tr {
  width: 100%;
  display: flex;
}

/* tr边框 */
.vbestui-table-tr-border {
  border-bottom: 1px solid var(--border);
}
/**table-head split is true && table split not true */
/* .vbestui-table-tr-head-border {
  border-bottom: 1px solid var(--border);
} */
</style>