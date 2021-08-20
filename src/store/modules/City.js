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

}

/* 更改Vuex的store中的状态的唯一方法 */
const mutations = {

}

/* 可以认为是 store 的计算属性,用于获取 state 中的数据。*/
const getters = {
  cities:(state)=>{
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
