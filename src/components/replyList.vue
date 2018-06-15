<template>
  <div class="detailcontainer1" v-if="!showList">
    <div class="word-top">
      <div class="word-top-left">
        <p class="rating">{{detailList.rating}}</p>
        <p class="zong">综合评价</p>
        <p class="zhou">高于周边商家76.9%</p>
      </div>
      <div class="word-top-right">
        <p>
          <span class="word-title">服务态度</span>
          <el-rate
            v-model="4.7"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </p>
        <p>
          <span class="word-title">菜品评价</span>
          <el-rate
            v-model="4.8"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </p>
        <p>
          <span class="word-title">送达时间</span>
          <span style="font-size:0.4rem;color: #999;">分钟</span>
        </p>
      </div>
    </div>
    <ul class="txt">
      <li>全部(473)</li>
      <li>满意(453)</li>
      <li class="no">不满意(20)</li>
      <li>有图(2)</li>
      <li>味道好(100)</li>
      <li>送货快(54)</li>
      <li>分量足(35)</li>
      <li>包装精美(85)</li>
      <li>干净卫生(65)</li>
      <li>食材新鲜(13)</li>
      <li>服务不错(32)</li>
    </ul>
    <ul class="reply">
      <li v-for="(item1,index) in replyList">
        <img :src="url + item1.avatar" alt="">
      </li>
    </ul>
  </div>

</template>

<script>
  import global from '../config/index.js'

  export default {
    name: "replyList",
    data(){
      return{
        replyList: []
      }
    },
    created() {
      let id = this.$route.params.id
      this.$http.get(global.api + 'shopping/restaurant/' + id)
        .then((res) => {
          console.log(res.data)
          this.detailList = res.data
        })
      //  评价列表
      this.$http.get(global.api + 'ugc/v2/restaurants/' + id + '/ratings')
        .then((res) => {
          console.log(res.data)
          this.replyList = res.data
        })
    }
  }
</script>

<style scoped>
  .current {
    border-left: 0.1rem solid #3190e8;
    color: #3190e8;
  }
</style>
