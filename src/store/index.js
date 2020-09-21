import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light',
    user: null,
    uid: null,
    cookie: null,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    },
    /**保存用户信息 */
    addUser(state, obj) {
      state.user = obj;
      state.uid = state.user.profile.userId;
      state.cookie = obj.cookie;
    },
  },
  getters: {
    getTheme(state) {
      if (localStorage.getItem('theme')) {
        state.theme = localStorage.getItem('theme');
      }
      return state.theme;
    },
    getAvatar(state){
      let avatar='';
      if(localStorage.getItem('avatar')){
        avatar=localStorage.getItem('avatar');
        return avatar;
      }
      avatar=state.user&&state.user.profile.avatarUrl;
      return avatar;
    }
  },
  actions: {
  },
  modules: {
  }
})
