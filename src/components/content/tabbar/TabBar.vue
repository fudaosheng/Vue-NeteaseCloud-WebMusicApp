<template>
  <div class="tabbar">
    <div class="logo">
      <img src="~assets/img/content/logo.svg" alt @click="backHome()" />
      <div class="title" @click="backHome()">小符音乐</div>
      <div class="back" @click="back()">
        <img src="~assets/img/content/back.svg" alt />
      </div>
    </div>

    <music-search />
    <div class="content">
      <div class="login" @click="showLogin()">
        <div class="profile">
          <img :src="getImage" alt />
        </div>
        <div>{{getUserName}}</div>
      </div>

      <div class="right">
        <div>
          <a href="#" title="最小化">
            <img src="~assets/img/content/min.svg" alt="最小化" />
          </a>
        </div>
        <div>
          <a href="#" title="还原">
            <img src="~assets/img/content/reset.svg" alt="还原" />
          </a>
        </div>
        <div>
          <a href="#" title="退出">
            <img src="~assets/img/content/x.svg" alt="退出" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MusicSearch from "../search/MusicSearch";
export default {
  name: "TabBar",
  components: {
    MusicSearch
  },
  data() {
    return {
      image: "",
      statu: "未登录"
    };
  },
  computed: {
    getImage() {
      this.image =
        this.$store.state.user && this.$store.state.user.profile.avatarUrl;
      return this.image;
    },
    getUserName() {
      if (this.$store.state.user == null) return this.statu;
      return (this.statu =
        this.$store.state.user && this.$store.state.user.profile.nickname);
    }
  },
  methods: {
    showLogin() {
      this.$store.commit("showLogin");
    },
    backHome() {
      if (this.$route.path == "/discover") return;

      this.$router.push("/discover");
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.tabbar {
  height: 54px;
  width: 100%;
  background-color: #202023;
}
.logo {
  cursor: pointer;
  height: 100%;
  width: 15%;
  line-height: 100%;
  display: flex;
  float: left;
  align-items: center;
  position: relative;
}
.back {
  display: inline-block;
  height: 26px;
  position: absolute;
  right: 5px;
  opacity: 0.6;
}
.back:hover {
  opacity: 1;
}
.back img {
  height: 100% !important;
}
.content {
  float: right;
  height: 100%;
}
.login {
  cursor: pointer;
  height: 100%;
  float: left;
  margin-right: 50px;
  display: flex;
  align-items: center;
}
.profile {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 10px;
}
.profile img {
  width: 100%;
  border-radius: 50%;
}
.logo img {
  margin: 0px 10px 0px 10px;
  height: 60%;
}
.right {
  height: 100%;
  display: flex;
  align-items: center;
}
.right div {
  flex: 1;
  margin-right: 15px;
  opacity: 0.6;
}
.right div:hover {
  opacity: 1;
}
.right div img {
  width: 22px;
}
</style>