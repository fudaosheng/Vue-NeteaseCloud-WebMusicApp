<template>
  <!-- <scroll class="scroll" ref="scroll"> -->
    <div
      :class="[`${program + 'ranklist'}`, `${program + 'ranklist-' + theme}`]"
    >
      <h4>官方榜</h4>
      <div class="official-list">
        <rank-list-item
          v-if="ranklist[0] && ranklist[0].id"
          :rank-id="ranklist[0].id"
          :title="ranklist[0].name.slice(-3).split('')"
          :bg-color="['#56a1e3', '#5a8beb']"
        />
        <rank-list-item
          v-if="ranklist[1] && ranklist[1].id"
          :rank-id="ranklist[1].id"
          :title="ranklist[1].name.slice(-3).split('')"
          :bg-color="['#34aabe', '#56c2cd']"
        />
        <rank-list-item
          v-if="ranklist[2] && ranklist[2].id"
          :rank-id="ranklist[2].id"
          :title="ranklist[2].name.slice(-3).split('')"
          :bg-color="['#d53d6a', '#eb638d']"
        />
        <rank-list-item
          v-if="ranklist[3] && ranklist[3].id"
          :rank-id="ranklist[3].id"
          :title="ranklist[3].name.slice(-3).split('')"
          :bg-color="['#c7523c', '#cc7455']"
        />
        <rank-list-item
          v-if="ranklist[4] && ranklist[4].id"
          :rank-id="ranklist[4].id"
          :title="ranklist[4].name.slice(-3).split('')"
          :bg-color="['#9455ce', '#9946c9']"
        />
      </div>
      <h4>全球榜</h4>
      <div class="play-list">
        <music-list empty-desc :music-list="ranklist.slice(4)" disable-slide />
      </div>
    </div>
  <!-- </scroll> -->
</template>
<script>
import { theme } from "mixin/global/theme";
import { _getRankList } from "network/discover";

import RankListItem from "./childComps/RankListItem";
import MusicList from "content/musiclist/MusicList";
export default {
  name: "RankList",
  mixins: [theme],
  data() {
    return {
      ranklist: [],
    };
  },
  components: { RankListItem, MusicList },
  created() {
    _getRankList().then((res) => {
      this.ranklist = res.data.list;
    });
  },
  methods: {
    // refresh() {
    //   this.$refs.scroll.refresh();
    // },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: calc(100vh - 58px - 60px);
}
.dance-music-ranklist {
  height: 100%;
  padding: 10px 100px 0px 100px;
}
.official-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 10px;
}
.play-list {
  padding: 0px 0px;
}
</style>