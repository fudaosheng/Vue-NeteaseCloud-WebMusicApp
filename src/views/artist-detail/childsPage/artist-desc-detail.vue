<template>
  <div class="artist-desc-detail" v-if="descDetail != null">
    <div class="desc">
      <h4 :class="['h4', `${'h4-' + theme}`]">{{ name }}简介</h4>
      <p :class="['p', `${'p-' + theme}`]">{{ descDetail.briefDesc }}</p>
    </div>
    <div class="content">
      <div
        class="intro-item"
        v-for="(item, index) in descDetail.introduction"
        :key="index"
      >
        <h4 :class="['h4', `${'h4-' + theme}`]">{{ item.ti }}</h4>
        <div>
          <p
            :class="['p', `${'p-' + theme}`]"
            v-for="(item, index) in formatText(item.txt)"
            :key="index"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { theme } from "mixin/global/theme";
import { _getArtistDescDetail } from "network/artist";
export default {
  name: "ArtistDescDetail",
  mixins: [theme],
  props: {
    id: {
      type: [Number,String],
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      descDetail: null,
    };
  },
  created() {
    if (this.id != 0) {
      this.initRequest();
    }
  },
  methods: {
    /**格式化文本 */
    formatText(text) {
      let newText = text.split("\n");
      return newText;
    },
    initRequest() {
      _getArtistDescDetail(this.id).then((res) => {
        this.descDetail = res.data;
      });
    },
  },
  watch: {
    id() {
      this.initRequest();
    },
  },
};
</script>
<style lang="less" scoped>
.artist-desc-detail {
  width: 100%;
  padding-right: 20px;
}
.h4 {
  padding: 10px 0px;
  &-dark {
    color: #dcdde4;
  }
  &-green,
  &-light {
    color: initial;
  }
}
.p {
  margin-top: 10px;
  text-indent: 35px;
  line-height: 30px;
  &-green,
  &-light {
    color: initial;
  }
  &-dark {
    color: #747577;
  }
}
</style>