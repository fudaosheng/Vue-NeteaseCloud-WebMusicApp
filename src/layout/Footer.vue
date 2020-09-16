<template>
    <div :class="footerClass">

    </div>
</template>
<script>
import {theme} from 'mixin/global/theme.js'
export default {
    name:'LayoutFooter',
    mixins:[theme],
    computed:{
       footerClass(){
           return  [`${this.program+this.theme+'-footer'}`,`${this.program+'footer'}`]
       } 
    }
}
</script>
<style scoped>
.dance-music-footer{
    position: absolute;
    bottom: 0px;
    left: 0px;
}
.dance-music-light-footer{
    width: 100%;
    height: 60px;
    background: var(--light-bg-color);
}
</style>