<template>
  <div>
    <el-container>
      <el-header style="height: 1.95rem;">
        <div class="head" style="height: 1.95rem;">
          <span class="back iconfont icon-top-back" @click="back">  </span>
          <span class="city ellipsis">{{checkCity}}</span>
            <span class="changeCity" @click="changeCity">切换城市</span>
        </div>
      </el-header>
      <el-main>
        <div class="box">
          <div class="index-main-top">
            <el-input
              placeholder="请输入内容"
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
              <!--<router-link  :to="{path:'/index',query:{geohash:item.geohash}}">-->
                <h4 class="ellipsis">{{item.name}}</h4>
                <p class="ellipsis">{{item.address}}</p>
              <!--</router-link>-->
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
    </el-container>
  </div>
</template>
<script>
  import global from '../config/index'
  export default {
    name:'elm',
    data() {
      return {
        checkCity: '',
        input: '',
        id: '',
        search: [],
        flag: true,
        history: []
      }
    },
    computed: {
      groupCity() {
        return this.$store.state.groupList;
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        let id = this.$route.params.id;
        this.id = id;
        // console.log(this.id);
        this.$http.get( global.api + 'v1/cities/'+id)
          .then((res) =>{
            // console.log(res.data)
            this.checkCity = res.data.name
          })
        console.log(window.localStorage.getItem('content'))
        this.history = JSON.parse(window.localStorage.getItem('content'))
      },
      //提交
      submit(){
        if(this.input === '') {
          alert('必须填写此字段');
          return
        } else {
          // console.log(this.input)
          // console.log(this.id)
          this.$http.get( global.api + 'v1/pois?city_id='+this.id+'&keyword='+this.input)
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
        this.$router.push({path:'/index',query:{geohash:item}});
        // console.log(item)
        let content= JSON.parse(window.localStorage.getItem('content'));
        this.history = content;
        if(!content) {
          let arr = [];
          arr.push(item);
          window.localStorage.setItem('content',JSON.stringify(arr));
        } else {
          // console.log(content)
          // console.log(item.name)
          let flag = false;
          for(let i=0;i<content.length;i++){
            if(content[i].name === item.name){
              flag = true  // 相同
            }
          }
          if(flag){
            console.log(1111)
            window.localStorage.setItem('content',JSON.stringify(content));
          }else{
            content.push(item);
            window.localStorage.setItem('content',JSON.stringify(content));
          }
        }
        this.$store.commit('osave', item)
      },
      //清空历史记录
      qk() {
        localStorage.clear();
      },
      //切换地址
      changeCity(){
        this.$router.push('/')
      },
      back() {
        this.$router.push('/')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  @import "../assets/css/app.css";
</style>
