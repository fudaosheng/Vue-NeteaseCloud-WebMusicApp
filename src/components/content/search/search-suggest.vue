<template>
  <scroll class="search-suggest-scroll" ref="scroll">
    <div class="dance-music-search-suggest">
      <div class="search-suggest-title" v-if="keywords">
        搜索<span>{{ keywords }}</span
        >相关的结果>
      </div>
      <div
        class="search-suggest-list"
        :class="[`${'search-suggest-list-' + getTheme}`]"
      >
        <dl>
          <dt v-if="songs && songs.length">
            <i class="iconfont icon-musicnoteeighth" />单曲
          </dt>
          <dd
            v-for="(item, index1) in songs"
            :key="index1 + 'songs'"
            v-if="isShowSongs"
            @click="handleSongsClick(index1)"
          >
            {{ item.name }}——{{ item.artists[0].name }}
          </dd>
          <dt v-if="artists && artists.length">
            <i class="iconfont icon-mansingle" />歌手
          </dt>
          <dd
            v-if="artists && artists.length"
            v-for="(item, index2) in artists"
            :key="index2 + 'artists'"
            @click="handleArtistClick(index2)"
          >
            {{ item.name }}
          </dd>
          <dt v-if="albums && albums.length">
            <i class="iconfont icon-album-line" />专辑
          </dt>
          <dd
            v-if="albums && albums.length"
            v-for="(item, index3) in albums"
            :key="index3 + 'albums'"
            @click="handleAlbumClick(index3)"
          >
            {{ item.name }}——{{ item.artist.name }}
          </dd>
          <dt v-if="playlists && playlists.length">
            <i class="iconfont icon-gedan" />歌单
          </dt>
          <dd
            v-if="playlists && playlists.length"
            v-for="(item, index4) in playlists"
            :key="index4 + 'playlists'"
            @click="handlePlayListClick(index4)"
          >
            {{ item.name }}
          </dd>
        </dl>
      </div>
    </div>
  </scroll>
</template>
<script>
import { _getSongsDetail, songDetail } from "network/detail";
import { _Suggest } from "network/search";

import { playMusic } from "mixin/global/play-music";
import { debounce } from "lodash";
import Scroll from "common/scroll/Scroll";
export default {
  name: "SearchSuggest",
  components: { Scroll },
  mixins: [playMusic],
  props: {
    keywords: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      albums: [], //专辑列表
      artists: [], //歌手列表
      playlists: [], //歌单列表
      songs: [], //单曲列表
      musicList: [], //歌曲列表，单曲播放用
    };
  },
  computed: {
    isShowSongs() {
      return this.songs && this.songs.length;
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
  methods: {
    /**关键字搜索 建议*/
    suggest: debounce(function () {
      if (!this.keywords) {
        return;
      }
      _Suggest(this.keywords).then((res) => {
        const { albums, artists, playlists, songs } = res.data.result;
        this.albums = albums;
        this.artists = artists;
        this.playlists = playlists;
        this.songs = songs;
      });
    }, 500),
    /**处理搜索建议歌单点击 */
    handlePlayListClick(index) {
      this.$router.push(
        "/musiclistdetail/" +
          this.playlists[index].id +
          "/" +
          new Date().getTime()
      );
      this.$emit("hidden");
    },
    /**搜索建议歌手点击 */
    handleArtistClick(index) {
      this.$router.push({
        path: "/artist-detail",
        query: {
          artist: this.artists[index],
        },
      });
      this.$emit("hidden");
    },
    /**专辑点击 */
    handleAlbumClick(index) {
      this.$router.push({
        path: "/album-detail",
        query: {
          album: this.albums[index],
        },
      });
      this.$emit("hidden");
    },
    /**处理搜索建议单曲点击
     * 点击单曲直接逼疯
     */
    async handleSongsClick(index) {
      /**获取歌曲详情 */
      await _getSongsDetail(this.songs[index].id).then((res) => {
        let song = new songDetail(res.data.songs);
        this.musicList.push(song);
      });
      this.playMusic();
      this.$emit("hidden");
    },
  },
  watch: {
    keywords: {
      handler() {
        this.suggest();
      },
      immediate: false,
    },
  },
};
</script>
<style lang="less" scoped>
.search-suggest-scroll {
  max-height: 530px;
}
.dance-music-search-suggest {
  width: 400px;
  padding: 5px 20px 0px 20px;
  font-size: 13px;
  line-height: initial;
  text-align: initial;
  span {
    color: var(--tag-color);
  }
}
.search-suggest {
  &-title {
    padding: 5px 0px;
  }
  &-list {
    .iconfont {
      margin-right: 5px;
    }
    &-light dd:hover {
      color: var(--light-text-tint);
    }
    &-green dd:hover {
      color: var(--green-text-tint);
    }
    &-dark dd:hover {
      color: var(--dark-text-tint);
    }
    dl {
      dt {
        padding: 5px 0px;
      }
      dd {
        padding: 5px 20px;
        cursor: pointer;
      }
    }
  }
}
</style>