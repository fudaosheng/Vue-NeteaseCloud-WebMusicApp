<template>
    <div class="music" v-if="musiclist!=null">
        <table cellspacing="0">
            <thead>
                <tr>
                    <td></td>
                    <td>操作</td>
                    <td >音乐标题</td>
                    <td>歌手</td>
                    <td>专辑</td>
                    <td>时长</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in musiclist" :key="index" :class="{backColor:setBackColor(index)}"
                @dblclick="musicItemClick(index)">
                    <td :class="{curFont:playIndex==index}">{{setSerial(index)}}
                        <div class="curPlay" v-show="playIndex==index"><img src="~assets/img/playmusic/currentplay.svg" alt=""></div>
                    </td>
                    <td>
                        <img src="~assets/img/leftmenu/live.svg" alt="" class="live">
                    <img src="~assets/img/leftmenu/xiazai.svg" alt="" class="xiazai">
                    </td>
                    <td >{{item.name}}</td>
                    <td>{{item.song}}</td>
                    <td>{{item.album}}</td>
                    <td>{{item.time}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import {tableMixin} from './tableMixin'
import {playMixin} from '../playMixin'
export default {
    name:'MusicItem',
    props:{
        musiclist:{
            type:Array,
            default(){
                return []
            }
        }
    },
    mixins:[tableMixin,playMixin],
}
</script>
<style scoped>
.music{
    width: 100%;
}
.music table{
width: 100%;
}
.music thead{
    color: #828385;
}
.music tr{
    height: 30px;
    text-align: left;
}
.music tr:hover{
    background-color: #2c2e32;
    color: #fff;
}
.music tr td{
    border: 1px solid #23262c;
    position: relative;
}
.music tbody{
    font-size: 13px;
    color: #575757;
}
.music tr td:nth-child(1){
    width: 50px;
    text-align: center;
}
.music tr td:nth-child(2){
    width: 80px;
}
.music tr td:nth-child(2) img{
    width: 20px;
    opacity: .6;
}
.music tbody tr td:nth-child(3){
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #dcdde4;
}
.music tr td .live{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
.music tr td .xiazai{
    margin-left: 26px;
}
.music tr td:nth-child(4){
    width: 140px;
     white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.music tr td:nth-child(5){
    width: 180px;
}
.music tr td:nth-child(6){
    width: 80px;
}
.music tbody tr td{
    border: none;
}
.backColor{
    background: #1a1c20;
}
</style>