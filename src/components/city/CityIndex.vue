<template>
  <div class="city">
    <div>
      <div class="city-header">
        <div class="header-title">
          <!-- <router-link to="/" style="color:white;"> -->
          <div @click="backHome"><span class="iconfont icon-fanhui back-icon"></span></div>
          <!-- </router-link> -->
          <div class="select-city-title">城市选择</div>
        </div>
        <div class="header-input-bar">
          <input type="text" class="header-input" placeholder="输入城市名或拼音">
        </div>
      </div>
      <h1 class="my-location-title">我的位置</h1>
      <div class="my-location-city">
        <div class="my-city">{{ myCity || '北京'}}</div>
      </div>
      <h1 class="my-hotcity-title">热门城市</h1>
      <div class="hot-cities">
        <div class="hot-city-list">
          <div v-for="city in hotCities" :key="city.id" @click="changeCity(city.name)">{{ city.name }}</div>
        </div>
        <!-- 字母列表 -->
        <div class="letters">
          <div v-for="(item, letter,index) in cities"
               :key="index"
               @click="scrollToLetterCity(`${letter}`)">
            {{ letter }}
          </div>

        </div>
      </div>
      <div style="clear: both;"></div>
      <!-- 每个字母列表城市 -->
      <div ref="wrapper" class="wrapper">
        <div class="content">
          <div v-for="(letterCity,letter,index) in cities" :key="index" :ref="letter">
            <!-- 每个字母 -->
            <h1 class="letter-city">{{ letter }}</h1>
            <!-- 某个字母的城市列表 -->
            <ul style="background:#fff;" >
              <li v-for="city in cities[letter]" :key="city.id" class="city-by-letter">{{ city.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  //滚动插件导入
  import BScroll from 'better-scroll';
  // 将 vuex 中的getters 中所有的函数映射出来,用对象解构的方式导入getter所有的的函数
  //// 在单独构建的版本中辅助函数为 Vuex.mapGetters,Vuex.mapActions
  import  {mapGetters,mapActions} from "vuex";

export default {
  name: "CityIndex",
  data() {
    return {
      myCity:'',
      //hotCities:[],//热门城市列表
     // cities:[],//字母城市列表
    }
  },
  methods: {

    //滚动事件
    scrollToLetterCity(letter) {
      console.log('scroll to: %s',letter);
      // 滚动到哪个DOM元素, this.$refs['A'] === this.$refs.A
      let letterElement = this.$refs[letter][0];
      //滚动到 letterElement 元素的位置
      this.scroll.scrollToElement(letterElement,1000)
    },

    //改变我的位置事件
    changeCity(cityName) { // 这个函数是演示用，没有用到
      if (cityName != null) {
        this.myCity=cityName;
        localStorage.myCity = cityName;//存储我的位置
      }
    },

    //返回首页事件,用代码的路由方式:导航到首页
    backHome() {
      this.getHomeList(this.myCity)
       this.$router.push("/")
    },
    ...mapActions(["getHotCities","getHomeList"]),
  },
  computed: {
    //将getter里面所有的函数结构成methods里面的方法cities(),hotCyties()两个计算属性
    ...mapGetters(['cities','hotCities']),
  },
  mounted() {
    // 检查 localStoreage 中是否存储了 myCity
    if(localStorage.myCity) {
      this.myCity = localStorage.myCity
    }

    /*
    //异步请求
     this.axios.get(`/api/china_city_data.json`).then(response=>{//回调成功时调用
       this.cities = response.data.data.cities;
       this.hotCities = response.data.data.hotCities;
     }).then(err=>{//回调失败时调用
       console.log(err);
     }),
     */
      //控制版本滚动的区域创建 better-scroll 实例去接管可滚动的区域
      //this.scroll = new BScroll(this.$refs.wrapper);
    this.scroll=new BScroll('.wrapper');
    // 调用 Vuex中 City 模块的 action 方法
    this.getHotCities();

  }

}
</script>

<style lang="stylus" scoped>
@import "~styles/variables.styl";
@import "~styles/mixins.styl";
.city
  height 300px
  background #eaeaea
  .city-header
    display flex  // 弹性盒子模型
    flex-direction column //盒子内元素列排
    background: $bgColor
    color white
    .header-title
      display flex
      flex-direction row //盒子内元素行排（默认）
      justify-content center
      align-items center //盒子内元素垂直居中
      height 60px
      .back-icon
        font-size 20px
        padding-left 5px
      .select-city-title
        flex 1
        text-align center
        font-size 16px
        font-weight bold
    .header-input-bar
      display flex
      margin 5px
      .header-input
        flex 1
        border 0px
        height 30px
        border-radius 4px
        background: #fff;
        text-align center
        font-size 16px
  .my-location-title,.my-hotcity-title,.letter-city
    padding 10px
    font-size 18px
    color $descTextColor
  .hot-cities
    position relative
    float left
    width 100%
    background: #fff;
    .hot-city-list
      float left
      display grid
      grid-template-columns: repeat(3, 1fr); /* fr 单位是一个自适应单位*/
      grid-auto-rows: minmax(25px, auto);
      width 94%
      //border 1px solid red
      padding-top 4px
      padding-bottom 4px
    .hot-city-list > div
      city() // mixins.styl中定义的 stylus 函数
    .letters
      position fixed
      right 1px
      width 2%
      padding-right 10px
      padding-top 10px
      text-align right
      font-size 16px
      color $bgColor
    .letters > div
      height 20px
  .wrapper
    height 500px
    .content /* 滚动内容 */
      .letter-city
        height 18px
        line-height 18px
        vertical-align center
        background: #eaeaea
      .city-by-letter
        height 30px
        line-height 30px
        border-bottom 1px solid #eaeaea
        padding-left 15px
        font-size 16px
        color $darkTextColor
  .my-location-city /* 我的城市 */
    display flex
    align-items center
    height 50px
    background #fff
    .my-city
      width 100px
      height 25px
      line-height 25px
      margin-left 10px
      border 1px solid #d4d2d2
      border-radius 3px
      text-align center //文字水平居中
      vertical-align middle //文字垂直居中
      font-size 16px
      color $darkTextColor
</style>
