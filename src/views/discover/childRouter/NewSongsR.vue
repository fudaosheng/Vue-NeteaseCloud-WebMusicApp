<template>
  <div class="newsongs">
    <div class="area">
      <div
        class="area-item"
        v-for="(item,index) in area"
        :key="index"
        @click="areaClick(index)"
        :class="{action:areaIndex==index}"
      >{{item.name}}</div>
    </div>
    <scroll ref="scroll" class="new-scroll" :pull-up-load="true" @pullingUp="pullingUp">
      <div class="content" @click="musicItemClick(0)">
        <div class="bofang">
          <img src="~assets/img/playmusic/rebofang.svg" alt />
          播放全部
        </div>
        <div class="music">
          <table>
            <tbody>
              <tr
                v-for="(item,index) in musiclist"
                :key="index"
                :class="{backColor:setBackColor(index)}"
                @dblclick="musicItemClick(index)"
              >
                <td>{{setSerial(index)}}</td>
                <td>
                  <div class="bagc">
                    <img :src="item.pic" alt @load="imgLoad()" />
                    <div class="icon">
                      <img src="~assets/img/playmusic/bofang.svg" alt />
                    </div>
                  </div>
                </td>
                <td>{{item.name}}</td>
                <td>{{item.album}}</td>
                <td>{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import { _getTopSongs } from "network/discover";
import { _getSongsDetail, songDetail } from "network/detail";
import { tableMixin } from "views/musicListDetail/childComps/tableMixin";
import { indexMixin } from "views/musicListDetail/indexMixin";
import { debounce } from "assets/common/tool";
export default {
  name: "NewSongs",
  data() {
    return {
      imgCurrent: 0,
      areaIndex: 0,
      area: [
        { value: 0, name: "全部" },
        { value: 7, name: "华语" },
        { value: 96, name: "欧美" },
        { value: 16, name: "韩国" },
        { value: 8, name: "日本" }
      ],
      page: 1,
      list: [],
      musiclist: []
    };
  },
  components: {
    Scroll
  },
  mixins: [tableMixin, indexMixin],
  created() {
    this.getTopSongs();
  },
  methods: {
    areaClick(index) {
      this.areaIndex = index;
      this.getTopSongs(true);
    },
    pullingUp() {
      debounce(this.getTopSongs(), 1000);
    },
    getTopSongs(clear = false) {
      if (clear) this.musiclist = [];
      _getTopSongs(this.area[this.areaIndex].value).then(res => {

        this.list = res.data.data.slice(0, this.page * 30);
        for (let i of this.list) {
          _getSongsDetail(i.id).then(res => {
            let song = new songDetail(res.data.songs);
            this.musiclist.push(song);
          });
        }

        this.page++;
        this.$refs.scroll.finishPullUp();
      });
    },
    imgLoad() {
      if (this.imgCurrent == this.musiclist.length - 1) {
        this.$refs.scroll.refresh();
      }
    },
    musicItemClick(index) {
      this.PlayMusic(index);
    }
  }
};
</script>
<style scoped>
.newsongs {
  height: 100%;
  width: 100%;
}
.new-scroll {
  height: calc(100% - 45px);
  overflow: hidden;
}
.area {
  display: flex;
  border-bottom: 1px solid #25272b;
}
.area-item {
  padding: 10px 10px;
}
.action {
  color: #b82525;
  border-bottom: 2px solid #686a6e;
}
.bofang {
  padding: 10px 0px;
}
.bofang img {
  width: 24px;
  height: 24px;
  margin-right: 50x;
  vertical-align: -6px;
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
  height: 50px;
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
  width: 50px;
}
.music tbody tr td:nth-child(3) {
  color: #dcdde4;
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
.bagc {
  position: relative;
  width: 50px;
  height: 50px;
}
.bagc img {
  width: 100%;
}
.icon {
  background: rgba(00, 0, 0, 0.3);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.icon img {
  width: 24px !important;
  border-radius: 50%;
}
</style>