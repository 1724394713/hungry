<template>
    <div class="foot">
      <router-link :to="{path:'/index',query:{geohash:geohash}}">
          <span class="iconfont icon-SSS"></span>
          <p>外卖</p>
      </router-link>
      <router-link :to="{path:'/search',query:{geohash:geohash}}">
          <span class="iconfont icon-iconcopy"></span>
          <p>搜索</p>
      </router-link>
      <router-link to="">
          <span class="iconfont icon-order"></span>
          <p>订单</p>
      </router-link>
      <router-link to="">
          <span class="iconfont icon-wode"></span>
          <p>我的</p>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "foot",
      computed: {
        geohash() {
          return this.$store.state.geohash
        }
      }
    }
</script>

<style>
  @import "../assets/css/app.css";
</style>
