<template>
    <div class="scroll">
        <b-scroll :theme="theme" :speed="speed" class="b-scroll">
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
            default:20
        }
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