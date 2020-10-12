<template>
  <div class="recommend">
    <div :class="[`${'head-' + theme}`, 'head']">
      <textarea
        name=""
        :class="['text-area', `${'text-area-' + theme}`]"
        @keydown.enter="pushCommend()"
        v-model="content"
      ></textarea>
      <p>
        <b-button
          size="small"
          width="40px"
          height="30px"
          transparent
          class="button"
          color="var(--text-main)"
          @click="pushCommend()"
          >评论</b-button
        >
      </p>
    </div>
    <template v-if="isEmpty">
      <b-list :stripe-background-color="getStripeColor">
      <b-list-title class="list-title">精彩评论</b-list-title>
      <b-list-item
        v-for="(item, index) in recommends"
        :key="index"
        class="list-item"
      >
        <div class="left">
          <img v-lazy="item.user.avatarUrl" alt="" @load="handleImgLoad"/>
        </div>
        <div class="right">
          <div class="desc">
            <span>{{ item.user.nickname }}：</span>
            {{ item.content }}
          </div>
          <div class="bottom">{{ _formatDate(item.time) }}</div>
        </div>
      </b-list-item>
    </b-list>
    </template>
    <template v-else>
      <empty/>
    </template>
  </div>
</template>
<script>
import { formatDate } from "utils/tool";
import { _pushCommend } from "network/detail";
import { theme } from "mixin/global/theme";
import {imgLoadMixin} from "mixin/global/imgLoad"
import empty from "common/empty/empty"
export default {
  name: "Recommends",
  mixins: [theme,imgLoadMixin],
  components:{empty},
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
    id: {
      type: [String,Number],
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      content: "",
    };
  },
  computed:{
    /**获取评论数量，进行非空判断 */
    isEmpty(){
      return this.recommends&&this.recommends.length;
    }
  },
  methods: {
    _formatDate(data) {
      return formatDate(new Date(data), "yyyy年MM月dd日 hh:mm:ss");
    },
    pushCommend() {
      let cookie = this.$store.getters.getCookie;
      if (cookie !== "" && cookie !== null) {
        _pushCommend(cookie, this.id, this.content).then((res) => {
          if (res.data.code == 200) {
            this.$Toast.success("评论成功");
          } else {
            this.$Toast.error("评论失败");
          }
        });
      } else {
        this.$Toast.warning("请先登陆");
      }
      this.content = "";
    },
    handleImgLoad(){
      if(this.imgCount==this.recommends.length)this.$emit('refresh');
      this.imgCount++;
    }
  },
};
</script>
<style lang="less" scoped>
.recommend {
  width: 100%;
  .head {
    padding: 15px 10px 10px 10px;
    position: relative;
    &-light {
      background: #f0f0f2;
    }
    &-dark {
      background: #1c1e22;
    }
    &-green {
      background: #f0f0f2;
    }
    p {
      text-align: right;
    }
  }
  .text-area {
    width: 100%;
    height: 60px;
    outline-style: none;
    border: 1px solid var(--border);
    padding: 5px;
    &-dark {
      background: #2b2c31;
      color: #fff;
      border: none;
    }
  }
}
.list-item {
  display: flex;
  font-size: 13px;
  .left {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .right {
    flex: 1;
    padding-left: 20px;
    .desc {
      padding: 5px 0px;
      span {
        color: var(--tag-color);
      }
    }
  }
}
.list-title {
  padding-left: 0px;
}
</style>