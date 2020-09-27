<template>
  <div class="player-lyric" :style="lyricStyle">
    <scroll :disable-bar="disableBar" :height="height" ref="scroll">
      <ul>
        <li
          v-for="(line, index) in lyricArray"
          :key="index"
          :class="[index == lyricIndex ? `${'player-action-' + theme}` : '']"
        >
          {{ line[1] }}
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme";
import { parseLyric } from "utils/parse-lyric";
import Scroll from "common/scroll/Scroll";
import { lyricItem } from "./init-songs";
export default {
  name: "Lyric",
  mixins: [theme],
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
  },
  data() {
    return {
      lyricArray: [], //转换后的歌词数组
      lyricIndex: -1, //活跃的歌词行数
      maxIndex: 0,
      length: 0,
    };
  },
  watch: {
    lyric() {
      this.lyricIndex = -1;
      this.maxIndex = 0;
      this.$refs.scroll.scrollTo(0, 0, true)
      /**格式化歌词 */
      this.lyricArray = parseLyric(this.lyric);
    },
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
          this.$refs.scroll.scrollTo(-30 * this.lyricIndex, 0, false);
        }
      }
    },
  },
  methods: {
    /**利用currentTime和格式化后歌词时间对比滚动
     * @param time 播放歌曲的currentTime
     * @param duration 滚动时间
     */
    scrollLyric(time = 0, duration) {
      if (this.lyricIndex > this.length - 2) return;
      if (time >= this.lyricArray[this.lyricIndex + 1].time) {
        this.lyricIndex++;
        this.$refs.scroll.scrollTo(-30 * this.lyricIndex, duration, false);
      }
    },
    maxScroll(time = 0) {
      if (this.lyricIndex > this.length - 2) return;
      if (time >= this.lyricArray[this.lyricIndex + 1].time) {
        this.lyricIndex++;
        if (
          this.lyricIndex < 5 ||
          this.lyricIndex >= this.lyricArray.length - 5
        )
          return;
        this.maxIndex++;
        this.$refs.scroll.scrollTo(-30 * this.lyricIndex, 2, false);
      }
    },
  },
  computed: {
    lyricStyle() {
      return {
        height: this.height,
      };
    },
  },
};
</script>
<style scoped>
.player-lyric {
  display: inline-block;
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
}
.player-action-light {
  font-size: 28px;
  color:var(--primary);
}
.player-action-dark {
  font-size: 28px;
  color: #b82525;
}
.player-action-green {
  font-size: 28px;
  color: var(--green-main-color);
}
</style>