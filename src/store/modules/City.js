import axios from 'axios'
// 驱动应用的数据源
const state = {
  "cities":{},
  "hotCities":[]
}

/*
负责发异步请求给后台的API服务系统进行交互
Action 类似于 mutation，不同在于：
  (1) Action 提交的是 mutation，而不是直接变更状态。
  (2) Action 可以包含任意异步操作。
*/
const actions = {
  // getHotCities(context) { .... }
  // {commit} 意思是从 context 对象中将 commit 函数解构
  getHotCities({commit}) {
    // 请求后端 API 服务，也就是调用 springboot 开发的控制器
    axios.get('/api/china_city_data.json')
      .then((response) => {
        // 将数据提交给 mutations
        commit('storeHotCities', response.data.data)
        //context.commit('storeHotCities', response.data.data)
      })
      .catch(err => {
        throw new Error(err)
      });
  },
}

/* 同步：更改Vuex的store中的状态的唯一方法,讲述据存储到Vuex中的state */
const mutations = {
  storeHotCities(state,data){
    state.cities = data.cities;
    state.hotCities= data.hotCities;
  }
}

/* 可以认为是 store 的计算属性,用于获取 state 中的数据。*/
const getters = {
  cities:(state)=>{
    //根据需求封装
    return state.cities;
  },
  hotCities:(state)=>{
    return state.hotCities;
    }
}
//对于较大型的文件，state.js,action.js,mutations.js,getter.js,index.js可以拆分成
export default {
  state,
  actions,
  mutations,
  getters
}
