<template>
  <div>
    <el-container>
      <el-header style="height: 6.55rem;">
        <div class="head1" style="height: 1.95rem;">
          <span class="back iconfont icon-top-back" @click="back(history)">  </span>
          <span class="city ellipsis">账户信息</span>
        </div>
      </el-header>
      <el-main>
        <ul class="info-order">
          <li>
            <p>头像</p>
            <p>
              <img src="https://elm.cangdu.org/img/default.jpg" alt="">
            </p>
          </li>
          <li>
            <p>用户名</p>
            <p>1111</p>
          </li>
          <li>
            <p>收货地址</p>
          </li>
          <li class="info-title">
            <p>账号绑定</p>
          </li>
          <li>
            <p>手机</p>
          </li>
          <li class="info-title">
            <p>安全设置</p>
          </li>
          <li>
            <p>登录密码</p>
            <p>修改</p>
          </li>
        </ul>
        <div class="submit" @click="tui">退出登录</div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import global from '../config/index.js'
  export default {
    name: "person",
    methods:{
      tui(){
        this.$http.get(global.api + 'v2/signout')
          .then((res) =>{
            console.log(res.data)
            alert(res.data.message)
          })
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/app.css";
  .info-order{
    background: #fff;
    li{
      padding: 0.25rem 0.5rem;
      display: flex;
      justify-content: space-between;
      font-size: .6rem;
      color: #333;
      font-weight: 500;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
      img{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      p{
        display: flex;
      }
    }
    .info-title{
      background: #e4e4e4;
    }
  }
  .submit{
     width: 96%;
     margin: 1.3rem auto 0;
     line-height: 1.5rem;
     border-radius: 5px;
     text-align: center;
     background: #d8584a;
     font-size: .6rem;
     color: #fff;
   }
</style>
