<template>
  <div class="recommend">
    <div class="desc">
      <div class="language">
        <textarea name id cols="30" rows="10" @keydown.enter="pushCommend()" v-model="content"></textarea>
      </div>
      <div class="sub" @click="pushCommend()">评论</div>
    </div>

    <div class="content">
      <p>精彩评论</p>
      <div class="item" v-for="(item,index) in recommends" :key="index">
        <div class="icon">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="mess">
          <div class="top">
            <span>{{item.user.nickname}}：</span>
            {{item.content}}
          </div>
          <div class="bottom">{{_formatDate(item.time)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "assets/common/tool";
import { _pushCommend } from "network/detail";
export default {
  name: "Recommends",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    },
    id: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      content: ""
    };
  },
  methods: {
    _formatDate(data) {
      return formatDate(new Date(data), "yyyy年MM月dd日 hh:mm:ss");
    },
    pushCommend() {
      let cookie = this.$store.state.cookie;
      if (cookie !== "" && cookie !== null) {
        _pushCommend(cookie, this.id, this.content).then(res => {
          if (res.data.code == 200) {
            this.$Message.success("评论成功");
          } else {
            this.$Message.error("评论失败");
          }
        });
      } else {
        this.$Message.warning("请先登陆");
      }
      this.content=''
    }
  }
};
</script>
<style scoped>
.recommend {
  width: 100%;
  padding: 20px 0 10px 0;
}
.recommend .desc {
  padding: 10px;
  height: 105px;
  background: #1c1e23;
}
.recommend .desc .language {
  height: 60px;
}
.desc .language textarea {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  outline-style: none;
  background: #2b2c31;
  color: #fff;
  border: none;
}
.sub {
  float: right;
  margin-top: 5px;
  cursor: pointer;
}
.recommend .content {
  width: 100%;
  font-size: 13px;
  color: var(--color-text-tint);
}
.recommend .content p {
  padding-top: 30px;
  border: 1px solid #23262c;
}
.item {
  padding: 10px 0 10px 30px;
  border: 1px solid #23262c;
  display: flex;
  position: relative;
}
.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}
.icon img {
  width: 100%;
  border-radius: 50%;
}
.mess{
  flex: 1;
}
.top{
  margin-bottom: 10px;
}
.top span {
  color: #2e6bb0;
}
.bottom {
  position: absolute;
  bottom: 0px;
}
</style>