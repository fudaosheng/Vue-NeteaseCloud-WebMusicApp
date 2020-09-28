<template>
  <div class="table-list" v-if="musicList.length">
    <b-table show-border stripe :stripe-background-color="getStripeColor" :height="height">
      <b-table-head slot="head" split :split-color="getSplitColor">
        <b-table-tr>
          <b-table-td width="50px" v-if="lines[0]"></b-table-td>
          <b-table-td width="60px" v-if="lines[1]">操作</b-table-td>
          <b-table-td v-if="lines[2]">音乐标题</b-table-td>
          <b-table-td v-if="lines[3]">歌手</b-table-td>
          <b-table-td v-if="lines[4]">专辑</b-table-td>
          <b-table-td width="120px" v-if="lines[5]">时长</b-table-td>
        </b-table-tr>
      </b-table-head>
      <b-table-body slot="body">
        <b-table-tr v-for="(item, index) in musicList" :key="index">
          <b-table-td width="50px" v-if="lines[0]">
            <span v-show="!(index == playIndex && item.name == playName)">{{
              getListIndex(index)
            }}</span>
            <i
              class="iconfont icon-V"
              v-show="index == playIndex && item.name == playName"
              :class="`${'v-' + theme}`"
            ></i>
          </b-table-td>
          <b-table-td width="60px" v-if="lines[1]"
            ><i class="iconfont icon-xihuan"></i
          ></b-table-td>
          <b-table-td v-if="lines[2]">{{ item.name }}</b-table-td>
          <b-table-td v-if="lines[3]">{{ item.artist }}</b-table-td>
          <b-table-td v-if="lines[4]">{{ item.album }}</b-table-td>
          <b-table-td width="120px" v-if="lines[5]">{{ item.time }}</b-table-td>
        </b-table-tr>
      </b-table-body>
    </b-table>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme";
import { playing } from "player/playing";
export default {
  name: "TableList",
  mixins: [theme, playing],
  props: {
    musicList: {
      type: Array,
      default: [],
    },
    height:{
      type:String,
      default:""
    },
    lines:{
      type:Array,
      default:()=> [true,true,true,true,true,true]
    }
  },
  computed: {
    /**table-head split 颜色 */
    getSplitColor() {
      let splitColor = "";
      splitColor = this.theme == "dark" ? "var(--border-tt)" : "var(--border)";
      return splitColor;
    },
  },
  methods: {
    /**获取音乐列表下标 */
    getListIndex(index) {
      let currentIndex = 0;
      currentIndex = index < 9 ? "0" + (index + 1) : index + 1;
      if (currentIndex == this.musicList.length) {
        this.$emit("refresh");
      }
      return currentIndex;
    },
  },
};
</script>
<style lang="less" scoped>
.table-list {
  width: 100%;
  font-size: 13px;
}
.v {
  &-light {
    color: var(--primary);
  }
  &-dark {
    color: var(--main-color);
  }
  &-green {
    color: var(--green-main-color);
  }
}
</style>