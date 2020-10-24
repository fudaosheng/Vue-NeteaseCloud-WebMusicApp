<template>
  <div class="simi">
    <artist-list :artist-list="artists" @refresh="handleRefresh"/>
  </div>
</template>
<script>
import ArtistList from "content/artist-list/artist-list";
import { _getSimiArtist } from "network/artist";
export default {
  name: "ArtistSimi",
  data() {
    return {
      artists: [],
    };
  },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  components: {
    ArtistList,
  },
  computed: {
    getCookie() {
      return this.$store.getters.getCookie;
    },
  },
  methods: {
    initRequest() {
      _getSimiArtist(this.getCookie, this.id).then((res) => {
        this.artists = res.data.artists;
      });
    },
    handleRefresh(){
      this.$emit('refresh');
    }
  },
  created() {
    if (this.id != 0) {
      if (this.getCookie) {
        this.initRequest();
      } else {
        this.$Toast.warning("请先登陆");
      }
    }
  },
  watch: {
    id() {
      if (this.getCookie) {
        this.initRequest();
      } else {
        this.$Toast.warning("请先登陆");
      }
    },
  },
};
</script>
<style scoped>
</style>