<template>
  <div class="login">
    <div class="back">
      <div class="x" @click="hiddenLogin">
        <i class="vbestui-iconfont icon-close"></i>
      </div>
      <div class="son">
        <i class="iconfont icon-Phone phone"></i>
      </div>
    </div>
    <div class="main">
      <div>
        <div class="from-item">
          <b-input
            type="text"
            name="phone"
            id="phone"
            placeholder="请输入手机号"
            required
            clearable
            v-model="phone"
            @blur="phoneVerify()"
          />
          <p>{{phoneMessage}}</p>
        </div>
        <div class="from-item">
          <b-input
            type="password"
            name="password"
            id="password"
            placeholder="请输入密码"
            show-password
            v-model="password"
          />
          <p>{{pwdMessage}}</p>
        </div>
        <div class="from-item">
          <b-button background="var(--main-color)" color="#fff" class="log" @click="login">登陆</b-button>
        </div>
        <div class="from-item">
          <div class="register">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _phoneVerify, _login } from "network/user";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      phoneMessage: "",
      password: "",
      pwdMessage: "",
    };
  },
  methods: {
    /**登陆 */
    login() {
      _login(this.phone, this.password).then((res) => {
        if (res.data.code != 200) {
          this.pwdMessage = "密码错误";
        } else {
          this.$store.commit("addUser", res.data);
          this.$parent.hiddleLogin();
          localStorage.setItem('cookie',res.data.cookie);
          localStorage.setItem('avatar',res.data.profile.avatarUrl);
          localStorage.setItem('uid',res.data.profile.userId)
          // this.$bus.$emit("pullResource", res.data.cookie);
        }
      });
    },
    /**手机号码验证 */
    phoneVerify() {
      if (this.phone == "") {
        this.phoneMessage = "请输入手机号";
        return;
      } else {
        /**res.data.exist=1说明有此账号 */
        _phoneVerify(this.phone).then((res) => {
          if (res.data.exist != 1) {
            this.phoneMessage = "手机号错误";
          } else {
            this.phoneMessage = "";
          }
        });
      }
    },
    hiddenLogin(){
      this.$parent.hiddleLogin();
    }
  },
};
</script>
<style scoped>
.login {
  width: 400px;
  height: 560px;
  position: relative;
  z-index: 999;
  top: 0px;
  background: #fafafa;
}
.back {
  width: 100%;
  height: 30%;
  position: relative;
}
.x {
  width: 26px;
  height: 26px;
  float: right;
  margin-right: 5px;
  margin-top: 5px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
}
.x .icon-close{
  font-size:24px;
}
.back .son {
  width: 58px;
  height: 102px;
  position: absolute;
  left: 0;
  right: 20px;
  top: 80px;
  bottom: 0;
  margin: auto;
}

.from-item {
  width: 60%;
  margin: 0px auto;
  padding: 10px 0px 10px 10px;
}
.from-item p {
  color: red;
}
input {
  width: 200px;
  height: 2em;
}
p {
  font-size: 13px;
}
.log {
  outline-style: none;
  background: red;
  color: #fff;
  border: 0;
  height: 40px;
  width: 200px;
  border-radius: 10px;
}
.register {
  color: #333;
  text-align: center;
  margin-right: 35px;
}
.phone {
  color: var(--main-color);
  font-size: 64px;
}
</style>