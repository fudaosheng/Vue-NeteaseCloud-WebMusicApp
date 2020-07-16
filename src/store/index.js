import Vue from 'vue'
import Vuex from 'vuex'
import { _getSongList } from 'network/user/userVerify'

Vue.use(Vuex)

const state = {
  isShowLogin: false,
  user: null,//保存用户信息
  SongList: null,//用户歌单
  uid: null,
  cookie: '',
  playlist: [],
  artist: null,//歌手信息
};
export default new Vuex.Store({
  state,
  mutations: {
    addPlayList(state, list) {
      state.playlist = list

    },
    /**登陆界面显示与隐藏 */
    showLogin(state) {
      state.isShowLogin = true;
    },
    hiddenLogin(state) {
      state.isShowLogin = false;
    },
    /**保存用户信息 */
    addUser(state, obj) {
      state.user = obj;
      state.uid = state.user.profile.userId;
      state.cookie = obj.cookie;

      _getSongList(state.uid).then(res => {
        state.SongList = res.data.playlist;
      });
    },
    /**保存歌手信息 */
    addArtist(state, artist) {
      state.artist = artist;
    },
  },
  getters: {
    getShowLogin(state) {
      return state.isShowLogin;
    }
  },
  actions: {
  },
  modules: {
  }
})
