<template>
    <div class="mv-list" v-if="mvList.length!=0">
        <div class="mv-item" v-for="(item,index) in mvList" :key="index" @click="playMV(item.id)">
            <div class="count">
                <img src="~assets/img/leftmenu/shiping.svg" alt="">
                <div class="play-count">{{item.count}}</div>
                </div>
            <img :src="item.cover" alt="">
            <div class="desc">
                <p>{{item.name}}</p>
                <span>{{item.artist}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'MVItem',
    props:{
        mvList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        playMV(id){
            this.$router.push('/playmv/'+id)
        }
    }
}
</script>
<style scoped>
.mv-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.mv-item{
    width: 230px;
    margin-top: 5px;
    position: relative;
}
.mv-item img{
    width: 230px;
}
.mv-item p{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #dcdde4;
}
.mv-item span{
    font-size: 13px;
    color: #828385;
}
.mv-item .count{
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    width: 80px;
    height: 20px;
    padding: 3px 5px;
    background: rgba(0, 0, 0, .25);
}
.mv-item .count img{
    height: 100%;
}
</style>