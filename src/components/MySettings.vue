<template>
  <div>
    <!-- 绑定手机号页 -->
    <div class="box" v-if="show2">
      <el-form :model="tableList" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="绑定手机号：" prop="phone">
          <el-input v-model.number="tableList.phone" style="width:180px" clearable maxlength="11"/>
          <el-button @click="getCode" style="margin-left:30px" type="primary" id="btn">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input v-model="tableList.verify" clearable style="width:180px"/>
        </el-form-item>
        <el-button @click="keep" style="margin:10px 0 0 150px;width:80px" type="success">保存</el-button>
      </el-form>
    </div>
    <!-- 已绑定手机号 -->
    <div class="box" v-if="show1">
      <span>当前绑定手机号：</span>
      <span>{{phone}}</span>
      <el-button type="primary" style="margin-left:30px" @click="changePhone">更换手机号</el-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getphone()
  },
  data() {
    // 自定义手机表单验证
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      //  手机号验证
      rules: {
        phone: [{ validator: checkPhone, trigger: 'blur' }]
      },
      // 绑定页面显示隐藏
      show2: false,
      show1: false,
      // 所需参数
      tableList: {
        token: window.sessionStorage.getItem('token'),
        phone: '',
        verify: ''
      },
      phone: ''
    }
  },
  methods: {
    // 获取手机号
    getphone() {
      this.$http
        .post('/phone_list', JSON.stringify(this.tableList))
        .then(res => {
          this.phone = res.data
          if (this.phone === null) {
            this.show2 = true
            this.show1 = false
          } else {
            this.show1 = true
            this.show2 = false
          }
        })
    },
    // 更换手机号
    changePhone() {
      this.show1 = false
      this.show2 = true
    },
    // 获取验证码
    getCode() {
      if (this.tableList.phone == '') {
        this.$message.warning('手机号不能为空')
        return false
      }
      var obj = document.getElementById('btn')
      var wait = 60
      time(obj)
      function time(obj) {
        if (wait == 0) {
          obj.removeAttribute('disabled')
          obj.innerHTML = '获取验证码'
          wait = 60
        } else {
          obj.setAttribute('disabled', true)
          obj.innerHTML = wait + '秒后重新发送'
          wait--
          setTimeout(function() {
            time(obj)
          }, 1000)
        }
      }
      this.$http.post('/binding', JSON.stringify(this.tableList)).then(res => {
        console.log(res)
      })
    },
    // 保存
    keep() {
      this.$http.post('/verify', JSON.stringify(this.tableList)).then(res => {
        if (res.data.status === 1) {
          this.$message.success('绑定成功！')
          this.getphone()
        } else {
          this.$message.error('保存失败，请重新绑定')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
