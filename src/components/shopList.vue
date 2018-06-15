<template>
  <div>
    <el-container>
      <el-header class="header" style="height: 3.55rem;">
        <div class="head1" style="height: 1.95rem;">
          <span class="back iconfont icon-top-back"></span>
          <span class="city ellipsis">简餐</span>
        </div>
        <div class="section">
          <div class="section-title">
            <p class="section-name" @click="k">简餐</p>
            <div class="section-box" v-if="kg">
              <ul class="section-left">
                <li v-for="(item, index) in selectList" :key="index" @click="choose(index)">
                  <p>
                    <img :src="url + item.image_url + '.png'" alt="">
                    <span class="item-name">{{item.name}}</span>
                  </p>
                  <p>
                    <span class="item-count">{{item.count}}</span>
                  </p>
                </li>
              </ul>
              <ul class="section-left section-right">
                <li v-for="(item, index) in selectList[curIndex].sub_categories" :key="index" @click="getid(item)">
                  <p>
                    <!--<img :src="url + item.image_url + '.png'" alt="">-->
                    <span class="item-name">{{item.name}}</span>
                  </p>
                  <p>
                    <span class="item-count">{{item.count}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="section-title">
            <p class="section-name" @click="px">排序</p>
            <div class="section-box" v-if="kg1">
              <ul class="section-px">
                <li v-for="(item,index) in pxList" :key="index" @click="getorder(item)">
                  {{item.name}}
                </li>
              </ul>
            </div>
          </div>
          <div class="section-title">
            <p class="section-name" @click="sx">筛选</p>
            <div class="section-box" v-if="kg2">
              <div class="section-px">
                <ul class="shai-head">
                  <li>
                    <p>配送方式</p>
                    <div class="checkbox">
                      <el-checkbox v-for="(item,index) in songList" :key="index" label="item.text" border @change="change1(item)">
                        {{item.text}}
                      </el-checkbox>
                    </div>
                  </li>
                </ul>
                <ul class="shai-body">
                  <li>
                    <p>商家属性（可以多选）</p>
                    <div class="checkbox">
                      <el-checkbox v-for="(item,index) in shuList" :key="index" label="item.name" border @change="change(item)">
                        {{item.name}}
                      </el-checkbox>
                    </div>
                  </li>
                </ul>
                <div class="shai-foot">
                  <p class="empty">清空</p>
                  <p class="sure" @click="sure(shuList,songList)">确定</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-header>
      <el-main class="el-main3">
        <div class="shop">
          <ul class="shop-list">
            <li class="shop-detail" v-for="(item, index) in shopList" :key="index">
              <router-link :to="{name:'detail',params:{id:item.id}}">
                <div class="shop-img">
                  <img :src="url1 + item.image_path" alt="">
                </div>
                <div class="shop-content">
                  <div class="between shop-head">
                    <h5 class="ellipsis">
                      <span class="pin">品牌</span>
                      <span class="shopname">{{item.name}}</span>
                    </h5>
                    <ul class="bao">
                      <li v-for="(item, index) in item.supports" :key="index">
                        {{item.icon_name}}
                      </li>
                    </ul>
                  </div>
                  <div class="between shop-txt">
                    <p>
                      <el-rate
                        v-model=item.rating
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                      </el-rate>
                      <span class="shou">月售106单</span>
                    </p>
                    <p>
                      <span class="feng">蜂鸟专送</span>
                      <span class="zhun">准时达</span>
                    </p>
                  </div>
                  <div class="between shop-foot">
                    <p>
                      <!--<span>￥20元起送/{{item.piecewise_agent_fee.tips}}</span>-->
                    </p>
                    <p>
                      <span>{{item.distance}}公里</span>
                      <span>/</span>
                      <span style="color: #3190e8;">{{item.order_lead_time}}分钟</span>
                    </p>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import global from '../config/index.js'

  export default {
    name: "shopList",
    data() {
      return {
        shopList: [],
        url1: 'https://elm.cangdu.org/img/',
        url: 'https://fuss10.elemecdn.com/',
        selectList: [],
        curIndex: '',
        show1: false,
        kg: false,
        kg1: false,
        kg2: false,
        restaurant_category_id: '',
        pxList: [
          {'name': '智能排序', id: 4},
          {'name': '距离最近', id: 5},
          {'name': '销量最高', id: 6},
          {'name': '起送价最低', id: 1},
          {'name': '配送速度最快', id: 2},
          {'name': '评价最高', id: 3},
        ],
        shuList: [
          {'name': '品牌商家', id: 8,'flag': false},
          {'name': '外卖保', id: 7,'flag': false},
          {'name': '准时达', id: 9,'flag': false},
          {'name': '新店', id: 5,'flag': false},
          {'name': '在线支付', id: 3,'flag': false},
          {'name': '开发票', id: 4,'flag': false},
        ],
        songList: [
          {'text': '蜂鸟专送', id: 1,'flag': false},
        ],
        song_id: [],
        shu_id: [],
      }
    },
    computed: {
      geohash() {
        return this.$store.state.geohash;
      }
      ,
      latitude() {
        return this.$store.state.latitude;
      }
      ,
      longitude() {
        return this.$store.state.longitude;
      }
    },
    created() {
      // this.$http.get(global.api + 'v2/pois/' + this.geohash)
      //   .then((res) =>{
      //     console.log(res.data)
      //     // this.checkCity = res.data.name
      //   })

      this.$http.get(global.api + 'shopping/restaurants?latitude=' + this.latitude + '&longitude=' + this.longitude + 'restaurant_category_id' + this.restaurant_category_id)
        .then((res) => {
          console.log(res.data)
          this.shopList = res.data
        })
      this.$http.get(global.api + 'shopping/v2/restaurant/category')
        .then((res) => {
          console.log(res.data)
          this.selectList = res.data

        })

      this.$http.get(global.api + 'shopping/v1/restaurants/activity_attributes')
        .then((res) => {
          console.log(res.data)
          // this.shuList = res.data

        })
      this.$http.get(global.api + 'shopping/v1/restaurants/delivery_modes')
        .then((res) => {
          console.log(res.data)
          // this.songList = res.data

        })
    }
    ,
    methods: {
      choose(index) {
        // console.log(index)
        this.curIndex = index
        // console.log(this.curIndex)
        this.show1 = true
      },
      k() {
        this.kg = !this.kg
        if (this.curIndex == '') {
          this.curIndex = 0
        }
      },
      getid(item) {
        console.log(item.id)
        this.restaurant_category_id = item.id
        this.kg = false
        this.$http.get(global.api + 'shopping/restaurants?latitude=' + this.latitude + '&longitude=' + this.longitude + '&restaurant_category_id=' + item.id)
          .then((res) => {
            console.log(res.data)
            this.shopList = res.data
            this.shopList.push({'ischecked':false})
          })
      },
      px() {
        this.kg1 = !this.kg1
        if (this.curIndex == '') {
          this.curIndex = 0
        }
      },
      getorder(item) {
        this.kg1 = false
        console.log(item.id)
        this.$http.get(global.api + 'shopping/restaurants?latitude=' + this.latitude + '&longitude=' + this.longitude + '&order_by=' + item.id)
          .then((res) => {
            console.log(res.data)
            this.shopList = res.data
          })
      },
      sx() {
        this.kg2 = !this.kg2
      },
      change1(item) {
        console.log(item.id)
        item.flag =!item.flag
        console.log(item.flag)
      },
      change(item) {
        console.log(item.id)
        item.flag =!item.flag
        console.log(item.flag)
      },
      sure(shu,song) {
        this.kg2 = !this.kg2
        // console.log(shu)
        // console.log(song[0])
        if(song[0].flag == true){
          console.log(song[0].id)
          this.song_id.push(song[0].id)
        }else{

        }
        for(var i=0;i<shu.length;i++){
          if(shu[i].flag == true){
            console.log(shu[i].id)
            this.shu_id.push(shu[i].id)
          }else{

          }
        }

        this.$http.get(global.api + 'shopping/restaurants?latitude=' + this.latitude + '&longitude=' + this.longitude + '&delivery_mode=' + this.song_id + '&support_ids=' + this.shu_id)
          .then((res) => {
            console.log(1111)
            console.log(res.data)
            // this.shopList = res.data
          })

      }
    }
  }
</script>

<style>
  @import "../assets/css/app.css";
</style>
