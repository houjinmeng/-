<template>
  <div>
    <div class="box" v-if="show">
      <div>
        <span>绑定手机号：</span>
        <el-input placeholder="请输入手机号" v-model="a.phone" clearable style="width:150px"></el-input>
        <el-button @click="getCode" style="margin-left:30px" type="primary">获取验证码</el-button>
      </div>
      <div>
        <span>验证码：</span>
        <el-input placeholder="请输入验证码" v-model="a.phone" clearable style="width:150px"></el-input>
      </div>
      <el-button @click="keep" style="margin:50px 0 0 190px;width:80px" type="success">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      a: {
        token: '',
        phone: '',
        verify: ''
      }
    }
  },
  methods: {
    // 获取验证码
    getCode() {
      this.$http.post('/binding', JSON.stringify(this.a)).then(res => {
        console.log(res)
      })
    },
    // 保存
    keep() {
      this.$http.post('/verify', JSON.stringify(this.a)).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  div {
    margin-top: 15px;
  }
  span {
    display: inline-block;
    width: 150px;
    text-align: right;
    font-size: 20px;
  }
}
</style>
