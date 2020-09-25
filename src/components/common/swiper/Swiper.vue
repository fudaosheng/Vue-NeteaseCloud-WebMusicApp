<template>
  <el-carousel :interval="4000" type="card" height="200px" trigger="click" class="swiper" v-if="banner!=null">
    <el-carousel-item v-for="(item,index) in banner" :key="index">
      <img v-lazy="item.imageUrl" alt />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  name:'Swiper',
  props:{
    banner:{
      type:Array,
      default:[]
    }
  }
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>