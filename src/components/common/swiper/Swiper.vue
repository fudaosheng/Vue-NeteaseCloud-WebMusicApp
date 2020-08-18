<template>
  <div class="swiper" ref="swiper" v-if="banner!==null">
    <div class="left">
      <div class="pre">
        <img src="~assets/img/swiper/prev.svg" alt />
      </div>
    </div>
    <div class="right">
      <div class="next">
        <img src="~assets/img/swiper/next.svg" alt />
      </div>
    </div>
    <div class="imgBox">
      <ul>
        <li class="list1">
          <img :src="banner[0].imageUrl" alt />
        </li>
        <li class="list2">
          <img :src="banner[1].imageUrl" alt />
        </li>
        <li class="list3">
          <img :src="banner[2].imageUrl" alt />
        </li>
        <li class="list4">
          <img :src="banner[3].imageUrl" alt />
        </li>
        <li class="list5">
          <img :src="banner[4].imageUrl" alt />
        </li>
        <li class="list6">
          <img :src="banner[5].imageUrl" alt />
        </li>
      </ul>
    </div>
    <div class="lineBar">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
import { _Swiper } from "./indexSwiper";
export default {
  name: "Swiper",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  updated() {
    if (this.$refs.swiper != null) {
      _Swiper(this.$refs.swiper);
    }
  }
};
</script>
<style scoped>
.swiper {
  cursor: pointer;
  width: 1000px;
  height: 214px;
  margin: 0px auto;
  overflow: hidden;
  position: relative;
}
.imgBox {
  width: 1000px;
}

.imgBox ul {
  position: relative;
  list-style-type: none;
}

.imgBox li {
  position: absolute;
  width: 500px;
}
.imgBox li img {
  width: 100%;
}
.lineBar {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 5px;
  margin: auto;
}

.lineBar span {
  margin: 0px 5px;
  width: 20px;
  height: 3px;
  display: inline-block;
  border-radius: 2px;
  background: #fff;
  cursor: pointer;
}

.list1 {
  transform: scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list2 {
  transform: translateX(250px);
  z-index: 2;
  opacity: 1;
}

.list3 {
  transform: translateX(750px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list4 {
  transform: translateX(1000px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list5 {
  transform: translateX(1250px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list6 {
  transform: translateX(1500px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}
[class*='list']{
   transition: transform .8s;
}

.lineBar .action {
  background: green;
}

.pre {
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 999;
  left: 5px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: none;
}

.next {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 5px;
  z-index: 999;
  top: 0;
  bottom: 0;
  margin: auto;
  display: none;
}

.pre img,
.next img {
  width: 100%;
}

.left {
  width: 250px;
  height: 100%;
  float: left;
  position: relative;
  z-index: 1;
}

.right {
  width: 250px;
  height: 100%;
  float: right;
  position: relative;
  z-index: 1;
}
</style>
