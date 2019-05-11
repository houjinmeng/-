<template>
  <div>
    <!-- 头部 -->
    <header id="head" style="height:100px">
      <!-- 左侧logo部分 -->
      <div>
        <a href class="left">
          <div class="left logo"></div>
          <div>
            <p style="font-size:20px">快乐平方</p>
            <p class="Eglish_name">Happy square</p>
          </div>
        </a>
        <span class="left line">|</span>
        <p class="right" style="margin-top:12px">中国领先的广告商</p>
      </div>
      <!-- 右侧登录注册 -->
      <!-- <router-link class="btn" to ref="login_btn" tag="button" @click.native="login">登录</router-link> -->
      <div class="btn" @click="login" v-show="Login">登录</div>
      <div class="btn" @click="person" v-show="Person">欢迎！{{username}}</div>
    </header>
    <!-- 中间内容 -->
    <div class="content">
      <p>让广告投放更简单</p>
      <div>
        <input type="text" placeholder="请输入城市，设备名称，商场" v-model="keywords">
        <button class="search" @click="search">搜索</button>
        <button class="list" @click="defaultList">默认列表</button>
      </div>
    </div>
    <!-- 底部 -->
    <footer id="foot" style="margin-top:200px">
      <div class="top_box">
        <ul>
          <li>
            <a href>关于我们</a>
          </li>
          <li>
            <a href>企业介绍</a>
          </li>
        </ul>
        <ul>
          <li>联系我们</li>
          <li>电话：18515170507</li>
          <li>邮箱：pingfang@163.com</li>
        </ul>
        <ul>
          <li>手机wap</li>
          <li></li>
        </ul>
        <ul>
          <li>微信公众号</li>
          <li></li>
        </ul>
      </div>
      <div class="bot_box">
        <p>Copyright © 2014-2019北京快乐平方有限公司版权所有</p>
        <p>网站备案号：京ICP备11111111-1 电话：5555555555 电子邮箱：5555@555.com</p>
      </div>
    </footer>
    <!-- 点击登录弹出二维码 -->
    <div id="login" v-show="showLogin">
      <div id="login_container" align="center" style="margin-top:100px"></div>
      <div id="close" @click="showLogin=false">X</div>
    </div>
  </div>
</template>

<script>
import '../assets/js/wxLogin.js'
export default {
  name: 'TopHeader',
  mounted() {
    let code = this.getQueryString('code')
    if (code === null) {
      return false
    } else {
      this.$http.post('/wx_login', { code: code }).then(res => {
        // 通过浏览器的sessionStorage记录服务器返回的token信息
        window.sessionStorage.setItem('token', res.data.token)
        this.username = res.data.nick
        console.log(this.username)
        this.Login = false
        this.Person = true
        if (res.data.status == 0) {
          alert(res.data.errmsg)
        } else if (res.data.status == 2) {
          this.$router.push('/mySettings')
        } else if (res.data.status == 1) {
          this.$message.success('登录成功！')
        }
      })
    }
  },
  data() {
    return {
      // 用户名
      username: '',
      // 登录状态
      Login: true,
      Person: false,
      // 搜索框
      keywords: '',
      // 二维码窗口显示隐藏
      showLogin: false,
      // 接收二维码
      weixin: []
    }
  },
  methods: {
    // 点击进入个人中心
    person(){
      this.$router.push('/personal')
    },
    // 搜索
    search() {
      this.$router.push({
        path: '/machine',
        query: { keywords: this.keywords }
      })
    },
    // 截取code
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r !== null) return r[2]
      return null
    },
    //  登录
    login() {
      this.showLogin = true
      this.$http.post('/wx_qrcode').then(res => {
        var obj = new WxLogin({
          id: 'login_container', // div的id
          appid: res.data.appId,
          scope: 'snsapi_login', // 写死
          redirect_uri: encodeURI(res.data.wx_url), // 前端接收code的地址(截取URL 发送code到后台)
          style: 'black', // 二维码黑白风格
          response_type: 'code'
        })
      })
    },
    // 默认列表
    defaultList() {
      this.$router.push('/machine')
    }
  }
}
</script>

<style lang="less" scoped>
// 中间部分样式
.content {
  background-image: url(../assets/img/bgc.png);
  height: 600px;
  position: relative;
  width: 100%;
  p {
    color: #fff;
    font-size: 34px;
    letter-spacing: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -80px;
    margin-left: -180px;
  }
  div {
    width: 740px;
    height: 58px;
    background-color: #3b4753;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -370px;
    padding: 7px;
    box-sizing: border-box;
    padding-left: 10px;
    input {
      width: 442px;
      height: 42px;
      background-color: #3b4753;
      border: #0f89ec 1px solid;
      padding-left: 30px;
      font-size: 18px;
      color: #fff;
      outline: none;
    }
    .search {
      width: 112px;
      height: 44px;
      background-color: #0f89ec;
      border: none;
      position: absolute;
      left: 484px;
      cursor: pointer;
    }
    .list {
      width: 112px;
      height: 44px;
      background-color: #ff8a00;
      border: none;
      position: absolute;
      right: 16px;
      cursor: pointer;
    }
  }
}
// 登录扫描二维码弹框
#login {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1000;
  #close {
    position: absolute;
    font-size: 78px;
    color: #fff;
    right: 180px;
    top: 70px;
    cursor: pointer;
  }
}
</style>
