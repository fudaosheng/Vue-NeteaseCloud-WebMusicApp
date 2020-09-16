<template>
    <div :class="articleClass">

    </div>
</template>
<script>
import {theme} from 'mixin/global/theme.js'
export default {
    name:'LayoutArticle',
    mixins:[theme],
    computed:{
        articleClass(){
            return[`${this.program+this.theme+'-article'}`]
        }
    }
}
</script>
<style scoped>
.dance-music-light-article{
    width: 82%;
    height: calc(100% - 58px - 60px);
    float: left;
}
</style>