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
    /**是否监听滚动 */
    probeType:{
      type:Number,
      default(){
        return 0
      }
    },
    /**上拉加载更多 */
    pullUpLoad:{
      type:Boolean,
      default(){
        return false
      }
    },
    /**是否开启滚动条 */
    scrollbar:{
      type:[Boolean,Object],
      default(){
        return false
      }
    },
  },
  data() {
    return {
      scroll: null //为true时scroll内的子元素如div span等能监听点击事件
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.swiper, {
      click: true,
      probeType: this.probeType ,//3时时监听滚动
      pullUpLoad:this.pullUpLoad,//上拉加载更多
      scrollbar:this.scrollbar,
    })
     this.scroll.on('scroll', (position) => {//监听滚动
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
    finishPullUp(){//上拉加载更多完成
      this.scroll.finishPullUp();
      this.refresh();
    },
    refresh(){//从新计算滚动高度
      this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0;
    },
    /**启用scroll */
    enable(){
      this.scroll&&this.scroll.enable();
    },
    /**禁用better-scroll */
    disable(){
      this.scroll&&this.scroll.disable();
    }
  }
};
</script>
<style scoped>
</style>