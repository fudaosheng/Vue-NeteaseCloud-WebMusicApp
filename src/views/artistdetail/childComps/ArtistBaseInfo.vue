<template>
  <div class="base" v-if="baseInfo!=null">
    <div class="title">
      <img :src="baseInfo.picUrl" alt />
    </div>
    <div class="content">
      <div class="top">
        <span class="icon">歌手</span>
        <span>{{baseInfo.name}}</span>
        <div class="right">
          <table>
            <tr>
              <td>
                收藏
                <br />
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="center">
        <div class="bofang">
          <img src="~assets/img/leftmenu/music.svg" alt />
          单曲数：{{baseInfo.musicSize}}
        </div>
        <div class="sub">
          <img src="~assets/img/artist/album.svg" alt />
          专辑数：{{baseInfo.albumSize}}
        </div>
      </div>
      <div class="desc">
        <div class="biaoqian">
          个人介绍：
          <span>{{desc}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    baseInfo:{
      type:[Object,Array],
      default(){
        return {}
      }
    },
    desc:{
      type:String,
      default(){
        return ''
      }
    },
  },
};
</script>
<style scoped>
.base {
  width: 100%;
  display: flex;
}
.title {
  display: inline-block;
  width: 200px;
  height: 168px;
}
.title img {
  width: 100%;
}
.base .content {
  flex: 1;
  padding: 0px 20px;
  position: relative;
}
.top span {
  font-size: 20px;
}
.content .icon {
  border: 1px solid red;
  border-radius: 4px;
  color: red;
  padding: 5px;
  font-size: 11px;
  margin-right: 10px;
}
.center {
  position: absolute;
  top: 0px;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  height: 25%;
}
.center div {
  padding: 5px 10px;
  background: #25272b;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
}
.center img {
  width: 18px;
  height: 18px;
  vertical-align: -4px;
}
.desc {
  position: absolute;
  max-height: 49px;
  bottom: 0px;
  color: #dcdde4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.desc div {
  padding: 5px 0px;
}
.desc span {
  color: #2e6bb0;
}
.top .right {
  height: 30px;
  float: right;
}
.right td {
  text-align: center;
  font-size: 12px;
  padding:5px 10px;
  background: #25272b;
  border-radius: 10px;
}
</style>