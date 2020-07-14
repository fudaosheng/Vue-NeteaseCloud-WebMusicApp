<template>
  <div class="search" @mouseleave="leave()">
    <div class="search-item">
        <input type="text" class="mess" v-model="keywords" @focus="focus()" @keydown.enter="keyEnter()"/>
      <div class="search-icon" @click="keyEnter()">
        <img src="~assets/img/content/search.svg" alt />
      </div>
    </div>
    <hot-search :searchlist="searchlist" v-show="isShow" @del="del" @recordClick="recordClick" />
    <div class="suggest" v-show="isSuggest">
      <div class="top">
        搜索
        <span>"{{keywords}}"</span>相关的结果>
      </div>
      <dl>
        <dt>
          <div class="icon">
            <img src="~assets/img/leftmenu/music-line.svg" alt />
          </div>
          <div class="tit">单曲</div>
        </dt>
        <dd v-for="(item,index) in sugSongs" :key="index+'song'" @click="enterSearch(item.name)">
          {{item.name}}——{{item.artists[0].name}}</dd>
        <dt>
          <div class="icon">
            <img src="~assets/img/content/profile-o.svg" alt />
          </div>
          <div class="tit">歌手</div>
        </dt>
        <dd v-for="(item,index) in sugArtist" :key="index" @click="enterArtist(item)">{{item.name}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
import HotSearch from "./hotSearch";
import { _Suggest } from "network/search";
import { debounce } from "assets/common/tool";
export default {
  name: "MusicSearch",
  data() {
    return {
      searchlist: ["海底", "世间美好与你环环相扣", "灰狼"],
      isShow: false,
      isSuggest: false,
      keywords: "",
      sugSongs: [],
      sugArtist: []
    };
  },
  components: {
    HotSearch
  },
  watch: {
    keywords() {
      if (this.keywords != "") {
        this.isShow = false;
        this.isSuggest = true;
        this.suggest();
      }
    }
  },
  methods: {
    focus() {
      this.isShow = true;
    },
    leave() {
      this.isShow = false;
      this.isSuggest = false;
    },
    del() {
      this.searchlist = [];
    },
    keyEnter(){
        if(this.keywords==''||this.keywords==null) return ;
        this.$router.push("/search/" + this.keywords); 
        this.searchlist.unshift(this.keywords);
        this.keywords='';
        this.isSuggest=false;
        this.isShow=false;
    },
    recordClick(index) {
      this.$router.push("/search/" + this.searchlist[index]);
      this.isShow = false;
    },
    enterSearch(name){
        this.$router.push("/search/" + name);
      this.isSuggest = false; 
    },
    enterArtist(artist){
        this.$router.push({
        path: "/artist",
        query: {
          artist: artist
        }
      });
      this.$store.commit('addArtist',artist);
    },
    suggest() {
      _Suggest(this.keywords).then(res => {
        this.sugSongs = res.data.result.songs;
        this.sugArtist = res.data.result.artists;
      });
    }
  }
};
</script>
<style scoped>
.search {
  height: 100%;
  width: 230px;
  margin-left: 100px;
  display: inline-block;
  position: relative;
}
.search-item {
  line-height: 54px;
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  border-radius: 10px;
}

.mess {
  outline-style: none;
  color: #333;
  line-height: 16px;
  background: transparent;
  position: absolute;
  width: 80%;
  height: 100%;
  padding: 0px 10px;
  border: #f6f6f6;
  border-radius: 10px;
}
.search-icon {
    cursor: pointer;
  position: absolute;
  right: 2px;
  top: -2px;
}
.suggest {
  width: 400px;
  background: #2d2f33;
  position: absolute;
  top: 54px;
  z-index: 4;
  padding: 10px;
  color: #828385;
}
.top {
  font-size: 13px;
}
.top span {
  color: #2e6bb0;
}
dl {
  width: 100%;
  font-size: 13px;
}
dl dt {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding: 5px 8px;
  background: #303236;
}
dl dd {
  padding: 5px 31px;
}
dd:hover {
  background: #2a2c30;
}
.icon {
  width: 16px;
  height: 16px;
}
.icon img {
  width: 100%;
}
.tit {
  margin-left: 8px;
  color: #dcdde4;
}
</style>