<template>
  <div class="simi">
      <artist-list :artist-list="artists"/>
  </div>
</template>
<script>
import ArtistList from "views/discover/childComps/ArtistList"
import { _getSimiArtist } from "network/artist";
export default {
  name: "SimiArtist",
  data() {
    return {
      artist: null,
      cookie: null,
      artists:[]
    };
  },
  components:{
      ArtistList
  },
  created() {
    this.artist = this.$store.state.artist;
    this.cookie = this.$store.state.cookie;
    if (this.artist != null) {
      if (this.cookie !== null&&this.cookie!='') {
        _getSimiArtist(this.cookie, this.artist.id).then(res => {
            this.artists=res.data.artists;
        });
      } else {
        this.$Message.warning("请先登陆");
      }
    }
  },
};
</script>
<style scoped>
</style>