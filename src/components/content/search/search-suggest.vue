<template>
  <scroll class="search-suggest-scroll" ref="scroll">
    <div class="dance-music-search-suggest">
      <div class="search-suggest-title" v-if="keyword">
        搜索<span>{{ keyword }}</span
        >相关的结果>
      </div>
      <div class="search-suggest-list" :class="[`${'search-suggest-list-'+getTheme}`]">
        <dl>
          <dt v-if="songs && songs.length">
            <i class="iconfont icon-musicnoteeighth" />单曲
          </dt>
          <dd
            v-for="(item, index1) in songs"
            :key="index1+'songs'"
            v-if="songs && songs.length"
          >
            {{ item.name }}——{{ item.artists[0].name }}
          </dd>
          <dt v-if="artists && artists.length">
            <i class="iconfont icon-mansingle" />歌手
          </dt>
          <dd
            v-if="artists && artists.length"
            v-for="(item, index2) in artists"
            :key="index2+'artists'"
          >
            {{ item.name }}
          </dd>
          <dt v-if="albums && albums.length">
            <i class="iconfont icon-album-line" />专辑
          </dt>
          <dd
            v-if="albums && albums.length"
            v-for="(item, index3) in albums"
            :key="index3+'albums'"
          >
            {{ item.name }}——{{ item.artist.name }}
          </dd>
          <dt v-if="playlists && playlists.length">
            <i class="iconfont icon-gedan" />歌单
          </dt>
          <dd
            v-if="playlists && playlists.length"
            v-for="(item, index4) in playlists"
            :key="index4+'playlists'"
          >
            {{ item.name }}
          </dd>
        </dl>
      </div>
    </div>
  </scroll>
</template>
<script>
import { _Suggest } from "network/search";
import { debounce } from "utils/tool";
import Scroll from "common/scroll/Scroll";
export default {
  name: "SearchSuggest",
  components: { Scroll },
  props: {
    keyword: {
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
    };
  },
  computed:{
    getTheme(){
      return this.$store.getters.getTheme;
    }
  },
  methods: {
    /**关键字搜索 建议*/
    suggest() {
      _Suggest(this.keyword).then((res) => {
        const { albums, artists, playlists, songs } = res.data.result;
        this.albums = albums;
        this.artists = artists;
        this.playlists = playlists;
        this.songs = songs;
        console.log('----');
      });
    },
  },
  watch: {
    keyword() {
      console.log(this.keyword);
      if (this.keyword != "") {
        debounce(this.suggest(),500)();
      }
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
    &-light dd:hover{
      color: var(--light-text-tint);
    }
    &-green dd:hover{
      color:var(--green-text-tint);
    }
    &-dark dd:hover{
      color:var(--dark-text-tint)
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