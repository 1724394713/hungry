<template>
  <div>
    <el-container>
      <el-header style="height: 1.95rem;">
        <div class="head" style="height: 1.95rem;">
          <span class="back iconfont icon-sousuo"></span>
          <span class="cityname ellipsis">{{checkCity}}</span>
          <router-link to="/login">
            <span class="changeCity">登录|注册</span>
          </router-link>
        </div>
      </el-header>
      <el-main class="el-main3" style="margin-top: 1.95rem;">

        <swiper :options="swiperOption" ref="mySwiper">
          <!--<div v-swiper:mySwiper="swiperOption" @someSwiperEvent="callback">-->
          <!--<div class="swiper-wrapper" v-for="(item, index) in 2" :key="index">-->
          <swiper-slide class="swiper-slide">
            <div v-for="(item, index) in lbList" :key="index">
              <router-link :to="{name:'shopList',params:{title:item.title}}">
                <img :src="url+ item.image_url">
                <p>{{item.title}}</p>
              </router-link>
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <div v-for="(item, index) in lb" :key="index">
              <router-link :to="{name:'shopList',params:{title:item.title}}" >
                <img :src="url+ item.image_url">
                <p>{{item.title}}</p>
              </router-link>
            </div>
          </swiper-slide>

          <div class="swiper-pagination"></div>
          <!--</div>-->
        </swiper>
        <div class="shop">
          <div class="near">
            <span class="shop-icon"></span>
            <span class="shop-title">附近商家</span>
          </div>
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
                      <span>￥20元起送/{{item.piecewise_agent_fee.tips}}</span>
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
      <el-footer>
        <my-foot></my-foot>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import myFoot from './foot'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import global from '../config/index.js'
  export default {
    name: "index",
    data() {
      return {
        swiperOption: {
          // loop: true,
          pagination: {
            el: '.swiper-pagination'
          },
          // some swiper options...
        },
        url: 'https://fuss10.elemecdn.com',
        url1: 'https://elm.cangdu.org/img/',
        geohash: '',
        checkCity: [],
        latitude: '',
        longitude: '',
        shopList: []

      }
    },
    components: {
      myFoot,
      swiper,
      swiperSlide
    },
    //
    mounted() {
      // this.mySwiper.slideTo(3, 1000, false)
    },
    created() {
      this.getData()
    },
    computed: {
      // geohashList() {
      //   return this.$store.state.geohashList;
      // },
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      lbList() {
        return this.$store.state.lbList;
      },
      lb() {
        return this.$store.state.lb;
      },
      geohash() {
        return this.$store.state.geohash;
      }
    },
    methods: {
      getData() {
        // this.$store.dispatch('geohash');
        this.$store.dispatch('getlb');
        // this.$store.dispatch('getshop');
        let geohash = this.$route.query.geohash;
        console.log(this.$route.query)
        this.geohash = geohash.geohash;
        this.latitude = geohash.latitude;
        this.longitude = geohash.longitude;
        // console.log(this.geohash)
        console.log(global.api + 'v2/pois/' + this.geohash);
        this.$http.get(global.api + 'v2/pois/' + this.geohash)
          .then((res) =>{
            console.log(res.data)
            this.checkCity = res.data.name
          })
        this.$http.get(global.api + 'shopping/restaurants?latitude=' + this.latitude + '&longitude=' + this.longitude)
          .then((res) =>{
            console.log(res.data)
            this.shopList = res.data
          })
      }
    }

  }
</script>

<style>
  @import "../assets/css/app.css";

  html, body, #app {
    height: 100%;
    width: 100%;
  }

  .swiper-container-autoheight, .swiper-container-autoheight .swiper-slide {
    height: 100%;
  }

  .swiper-pagination-bullet {
    width: 15px;
    height: 15px;
  }

  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 8%;
  }
</style>
