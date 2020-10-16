<template>
  <!-- <scroll class="scroll" ref="scroll"> -->
  <div :class="[`${program + 'mv'}`]">
    <div class="mv-title">
      <div class="mv-title-left">
        <h4>最新MV</h4>
      </div>
      <div class="mv-right">
        <b-menu
          class="item-menu"
          :menu="areas"
          item-height="30px"
          item-width="40px"
          :active-show-border="false"
          :active-color="getActiveColor"
          @click="handleAreasClick"
        />
      </div>
      <div class="mv-title-forword">
        <router-link to="/mv-list" title="查看更多MV"
          ><i class="vbestui-iconfont icon-qian icon"></i
        ></router-link>
      </div>
    </div>
    <mv-list :mv-list="mvList" />
    <h4 class="mv-h4">推荐MV</h4>
    <mv-list :mv-list="perMV"/>
    <div class="mv-title">
      <div class="mv-title-left">
        <h4>MV排行榜</h4>
      </div>
      <div class="mv-right">
        <b-menu
          class="item-menu"
          :menu="mvRank"
          item-height="30px"
          item-width="40px"
          :active-show-border="false"
          :active-color="getActiveColor"
          @click="handleRankMvClick"
        />
      </div>
      <div class="mv-title-forword">
        <router-link to="/mv-list" title="查看更多MV"
          ><i class="vbestui-iconfont icon-qian icon"></i
        ></router-link>
      </div>
    </div>
    <mv-rank-list class="mv-rank-list" :top-mv="topMv" />
  </div>
  <!-- </scroll> -->
</template>
<script>
import { theme } from "mixin/global/theme";
import { _getNewMV, MV, _getTopMv, _Personalized } from "network/mv";
import MvList from "content/mv-list/mv-list";
import MvRankList from "content/mv-rank-list/mv-rank-list";
export default {
  name: "Mv",
  mixins: [theme],
  components: { MvList, MvRankList },
  data() {
    return {
      areas: ["内地", "港台", "欧美", "日本", "韩国"],
      mvRank: ["内地", "港台", "欧美", "日本", "韩国"],
      currentArea: "内地",
      limit: 8,
      mvList: [], //最新MV
      topMv: [], //排行榜MV
      perMV: [], //推荐MV
      currentRankMV: "内地",
      oofset: 1, //MV排行榜分页
    };
  },
  created() {
    this.getNewMv();
    this.Personalized();
    this.getTopMv();
    this.$Notice.info({
      title: "系统提示：",
      desc: "点击更多按钮可查看全部MV哦~",
    });
  },
  methods: {
    handleAreasClick(index) {
      this.currentArea = this.areas[index];
      this.mvList = [];
      this.getNewMv();
    },
    handleRankMvClick(index) {
      this.currentRankMV = this.mvRank[index];
      this.getTopMv();
    },
    // handleRefresh() {
    //   this.$refs.scroll.refresh();
    // },
    /**最新MV */
    getNewMv() {
      _getNewMV(this.limit, this.currentArea).then((res) => {
        for (let i of res.data.data) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.mvList.push(mv);
        }
      });
    },
    /**MV排行榜 */
    getTopMv() {
      this.topMv = [];
      _getTopMv(10, this.currentRankMV, this.offset).then((res) => {
        for (let i of res.data.data) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.topMv.push(mv);
        }
      });
    },
    Personalized() {
      _Personalized().then((res) => {
        let mvs = res.data.result;
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].picUrl,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount
          );
          this.perMV.push(mv);
          // if (i == mvs.length - 1) {
          //   this.$nextTick(() => {
          //     this.handleRefresh();
          //   });
          // }
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: calc(100vh -58px -60px);
}
.dance-music-mv {
  padding: 10px 30px 0px 30px;
}
.item-menu {
  font-size: 13px;
}
.mv-title {
  display: flex;
  align-items: flex-end;
  padding: 0px 20px;
  position: relative;
  h4 {
    padding: 10px 0px;
  }
  &-forword {
    position: absolute;
    right: 18px;
    opacity: 0.6;
  }
  &-forword:hover {
    opacity: 1;
  }
}
a {
  color: inherit;
  text-decoration: none;
}
.mv-h4 {
  padding: 10px 20px;
}
.mv-rank-list {
  padding: 0px 20px;
}
</style>