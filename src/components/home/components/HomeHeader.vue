<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont icon-fanhui back-icon"></div>
    </div>

    <div class="header-input">
      <span class="iconfont icon-sousuo input-sousuo"></span>&nbsp;输入城市/景点/游玩主题
    </div>

    <!-- 跳转到城市列表组件, <router-link> 会渲染为<a>...</a> -->
    <router-link :to="{path: '/city'}">
      <div class="header-right">
        {{this.city}}<span class="iconfont icon-xiajiantou"></span>
      </div>
    </router-link>

  </div>
</template>

<script>
  export default {
    name: "HomeHeader",
    data() {
      return {
        // city: 'dddd'
      }
    },
    props: {
      city: String
    }
  }
</script>

<style lang="stylus" scoped>
@import "~styles/variables.styl";
.header
  display flex
  line-height $headerHeight/* 43px */
  background $bgColor       /* #00bcd4 */
  color #fff
  .header-left
    width 30px
    float: left
    padding-left 1px
    padding-right 1px
    .back-icon
      text-align center
      font-size 20px /*.4rem*/
      font-weight bold
  .header-input
    flex: 1
    height 32px
    line-height 32px
    color #cccccc
    padding-left 5px
    margin-top 5px
    background: #fff;
    border-radius 5px
    .input-sousuo
      color #534f4f
  .header-right
    /*width: 62px*/
    float: right
    padding-left 5px
    padding-right 4px
    text-align: center;
    color #fff
    font-size 16px
</style>
