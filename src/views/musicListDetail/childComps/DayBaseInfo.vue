<template>
<div class="daybase">
    <div class="head">
        <div class="newday">
          <div class="new">
            <p>{{getDate}}</p>
            <div>{{time}}</div>
          </div>
        </div>
        <div class="desc">
            <div class="left"><h2>每日歌曲推荐</h2>
            <p>根据你的音乐口味生成，每天6:00更新</p>
            </div>
        </div>
      </div>
      <div class="center">
          <div class="bofang" @click="allPlay()">
          <img src="~assets/img/playmusic/bofang.svg" alt />
          播放全部
        </div>
      </div>
    </div> 
</template>
<script>
import { detailMixin } from "assets/common/mixin";
import {baseMixin} from "../baseMixin"
export default {
    name:'DayBaseInfo',
      mixins: [detailMixin,baseMixin],
      methods:{
        allPlay(){
        this.$emit("allPlay");
      }
      }
}
</script>
<style scoped>
.daybase{
    width: 100%;
}
.head {
  width: 100%;
  display: flex;
}
.head .newday {
    display: inline-block;
  width: 140px;
  height: 140px;
}
.newday .new {
  padding: 10px;
  width: 125px;
  height: 125px;
  background: #fff;
  text-align: center;
}
.new div {
  font-size: 89px;
  color: #b82525;
  margin-top: -30px;
}
.new p {
  font-size: 24px;
  color: #828394;
}
 .desc {
  height: 125px;
  background: linear-gradient(to right,#16181c,#19192b);
  flex: 1;
}
.desc .left{
    width: 60%;
    height: 100%;
    position: relative;
}
.left p{
    position: absolute;
    bottom: 40px;
    color: #828385;
}
.center .bofang {
    width: 140px;
    padding: 5px 10px;
  background: #25272b;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  background: #cd2929;
}
.center img {
  width: 18px;
  height: 18px;
  vertical-align: -4px;
}
</style>