<template>
  <div class="discover">
    <nav-bar :list="list" ref="nav"/>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import NavBar from "./childComps/NavBar";
export default {
  name: "DiscoverMusic",
  data() {
    return {
      list: [
        { link: "/discover/individ", name: "个性推荐" },
        { link: "/discover/category", name: "歌单" },
        { link: "/discover/ranklist", name: "排行榜" },
        { link: "/discover/artist", name: "歌手" },
        { link: "/discover/newsongs", name: "最新音乐" },
         { link: "/discover/mv", name: "MV" },
      ]
    };
  },
  components: {
    NavBar
  },
  created(){
    for(let i in this.list){
      if(this.list[i].link==this.$route.path){
        setTimeout(()=>{
          this.$refs.nav.barClick(i);
        },100)
        break;
      }
    }
    
  }
};
</script>
<style scoped>
.discover {
  width: 100%;
  height: 100%;
}
.swi {
  width: 100%;
  margin-top: 5px;
}
.content {
  width: 100%;
  height: calc(100% - 49px);
  margin-top: 10px;
  padding: 10px 155px;
  overflow: hidden;
}
.content p {
  font-size: 20px;
}
</style>