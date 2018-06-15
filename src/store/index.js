import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import global from '../config/index.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    guessList: '', //定位城市
    hotList: [],
    groupList: [],  // 热门城市
    groupnum: [],
    latitude: '',
    longitude: '',
    geohash: '',
    geohashList: [],
    lbList: [],
    lb: [],
    detailList: [],
    shop: []
  },
  mutations: {
    //定位城市
    guessList(state, payLoad) {
      // console.log(payLoad)
      state.guessList = payLoad
    },
    //热门城市
    hotList(state, payLoad) {
      state.hotList.push(payLoad)
    },
    //全部城市
    groupList(state, payLoad) {
      // console.log(payLoad)
      var obj = Object.keys(payLoad).sort()
      /*获取属性名字，返回一个数组,sort()按字母先后排序*/
      var newObj = {}
      /*定义一个新的对象*/
      for (let item in obj) {
        newObj[obj[item]] = payLoad[obj[item]]

      }
      // console.log(obj)
      state.groupnum.push(obj)
      for (var k in newObj) {
        // console.log(newObj[k])
        state.groupList.push(newObj[k])
      }
      // console.log(state.groupList)

    },
    //  经度纬度
    osave(state, payLoad) {
      // console.log(payLoad)
      state.geohash = payLoad.geohash;
      state.latitude = payLoad.latitude;
      state.longitude = payLoad.longitude;
    },
    //   //热门城市
    //   geohashList (state, payLoad) {
    //     state.geohashList.push(payLoad);
    //     // console.log(payLoad)
    //   },
    //轮播图数据
    lbList(state, payLoad) {
      state.lbList = payLoad.splice(0, 8);
      state.lb = payLoad
    },
    // //定位城市
    // detailList (state, payLoad) {
    //   console.log(payLoad)
    //   state.detailList = payLoad;
    // },
    // sure(state, payLoad) {
    //   console.log(payLoad)
    //   for (var i = 0; i < payLoad.length; i++) {
    //     state.shop.push(payLoad[i].supports)
    //     // payLoad[i].push({'isChecked': false})
    //     console.log(state.shop)
    //     for (var j=0;j<state.shop[i].length;j++){
    //       console.log(state.shop[j])
    //     }
    //   }
    // }
  },
  actions: {
    //定位城市
    guessCity(context) {
      axios.get(global.api + 'v1/cities?type=guess')
        .then((res) => {
          context.commit('guessList', res.data)
        })
    },
    //热门城市
    hotCity(context) {
      axios.get(global.api + 'v1/cities?type=hot')
        .then((res) => {
          context.commit('hotList', res.data)
        })
    },
    //所有城市
    groupCity(context) {
      axios.get(global.api + 'v1/cities?type=group')
        .then((res) => {
          context.commit('groupList', res.data)
        })
    },
    // //精准定位
    // geohash (context) {
    //   // console.log(context)
    //   axios.get(global.api + 'v2/pois/' + context.state.geohash)
    //     .then((res) => {
    //       context.commit('geohashList', res.data)
    //     })
    // },
    //  轮播图数据
    getlb(context) {
      // console.log(context)
      axios.get(global.api + 'v2/index_entry')
        .then((res) => {
          context.commit('lbList', res.data)
        })
    }
    // //  商品列表
    // getdetail (context) {
    //   // console.log(context)
    //   axios.get(global.api + 'shopping/v2/restaurant/category')
    //     .then((res) => {
    //       context.commit('detailList', res.data)
    //     })
    // }
  }
})
