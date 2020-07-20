<template>
  <div class="musiclist">
    <div class="list-item newday" v-if="isShow" @click="enterDayDetail()">
      <div class="new">
        <p>{{getDate}}</p>
        <div>{{time}}</div>
      </div>
      <div class="title">每日推荐</div>
    </div>
    <div
      class="list-item"
      v-for="(item,index) in personList"
      :key="index"
      @click="enterDetail(index)"
    >
      <img :src="getImgUrl(item)" alt @load="imgLoad" />
      <div class="title">{{item.name}}</div>
      <div class="count">
        <div>
          <img src="~assets/img/content/erji.svg" alt />
          {{item.playCount}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {detailMixin} from "assets/common/mixin"
import {_getRecommendResource} from "network/discover";
import { imgLoadMixin } from "assets/common/mixin";
export default {
  name: "MusicList",
  props: {
    personList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isShow:false,
      cookie:null,
    };
  },
  mixins: [imgLoadMixin,detailMixin],
  mounted(){
     if(this.$store.state.cookie!=''&&this.$store.state.cookie!=null){
          this.isShow=true;
      }
       this.$bus.$on('pullResource',cookie=>{
         this.isShow=true;
      })
  },
  methods: {
    getImgUrl(item){
      return item.picUrl||item.coverImgUrl;
    },
    imgLoad() {
      /**类似于防抖函数功能*/
      if (this.imgCount == this.personList.length) this.$emit("imgLoad");
      this.imgCount++;
    },
    enterDetail(index) {
      this.$router.push("/musiclistdetail/" + this.personList[index].id+'/'+new Date().getTime());
    },
    enterDayDetail(){
        this.$router.push('/daymusic');
    }
  },
};
</script>
<style scoped>
.musiclist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.musiclist .list-item {
  position: relative;
  margin: 5px 6px;
  width: 150px;
  padding-bottom: 10px;
  font-size: 13px;
}
.list-item img {
  width: 100%;
}
.count {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: right;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  position: absolute;
  top: 0px;
  right: 0;
}
.count img {
  display: inline-block;
  height: 10px;
  width: 10px;
}
.newday .new {
  padding: 20px;
  width: 100%;
  height: 150px;
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
</style>