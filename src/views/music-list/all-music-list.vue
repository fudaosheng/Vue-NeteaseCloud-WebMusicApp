<template>
  <scroll class="scroll">
    <div :class="[`${program + 'all-musiclist'}`]">
      <b-poptip placement="bottom-start" :theme="getTheme" max-length="520px">
        <div
          :class="[
            `${program + 'musiclist-poptip'}`,
            `${program + 'musiclist-poptip-' + theme}`,
          ]"
        >
          <span>全部歌单</span>
          <i class="vbestui-iconfont icon-qian"></i>
        </div>
        <template v-slot:title>
          <div class="pop-title">全部歌单分类</div>
        </template>
        <template v-slot:content>
          <scroll class="pop-scroll" ref="scroll">
            <div :class="['pop-container',`${'pop-container-'+theme}`]" @mouseenter="handleRefresh">
              <d-button size="long" height="35px" round>全部歌单</d-button>
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
                    >{{ cate.name }}</d-button
                  >
                </div>
              </div>
            </div>
          </scroll>
        </template>
      </b-poptip>
      <div class="menu">
        <span>热门标签：</span>
      </div>
    </div>
  </scroll>
</template>
<script>
import { theme } from "mixin/global/theme";
import { forcible } from "mixin/components/forcible-refresh";

import { _getCatList } from "network/music-list";

import DButton from "common/button/Button";
import Scroll from "common/scroll/Scroll";
export default {
  name: "AllMusicList",
  mixins: [theme, forcible],
  components: { Scroll, DButton, Scroll },
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
    };
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
  &-dark{
    background:#2d2f33;
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
::v-deep .vbestui-bubble-theme-dark{
  background:#2d2f33;
}
.menu{
  padding: 10px 0px;
  font-size:13px;
  border:1px solid red;
}
</style>