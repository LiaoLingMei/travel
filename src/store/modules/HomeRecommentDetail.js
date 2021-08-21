import axios from 'axios'
// 驱动应用的数据源
const state = {
  "sightName":'',
  "bannerImg":'',
  "gallaryImg":[],
  "categoryList":[]
}

/*
负责发异步请求,给后台的API服务系统进行交互
*/
const actions = {
  getRecommentDetail({commit}) {
    //axios.get(`/api/detail?id={id}`)
    axios.get("/api/detail.json")
      .then((response) => {
        console.log(response)
        commit('storeRecommentDetail', response.data.data)
      })
      .catch(err => {
        throw new Error(err)
      });
  },
}

/* 同步：更改Vuex的store中的状态的唯一方法,存储到Vuex中的state */
const mutations = {
  storeRecommentDetail(state,data){
    state.sightName=data.sightName;
    state.bannerImg=data.bannerImg;
    state.gallaryImg=data.gallaryImg;
    state.categoryList=data.categoryList;

  }

}

/* 可以认为是 store 的计算属性,用于获取 state 中的数据。*/
const getters = {
  sightName:(state)=>{
    return state.sightName;
  },
  bannerImg:(state)=>{
    return state.bannerImg;
  },
  gallaryImg:(state)=>{
    return state.gallaryImg;
  },
  categoryList:(state)=>{
    return state.categoryList;
  },

}
//对于较大型的文件，state.js,action.js,mutations.js,getter.js,index.js可以拆分成
export default {
  state,
  actions,
  mutations,
  getters
}
