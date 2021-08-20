<template>
  <div class="wrapper">
     <swiper :option="swiperOption" >
       <!--slides-->
        <swiper-slide v-for="(item) in swiperList" :key="item.id">
          <img :src="item.url" class="swiper-img">
        </swiper-slide>
       <!-- Option Controlls,slot:插槽-->
       <div class="swiper-pagination" slot="pagination"></div>
     </swiper>
  </div>
</template>

<script>
  import  {mapGetters,mapActions} from "vuex";
    export default {
        name: "HomeSwiper",
      data() {
        return {
          swiperOption:{
            autoplay:2000,
            pagination:".swiper-pagination"
          },
        }
      },
      methods:{
        ...mapActions(["getHomeList"]),
      },
      computed:{
        ...mapGetters(['swiperList'])
      },
      mounted(){
        this.getHomeList();
    }
    }
</script>

<style lang="stylus" scoped>
/* fix swiper-pagination color */
/* 样式穿透 */
.wrapper >>> .swiper-pagination-bullet
  background: #fff !important
.wrapper
  overflow hidden
  width 100%
  height: 0
  padding-bottom 26.67%
  background: #eee;
.swiper-img
  width 100%
</style>

