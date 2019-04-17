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
      <div class="btn" @click="login">登录/注册</div>
    </header>
    <!-- 中间内容 -->
    <div class="content">
      <p>让广告投放更简单</p>
      <div>
        <input type="text" placeholder="请输入城市，设备名称，商场">
        <button class="search">搜索</button>
        <button class="list">默认列表</button>
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
    <div id="loginDialog" v-show="showLogin">
      <img src alt>
      <span id="close" @click="showLogin=false">×</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: false,
      wx_url: '',
      appid: '',
      dialogVisible: false,
      searchKey: '' // 搜索关键字
    }
  },
  methods: {
    //  登录
    login() {
      this.showLogin = true
    }
    // // 微信登陆
    // async InWeChat() {
    //   this.dialogVisible = true
    //   const res = await this.$http.get(
    //     'http://192.168.1.144/ad/client/wx_qrcode'
    //   )
    //   console.log(res)
    //   this.appid = res.data.appId
    //   this.wx_url = res.data.wx_url
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    }
    .list {
      width: 112px;
      height: 44px;
      background-color: #ff8a00;
      border: none;
      position: absolute;
      right: 16px;
    }
  }
}
// 登录扫描二维码
#loginDialog {
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
    right: 110px;
    top: 70px;
    cursor: pointer;
  }
}
</style>
