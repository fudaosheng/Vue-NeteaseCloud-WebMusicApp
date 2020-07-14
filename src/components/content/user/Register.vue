<template>
  <div class="login">
    <div class="back">
        <div class="x" @click="hiddenLogin()"><img src="~assets/img/user/x.svg" alt=""></div>
      <div class="son">
        <img src="~assets/img/user/phone.svg" alt />
      </div>
    </div>
    <div class="main">
      <div>
          <div class="from-item">
          <input type="text" name="nickname" id="nickname" placeholder="请输入昵称" required v-model="nickname"/>
        </div>
        <div class="from-item">
          <input type="text" name="phone" id="phone" placeholder="请输入手机号" required v-model="phone" @blur="phoneVerify()"/>
          <p>{{phoneMessage}}</p>
        </div>
        <div class="from-item">
          <input type="password" name="password" id="password" placeholder="请输入密码" v-model="password" />
          <p>{{pwdMessage}}</p>
        </div>
        <div class="from-item">
          <input type="submit" value="确定" class="log" @click="login()"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data(){
      return{
          phone:'',
          phoneMessage:'',
          password:'',
          pwdMessage:''
      }
  },
  methods:{
      /**隐藏登陆页面 */
      hiddenLogin(){
          this.$store.commit('hiddenLogin');
      },
      /**登陆 */
      login(){
      },
      /**手机号码验证 */
      phoneVerify(){
          let regExp=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
          this.phoneMessage='';
        if(!regExp.test(this.phone)){ 
          this.phoneMessage='手机格式不对'
    } 
      }
  }
};
</script>
<style scoped>
.login {
  width: 400px;
  height: 560px;
  background: #fafafa;
}
.back {
  width: 100%;
  height: 30%;
  position: relative;
}
.x{
    width: 26px;
    height: 26px;
    float:right;
    margin-right: 5px;
    margin-top: 5px;
}
.x img{
    width: 100%;
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
.son img {
  width: 100%;
}

.from-item {
  width: 60%;
  margin: 0px auto;
  padding: 10px 0px 10px 10px;
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
  border-radius: 10px;
}
.register {
  color: #333;
  text-align: center;
  margin-right: 35px;
}
</style>