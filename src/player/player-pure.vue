<template>
  <div
    :class="['player-pure', `${'player-pure-' + theme}`]"
    @mouseenter="handleRefresh"
  >
    <scroll class="scroll" ref="scroll" @pullingUp="pullingUp">
      <div class="player-pure-container">
        <b-button
          type="warning"
          class="iconfont icon-min"
          width="40px"
          @click="closePure"
        />
        <div :class="['player-pure-top', `${'player-pure-top-' + theme}`]">
          <div class="player-record">
            <div class="player-record-support">
              <img src="../assets/player/play-bar-support.png" alt="" />
            </div>
            <div class="player-record-bar" :style="barStyle">
              <img src="../assets/player/play-bar.png" alt="" />
            </div>
            <div class="player-pure-pic" :class="['player-pure-pic-' + theme]">
              <img v-lazy="song.pic" alt="" />
            </div>
          </div>
          <div class="player-pure-lyric">
            <lyric
              :lyric="lyric"
              height="400px"
              middle
              :current-time="currentTime"
            />
          </div>
        </div>
        <recommends :recommends="recommends" class="player-pure-recommends" />
      </div>
    </scroll>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme";
import {forcible} from "mixin/components/forcible-refresh"
import { _musicRecommend } from "network/detail";
import { debounce } from "utils/tool";
import Recommends from "views/list-detail/childsComps/Recommends";
import Scroll from "common/scroll/Scroll";

import Lyric from "./player-lyric";
export default {
  name: "PlayerPure",
  mixins: [theme,forcible],
  components: {
    Lyric,
    Recommends,
    Scroll,
  },
  props: {
    song: {
      type: Object,
      default() {
        return {};
      },
    },
    lyric: {
      type: String,
      default: "",
    },
    currentTime: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      recommends: null,
      limit: 20,
    };
  },
  watch: {
    song: {
      immidiate: true,
      handler(song) {
        if (song.id) this.getRecom();
      },
    },
  },
  computed: {
    barStyle() {
      return {
        transform: this.getIsPlay ? `rotate(-7deg)` : `rotate(-45deg)`,
      };
    },
    /**获取是否正在播放歌曲 */
    getIsPlay() {
      return this.$parent.isPlay;
    },
  },
  methods: {
    /**关闭纯净模式 */
    closePure() {
      this.$parent.isPure = false;
    },
    /**上拉加载更多 */
    async pullingUp() {
      this.limit += 20;
      await debounce(this.getRecom(), 1000);
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    /**获取歌曲评论 */
    getRecom() {
      _musicRecommend(this.song.id, this.limit).then((res) => {
        this.recommends = res.data.comments;
        this.$refs.scroll.refresh();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: calc(100vh - 58px - 60px);
}
.player-pure {
  width: 100%;
  height: calc(100vh - 58px - 60px);
  position: absolute;
  z-index: 2;
  left: 0px;
  bottom: 60px;
  &-light,
  &-green {
    background: #fff;
  }
  &-dark {
    background: var(--dark-bg-color);
  }
  &-container {
    padding: 0px 250px;
  }
  &-recommends {
    margin-top: 20px;
  }
}
.icon-min {
  font-weight: 700;
  position: absolute;
  right: 200px;
  top: 10px;
}
.player-pure-top {
  height: 400px;
  display: flex;
  &-light,
  &-green {
    background: radial-gradient(closest-side, #928e8d, #fff);
  }
  &-dark {
    background: radial-gradient(closest-side, #3c3532, #16181c);
  }
}
.player-record {
  flex: 1;
  position: relative;
  &-support {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    z-index: 3;
    left: 0px;
    right: 0px;
    top: 0px;
    margin: auto;
    img {
      width: 100%;
    }
  }
  &-bar {
    width: 80px;
    transform-origin: 0 0;
    transform: rotate(-7deg);
    transition: transform 0.3s;
    position: absolute;
    z-index: 2;
    left: 49%;
    top: 17px;
    img {
      width: 100%;
    }
  }
}
.player-pure-lyric {
  flex: 1;
}
.player-pure-pic {
  width: 240px;
  height: 240px;
  border: 40px solid #0e0e11;
  border-radius: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 60px;
  margin: auto;
  animation: rotate 20s linear infinite;
  &-light,
  &-green {
    box-shadow: 0 0 10px #918a85;
  }
  &-dark {
    box-shadow: 0 0 10px #f9f9f9;
  }
  img {
    width: 100%;
    border-radius: 50%;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
</style>