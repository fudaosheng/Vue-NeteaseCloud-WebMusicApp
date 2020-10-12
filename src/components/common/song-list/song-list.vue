<template>
  <div class="table-list" v-if="musicList.length">
    <b-table  stripe :stripe-background-color="getStripeColor">
      <b-table-head
        slot="head"
        split
        :split-color="getSplitColor"
        v-if="showHead"
      >
        <b-table-tr>
          <b-table-td width="50px" v-if="lines[0]"></b-table-td>
          <b-table-td width="60px" v-if="lines[1]">操作</b-table-td>
          <b-table-td v-if="lines[2]">音乐标题</b-table-td>
          <b-table-td v-if="lines[3]">歌手</b-table-td>
          <b-table-td v-if="lines[4]">专辑</b-table-td>
          <b-table-td width="120px" v-if="lines[5]">时长</b-table-td>
        </b-table-tr>
      </b-table-head>
      <b-table-body slot="body" class="table-body">
        <b-table-tr
          :class="[newsongs ? 'dance-music-table-tr-newsongs' : '']"
          v-for="(item, index) in musicList"
          :key="index"
          @dblclick.native="handleDbclick(index)"
        >
          <b-table-td width="50px" v-if="lines[0]">
            <span
              v-show="
                !(player
                  ? index == playIndex && item.name == playName
                  : id == playId && index == playIndex && item.name == playName)
              "
              >{{ getListIndex(index) }}</span
            >
            <i
              class="iconfont icon-V"
              v-show="
                player
                  ? index == playIndex && item.name == playName
                  : id == playId && index == playIndex && item.name == playName
              "
              :class="`${'v-' + theme}`"
            ></i>
          </b-table-td>
          <b-table-td
            width="60px"
            v-if="lines[1]"
            class="dance-music-table-tr-td-two"
          >
            <i class="iconfont icon-xihuan" v-if="!newsongs" />
            <div class="dance-music-table-tr-td-two-card" v-if="newsongs">
              <img v-lazy="item.pic" alt="" />
              <div class="card-play">
                <i class="iconfont icon-icon_play"></i>
              </div>
            </div>
          </b-table-td>
          <b-table-td v-if="lines[2]">{{ item.name }}</b-table-td>
          <b-table-td v-if="lines[3]" class="table-list-body-artist">{{
            item.artist
          }}</b-table-td>
          <b-table-td v-if="lines[4]">{{ item.album }}</b-table-td>
          <b-table-td width="120px" v-if="lines[5]">{{ item.time }}</b-table-td>
        </b-table-tr>
      </b-table-body>
    </b-table>
  </div>
</template>
<script>
import { randomStr } from "utils/random";
import { theme } from "mixin/global/theme";
import { playMusic } from "mixin/global/play-music";
import { playing } from "player/playing";
export default {
  name: "TableList",
  mixins: [theme, playing, playMusic],
  props: {
    musicList: {
      type: Array,
      default: [],
    },
    /**判断显示哪几列 */
    lines: {
      type: Array,
      default: () => [true, true, true, true, true, true],
    },
    showHead: {
      type: Boolean,
      default: true,
    },
    /**如果是播放器内使用双击时只设置index，不提供musicList节省性能 */
    player: {
      type: Boolean,
      default: false,
    },
    /**是否是最新音乐页面使用 */
    newsongs: {
      type: Boolean,
      default: false,
    },
    length: {
      type: Number,
      default: null,
    },
  },
  computed: {
    /**table-head split 颜色 */
    getSplitColor() {
      let splitColor = "";
      splitColor = this.theme == "dark" ? "var(--dark-border-color)" : "var(--border)";
      return splitColor;
    },
    getLength() {
      return this.length;
    },
  },
  data() {
    return {
      refreshTag: 0, //判断什么时候发送刷新标记
      id: randomStr(),
    };
  },
  methods: {
    /**处理双击事件 */
    handleDbclick(index) {
      if (this.player) {
        this.$bus.$emit("PlayMusicListItem", index);
        return;
      }
      console.log("song-list:" + this.id);
      this.playMusic(index);
    },
    /**获取音乐列表下标 */
    getListIndex(index) {
      let currentIndex = 0;
      currentIndex = index < 9 ? "0" + (index + 1) : index + 1;
      if (currentIndex == this.getLength) {
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
.table-body {
  cursor: pointer;
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
.dance-music-table-tr-newsongs {
  display: flex;
  align-items: center;
}
.dance-music-table-tr-td-two {
  img {
    width: 100%;
    border-radius: 4px;
  }
  &-card {
    position: relative;
  }
  .card-play {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-icon_play {
      font-size: 14px;
      color: var(--main-color);
    }
  }
}
</style>