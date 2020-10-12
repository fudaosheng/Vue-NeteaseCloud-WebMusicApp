<template>
  <div
    class="simi"
    v-if="item != null"
    @mouseenter="isShowIcon = true"
    @mouseleave="isShowIcon = false"
  >
    <div class="simi-item" @click="playMV()">
      <div class="left">
        <img :src="item.cover" alt @load="handleLoad" />
        <div class="count">
          <i class="iconfont icon-shipin"></i>
          <div class="play-count">{{ item.count }}</div>
        </div>
        <transition name="dance-music-opacity">
          <div class="mv-play" v-show="isShowIcon">
            <i class="iconfont icon-icon_play"></i>
          </div>
        </transition>
      </div>
      <div class="right">
        <div class="name">
          <span>MV</span>
          {{ item.name }}
        </div>
        <div class="artist">{{ item.artist }}</div>
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
      },
    },
  },
  methods: {
    playMV() {
      this.$router.push("/mv-detail/" + this.item.id);
    },
    handleLoad() {
      this.$emit("refresh");
    },
  },
  data() {
    return {
      isShowIcon: false,
    };
  },
};
</script>