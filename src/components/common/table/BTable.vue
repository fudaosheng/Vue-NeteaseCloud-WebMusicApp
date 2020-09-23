<template>
  <div :class="tableClass">
    <b-scroll class="vbestui-table-scroll" :height="height">
      <table :class="mainTableClass" :style="mainTableStyle">
        <slot name="head"></slot>
        <slot name="body"></slot>
      </table>
    </b-scroll>
  </div>
</template>
<script>
const prefixCls = "vbestui-table";
export default {
  name: "BTable",
  provide() {
    return {
      vbestTable: this,
    };
  },
  data() {
    return {
      prefixCls: prefixCls,
    };
  },
  props: {
    height:{
      type:String,
      default:""
    },
    /**隔行变色 */
    stripe: {
      type: Boolean,
      default: false,
    },
    stripeBackgroundColor: {
      type: String,
      default: "",
    },
    showBorder: {
      type: Boolean,
      default: false,
    },
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
    /**list边框颜色 */
    borderColor: {
      type: String,
      default: "",
    },
  },
  computed: {
    tableClass() {
      return [`${prefixCls}`];
    },
    mainTableClass() {
      return [
        `${prefixCls + "-container"}`,
        this.split||this.showBorder ? `${this.prefixCls + "-border"}` : "",
      ];
    },
    mainTableStyle() {
      /**是否显示分割线 */
      return {
        borderColor: this.splitColor||this.borderColor,
      };
    },
  },
};
</script>
<style scoped>
.vbestui-table {
  width: 100%;
}
.vbestui-table-container {
  width: 100%;
}
.vbestui-table-border {
  border: 1px solid var(--border);
}
</style>