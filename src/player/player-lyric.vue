<template>
  <div class="player-lyric" :style="lyricStyle" @mouseenter="handleRefresh">
    <scroll
      :disable-bar="disableBar"
      :height="height"
      disable-wheel
      @moveStart="isDarg = true"
      @moveEnd="isDarg = false"
      ref="scroll"
    >
      <ul>
        <li
          v-for="(line, index) in lyricArray"
          :key="index"
          :class="[
            index == lyricIndex ? `${'player-action-' + theme}` : '',
            middle ? 'player-action-middle' : '',
          ]"
        >
          {{ line[1] }}
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import {forcible} from "mixin/components/forcible-refresh"
import { theme } from "mixin/global/theme";
import { parseLyric } from "utils/parse-lyric";
import Scroll from "common/scroll/Scroll";
import { lyricItem } from "./init-songs";
export default {
  name: "Lyric",
  mixins: [theme,forcible],
  components: { Scroll },
  props: {
    disableBar: {
      type: Boolean,
      default: false,
    },
    lyric: {
      type: String,
      default() {
        return "";
      },
    },
    height: {
      type: String,
      default: "",
    },
    currentTime: {
      type: Number,
      default: 0,
    },
    /**列表还是一行
     * 列表当前歌词在中间时才滚动
     * true是列表形式，字体较小
     */
    middle: {
      type: Boolean,
      default: false,
    },
    /**在middle为true时，即列表形式歌单时有效，
     * 作用：设置第几行歌词滚动
     * 同时动态计算此时歌词列表高度
     */
    scrollNum: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      lyricArray: [], //转换后的歌词数组
      lyricIndex: -1, //活跃的歌词行数
      midIndex: 0,
      length: 0,
      isDarg: false, //是否在拖动歌词进度条，true的话禁用歌词scrollTo
    };
  },
  watch: {
    lyric() {
      this.lyricIndex = -1;
      this.midIndex = 0;
      this.$refs.scroll.scrollTo(0, 0, true);
      /**格式化歌词 */
      this.lyricArray = parseLyric(this.lyric);
      /**歌词改变，歌词列表刷新后重新计算刷新滚动条 */
      this.$nextTick(() => {
        this.refresh();
        /**歌曲切换歌词滚动到最顶部 */
        this.$refs.scroll.scrollTo(0, 0);
      });
    },
    /**监听歌曲播放时间，滚动歌词 */
    currentTime(currentTime) {
      /**歌词对应时间判断 */
      for (let i = 0; i < this.lyricArray.length; i++) {
        const line = this.lyricArray[i];
        const nextLine = this.lyricArray[i + 1];
        /**如果歌曲currentTime大于当前行歌曲时间，并且，下一行不为空或者当前currentTime小于下一行时间 */
        if (
          currentTime >= line[0] &&
          (!nextLine || currentTime < nextLine[0])
        ) {
          this.lyricIndex = i;
          /**如果歌词展示形式为列表，需要活跃歌词在中间时才滚动 */
          if (this.middle) {
            /**list形式时，活跃歌词不到中间不滚动 */
            if (
              this.lyricIndex < this.scrollNum ||
              this.lyricIndex > this.lyricArray.length - this.scrollNum
            )
              return;

            /**拖动进度条小球时不能自动滚动 */
            if (!this.isDarg) {
              this.$refs.scroll.scrollTo(
                -30 * (this.lyricIndex - this.scrollNum),
                2,
                false
              );
            }
          } else {
            this.$refs.scroll.scrollTo(-30 * this.lyricIndex, 0, false);
          }
        }
      }
    },
  },
  methods: {
    /**刷新scroll */
    refresh() {
      this.$refs.scroll.refresh();
    },
  },
  computed: {
    lyricStyle() {
      return {
        height: this.middle
          ? `${(this.scrollNum * 2 + 1) * 30}px`
          : this.height,
      };
    },
  },
};
</script>
<style scoped>
.player-lyric {
  padding: 0px 20px;
  overflow: hidden;
}
.player-lyric ul {
  text-align: center;
  list-style-type: none;
}
.player-lyric ul li {
  height: 30px;
  line-height: 30px;
  padding: 5px 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.player-action-light {
  font-size: 28px;
  color: var(--primary);
}
.player-action-dark {
  font-size: 28px;
  color: #b82525;
}
.player-action-green {
  font-size: 28px;
  color: var(--green-main-color);
}
/* list 形式时middle为true--改变字号 */
.player-action-middle {
  font-size: 13px;
  text-align: left;
}
</style>