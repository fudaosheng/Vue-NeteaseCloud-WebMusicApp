<template>
  <!-- <scroll class="scroll" ref="scroll"> -->
    <div :class="[`${program + 'mv-list'}`, `${program + 'mv-list-' + theme}`]">
      <h4 class="mv-list-title">全部MV</h4>
      <split class="split"/>
      <mv-bar class="mv-list-bar" @change="handleChange" />
      <split class="split"/>
      <mv-list :mv-list="mvList" />
      <div class="mv-list-bottom">
        <el-pagination
          background
          :current-page.sync="offset"
          :page-count="50"
          @current-change="onPageChange"
        />
      </div>
    </div>
  <!-- </scroll> -->
</template>
<script>
import { theme } from "mixin/global/theme";
import { _AllMv, MV } from "network/mv";

// import Scroll from "common/scroll/Scroll";
import Split from "common/split/split";
import MvList from "content/mv-list/mv-list";

import MvBar from "./childsComps/mv-bar";
export default {
  name: "MvCategory",
  mixins: [theme],
  components: { Split, MvBar, MvList },
  data() {
    return {
      currentArea: "全部",
      currentType: "全部",
      currentOrder: "上升最快",
      limit: 40,
      offset: 1,
      mvList: [],
    };
  },
  created() {
    this.initRequest();
  },
  computed:{
    getOffset(){
      return (this.offset-1)*this.limit;
    }
  },
  methods: {
    /**分页 */
    onPageChange() {
      this.initRequest();
    },
    /**处理menu点击 */
    handleChange(currentArea, currentType, currentOrder) {
      this.currentArea = currentArea;
      this.currentType = currentType;
      this.currentOrder = currentOrder;
      this.initRequest();
    },
    // handleRefresh() {
    //   this.$refs.scroll.refresh();
    // },
    initRequest() {
      this.mvList = [];
      _AllMv(
        this.currentArea,
        this.currentType,
        this.currentOrder,
        this.limit,
        this.getOffset
      ).then((res) => {
        let mvs = res.data.data;
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].cover,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount
          );
          this.mvList.push(mv);
          // if (i == mvs.length - 1) {
          //   this.$nextTick(() => {
          //     this.handleRefresh();
          //     this.$refs.scroll.scrollTo(0, 0);
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
  height: calc(100vh - 58px - 60px);
}
.dance-music-mv-list {
  padding: 10px 30px 0px 30px;
}
.mv-list {
  &-title{
    padding: 10px 20px;
  }
  &-bar {
    padding: 0px 10px;
  }
  &-bottom {
    text-align: center;
  }
}
.split{
  padding: 0px 20px;
}
</style>