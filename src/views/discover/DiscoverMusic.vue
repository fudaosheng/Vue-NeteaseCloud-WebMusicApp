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
    /**解决跳转到其他路由返回时navbar与内容不符的问题 */
    for(let i in this.list){
      if(this.list[i].link==this.$route.path){
        /**如果直接在created中使用子组件的属性或方法，此时子组件可能还没创建，异步解决此问题 */
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