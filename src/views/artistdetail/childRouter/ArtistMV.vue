<template>
  <div class="artist-mv">
    <mv-item :mv-list="mvList" class="mv" />
  </div>
</template>
<script>
import MvItem from "views/mv/childComps/MVItem";
import { _getArtistMv } from "network/artist";
import { MV } from "network/mv";
export default {
  name: "ArtistMv",
  data() {
    return {
      artist: null,
      mvList: []
    };
  },
  components: {
    MvItem
  },
  created() {
    this.artist = this.$route.query.artist || this.$store.state.artist;
    _getArtistMv(this.artist.id).then(res => {
      let mvs = res.data.mvs;
      for (let i in mvs) {
        let mv = new MV(
          mvs[i].id,
          mvs[i].imgurl,
          mvs[i].name,
          mvs[i].artistName,
          mvs[i].playCount
        );
        this.mvList.push(mv);
      }
    });
  }
};
</script>
<style scoped>
.artist-mv {
  width: 100%;
}
.mv {
  padding-right: 40px;
}
</style>