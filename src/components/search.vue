<template>
  <div>
    <el-container>
      <el-header>
        <div class="head1" style="height: 1.95rem;">
          <span class="back iconfont icon-top-back" @click="back(history)">  </span>
          <span class="city ellipsis">搜索</span>
        </div>
      </el-header>
      <el-main>
        <div class="box">
          <div class="index-main-top">
            <el-input
              placeholder="请输入商家或美食"
              v-model="input"
              clearable>
            </el-input>
            <el-button type="primary" @click="submit()">提交</el-button>
          </div>
        </div>
        <div class="history" v-if="flag">
          <p class="search-title">搜索历史</p>

          <ul class="history-content">
            <li v-for="(item, index) in history" :key="index" @click="save(item)">
              <router-link  :to="{path:'/index',query:{geohash:item.geohash}}">
              <h4 class="ellipsis">{{item.name}}</h4>
              <p class="ellipsis">{{item.address}}</p>
              </router-link>
              <span @click="del(index)">x</span>
            </li>

          </ul>
          <div class="qk" @click="qk">清空历史</div>
        </div>
        <div v-if="!flag">
          <div class="history">
            <ul class="history-content">
              <li v-for="(item, index) in search[0]" :key="index" @click="save(item)">
                <!--<router-link :to="{path:'/index',query:{geohash:item.geohash}}">-->
                <h4 class="ellipsis">{{item.name}}</h4>
                <p class="ellipsis">{{item.address}}</p>
                <!--</router-link>-->
              </li>
            </ul>
          </div>
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
  import global from '../config/index'
  export default {
    name:'search',
    data() {
      return {
        checkCity: '',
        input: '',
        geohash1: '',
        search: [],
        flag: true,
        history: []
      }
    },
    components: {
      myFoot
    },
    computed: {
      groupCity() {
        return this.$store.state.groupList;
      },
      geohash() {
        return this.$store.state.geohash;
      }

    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        let geohash1 = this.$route.query.geohash;
        this.geohash1 = geohash1;
        // console.log(this.$route.query);
        // console.log(window.localStorage.getItem('searchHistory'))
        this.history = JSON.parse(window.localStorage.getItem('searchHistory'))
      },
      //提交
      submit(){
        if(this.input === '') {
          alert('必须填写此字段');
          return
        } else {
          this.$http.get( global.api + 'v4/restaurants?geohash='+this.geohash+'&keyword='+this.input)
            .then((res) =>{
              // console.log(res.data)
              this.search.push(res.data);
              // console.log(this.search)
              this.flag = false
            })
        }
      },
      //历史记录
      save(item){
        // this.$router.push({path:'/index',query:{geohash:item}});
        // console.log(item.geohash)
        let searchHistory= JSON.parse(window.localStorage.getItem('searchHistory'));
        if(!searchHistory) {
          let arr = [];
          arr.push(item);
          window.localStorage.setItem('searchHistory',JSON.stringify(arr));
        } else {
          // console.log(content)
          // console.log(item.name)
          let flag = false;
          for(let i=0;i<searchHistory.length;i++){
            if(searchHistory[i].name === item.name){
              flag = true  // 相同
            }
          }
          if(flag){
            // console.log(1111)
            window.localStorage.setItem('searchHistory',JSON.stringify(searchHistory));
          }else{
            searchHistory.push(item);
            window.localStorage.setItem('searchHistory',JSON.stringify(searchHistory));
          }
        }
        // this.$store.commit('osave', {latitude,longitude, geohash})
      },
      //清空历史记录
      qk() {
        window.localStorage.clear();
        this.history = []
      },
      //
      del(index) {
        let arr3 = window.localStorage.searchHistory
        console.log(window.localStorage.searchHistory.length)
        this.history.splice(index,1)
        window.localStorage.removeItem('searchHistory')
      },
      back(item) {
        this.$router.push({path:'/index',query:{geohash:item}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  @import "../assets/css/app.css";
</style>
