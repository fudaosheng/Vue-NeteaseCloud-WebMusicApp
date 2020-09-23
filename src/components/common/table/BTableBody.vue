<template>
  <tbody :class="tbodyClass">
      <slot></slot>
  </tbody>
</template>
<script>
const prefixCls="vbestui-table-body"
export default {
  name: "BTableBody",
  data(){
    return{
      prefixCls:prefixCls
    }
  },
  computed: {
    tbodyClass() {
      return[
        `${this.prefixCls}`
      ]
    },
  },
};
</script>
<style scoped>
.vbestui-table-body{
  width: 100%;
}
</style>