<template>
  <thead :class="theadClass">
    <slot></slot>
  </thead>
</template>
<script>
const prefixCls = "vbestui-table-head";
export default {
  name: "BTableHead",
  provide() {
    return {
      vbestTableHead: this,
    };
  },
  data() {
    return {
      prefixCls: prefixCls,
    };
  },
  props: {
    /**是否显示分割线 */
    split: {
      type: Boolean,
      default: false,
    },
    /**分割线颜色 */
    splitColor: {
      type: String,
      default: "",
    },
  },
  computed: {
    theadClass() {
      return [`${this.prefixCls}`];
    },
  },
};
</script>
<style scoped>
.vbestui-table-head {
  width: 100%;
}
</style>