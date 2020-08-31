import Vue from 'vue'
import Vuex from 'vuex'
import { _getSongList } from 'network/user/userVerify'

Vue.use(Vuex)

const state = {
  isShowLogin: false,
  user: null,
  SongList: null,
  uid: null,
  cookie: '',
  playlist: [],
  artist: null,
  isloading:false,
};
export default new Vuex.Store({
  state,
  mutations: {
    addPlayList(state, list) {
      state.playlist = list

    },
    showLogin(state) {
      state.isShowLogin = true;
    },
    hiddenLogin(state) {
      state.isShowLogin = false;
    },
    addUser(state, obj) {
      state.user = obj;
      state.uid = state.user.profile.userId;
      state.cookie = obj.cookie;

      _getSongList(state.uid).then(res => {
        state.SongList = res.data.playlist;
      });
    },
    addArtist(state, artist) {
      state.artist = artist;
    },
    showLoading(state){
      state.isloading=true;
    },
    hiddenLoading(state){
      state.isloading=false;
    }
  },
  getters: {
    getShowLogin(state) {
      return state.isShowLogin;
    },
  },
  actions: {
  },
  modules: {
  }
})
