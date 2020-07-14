<template>
  <div class="progress" @click="setProClick($event)">
    <div class="pro-line" :style="{width:proLine+'px'}"></div>
    <div
      class="pro-load"
      :style="{transform:'translateX('+proLoad+'px)'}"
      ref="load"
    ></div>
  </div>
</template>
<script>
export default {
  name: "Progress",
  data() {
    return {
      proLine: 0,
      proLoad: 0,
      width: 0,
      offsetLeft: 0,
      scale:0
    };
  },
  mounted() {
  },
  methods: {
    setProClick(e) {
        this.setPro(e.clientX - this.$el.offsetLeft);
        this.scale=(this.proLine/this.$el.offsetWidth).toFixed(2);
        this.$emit('childclick',this.scale);
    },
    // setProMouse(e) {
    //     this.$off('click',this.setProClick);
        
    //     let newX=0;
    //     let posX=e.clientX;
    //     this.$el.onmousemove=(e)=>{
    //         newX=e.clientX;
    //     }
    //     document.onmouseup=()=>{
    //         this.onmousemove=null;
    //         console.log('up'+posX+','+newX);
            
    //     }
    // },
    // 通过比例设置进度条进度
    setProgress(scale){
        this.proLine = scale*this.$el.offsetWidth;
        this.proLoad = scale*this.$el.offsetWidth;
    },
    setPro(changeX) {
        this.proLine = changeX;
        this.proLoad = changeX;
    },
  }
};
</script>
<style scoped>
.progress {
  width: 100%;
  height: 3px;
  border-radius: 2px;
  cursor: pointer;
  background: #454546;
  position: relative;
}
.progress .pro-line {
  width: 50px;
  height: 100%;
  background: #b82525;
}
.progress .pro-load {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  transform: translateX(50px);
  top: 0px;
  bottom: 0px;
  margin: auto;
}
.mess {
  height: 10px;
  background: #fff;
  margin-top: -60px;
}
</style>