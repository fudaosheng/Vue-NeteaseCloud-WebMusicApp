<template>
  <div class="album-list">
    <div class="hot50">
      <p>{{album.name}}</p>
      <div class="left">
        <div class="icon">
          <img :src="album.picUrl" alt />
        </div>
      </div>
      <div class="right">
        <div class="music">
          <table>
            <tbody>
              <tr
                v-for="(item,index) in musiclist"
                :key="index"
                :class="{backColor:setBackColor(index)}"
                @dblclick="albumClick(index)"
              >
                <td :class="{curFont:playIndex==index}">{{setSerial(index)}}
                        <div class="curPlay" v-show="playIndex==index"><img src="~assets/img/playmusic/currentplay.svg" alt=""></div>
                    </td>
                <td>
                  <img src="~assets/img/leftmenu/live.svg" alt class="live" />
                  <img src="~assets/img/leftmenu/xiazai.svg" alt class="xiazai" />
                </td>
                <td>{{item.name}}</td>
                <td>{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 浮动会使元素脱标，在所有浮动元素后面加一个块状元素，并设置clear:both清除浮动造成的父元素高度撑不起来问题 -->
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import { _getAlbum } from "network/artist";
import { tableMixin } from "views/musicListDetail/childComps/tableMixin";
import { _getSongsDetail, songDetail } from "network/detail";
import {indexMixin} from "views/musicListDetail/indexMixin"
import { playMixin } from "views/musicListDetail/playMixin";
export default {
  name: "ArtistAlbumList",
  props: {
    album: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      musiclist: [],
      fold: true
    };
  },
  mixins: [tableMixin,indexMixin,playMixin],
  created() {
    if (this.album != null) {
      _getAlbum(this.album.id).then(res => {
        //   console.log( res.data.songs);
          
        for (let i of res.data.songs) {
          _getSongsDetail(i.id).then(res => {
            let song = new songDetail(res.data.songs);
            this.musiclist.push(song);
          });
        }
      });
    }
  },
  methods:{
      albumClick(index){
          this.PlayMusic(index);
      }
  }
};
</script>
<style scoped>
.album-list {
  width: 100%;
  margin-top: 50px;
}
.left {
  width: 20%;
  float: left;
}
.icon {
  width: 100%;
}
.icon img {
  width: 60%;
}
.right {
  width: 75%;
  float: left;
  position: relative;
}
.hot50 {
  width: 100%;
}
.music table {
  width: 100%;
  border: 1px solid #2c2e32;
}
.music thead {
  color: #828385;
  font-size: 12px;
}
.music tr {
  height: 30px;
  text-align: left;
}
.music tr:hover {
  background-color: #2c2e32;
  color: #fff;
}
.music tr td {
  border: 1px solid #23262c;
  position: relative;
}
.music tbody {
  font-size: 13px;
  color: #575757;
}
.music tr td:nth-child(1) {
  width: 50px;
  text-align: center;
}
.music tr td:nth-child(2) {
  width: 80px;
}
.music tr td:nth-child(2) img {
  width: 20px;
  opacity: 0.6;
}
.music tbody tr td:nth-child(3) {
  color: #dcdde4;
}
.music tbody tr td:nth-child(4) {
  text-align: right;
  padding-right: 20px;
}
.music tr td .live {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.music tr td .xiazai {
  margin-left: 26px;
}
.music tr td:nth-child(6) {
  width: 180px;
}
.music tbody tr td {
  border: none;
}
.backColor {
  background: #1a1c20;
}
p {
  font-size: 14px;
  padding-left: 20%;
  color: #dcdde4;
}
.clear {
  clear: both;
}
.fold {
  height: 320px;
  overflow: hidden;
}
</style>