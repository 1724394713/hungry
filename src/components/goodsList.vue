<template>
  <div class="detailcontainer">

    <!--<div class="menuwrapper" ref="menuWrapper">-->
      <!--<ul class="left">-->
        <!--<li v-for="(item, index) in leftList" :key="index"-->
            <!--:class="{'current':currentIndex === index}"-->
            <!--@click="selectMenu(index, $event)"-->
        <!--&gt;-->
          <!--&lt;!&ndash;{{currentIndex}}&ndash;&gt;-->
          <!--&lt;!&ndash;{{index}}&ndash;&gt;-->
          <!--&lt;!&ndash;<img :src="url + item.icon_url" alt="">&ndash;&gt;-->
          <!--<span class="ellipsis" style="display: inline-block;width: 80%;">{{item.name}}</span>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <!--<div class="foodswrapper" ref="foodsWrapper">-->
      <!--<ul>-->
        <!--<li v-for="(item, index) in leftList" :key="index"-->
            <!--class="food-list-hook">-->
          <!--<p class="good-title">-->
            <!--<span class="title-name">{{item.name}}</span>-->
            <!--<span class="title-description">{{item.description}}</span>-->
          <!--</p>-->
          <!--<div v-for="(item1,index) in leftList[index].foods" :key="index"-->
               <!--class="goods">-->
            <!--&lt;!&ndash;<span > @click="selectFood(food, $event)"&ndash;&gt;-->
            <!--&lt;!&ndash;{{item1.attributes[0]}}&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
            <!--<img :src="url +　item1.image_path" alt="">-->
            <!--<div class="good-detail">-->
              <!--<p class="good-name">{{item1.name}}</p>-->
              <!--<p class="good-des">{{item1.description}}</p>-->
              <!--<p class="good-tips">{{item1.tips}}</p>-->
              <!--&lt;!&ndash;<p class="good-activity">{{item1.activity.image_text}}</p>&ndash;&gt;-->
              <!--<div class="choose">-->
                <!--<p class="price">-->
                  <!--<span>￥</span>-->
                  <!--<span>{{item1.specfoods[0].price}}</span>-->
                  <!--<span>起</span>-->
                <!--</p>-->
                <!--<p class="guige">-->
                  <!--<span class="size" v-if="item1.specfoods.length!==1">选规格</span>-->
                  <!--<span class="jia" v-if="item1.specfoods.length==1">+</span>-->
                <!--</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    2143353
  </div>
</template>

<script>
  // import global from '../config/index.js'
  // import BScroll from 'better-scroll';

  export default {
    name: "goodsList",
    data() {
      return {
        leftList: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
        hidden: false,
      }
    },
    // props: {
    //   seller: {
    //     type: Object
    //   }
    // },
    created() {
      let id = this.$route.params.id
      console.log(this.$route.params)
      // this.$http.get(global.api + 'shopping/restaurant/' + id)
      //   .then((res) => {
      //     console.log(res.data)
      //     this.detailList = res.data
      //   })
      // //商品信息
      // this.$http.get(global.api + 'shopping/v2/menu?restaurant_id=' + id)
      //   .then((res) => {
      //     console.log(res.data)
      //     this.leftList = res.data
      //
      //     this.$nextTick(() => {  //可以用 $nextTick 來确保Dom变化后再执行一些事情
      //       this.initScroll();
      //       this.calculateHeight();
      //     });
      //   })
    },
    // computed: {
    //   currentIndex() { //计算到达哪个区域的区间的时候的对应的索引值
    //     // this.currentIndex = ''
    //     // console.log(this.currentIndex)
    //     for (let i = 0; i < this.listHeight.length; i++) {
    //       let height1 = this.listHeight[i]; //当前menu子块的高度
    //       // console.log(height1)
    //       let height2 = this.listHeight[i + 1]; //下一个menu子块的高度
    //       // console.log(height2)
    //       //滚动到底部的时候,height2为undefined,需要考虑这种情况
    //       //需要确定是在两个menu子块的高度区间
    //       if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
    //         return i; //返回这个menu子块的索引
    //         // this.currentIndex = i
    //       }
    //     }
    //     return 0;
    //     // this.currentIndex = 0
    //   },
    //   selectFoods() { //自动将所有的goods.food添加一个count属性,方便做数量运算
    //     let foods = [];
    //     this.leftList.forEach((good) => {
    //       console.log(good)
    //       good.leftList.forEach((food) => {
    //         console.log(food)
    //         if (food.count) {
    //           foods.push(food);
    //           console.log(foods)
    //         }
    //       });
    //     });
    //     console.log(foods)
    //     return foods;
    //   }
    // },
    // initScroll() {
    //   //初始化scroll区域
    //   this.menuScroll = new BScroll(this.$refs.menuWrapper, {
    //     click: true //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
    //   });
    //   this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
    //     probeType: 3 //结合BScroll的接口使用,3实时派发scroll事件，探针的作用
    //   });
    //   //结合BScroll的接口使用,监听scroll事件(实时派发的),并获取鼠标坐标，当滚动时能实时暴露出scroll
    //   this.foodsScroll.on('scroll', (pos) => { //事件的回调函数
    //     this.scrollY = Math.abs(Math.round(pos.y));//滚动坐标会出现负的,并且是小数,所以需要处理一下，实时取得scrollY
    //     // console.log(this.scrollY)
    //   })
    // },
    // calculateHeight() {
    //   let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'); //获取每一个food的dom对象
    //   let height = 0;
    //   this.listHeight.push(height); //初始化第一个高度为0
    //   for (let i = 0; i < foodList.length; i++) {
    //     let item = foodList[i]; //每一个item都是刚才获取的food的每一个dom
    //     height += item.clientHeight; //主要是为了获取每一个foods内部块的高度
    //     this.listHeight.push(height);
    //     // console.log(this.listHeight)
    //   }
    // },
    // selectMenu(index, event) {
    //   console.log(11111)
    //   if (!event._constructed) { //去掉自带的click事件点击，即pc端直接返回
    //     return;
    //   }
    //   let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
    //   let el = foodsList[index];
    //   //类似jump to的功能,通过这个方法,跳转到指定的dom
    //   this.foodsScroll.scrollToElement(el, 300);
    //   // console.log(el)
    // }

  }
</script>

<style scoped>
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
  }


</style>
