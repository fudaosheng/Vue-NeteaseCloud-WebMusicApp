<template>
  <div class="mv">
    <scroll class="mv-scroll" ref="scroll">
        <div class="new-mv">
      <div class="title">
        最新MV
        <div class="right" @click="allMv()">
          <span>更多</span>
          <img src="~assets/img/content/next.svg" alt />
        </div>
      </div>
      <mv-item :mv-list="mvList" />
    </div>
    <div class="rankList">
        <div class="title">
        MV排行榜
        <div class="right" @click="allMv()">
          <span>更多</span>
          <img src="~assets/img/content/next.svg" alt />
        </div>
      </div>
      <mv-rank-list :top-mv="topMv"/>
    </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll"
import MvItem from "./childComps/MVItem";
import MvRankList from "./childComps/MVRankList"
import { _getNewMV, MV,_getTopMv } from "network/mv";
export default {
  name: "MV",
  data() {
    return {
      limit: 8,
      mvList: [],
      topMv:[],
    };
  },
  components: {
      Scroll,
    MvItem,
    MvRankList
  },
  created() {
    _getNewMV(this.limit).then(res => {
      for (let i of res.data.data) {
        let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
        this.mvList.push(mv);
      }
    _getTopMv().then(res=>{
        for (let i of res.data.data) {
        let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
        this.topMv.push(mv);
      }
    })
    });
  },
  methods:{
    allMv(){
      this.$router.push('/allmv');
    }
  }
};
</script>
<style scoped>
.mv {
  width: 100%;
  height: 100%;
}
.mv-scroll{
    height: 100%;
}
 .title {
  font-size: 20px;
  color: #dcdde4;
  padding: 5px 0px;
}
.title .right {
    cursor: pointer;
  height: 20px;
  font-size: 13px;
  color: var(--color-text-an);
  float: right;
}
.right :hover{
    color: #fff;
}
.right span{
    vertical-align: 6px;
}
.right img {
  height: 100%;
}
.rankList{
    margin-top: 20px;
}
</style>