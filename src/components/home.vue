<template>
  <div>
    <el-container>
      <el-header style="height: 1.95rem;">
        <div class="head" style="height: 1.95rem;">
          <span class="back">ele.me</span>
          <span class="lign">登录|注册</span>
        </div>

      </el-header>
      <el-main>
        <div class="index-main-top">
          <div class="guess-city">
            <p>
              <span>当前定位城市：</span>
              <span>定位不准时，请在城市列表中选择</span>
            </p>
            <p>
              <router-link :to="{name:'elm',params:{id:guessList.id}}" class="ellipsis">
                <span>{{guessList.name}}</span>
                <span> ＞ </span>
              </router-link>
            </p>
          </div>
          <div class="hot">
            <p>热门城市</p>
            <ul>
              <li v-for="(item, index) in hotList" :key="index" class="ellipsis">
                <router-link :to="{name:'elm',params:{id:item.id}}">{{item.name}}</router-link>
              </li>
            </ul>
          </div>
          <div class="group" v-for="(item, index) in groupnum" :key="index" >
            <p>{{item}}</p>
            <ul>
              <li v-for="(item1, index) in groupCity[index]" :key="index" class="ellipsis">
                <router-link :to="{name:'elm',params:{id:item1.id}}">{{item1.name}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>

  export default {
    computed: {
      guessList() {
        return this.$store.state.guessList;
      },
      hotList() {
        return this.$store.state.hotList[0];
      },
      groupCity() {
        return this.$store.state.groupList;
      },
      groupnum() {
        return this.$store.state.groupnum[0];
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.$store.dispatch('guessCity');
        this.$store.dispatch('hotCity');
        this.$store.dispatch('groupCity');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  @import "../assets/css/app.css";
</style>
