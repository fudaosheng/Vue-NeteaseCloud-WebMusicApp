<template>
    <div class="scroll">
        <b-scroll ref="scroll" :theme="theme" :speed="speed" :disable-bar="disableBar" class="b-scroll">
            <slot></slot>
        </b-scroll>
    </div>
</template>
<script>
export default {
    name:'Scroll',
    props:{
        theme:{
            type:String,
            default:'light'
        },
        speed:{
            type:Number,
            default:30
        },
        disableBar:{
            type:Boolean,
            default:false,
        }
    },
    methods:{
        refresh(){
            this.$refs.scroll.refresh();
        },
        scrollTo(y,duration,judge=true){
            this.$refs.scroll.scrollTo(y,duration,judge)
        },
    }
}
</script>
<style scoped>
.scroll{
    width: 100%;
}
.b-scroll{
    height: 100%;
}
</style>