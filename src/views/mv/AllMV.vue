<template>
  <div class="all-mv">
    <scroll ref="scroll" class="scroll" :pull-up-load="true" @pullingUp="pullingUp()">
      <div class="title">全部MV</div>
      <div class="content">
        <mv-bar />
        <mv-item :mv-list="mvList" />
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import MvBar from "./childComps/MvBar";
import MvItem from "./childComps/MVItem";
import { _AllMv, MV } from "network/mv";
export default {
  name: "AllMV",
  components: {
    Scroll,
    MvBar,
    MvItem
  },
  data() {
    return {
      limit: 12,
      offset: 1,
      mvList: [],
      area: null,
      type: null,
      order: null
    };
  },
  created() {
    this.allMv();
  },
  methods: {
    pullingUp() {
      this.loadMv();
    },
    loadMv() {
      let mvList = [];
      _AllMv(this.area, this.type, this.order, this.limit * this.offset).then(
        res => {
          for (let i of res.data.data) {
            let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
            mvList.push(mv);
          }
          this.mvList = mvList;
          this.offset++;
          this.$refs.scroll.finishPullUp();
        }
      );
    },
    allMv(
      area = "全部",
      type = "全部",
      order = "上升最快",
      limit = this.limit * this.offset
    ) {
      this.mvList = [];
      this.area = area;
      this.type = type;
      this.order = order;

      _AllMv(area, type, order, limit).then(res => {
        for (let i of res.data.data) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.mvList.push(mv);
        }

      });
    }
  }
};
</script>
<style scoped>
.all-mv {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scroll {
  height: 100%;
}
.title {
  padding: 10px;
  font-size: 18px;
  color: var(--color-text-tint);
  border-bottom: 1px solid #23262c;
}
.content {
  padding: 0px 8%;
}
</style>