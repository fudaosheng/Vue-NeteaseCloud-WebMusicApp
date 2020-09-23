<template>
  <div class="table-list" v-if="musicList.length">
    <b-table show-border stripe :stripe-background-color="getStripeColor">
      <b-table-head slot="head" split>
        <b-table-tr>
          <b-table-td width="50px"></b-table-td>
          <b-table-td width="60px">操作</b-table-td>
          <b-table-td>音乐标题</b-table-td>
          <b-table-td>歌手</b-table-td>
          <b-table-td>专辑</b-table-td>
          <b-table-td width="120px">时长</b-table-td>
        </b-table-tr>
      </b-table-head>
      <b-table-body slot="body">
        <b-table-tr v-for="(item,index) in musicList" :key="index">
          <b-table-td width="50px">{{getListIndex(index)}}</b-table-td>
          <b-table-td width="60px"><i class="iconfont icon-xihuan"></i></b-table-td>
          <b-table-td>{{item.name}}</b-table-td>
          <b-table-td>{{item.artist}}</b-table-td>
          <b-table-td>{{item.album}}</b-table-td>
          <b-table-td width="120px">{{item.time}}</b-table-td>
        </b-table-tr>
      </b-table-body>
    </b-table>
  </div>
</template>
<script>
import {theme} from "mixin/global/theme";
export default {
  name: "TableList",
  mixins:[theme],
  props: {
    musicList: {
      type: Array,
      default: [],
    },
  },
  computed:{
    /**获取table 斑马线颜色 */
    getStripeColor(){
      let stripeColor="";
      stripeColor=this.theme=="dark"?"var(--dark-table-stripe-color)":"var(--table-stripe-color)";
      return stripeColor;
    }
  },
  methods:{
    /**获取音乐列表下标 */
    getListIndex(index){
      let currentIndex=0;
      currentIndex=index<9?'0'+(index+1):index+1;
      return currentIndex;
    }
  }
};
</script>
<style scoped>
.table-list {
  width: 100%;
  font-size: 13px;
}
</style>