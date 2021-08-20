## 一、创建Vue项目与npm命令

#### 1. 创建项目

```bash
# 先用全局方式安装 npm 的替代工具 cnpm，npm 默认从国外站点下载依赖的js库速度较慢，常常会下载不了；而 cnpm 会从 alibaba 的镜像站点下载依赖的js库速度快
npm install cnpm –g

# 用全局方式安装 vue-cli
npm install -g @vue/cli

# 用全局方式安装 webpack
npm install webpack -g

## 使用webpack模板创建项目:vue-qunar
vue init webpack vue-qunar(项目名称)

```

#### 2. 从package.json 恢复依赖库

当下载了包含有 **package.json** 文件的项目时，可在 package.json 所有的目录下执行 npm install 命令从 **package.json** 中的 **dependencies 和 devDependencies** 将依赖包安装到当前目录的 **./node_modules** 文件夹中。

```bash
npm install
```

#### 3. 常用 npm 命令  
```bash
# 初始（生成） package.json 文件, 终端会依次询问 name, version, description 等字段
npm init

# 执行默认行为 yes 确认
npm init -y

# 查看依赖树
npm ls

# 安装指定版本的依赖库
npm install JS_LIB_NAME@version

# 安装安装最新版本的依赖库
npm install JS_LIB_NAME

# 删除依赖库
npm uninstall JS_LIB_NAME@version

# 升级依赖库
npm update JS_LIB_NAME
```

## 二、项目中用到的第三方插件


#### 1. 安装stylus 样式语言加载器

 在项目文件夹下执行npm命令

```bash
npm install --save-dev stylus stylus-loader
```

#### 2. 安装 fastclick 插件

> npm安装时--save 和 --save-dev的区别，前者安装后，在package.json中的dependencies中生成，后者实在devDependencies中生成。
> 如果是开发中使用的依赖使用--save-dev，如果是编码的依赖使用--save

在移动端H5开发过程中，关于点触可能会遇到如下两个问题：

- 手动点击与真正触发click事件会存在300ms的延迟
- 点击穿透问题（点击行为会穿透元素触发非父子关系元素的事件）

延迟的存在时因为浏览器想知道你是否在进行双击操作；而点击穿透是因为300ms延迟触发时的副作用。而使用fastclick能很好的解决这个问题，增加使用者的体验。

- 安装
```bash
npm install fastclick --save
```

- 在 main.js中使用 fastclick

```javascript
import fastclick from 'fastclick'
fastclick.attach(document.body)
```

#### 3. swiper 插件 (轮播图)

> https://github.com/surmon-china/vue-awesome-swiper/tree/v2.6.7

- 安装 vue-awesome-swiper

```bash
npm install vue-awesome-swiper@2.6.7 --save
```

 - 在main.js中注册（全局注册）

```javascript
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
```

#### 4. 安装 babel-polyfill

用于修复浏览器不支持 es6 语法而导致白屏的第三方库

- 安装 babel-polyfill

```bash
npm install babel-polyfill --save
```

- 在 main.js中使用

```javascript
import 'babel-polyfill'
```

#### 5. 安装 axios

Vue.js 2.0 版本推荐使用 axios 来完成 ajax 请求。
Axios 是一个基于 Promise 的 HTTP 库，可以用在浏览器和 node.js 中。
Github开源地址： https://github.com/axios/axios

- 具体的使用可参考：  http://axios-js.com/ 

```bash
npm install axios
```

#### 6.  引入reset.css

目的：重置页面样式

> 因为在不同移动端、不同浏览器上页面的初始样式是不一样的，引入reset.css为了保证在每个浏览器上展示出的初始效果是一样的

#### 7. 引入 border.css

目的：解决移动端1像素边框问题

#### 8. Vuex 状态管理组件

##### 8.1 安装 Vuex

```bash
npm install vuex --save
```

##### 8.2 使用Vuex

(1)  在src目录下新建store目录
(2)  在store目录下新建 index.js，内容如下：


```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 状态管理插件
Vue.use(Vuex)
import City from './modules/City'
  
export default new Vuex.Store({
    modules: { // Vuex模块
        City // 加载./modules/City.js
    }
})
```
(3) 在store目录下新建 modules 目录，并在目录下新建 City.js，City.js内容如下

```javascript
import axios from 'axios'

// 驱动应用的数据源
const state = {
  hotCities: []
}

/*
Action 类似于 mutation，不同在于：
  (1) Action 提交的是 mutation，而不是直接变更状态。
  (2) Action 可以包含任意异步操作。
*/
const actions = {
  // 后端API的调用
  getHotCities ({commit}) {
    axios.get('/api/china_city_data.json')
      .then((resp) => { // success callback function
        const hotCities = resp.data.data.hotCities
        // console.log(hotCities);

        // commit to mutations
        commit('storeHotCities', hotCities)

      }, (error) => { // failure callback function
				console.error(error)
      })
  }
}

/*
更改Vuex的store中的状态的唯一方法
*/
const mutations = {
  // 将数据存储到Vuex的 state 对象中
  storeHotCities (state, hotCities) {
    state.hotCities = hotCities
  }
}

/*
可以认为是 store 的计算属性,用于获取 state 中的数据。
*/
const getters = {
  // getHotCities: (state) => {} // 这样写也可以
  hotCities (state) {
    return state.hotCities
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
```

(4)  在List.vue 组件中使用

```javascript
<script>
// import { mapActions,mapGetters,mapMutations,mapState } from 'vuex'
import { mapActions,mapGetters } from 'vuex'

export default {
  name: "CityList",
  methods: {
    // 将Vuex中 actions 的函数映射为组件的 methods 函数
    ...mapActions(['getHotCities'])
  },
  mounted() {
    this.getHotCities()
  },
  computed:{
    ...mapGetters(['hotCities'])
  }
}
</script>
```

##### 8.3 Vuex 实现的过程

###### 1. 需要调用后端API的，Vuex 实现的过程
- 使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）
```javascript
methods: {
  ...mapActions(['ACTION_FUNCTION_NAME', ....])
}
```
   调用可以在 created () { ... } 或者 mounted () { ... } 中调用 action_function_name。

​	<u>_另一种在组件中调用 Actions 函数的方式是使用 `this.$store.dispatch('ACTION_FUNCTION_NAME' [,data])` 分发 action。_</u>

```javascript
methods: {
	HANDLE_FUNCTION () {
		this.$store.dispatch('ACTION_FUNCTION_NAME' [,data])
	}
}
```

- 在 Vuex 中的 actions 通过commit('xxx') 将数据提交给 Mutations 函数处理:
  	 	commit('MUTATIONS_FUNCTION_NAME' [ , data] )
        	 	
     
     ***如下代码所示：***

```javascript 
// Vuex 中的 actions
const actions = {
  getHotCities ({commit}) {
		// 后端API的调用
    axios.get('/api/china_city_data.json')
      .then((resp) => { // success callback function
        const hotCities = resp.data.data.hotCities

        // commit to mutations
        commit('storeHotCities', hotCities)
      }, (error) => { // failure callback function
				console.error(error)
      })
  }
}
```

  

>_另一种是在组件中`this.$store.commit('MUTATION-NAME')` 提交 mutation。`_

  使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）

```javascript
methods: {
	HANDLE_FUNCTION () {
    // 直接提交 mutation
		this.$store.commit('MUTATION_FUNCTION_NAME' [,data])
	}
  
  // 将组件中的 methods 映射为 `store.commit` 调用
  // ...mapMutations(['xx_fun', 'yy_fun']),
}
```

 - 在 Vuex 中的Mutations 函数将数据存储 到 state 中
```javascript
MUTATIONS_FUNCTION_NAME (state, data) {
  state.recommendList = data.recommendList
  state.weekendList = data.weekendList
}
```
 -   在组件中可以通过两种方式获得 Vuex state的的数据
    (a)  使用getters的辅助函数 mapGetters 映射为组件的计算属性

```javascript
computed:{
  ...mapGetters(['hotCities','cities'])
}
```

当组件计算属性名和 mapGetters映射的属性名不一样时，可将mapGetters映射的属性名重新指定为组件的计算属性名

```javascript
computed: mapGetters {
  // 计算属性 : mapGetters中返回的属性
  computed_prop1: 'hotCities',
  computed_prop2: 'xxx'
}
```

​	(b)  在组件中使用 $store.getters 访问

```javascript
this.hotCities = this.$store.getters.hotCities
```

###### 2.  不需要调用后端API的过程
<u>省略8.1.1 中actions 的部分</u>

使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）

```javascript
methods: {
  // 使用方法 1
	...mapMutations(['MUTATIONS_FUNCTION_NAME', ...]),

  // 使用方法 2
	handle_click () {
		// 直接提交 mutation
		this.$store.commit('MUTATION_FUNCTION_NAME' [,data])
	}
}
```

后继的步骤与前面的一样，这里就不重复说明了。

#### 9. vue-router 中滚动到锚点

```html
<a href="#3"> scroll to div#3 </a>

<div id="3"> ... </div>
```

```javascript
//例子，自行对应到你项目的代码
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savePosition) {
    // 如果你的连结是带 # 这种
    // to.hash 就会有值（值就是连结）
    // 例如：#3
    if (to.hash) {
      return {
        //这个是通过 to.hash 的值来找到对应的元素
        // 例如你按下 #3的连结，就会变成 querySelector('#3'), 自然会找到 id=3 的元素
        selector: to.hash
      }
    }
  }
})
```

#### 10.  Better-scroll插件

- 安装 better-scroll
```bash
npm install better-scroll --save
```

- 在组件中使用
```html
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      .....
    </div>
  </div>
</template>
```

```javascript
<script>
import BScroll from 'better-scroll'
export default {
  name: "CityList",
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
    //this.scroll = new BScroll('.wrapper'); // 或都指定元素的类样式，或DOM元素
  }
}
</script>
```

#### 11. 去哪儿网打包上线（布暑） 
- 下载并安装 nginx-1.16.0.zip服务器（解压即可用户），将nginx解压到 D:\dev 目录下。在nginx目录下执行以下命令测试nginx服务器是否安装成功。
```bash
# 进入到nginx-1.16.0目录
cd nginx-1.16.0
# 启动nginx 服务吕
nginx
```

- 构建 “去哪儿网” 项目。

```bash
npm run build
```

以上命令会在项目中生成一个dist 目录，该即为最终上线的产品。

- 将dist 目录复制到nginx/html 目录中，并将dist 目录改名成qunar。
- 编缉文件 nginx/conf/nginx.conf，修改 server { ... } 节点内 location / { ... }节点的内容。内容如下：
```nginx
# 网站的根路径
location / {
    # 网站文件所在的路径
    root   html/qunar;
    index  index.html index.htm;
}
```

- 启动nginx 服务器测试布暑的网站。
```nginx
# 检查nginx.cong 文件是否配置正确
nginx -t

# 启动nginx 服务器
nginx

# 更改配置后重新加载配置文件，nginx后自动使用新的worker线程处理请求，同时关闭旧的worker线程
nginx -s reload
# 快速停止nginx http服务器
nginx -s stop
# 处理完现在的请求后停止nginx http服务器
nginx -s quit

```

- 在浏览器地址栏中输入：http://localhost/ 就可能看见我们的网站了。但是目前的网址是localhost 看起不像是个网站的域名。我们也可以配置自己的域名服务器（局域网内）。
修改windowns系统中 C:\Windows\System32\drivers\etc\hosts 文件。在文件的末尾添加一个域名的映射。
```
127.0.0.1       www.mobile.qunar.com
```
在 cmd 命令行中执行命令：ipconfig /flushdns  刷新本地的 DNS 解析服务。
在浏览器地址栏中输入：http://www.mobile.qunar.com 就可能看见我们的网站了。
- 
