<template>
  <div
    class="rank-item"
    v-if="musicListDetail != null && rankId != null"
    @click="enterDetail()"
  >
    <div
      class="rank-item-top"
      :style="{
        background:
          'linear-gradient(to right,' + bgColor[0] + ',' + bgColor[1] + ')',
      }"
    >
      <div class="left">
        <div class="left-itemF">
          <i>{{ title[0] }}</i>
        </div>
        <div class="set">
          <div class="left-item">
            <i>{{ title[1] }}</i>
          </div>
          <div class="left-item">
            <i>{{ title[2] }}</i>
          </div>
          <div class="update">{{ getUpdateTime }}</div>
        </div>
      </div>
      <div class="right">
        <i class="iconfont icon-bofang"></i>
      </div>
    </div>
    <div class="center">
      <b-table stripe :stripe-background-color="getStripeColor">
        <b-table-body slot="body" class="table-body">
          <b-table-tr
            v-for="(item, index) in musiclist"
            :key="index"
            :class="[`${'ranklist-tr-' + theme}`]"
          >
            <b-table-td width="50px" :class="[index <= 2 ? 'active' : '']">
              {{ "0" + (index + 1) }}
            </b-table-td>
            <b-table-td>{{ item.name }}</b-table-td>
            <b-table-td class="table-list-body-artist">{{
              item.artist
            }}</b-table-td>
          </b-table-tr>
        </b-table-body>
      </b-table>
    </div>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme";
import {
  _getMusicListDetail,
  _getSongsDetail,
  songDetail,
} from "network/detail";
import { formatDate } from "utils/tool";

export default {
  name: "RankListItem",
  mixins: [theme],
  props: {
    rankId: {
      type: Number,
      default() {
        return 0;
      },
    },
    bgColor: {
      type: Array,
      defaule() {
        return [];
      },
    },
    title: {
      type: Array,
      defaule() {
        return [];
      },
    },
  },
  data() {
    return {
      musiclist: [],
      musicListDetail: null,
    };
  },
  mounted() {
    if (this.rankId != null) {
      _getMusicListDetail(this.rankId).then((res) => {
        this.musicListDetail = res.data;
        /**遍历查询歌单所有歌曲详情 */
        for (let i of this.musicListDetail.playlist.trackIds.slice(0, 8)) {
          _getSongsDetail(i.id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musiclist.push(song);
            /**刷新scroll */
            if (
              this.musiclist.length == 8 &&
              this.getTitleString.indexOf("热") == 0
            ) {
              this.$emit("refresh");
            }
          });
        }
      });
    }
  },
  computed: {
    getUpdateTime() {
      let time = this.musicListDetail.playlist.updateTime;
      return formatDate(new Date(time), "MM月dd日");
    },
    getTitleString() {
      return this.title.toString();
    },
  },
  methods: {
    enterDetail() {
      this.$router.push(
        "/musiclistdetail/" + this.rankId + "/" + new Date().getTime()
      );
    },
  },
};
</script>
<style lang="less" scoped>
.rank-item {
  cursor: pointer;
  width: calc(30%);
  height: 400px;
  margin-right: 25px;
}
.rank-item-top {
  width: 100%;
  height: 100px;
  position: relative;
}
.table-list-body-artist {
  text-align: right;
}
.rank-item-top .left {
  width: 200px;
  padding: 0px 25px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  color: #fff;
}
.left-itemF {
  font-size: 54px;
  margin-right: 10px;
}
.set {
  display: flex;
  position: relative;
}
.update {
  width: 100px;
  position: absolute;
  left: 5px;
  top: 15px;
}
.left-item {
  font-size: 26px;
  margin-top: -20px;
}
.right {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 20px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  color: #fff;
}
.iconfont {
  font-size: 42px;
}
.center {
  width: 100%;
}
.center .table-body {
  width: 100%;
  font-size: 13px;
  color: #575757;
}
.ranklist-tr {
  &-dark:hover {
    background-color: #2c2e32;
    color: #fff;
  }
  &-light:hover,
  &-green:hover {
    background: #ebeced !important;
  }
}
.active {
  color: var(--main-color);
}
</style>