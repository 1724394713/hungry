<template>
  <div>
    <el-container>
      <el-header style="height: 6.55rem;">
        <div class="head1" style="height: 1.95rem;">
          <span class="back iconfont icon-top-back" @click="back(history)">  </span>
          <span class="city ellipsis">我的</span>
        </div>
        <router-link to="/info">
          <div class="my-head">
            <img src="https://elm.cangdu.org/img/default.jpg" alt="">
            <div>
              <p>11111111</p>
              <p>暂无绑定手机</p>
            </div>
            <span> > </span>
          </div>
        </router-link>
      </el-header>
      <el-main>
        <div class="main-title">
          <div>
            <p>
              <b style="color: #f90;">0.00</b>
              <span>元</span>
            </p>
            <p>我的余额</p>
          </div>
          <div>
            <p>
              <b style="color: #ff5f3e;">3</b>
              <span>个</span>
            </p>
            <p>我的优惠</p>
          </div>
          <div>
            <p>
              <b style="color: #6ac20b;">0</b>
              <span>分</span>
            </p>
            <p>我的积分</p>
          </div>
        </div>
        <ul class="order">
          <li>
            <p>
              <span>我的订单</span>
              <span> > </span>
            </p>
          </li>
          <li>
            <p>
              <span>积分商城</span>
              <span> > </span>
            </p>
          </li>
          <li>
            <p>
              <span>饿了么会员卡</span>
              <span> > </span>
            </p>
          </li>
        </ul>
        <ul class="order">
          <li>
            <p>
              <span>服务中心</span>
              <span> > </span>
            </p>
          </li>
          <li>
            <p>
              <span>下载饿了么APP</span>
              <span> > </span>
            </p>
          </li>
        </ul>
      </el-main>
    </el-container>
    <el-footer>
      <my-foot></my-foot>
    </el-footer>
  </div>
</template>

<script>
  import myFoot from './foot'
  export default {
    name: "person",
    components: {
      myFoot
    }
  }
</script>

<style>
  @import "../assets/css/app.css";
</style>
