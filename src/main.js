// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'//路由管理（页面转跳）
// 导入全局样式
// 导入重置页面的默认样式
import 'styles/reset.css'
// 解决移动端1像素边框问题
import 'styles/border.css'
//字体图标样式导入
import 'styles/iconfont/iconfont.css'
// 轮播图组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
//轮播图组件必须用的 styles
import 'swiper/dist/css/swiper.css'
// 轮播图组件全局注册
Vue.use(VueAwesomeSwiper, /* { default global options } */)
//解决移动端手动点击与真正触发click事件会存在300ms的延迟
//解决移动端点击穿透问题（点击行为会穿透元素触发非父子关系元素的事件）
import fastclick from 'fastclick'
fastclick.attach(document.body)

Vue.config.productionTip = false
//异步请求
import axios from 'axios'
import VueAxios from 'vue-axios'
//异步请求全局注册
Vue.use(VueAxios, axios)
//vue状态管理
import store from "./store"


new Vue({
  el: '#app',
  router, // 路由管理
  store,//vue状态管理
  components: { App },
  template: '<App/>'
})
