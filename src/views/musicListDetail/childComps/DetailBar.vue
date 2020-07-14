<template>
    <div class="detailbar">
        <div class="item" v-for="(item,index) in list" :key="index" @click="currentClick(index)" 
        :class="{action:currentIndex==index}">
            {{item}}
        </div>
    </div>
</template>
<script>
import {clickMixin} from "assets/common/mixin"
export default {
    name:'DetailBar',
    props:{
        list:{
            type:Array,
            default(){
                return []
            }
        }
    },
    mixins:[clickMixin],
      methods:{
        currentClick(index){
            this.currentIndex=index;
            switch(index){
                case 0:this.$emit('detailBarClick','music'); break;
                case 1:this.$emit('detailBarClick','recommend'); break;
                case 2:this.$emit('detailBarClick','sub'); break;
            }
        }
    }
}
</script>
<style scoped>
.detailbar{
    padding: 10px 0;
    height: 49px;
    display: flex;
    align-items: center;
}
.detailbar .item{
    padding: 5px 20px;
}
.action{
    border-bottom: 3px solid #b82525;
}
</style>