<template>
  <!-- <scroll class="scroll" ref="scroll"> -->
    <div :class="[`${program + 'artist-category'}`]">
      <div class="artist-category-menu">
        <div class="artist-category-menu-item">
          <div class="artist-category-menu-item-title">语种：</div>
          <b-menu
            class="item-menu"
            :menu="areas"
            item-height="30px"
            item-width="80px"
            :active-show-border="false"
            :active-color="getActiveColor"
            @click="handleAreasClick"
          />
        </div>
        <div class="artist-category-menu-item">
          <div class="artist-category-menu-item-title">分类：</div>
          <b-menu
            :menu="types"
            class="item-menu"
            item-height="30px"
            item-width="80px"
            :active-show-border="false"
            :active-color="getActiveColor"
            @click="handleTypesClick"
          />
        </div>
        <div class="artist-category-menu-item">
          <div class="artist-category-menu-item-title">筛选：</div>
          <b-menu
            :menu="Fnames"
            class="item-menu"
            item-height="30px"
            item-width="35px"
            :active-show-border="false"
            :active-color="getActiveColor"
            @click="handleNamesClick"
          />
        </div>
      </div>
      <div class="artist-category-container">
        <artist-list :artist-list="artistlist"/>
      </div>
      <div class="artist-category-page">
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

import { _getArtist } from "network/discover";
import { areas, types, Fnames } from "./data.js";
// import Scroll from "common/scroll/Scroll";
import ArtistList from "content/artist-list/artist-list";
export default {
  name: "ArtistCategory",
  mixins: [theme],
  components: { ArtistList },
  data() {
    return {
      areas,
      types,
      Fnames,
      currentArea: -1,
      currentType: -1,
      currentName: -1,
      limit: 30,
      artistlist: [],
      offset: 1,
    };
  },
  created() {
    this.getArtist();
  },
  methods: {
    /**处理分页点击 */
    onPageChange() {
      this.getArtist();
    },
    /**处理语种menu点击事件 */
    handleAreasClick(index) {
      this.currentArea = this.areas[index].value;
      this.getArtist();
    },
    /**处理types menu点击事件 */
    handleTypesClick(index) {
      this.currentType = this.types[index].value;
      this.getArtist();
    },
    /**处理根据名字首字母查找 */
    handleNamesClick(index) {
      this.currentName = this.Fnames[index].value;
      this.getArtist();
    },
    /**scroll刷新 */
    // refresh() {
    //   this.$refs.scroll.refresh();
    // },
    async getArtist() {
      const res = await _getArtist(
        this.currentArea,
        this.currentType,
        this.currentName,
        this.limit,
        this.offset
      );
      this.artistlist = res.data.artists;
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: calc(100vh - 58px - 60px);
}
.dance-music-artist-category {
  padding: 10px 100px 0px 100px;
}
.artist-category-menu {
  font-size: 13px;
  &-item {
    margin: 5px 0px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    &-title {
      padding: 0px 8px 0px 0px;
      height: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        display: inline-block;
        background: #8f9096;
        padding: 3px 5px;
        border-radius: 4px;
      }
    }
    .item-menu {
      width: calc(100% - 80px);
    }
  }
}
.artist-category-page {
  text-align: center;
}
</style>