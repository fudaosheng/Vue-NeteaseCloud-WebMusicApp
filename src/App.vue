<template>
  <div id="app">
    <tab-bar></tab-bar>
    <left-menu/>
    <Main/>
    <play-music/>
    <Loading v-show="isloading"/>
  </div>
</template>
<script>
import Loading from "components/common/Loading"
import TabBar from 'components/content/tabbar/TabBar'
import LeftMenu from 'components/content/LeftMenu'
import Main from 'components/content/Main'
import PlayMusic from "components/content/playmusic/PlayMusic"
export default {
  name:'App',
  components:{
    Loading,
    TabBar,
    LeftMenu,
    Main,
    PlayMusic
  },
  computed:{
    isloading(){
      return this.$store.state.isloading;
    }
  }
}
</script>
<style>
@import url('./assets/css/base.css');
@import url('./assets/css/play.css');
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  background: #16181c;
  color: #fff;
}
</style>
