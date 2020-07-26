<template>
  <div class="detailbar" v-if="list.length!==0">
    <div
      class="item"
      v-for="(item,index) in list"
      :key="index"
      @click="currentClick(index)"
      :class="{action:currentIndex==index}"
    >{{item}}</div>
  </div>
</template>
<script>
export default {
  name: "DetailBar",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    id:{
        type:Number,
        default(){
            return 0
        }
    }
  },
  data(){
        return{
            currentIndex:0,
        }
    },
  methods: {
    currentClick(index) {
      this.currentIndex = index;
      switch(index){
          case 0:this.$router.push('/artist/album'); break;
          case 1:this.$router.push('/artist/mv'); break;
          case 2:this.$router.push('/artist/desc'); break;
          case 3:this.$router.push('/artist/simi'); break;
      }
    }
  }
};
</script>
<style scoped>
.detailbar {
  padding: 10px 0;
  height: 49px;
  display: flex;
  align-items: center;
}
.detailbar .item {
  padding: 5px 20px;
}
.action {
  border-bottom: 3px solid #b82525;
}
</style>