import axios from 'axios'
// 驱动应用的数据源
const state = {
  "swiperList":[],
  "iconList":[],
  "recommendList":[],
  "weekendList":[],
}

/*
负责发异步请求,给后台的API服务系统进行交互
*/
const actions = {
  getHomeList({commit}) {
    axios.get('/api/index.json')
      .then((response) => {
        console.log(response)
        commit('storeHomeList', response.data.data)
      })
      .catch(err => {
        throw new Error(err)
      });
  },
}

/* 同步：更改Vuex的store中的状态的唯一方法,存储到Vuex中的state */
const mutations = {
  storeHomeList(state,data){
    state.swiperList=data.swiperList;
    state.iconList=data.iconList;
    state.recommendList = data.recommendList;
    state.weekendList = data.weekendList;
  }

}

/* 可以认为是 store 的计算属性,用于获取 state 中的数据。*/
const getters = {
  swiperList:(state)=>{
    return state.swiperList;
  },
  iconList:(state)=>{
    return state.iconList;
  },
  recommendList:(state)=>{
    return state.recommendList;
  },
  weekendList:(state)=>{
    return state.weekendList;
  },

}
//对于较大型的文件，state.js,action.js,mutations.js,getter.js,index.js可以拆分成
export default {
  state,
  actions,
  mutations,
  getters
}
