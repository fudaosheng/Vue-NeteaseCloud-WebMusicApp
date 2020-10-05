<template>
  <div class="artist-album-detail">
      <div class="artist-album-detail-left"></div>
      <div class="artist-album-detail-right"></div>
  </div>
</template>
<script>
export default {
  name: "AlbumDetail",
};
</script>
<style lang="less" scoped>
.artist-album-detail{
    display: flex;
    &-left{
        width: 200px;
        img{
            width: 100%;
        }
    }
    &-right{
        flex: 1;
    }
}
</style>