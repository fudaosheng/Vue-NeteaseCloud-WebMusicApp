<template>
  <div :class="[`${program + 'all-musiclist'}`]">
    <b-poptip
      ref="poptip"
      placement="bottom-start"
      :theme="getTheme"
      max-length="520px"
      @show="handlePoptipShow"
      @hidden="handlePoptipHidden"
      class="poptip"
    >
      <div
        :class="[
          `${program + 'musiclist-poptip'}`,
          `${program + 'musiclist-poptip-' + theme}`,
        ]"
      >
        <span>{{ cat }}</span>
        <i class="vbestui-iconfont icon-qian"></i>
      </div>
      <template v-slot:title>
        <div class="pop-title">全部歌单分类</div>
      </template>
      <template v-slot:content>
        <scroll class="pop-scroll" ref="scroll">
          <div
            :class="['pop-container', `${'pop-container-' + theme}`]"
            @mouseenter="handleRefresh"
          >
            <d-button
              size="long"
              height="35px"
              round
              @click.native="handleAllPlayList"
              >全部歌单</d-button
            >
            <div class="cate-item" v-for="(item, index) in list" :key="index">
              <div class="cate-item-left">
                <i :class="['iconfont', `${iconList[index]}`]"></i>
                <span>{{ categories[index] }}</span>
              </div>
              <div class="cate-item-right">
                <d-button
                  v-for="(cate, index2) in item"
                  :key="index2"
                  width="80px"
                  height="35px"
                  @click.native="handleButtonClick(index, index2)"
                  >{{ cate.name }}</d-button
                >
              </div>
            </div>
          </div>
        </scroll>
      </template>
    </b-poptip>
    <div class="menu">
      <div class="menu-title">热门标签：</div>
      <div class="menu-main">
        <b-menu
          :menu="hotTags"
          item-height="30px"
          item-width="80px"
          :active-show-border="false"
          :active-color="getActiveColor"
          @click="handleMenuClick"
        />
      </div>
    </div>
    <div class="all-musiclist">
      <music-list empty-desc :music-list="playList" />
    </div>
    <div class="all-musiclist-bottom">
      <el-pagination
        background
        :current-page.sync="offset"
        :page-count="50"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme";
import { forcible } from "mixin/components/forcible-refresh";

import {
  _getCatList,
  _getMusicListHot,
  _getPlayList,
} from "network/music-list";

import DButton from "common/button/Button";
import Scroll from "common/scroll/Scroll";
import MusicList from "content/musiclist/MusicList";
export default {
  name: "AllMusicList",
  mixins: [theme, forcible],
  components: { DButton, Scroll, MusicList },
  data() {
    return {
      categories: [],
      list: [], //存放所有分类选项的列表,内部是categories所有分类的子数组
      /**@ ArrayItems
       *0：langs:[],//语种
       *1：styles:[],//风格
       *2：scenes:[],//场景
       *3：emotions:[],//情感
       *4：themes:[],//主题
       */
      iconList: [
        "icon-global",
        "icon-music",
        "icon-kafei",
        "icon-biaoqing",
        "icon-huatizhuti",
      ],
      hotTags: [], //热门标签
      playList: [],
      limit: 50,
      offset: 1,
      cat: "全部",
      isWheel: false,
      isPoptip: false, //控制poptip打开关闭
    };
  },
  computed:{
    getOffset(){
      return (this.offset-1)*this.limit;
    },
  },
  created() {
    _getCatList().then((res) => {
      this.categories = Object.values(res.data.categories);
      let subs = res.data.sub;
      /**对sub进行分类 */
      for (
        let i = 0, length = Object.keys(this.categories).length;
        i < length;
        i++
      ) {
        this.list[i] = subs.filter((item) => {
          return item.category == i;
        });
      }
    });
    /**获取热门标签 */
    _getMusicListHot().then((res) => {
      this.hotTags = res.data.tags.map((item) => {
        return item.name;
      });
      this.getPlayList();
    });
  },
  methods: {
    /**分页 */
    onPageChange() {
      this.getPlayList();
    },
    /**全部歌单 */
    handleAllPlayList() {
      this.reset();
      this.cat = "全部";
      this.getPlayList();
      this.$refs.poptip.hidden();
    },
    /**标签里面按钮点击 */
    handleButtonClick(index, index2) {
      this.reset();
      this.cat = this.list[index][index2].name;
      this.getPlayList();
      this.$refs.poptip.hidden();
    },
    /**menu点击 */
    handleMenuClick(index) {
      this.reset();
      this.cat = this.hotTags[index];
      this.getPlayList();
    },
    /**获取分类歌单 */
    getPlayList() {
      _getPlayList(this.cat, this.limit, this.getOffset).then((res) => {
        this.playList = res.data.playlists;
      });
    },
    reset(){
      this.offset=1;
    },
    /**poptip提示显示，禁用父级mousewheel滚动 */
    handlePoptipShow() {
      this.isWheel = true;
    },
    /**poptip提示显示，重新启用父级mousewheel滚动 */
    handlePoptipHidden() {
      this.isWheel = false;
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: 100%;
}
.dance-music-all-musiclist {
  padding: 10px 100px 0px 100px;
}
.icon-qian {
  display: inline-block;
  vertical-align: -3px;
  transform: rotate(90deg);
  margin-left: 3px;
  font-size: 13px;
}
.poptip {
  margin-left: 10px;
}
.dance-music-musiclist-poptip {
  width: 90px;
  height: 30px;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &-light,
  &-green {
    background: #fff;
    box-shadow: 0 0 1px var(--border-tint);
  }
  &-dark {
    background: var(--dark-block-bg-color);
    box-shadow: 0 0 1px var(--border);
    color: #dcdde4;
    cursor: pointer;
  }
}
.pop-scroll {
  height: 300px;
}
.pop-container {
  padding: 10px 10px;
  &-dark {
    background: #2d2f33;
  }
  .cate-item {
    padding: 10px 0px;
    display: flex;
    align-items: flex-start;
    &-left {
      flex: 1;
      text-align: center;
      font-size: 18px;
      .iconfont {
        font-size: 18px;
        margin-right: 5px;
      }
    }
    &-right {
      flex: 5;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
::v-deep .vbestui-bubble-theme-dark {
  background: #2d2f33;
}
.menu {
  padding: 10px 10px;
  font-size: 13px;
  display: flex;
  &-title {
    width: 70px;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &-main {
    flex: 1;
  }
}
.all-musiclist {
  padding: 10px 0px 0px 0px;
  &-bottom {
    text-align: right;
  }
}
</style>