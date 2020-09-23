<template>
  <div :class="tdClass" :style="tdStyle">
    <slot></slot>
  </div>
</template>
<script>
const prefixCls = "vbestui-table-td";
import {table} from "./table";
export default {
  name: "BTableTd",
  inject: {
    vbestTable: {
      default: {},
    },
    vbestTableHead:{
      default:{}
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
    };
  },
  props: {
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
  },
  mixins:[table],
  computed: {
    tdClass() {
      return [
        `${this.prefixCls}`,
        this.isSplit ? `${this.prefixCls + "-border"}` : "",
      ];
    },
    tdStyle() {
      return {
        width: this.width,
        height: this.height,
        /**
         * 不设置td宽度时平分tr宽度，设置宽度时其他td平分tr宽度
         */
        flex: this.width ? "initial" : "1",
        borderColor: this.getSpritColor,
      };
    }
  },
};
</script>
<style scoped>
.vbestui-table-td {
  flex: 1;
  padding: 5px;
}
/* td边框 */
.vbestui-table-td-border {
  border-right: 1px solid var(--border);
}
.vbestui-table-td-border:last-child {
  border-right: none;
}
</style>