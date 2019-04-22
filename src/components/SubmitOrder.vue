<template>
  <div>
    <!-- 头部 -->
    <header>
      <img src="../assets/img/bgc2.png" alt width="100%" height="280px">
      <div
        id="head"
        style="height:80px;width:100%;background: rgba(0, 0, 0, 0.5);position: absolute;top:0"
      >
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
        <div class="btn">登录 / 注册</div>
      </div>
    </header>
    <el-form label-width="130px" class="demo-ruleForm">
      <el-form-item label="设备名称">
        <el-input style="width:400px" v-model="getuse.machine_name"></el-input>
      </el-form-item>
      <el-form-item label="投放地点">
        <el-input style="width:400px" v-model="getuse.address"></el-input>
      </el-form-item>
      <el-form-item label="吸粉账号">
        <el-select placeholder="请选择" v-model="value1">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-upload
          name="img"
          style="display: inline-block"
          class="editor-slide-upload"
          :data="uploadData"
          action="http://192.168.1.144/ad/client/upload_qrcode"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button type="primary" size="mini">上传二维码</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="二维码位置">
        <el-select placeholder="请选择" v-model="value2">
          <el-option
            v-for="item in options0"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投开始时间" required>
        <el-date-picker type="date" placeholder="选择日期" value-format="timestamp" v-model="valuedata"></el-date-picker>投放周数
        <el-select placeholder="请选择" v-model="valueweek">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="连续播放次数">
        <el-input style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="每小时出现次数">
        <el-input style="width:400px"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'上传素材' + (index+1)"
        :key="domain.key"
      >
        <!-- 上传图片或视频下拉选择框 -->
        <el-select placeholder="请选择" style="width:100px" v-model="valueimg">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input :readonly="true" style="width:190px" placeholder="建议素材格式：16:9或9:1"></el-input>
        <el-upload
          style="display: inline-block"
          class="editor-slide-upload"
          action="api/productLine/saveImgInfo.do"
          :multiple="true"
          :show-file-list="true"
        >
          <el-button size="small" type="primary">选择素材</el-button>
          <el-button size="small" type="primary">添加背景音乐</el-button>
        </el-upload>
        <span
          style="font-size:40px;color:blue;border:1px solid blue;display:inline-block;height:30px;line-height:25px"
          @click="addDomain"
        >+</span>
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item label="每张图片显示秒数">
        <el-input style="width:200px"></el-input>秒
      </el-form-item>
      <div class="form-footer" style="margin-left:130px">
        <p>素材总时长：{{400}}秒</p>
        <p>素材总金额：{{600}}元</p>
        <span>折后总金额：{{380}}元</span>
        <el-tag type="success" style="margin-left:20px">优惠政策</el-tag>
        <p style="font-size:20px">合计金额：{{380}}元</p>
      </div>
      <el-form-item style="margin-top:30px;margin-left:20px">
        <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <footer id="foot">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadActionUrl: 'http://192.168.1.144/ad/client/upload_qrcode',
      getuse: this.$route.query.use,
      // 上传二维码
      uploadData: {
        token: '',
        type: '微信',
        machine_arr: [11]
      },
      // 吸粉账号类型下拉框数据
      options: [
        {
          value: '',
          label: '微信'
        },
        {
          value: '1',
          label: '公众号'
        },
        {
          value: '0',
          label: '微博'
        },
        {
          value: '2',
          label: '抖音'
        },
        {
          value: '3',
          label: '快手'
        }
      ],
      // 投放周数下拉数据
      options1: [
        {
          value: '',
          label: '1'
        },
        {
          value: '1',
          label: '2'
        },
        {
          value: '0',
          label: '3'
        },
        {
          value: '2',
          label: '4'
        }
      ],
      // 上传素材类型
      options2: [
        {
          value: '0',
          label: '图片'
        },
        {
          value: '1',
          label: '视频'
        }
      ],
      value1: '',
      value2: '',
      valuedata: '',
      valueweek: '',
      valueimg: '',
      // 二维码位置下拉数据
      options0: [
        {
          value: '',
          label: '左上'
        },
        {
          value: '1',
          label: '左下'
        },
        {
          value: '0',
          label: '右上'
        },
        {
          value: '2',
          label: '右下'
        }
      ],
      // 动态创建上传素材
      dynamicValidateForm: {
        domains: [
          {
            value: ''
          }
        ]
      },
      machine_message: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imgInfo = URL.createObjectURL(file.raw)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    submitForm() {
      this.$http
        .post('/upload_qrcode', JSON.stringify(this.uploadData))
        .then(res => {
          console.log(res)
        })
    },
    // 点击加号生成新上传素材栏
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-form {
  width: 800px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
