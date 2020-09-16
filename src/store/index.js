import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme:'light',
  },
  mutations: {
    setTheme(state,theme){
      state.theme=theme;
      localStorage.setItem('theme',theme);
    }
  },
  getters:{
    getTheme(state){
      if(localStorage.getItem('theme')){
        state.theme = localStorage.getItem('theme');
      }
      return state.theme;
    },
  },
  actions: {
  },
  modules: {
  }
})
