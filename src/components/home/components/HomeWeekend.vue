<template>
  <div>
    <div class="weekend">周末去哪儿</div>
    <div class="weekend-list" v-for="item in weekendList" :key="item.id">
      <!--图片-->
      <div class="weekend-list-img">
        <img :src="item.url">
      </div>
      <!--标题-->
      <div class="weekend-list-title">{{ item.title }}</div>
      <!--描述-->
      <div class="weekend-list-desc">{{ item.desc }}</div>
    </div>
  </div>
</template>


<script>
  import  {mapGetters,mapActions} from "vuex";
    export default {
        name: "HomeWeekend",
      data() {
        return {

        }
      },
      methods:{
        ...mapActions(['getHomeList']),
      },
      computed:{
        ...mapGetters(['weekendList']),
      },
      mounted(){
        this.getHomeList()
      }
    }
</script>

<style lang="stylus" scoped>
@import "~styles/variables.styl";
.weekend
  background: #ccc;
  height 20px
  padding 5px
.weekend-list
  position relative
  .weekend-list-title
    position relative
    top 5px
    left 5px
    padding-bottom 5px
    font-size 13px
    color $darkTextColor
    //font-weight bold
  .weekend-list-desc
    position relative
    top 5px
    left 5px
    padding-bottom 10px
    color $descTextColor
</style>
