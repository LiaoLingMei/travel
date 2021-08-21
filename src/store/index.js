import Vue from 'vue'
import Vuex from 'vuex'
// 状态管理插件
Vue.use(Vuex)
import City from './modules/City';
import Home from './modules/Home';
import HomeRecommentDetail from './modules/HomeRecommentDetail';
export default new Vuex.Store({
  modules: { // Vuex模块
     Home,// 加载./modules/Home.js
     City, // 加载./modules/City.js
    HomeRecommentDetail,
  }
})

