<template>
  <div class="ranklist">
    <scroll ref="scroll" class="rank-scroll" v-if="ranklist.length!==0">
      <div class="ranktop">
        <rank-list-item
          :rank-id="ranklist[0].id"
          :title="['飙','升','榜']"
          :bg-color="['#56a1e3','#5a8beb']"
        />
        <new-item
          :rank-id="ranklist[1].id"
          :title="['新','歌','榜']"
          :bg-color="['#34aabe','#56c2cd']"
        ></new-item>
        <original-item
          :rank-id="ranklist[2].id"
          :title="['原','创','榜']"
          :bg-color="['#d53d6a','#eb638d']"
        ></original-item>
        <hot-item
          :rank-id="ranklist[3].id"
          :title="['热','歌','榜']"
          :bg-color="['#c7523c','#cc7455']"
        ></hot-item>
        <song-item
          :rank-id="ranklist[4].id"
          :title="['歌','手','榜']"
          :bg-color="['#9455ce','#9946c9']"
        ></song-item>
      </div>
      <h2>全球榜</h2>
      <music-list :personList="ranklist.slice(4)" />
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import MusicList from "components/content/musiclist/MusicList";
import RankListItem from "../childComps/RankListItem";
import newItem from "../childComps/RankListItem";
import originalItem from "../childComps/RankListItem";
import hotItem from "../childComps/RankListItem";
import songItem from "../childComps/RankListItem";
import { _getRankList } from "network/discover";
import { imgLoad } from "./indexMixin";
import { indexMixin } from "../../musicListDetail/indexMixin";
export default {
  name: "MusicRankList",
  data() {
    return {
      ranklist: []
    };
  },
  components: {
    Scroll,
    MusicList,

    RankListItem,
    newItem,
    originalItem,
    hotItem,
    songItem
  },
  mixins: [indexMixin],
  created() {
    _getRankList().then(res => {
      this.ranklist = res.data.list;
    });
  }
};
</script>
<style scoped>
.ranklist {
  width: 100%;
  height: 100%;
}
.rank-scroll {
  height: 100%;
}
.ranktop {
  display: flex;
  flex-wrap: wrap;
}
h2 {
  font-weight: 300;
  margin-bottom: 20px;
}
</style>