<template>
  <div class="artist-base-info" v-if="Object.keys(artist).length">
    <div class="left">
      <img v-lazy="artist.picUrl" alt />
    </div>
    <div class="right">
      <h3>
        <b-tag color="var(--main-color)" plain>歌手</b-tag>
        {{ artist.name }}
      </h3>
      <div class="desc">
        <p><span>单曲数：</span>{{ artist.musicSize }}</p>
        <p><span>专辑数：</span>{{ artist.albumSize }}</p>
        <p><span>MV数：</span>{{ mvCount }}</p>
        <p class="desc-title"><span>简介：</span>{{ desc }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { _getArtistDesc } from "network/artist";
export default {
  name: "ArtistBaseinfo",
  props: {
    artist: {
      type: Object,
      default: {},
    },
    mvCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      desc: "",
    };
  },
  methods: {},
  watch: {
    artist: {
      handler() {
        _getArtistDesc(this.artist.id).then((res) => {
          this.desc = res.data.briefDesc;
        });
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.artist-base-info {
  width: 100%;
  padding: 10px 20px;
  display: flex;
  position: relative;
  .left {
    width: 200px;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    padding-left: 35px;
    h3 {
      padding: 5px 0px;
    }
  }
}
.desc {
  padding: 10px 0px;
  font-size: 13px;
  p {
    padding: 3px 0px;
  }
  span {
    color: var(--tag-color);
  }
  &-title {
    padding-top: 14px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>