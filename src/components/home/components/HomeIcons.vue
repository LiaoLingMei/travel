<template>
    <div class="icons">
      <swiper :option="swiperOption">
        <!--第一页图标-->
        <swiper-slide v-for="(slidePage,index) in pages" :key="index">
          <!-- 每一个图标 -->
          <div class="icon" v-for="item of slidePage" :key="item.id">
            <!-- 每一个图标布局 -->
            <div class="icon-img">
              <img  class="icon-content" :src="item.url" :alt="item.desc">
            </div>
            <!--图片描述-->
            <p class="icon-desc">{{item.desc}}</p>
          </div>
        </swiper-slide>
        <!-- slot：插槽-->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
  import  {mapGetters,mapActions} from "vuex";
    export default {
        name: "HomeIcons",
      data() {
        return {
          swiperOption:{
            pagination:".swiper-pagination",
            loop:false
          },
        }
      },
      methods:{
          ...mapActions(['getHomeList'])
      },
      computed:{
        pages(){
          // 存放swiper每页的数据
          const  pages = []
          this.iconList.forEach((item,index)=>{
            // 计算swiper 显示数据的页码,floor():返回小于等于结果的最大整数
            const page = Math.floor(index / 8);
            // 当swiper 对应页无显示的数据时初始化一个空数组来存放数据
            if(!pages[page]){
              pages[page] = [] // 每个元素又是一个数组
            }
            //添加到数组
            pages[page].push(item)
          })
          return pages;
        },
        ...mapGetters(['iconList'])
      },
      mounted(){
        this.getHomeList();
      }
    }
</script>
<style lang="stylus" scoped>
@import "~styles/variables.styl";
@import "~styles/mixins.styl";
.icons >>> .swiper-container /* 样式穿透，.swiper-container为 swiper 组件的容器样式 */
  width 100%
  height 0
  padding-bottom 50%
.icons
  margin-top 5px
  .icon
    position: relative
    overflow hidden
    float left
    width 25%
    height 0
    padding-bottom 25%
    .icon-img
      position: absolute
      top: 0
      right 0
      left 0
      bottom: 22px
      box-sizing border-box
      padding: 5px
      .icon-content
        display block
        margin: 0 auto
        height: 100%
    .icon-desc
      position: absolute
      right 0
      left 0
      bottom: 0
      line-height 22px
      height 22px
      text-align center
      color $darkTextColor
      ellipsis()/*mixins.styl里面的函数*/
</style>
