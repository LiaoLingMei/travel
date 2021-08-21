<template>
  <div>
    <h1 class="detail-title">{{ sightName }} </h1>
    <img :src="bannerImg" alt="" srcset="">
    <!-- 每类票的信息 -->
    <div v-for="(categoryTicket,index) in categoryList" :key="'category'+index">
      <h1><span class="iconfont icon-youhuiquan ticket-icon"></span> {{ categoryTicket.title }}</h1>
      <ul class="category-ticket">
        <li v-for="(ticket,index) in categoryTicket.children" :key="'ticket'+index">
          <div class="ticket">
            <div class="ticket-title">{{ ticket.title }}</div>
            <div class="ticket-price">¥{{ ticket.price }}</div>
          </div>
        </li>
      </ul>
      <!-- <hr style="color: #d3d7d4;height:1px;"> -->
    </div>
    <h1>景点一览</h1>
    <img v-for="(item,index) in gallaryImg" :src="item" :key="index" class="gallary">

    <router-link to="/">
      <div class="back-icon">
        <span class="iconfont icon-fanhui back"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex"
    export default {
        name: "HomeRecommentDetail",
        methods:{
          ...mapActions(['getRecommentDetail'])
        },
      computed:{
          ...mapGetters(['sightName','bannerImg','gallaryImg','categoryList'])
      },
        mounted(){//声明周期钩子函数
          console.log("detatil:id:",this.$route.params.id)
          const {id} = this.$route.params.id;
          this.getRecommentDetail(id);
       },


    }
</script>

<style lang="stylus" scoped>
.detail-title
  font-size 16px
  padding-left 10px
.gallary
  margin 3px
.ticket-icon
  margin-left 5px
  color #78cdd1
.category-ticket
    display flex
    flex-direction column
    margin 3px
    border-bottom 1px solid #d3d7d4
    .ticket
      display flex
      font-size 14px
      .ticket-title
        padding-left 10px
      .ticket-price
        flex 1
        text-align right
        padding-right 6px
        font-size 16px
        color #f47920
.back-icon
  position fixed//固定定位
  top 25px
  left 10px
  width 40px
  height 40px
  line-height 40px//行高
  border-radius 20px//宽和高各一半就是圆
  text-align center//水平居中
  vertical-align middle//垂直居中
  background #C2C2C2
  color #fff
  opacity: 0.5;//透明度
  .back
    font-size 18px
    font-weight bold//加粗
</style>

