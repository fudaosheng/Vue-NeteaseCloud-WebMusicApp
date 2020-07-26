<template>
  <div class="category" v-if="tags.length!==0">
    <div class="tags">
      <span>热门标签：</span>
      <div
        class="tag-item"
        v-for="(item,index) in tags"
        :key="index"
        @click="tagClick(index)"
        :class="{tagCur:currentIndex==index}"
      >{{item.name}}</div>
    </div>
    <scroll ref="scroll" class="category-scroll" :pull-up-load="true" @pullingUp="pullingUp">
      <music-list :personList="musicList" @imgLoad="imgLoad" />
    </scroll>
  </div>
</template>
<script>
import MusicList from "components/content/musiclist/MusicList";
import Scroll from "components/common/scroll/Scroll";

import { debounce } from "assets/common/tool";
import { _getMusicListHot, _getHighquality } from "network/discover";
import { imgLoad } from "./indexMixin";
export default {
  name: "MusicListCategory",
  data() {
    return {
      tags: [],
      currentIndex: 0,
      limit: 24,
      page: 1,
      musicList: []
    };
  },
  components: {
    MusicList,
    Scroll
  },
  mixins: [imgLoad],
  created() {
    _getMusicListHot().then(res => {
      this.tags = res.data.tags;
      this.getHighquality();
    });
  },
  methods: {
    tagClick(index) {
      this.currentIndex = index;
      this.getHighquality();
    },
    pullingUp() {
      debounce(this.getHighquality(), 1000);
    },
    getHighquality() {
      _getHighquality(
        this.tags[this.currentIndex].name,
        this.limit * this.page
      ).then(res => {

        this.musicList = res.data.playlists;
        /**之所以放到里面是因为异步操作后执行,放外面可能数据没加载完就告诉scroll数据执行完了 */
        this.page++;
        this.$refs.scroll.finishPullUp();

      });
    }
  }
};
</script>
<style scoped>
.category {
  width: 100%;
  height: 100%;
}
.category .tags {
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.tags .tag-item {
  padding: 0px 10px;
  color: #828385;
  cursor: pointer;
}
.category-scroll {
  height: calc(100% - 30px);
  overflow: hidden;
}
.tagCur {
  color: #b82525 !important;
}
</style>