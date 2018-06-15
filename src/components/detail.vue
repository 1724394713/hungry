<template>
  <div class="detail">
    <el-container>
      <el-header id="detail-head" style="height: 6rem;">
        <div class="detail-top">
          <img :src="url + detailList.image_path" alt="" class="detail-logo">
          <router-link to="">
            <span class="fanhui iconfont icon-top-back"></span>
          </router-link>
          <span class="go"> > </span>
          <div>
            <h4>{{detailList.name}}</h4>
            <p>商家配送/分钟送达/配送费￥5</p>
            <p>{{detailList.promotion_info}}</p>
          </div>
        </div>
        <div class="detail-bot">
          <p><span class="active span" @click="show($event)">商品</span></p>
          <p><span class="span" @click="evaluate($event)">评价</span></p>
        </div>
      </el-header>
      <el-container class="detailcontainer" v-if="showList">

        <div class="menuwrapper" ref="menuWrapper">
          <ul class="left">
            <li v-for="(item, index) in leftList" :key="index"
                :class="{'current':currentIndex === index}"
                @click="selectMenu(index, $event)"
            >
              <span class="ellipsis" style="display: inline-block;width: 80%;">{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="foodswrapper" ref="foodsWrapper">
          <ul>
            <li v-for="(item, index) in leftList" :key="index"
                class="food-list-hook">
              <p class="good-title">
                <span class="title-name">{{item.name}}</span>
                <span class="title-description">{{item.description}}</span>
              </p>
              <div v-for="(item1,index) in leftList[index].foods" :key="index"
                   class="goods">
                <img :src="url +　item1.image_path" alt="">
                <div class="good-detail">
                  <p class="good-name">{{item1.name}}</p>
                  <p class="good-des">{{item1.description}}</p>
                  <p class="good-tips">{{item1.tips}}</p>
                  <div class="choose">
                    <p class="price">
                      <span>￥</span>
                      <span>{{item1.specfoods[0].price}}</span>
                      <span>起</span>
                    </p>
                    <p class="guige">
                      <span class="size" v-if="item1.specfoods.length!==1" @click="chooseSize(item1, index)">选规格</span>
                      <span class="jia" v-if="item1.specfoods.length==1" @click="add($event)">+</span>
                    </p>
                  </div>

                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-container>

      <el-container class="detailcontainer1" v-if="!showList">
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
          <li v-for="(item1,index) in replyList" class="replyList" :key="index">
            <img src="https://elm.cangdu.org/img/default.jpg" alt="" v-if="item1.avatar == ''" class="userimg">
            <img :src="url1 + item1.avatar + '.jpeg'" alt="" v-else="item1.avatar != ''" class="userimg">
            <div class="section">
              <header class="header">
                <span>{{item1.username}}</span>
                <span>{{item1.rated_at}}</span>
              </header>
              <div class="star">
                <el-rate
                  v-model="item1.rating_star"
                  disabled
                  text-color="#ff9900">
                </el-rate>
                <span>{{item1.time_spent_desc}}</span>
              </div>
              <ul class="reply-content">
                <li v-for="(item,index) in item1.item_ratings" :key="index" v-if="item.image_hash != ''">
                  <img :src="url1 + item.image_hash + '.jpeg'" alt="" class="reply-img">
                </li>
              </ul>
              <ul class="food-name">
                <li class="ellipsis" v-for="(item,index) in item1.item_ratings" :key="index"
                    v-if="item.food_name != ''">
                  {{item.food_name}}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </el-container>
      <el-footer v-if="showList">
        <span id="shopCart">购物车</span>
      </el-footer>
      <img :src="url + detailList.image_path" alt="" class="background">
      <div class="module" v-if="none">
        <div class="box">
          <p class="box-head">
            <span>{{item.name}}</span>
            <span class="close" @click="close">X</span>
          </p>
          <div class="box-size">
            <p>规格</p>
            <p>
              <span v-for="(item1, index) in item.specfoods" :key="index" @click="getindex(index)" :class="{'active': curIndex == index}">{{item1.specs_name}}</span>
            </p>
          </div>
          <div class="box-car">
            <span>{{item.specfoods[curIndex].price}}</span>
            <span>加入购物车</span>
          </div>
        </div>
      </div>
    </el-container>

  </div>
</template>

<script>
  import global from '../config/index.js'
  import BScroll from 'better-scroll';

  export default {
    name: "detail",
    data() {
      return {
        url: 'https://elm.cangdu.org/img/',
        url1: 'https://fuss10.elemecdn.com/',
        detailList: [],
        showList: true,
        leftList: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
        hidden: false,
        replyList: [],
        timer: null,
        none: false,
        item: {},
        curIndex: 0
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      //顶部商家信息
      let id = this.$route.params.id
      this.$http.get(global.api + 'shopping/restaurant/' + id)
        .then((res) => {
          console.log(res.data)
          this.detailList = res.data
        })

      //商品信息
      this.$http.get(global.api + 'shopping/v2/menu?restaurant_id=' + id)
        .then((res) => {
          console.log(res.data)
          this.leftList = res.data

          this.$nextTick(() => {  //可以用 $nextTick 來确保Dom变化后再执行一些事情
            this.initScroll();
            this.calculateHeight();
          });
        })
      //  评价列表
      this.$http.get(global.api + 'ugc/v2/restaurants/' + id + '/ratings')
        .then((res) => {
          console.log(res.data)
          this.replyList = res.data
        })
    },
    computed: {
      // this.timer = setInterval()
      currentIndex() { //计算到达哪个区域的区间的时候的对应的索引值
        // this.currentIndex = ''
        // console.log(this.currentIndex)
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]; //当前menu子块的高度
          // console.log(height1)
          let height2 = this.listHeight[i + 1]; //下一个menu子块的高度
          // console.log(height2)
          //滚动到底部的时候,height2为undefined,需要考虑这种情况
          //需要确定是在两个menu子块的高度区间
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i; //返回这个menu子块的索引
            // this.currentIndex = i
          }
        }
        return 0;
        // this.currentIndex = 0
      },
      selectFoods() { //自动将所有的goods.food添加一个count属性,方便做数量运算
        let foods = [];
        this.leftList.forEach((good) => {
          console.log(good)
          good.leftList.forEach((food) => {
            console.log(food)
            if (food.count) {
              foods.push(food);
              console.log(foods)
            }
          });
        });
        console.log(foods)
        return foods;
      }
    },
    methods: {
      show() {
        // console.log(ev.target.className)
        this.showList = true
      },
      evaluate() {
        // console.log(ev.target)
        // ev.target.className = 'active'
        this.showList = false
      },
      chooseSize(item, index) {
        this.item = item
        console.log(index)
        console.log(item)
        this.none = !this.none
      },
      add(ev){
        // var ospan = document.getElementsByClassName('.jia')[0];
        // console.log(ospan)
        // var ShopCart = document.getElementById('shopCart');
        // var nStartX = event.currentTarget.offsetLeft,
        //   nStartY = event.currentTarget.offsetTop - document.body.scrollTop,
        //   nEndX = ShopCart.offsetLeft,
        //   nEndY = ShopCart.offsetTop,
        //   nTopX = nStartX - 10,
        //   nTopY = nStartY - 8;
        // var x = nStartX,y = nStartY;
        // //新建一个内容
        // var domGood = document.createElement('div');
        // domGood.style.width = '20px';
        // domGood.style.height = '20px';
        // domGood.style.background = 'deeppink';
        // domGood.style.position = 'fixed';
        // domGood.style.left = nStartX + 'px';
        // domGood.style.top = nStartY + 'px';
        // domGood.style.zIndex = '999'
        // document.body.appendChild(domGood);
        // var a = ((nStartY - nEndY) * (nStartX - nTopX) - (nStartY - nTopY) * (nStartX - nEndX)) /
        //   ((nStartX * nStartX - nEndX * nEndX) * (nStartX - nTopX) - (nStartX * nStartX - nTopX * nTopX) * (nStartX - nEndX));
        // var b = ((nEndY - nStartY) - a * (nEndX * nEndX - nStartX * nStartX)) / (nEndX - nStartX);
        // var c = nStartY - a * nStartX * nStartX - b * nStartX;
        // var timer = setInterval(function () {
        //   /*y = a * x*x + b*x +c;*/
        //   if (x < nEndX) {
        //     x = x + 8;
        //     y = a * x * x + b * x + c;
        //     domGood.style.left = x + 'px';
        //     domGood.style.top = y + 'px';
        //     console.log(x + 'px')
        //     console.log(y + 'px')
        //   }else {
        //     domGood.parentNode.removeChild(domGood);
        //     clearInterval(timer);
        //   }
        // }, 500)
        // console.log(ev)
        // console.log(event.currentTarget.offsetTop)
        // console.log(nStartX, nStartY, nEndX, nEndY, nTopX, nTopY)


      },
      close(){
        this.none = !this.none
      },
      getindex(index) {

        this.curIndex = index

      },
      initScroll() {
        //初始化scroll区域
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3, //结合BScroll的接口使用,3实时派发scroll事件，探针的作用
          click: true
        });
        //结合BScroll的接口使用,监听scroll事件(实时派发的),并获取鼠标坐标，当滚动时能实时暴露出scroll
        this.foodsScroll.on('scroll', (pos) => { //事件的回调函数
          this.scrollY = Math.abs(Math.round(pos.y));//滚动坐标会出现负的,并且是小数,所以需要处理一下，实时取得scrollY
          // console.log(this.scrollY)
        })
      },
      calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'); //获取每一个food的dom对象
        let height = 0;
        this.listHeight.push(height); //初始化第一个高度为0
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]; //每一个item都是刚才获取的food的每一个dom
          height += item.clientHeight; //主要是为了获取每一个foods内部块的高度
          this.listHeight.push(height);
          // console.log(this.listHeight)
        }
      },
      selectMenu(index, event) {
        console.log(11111)
        if (!event._constructed) { //去掉自带的click事件点击，即pc端直接返回
          return;
        }
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodsList[index];
        //类似jump to的功能,通过这个方法,跳转到指定的dom
        this.foodsScroll.scrollToElement(el, 300);
        // console.log(el)
      },

    }
  }
</script>

<style scoped>
  @import "../assets/css/app.css";

  .active {
    color: #3190e8;
    border-bottom: 0.1rem solid #3190e8;
  }

  .menuwrapper {
    overflow: hidden;
    width: 4rem;
    height: auto;
    background: #fff;
  }

  .foodswrapper {
    overflow: hidden;
    width: 12rem;
    background: #fff;
    /*margin-bottom: 8rem;*/
  }

  .current {
    border-left: 0.1rem solid #3190e8;
    color: #3190e8;
  }



  /*.content{*/
  /*height:100%;*/
  /*}*/
</style>
