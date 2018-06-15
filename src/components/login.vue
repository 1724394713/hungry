<template>
  <div>
    <el-container>
      <el-header style="height: 1.95rem;">
        <div class="head1" style="height: 1.95rem;">
          <span class="back iconfont icon-top-back" @click="back(history)">  </span>
          <span class="city ellipsis">密码登录</span>
        </div>
      </el-header>
      <el-main>
        <div class="form">
          <p>
            <input type="text" placeholder="账号" v-model="name">
          </p>
          <p class="inp">
            <input type="text" class="text" v-show="!value2" v-model="txt" placeholder="密码">
            <input type="password" class="text" v-show="value2" v-model="txt" placeholder="密码">
            <el-switch
              class="kg"
              v-model="value1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="change"
            >
            </el-switch>
          </p>
          <div class="number">
            <p><input type="text" placeholder="验证码" v-model="code"></p>
            <p class="img">
              <span>
                <img :src="num" alt="">
              </span>
              <span class="change">
                <i>看不清</i>
                <i @click="change1">换一张</i>
              </span>
            </p>
          </div>
        </div>
        <p class="tip">温馨提示：未注册过的账号，登录时将自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
        <div class="login" @click="login">登录</div>
        <router-link to="">
          <span class="forget">重置密码？</span>
        </router-link>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import global from '../config/index.js'
  export default {
    name: "login",
    data() {
      return {
        txt: '',
        value1: false,
        value2: true,
        num: '',
        name: '',
        code: '',
        message: ''
      }
    },
    created() {
      this.$http.post(global.api + 'v1/captchas')
        .then((res) =>{
          console.log(res.data)
          this.num = res.data.code
        })
    },
    methods: {
      change() {
        this.value2 = !this.value2
      },
      change1() {
        this.$http.post(global.api + 'v1/captchas')
          .then((res) =>{
            console.log(res.data)
            this.num = res.data.code
          })
      },
      login() {
        this.$http.post(global.api + 'v2/login',{
          username: this.name,
          password: this.txt,
          captcha_code: this.code
        })
          .then((res) =>{
            console.log(res.data)
            if(res.data.message == '登录成功') {
              this.$router.push('/person')
            }else{
              alert(res.data.message)
            }
          })

      }
    }
  }
</script>

<style>
  @import "../assets/css/app.css";
</style>
