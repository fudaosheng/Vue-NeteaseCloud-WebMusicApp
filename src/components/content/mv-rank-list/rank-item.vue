<template>
  <div class="simi" v-if="item!=null">
    <div class="simi-item" @click="playMV()">
      <div class="left">
        <img :src="item.cover" alt  @load="handleLoad"/>
        <div class="count">
          <i class="iconfont icon-shipin"></i>
          <div class="play-count">{{item.count}}</div>
        </div>
      </div>
      <div class="right">
        <div class="name">
          <span>MV</span>
          {{item.name}}
        </div>
        <div class="artist">{{item.artist}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RankItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
    methods:{
        playMV(){
            this.$router.push('/mv-detail/'+this.item.id)
        },
        handleLoad(){
          this.$emit('refresh');
        }
    }
};
</script>