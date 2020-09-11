<template>
  <div class="swiper" ref="swiper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default(){
        return 0
      }
    },
    pullUpLoad:{
      type:Boolean,
      default(){
        return false
      }
    },
    scrollbar:{
      type:[Boolean,Object],
      default(){
        return false
      }
    },
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.swiper, {
      click: true,
      probeType: this.probeType ,
      pullUpLoad:this.pullUpLoad,
      scrollbar:this.scrollbar,
      mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 300
    }
    })
     this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position);    
      });
      this.scroll.on('pullingUp',()=>{
        this.$emit("pullingUp");
      })
  },
  methods: {
    scrollTo(x, y, timer = 500) {
      this.scroll.scrollTo(x, y, timer); //better-scroll内置方法，回到指定位置
    },
    finishPullUp(){
      this.scroll.finishPullUp();
      this.refresh();
    },
    refresh(){
      this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0;
    },
    enable(){
      this.scroll&&this.scroll.enable();
    },
    disable(){
      this.scroll&&this.scroll.disable();
    }
  }
};
</script>
<style scoped>
</style>