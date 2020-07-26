<template>
  <div class="mv-rank" v-if="topMv.length!==0">
    <div class="rank-item" v-for="index in topMv.length" :key="index" >
        <div class="warp" v-if="index%2==0">
        <div class="left">
          <div class="number">{{index-1}}</div>
          <div class="mv"><rank-item :item="topMv[index-2]"/></div>
        </div>
        <div class="right">
            <div class="number">{{index}}</div>
            <div class="mv"><rank-item :item="topMv[index-1]"/></div>
        </div>
        </div>
    </div>
  </div>
</template>
<script>
import RankItem from "./RankItem"
export default {
  name: "MVRankList",
  props:{
      topMv:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components:{
      RankItem
  }
};
</script>
<style scoped>
.mv-rank {
  width: 100%;
}
.rank-item {
  width: 100%;
  margin-top: 10px;
}
.warp{
    width: 100%;
    display: flex;
  align-items: center;
}
.warp .left,.warp .right {
  flex: 1;
  display: flex;
  align-items: center;
}
.number{
    width: 30px;
    text-align: center;
}
.mv {
 flex: 1;
}
</style>