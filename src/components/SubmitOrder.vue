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
          <a href="javascript:void(0)" class="left">
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
    <el-form label-width="140px" :ref="form" :model="form" :rules="rules" class="demo-ruleForm">
      <el-form-item label="设备名称">
        <el-input style="width:400px" v-model="getMachine.machine_name" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="投放地点">
        <el-input style="width:400px" v-model="getMachine.address" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="吸粉账号" prop="account">
        <el-select placeholder="请选择" v-model="form.account">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-upload
          :limit="1"
          name="img"
          style="display: inline-block;margin-left:30px"
          class="editor-slide-upload"
          :data="uploadData"
          action="/api/ad/client/upload_qrcode/"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
        >
          <el-button type="primary">上传二维码</el-button>
        </el-upload>
        <img src="http://192.168.1.144/" alt class="wx">
      </el-form-item>
      <el-form-item label="二维码位置" prop="location">
        <el-select placeholder="请选择" v-model="form.location">
          <el-option
            v-for="item in options0"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投开始时间" prop="valuedata">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          value-format="timestamp"
          v-model="form.valuedata"
        ></el-date-picker>投放周数
        <el-select placeholder="请选择" v-model="form.valueweek">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="连续播放次数" prop="play_count">
        <el-input style="width:400px" v-model.number="form.play_count"></el-input>
      </el-form-item>
      <el-form-item label="每小时出现次数" prop="ad_count">
        <el-input style="width:400px" v-model.number="form.ad_count"></el-input>
      </el-form-item>
      <!-- 上传素材 -->
      <el-form-item label="上传素材" prop="valueimg">
        <!-- 上传图片或视频下拉选择框 -->
        <el-select placeholder="请选择" style="width:100px" v-model="form.valueimg">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input :readonly="true" style="width:190px" placeholder="建议素材格式：16:9或9:1"></el-input>
        <!-- 上传素材 -->
        <el-upload
          name="pic"
          style="display: inline-block;margin-left:30px"
          class="upload-demo"
          action="#"
          :multiple="true"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="imgPreview"
        >
          <el-button slot="trigger" type="primary">选择素材</el-button>
          <el-button type="primary" @click="submitUpload">提交素材</el-button>
        </el-upload>
        <!-- 上传背景音乐 -->
        <el-upload
          name="bgm"
          style="display: inline-block"
          class="editor-slide-upload"
          :data="uploadbgm"
          action="/api/ad/client/bgm/"
          :http-request="uploadBgm"
          :show-file-list="false"
        >
          <el-button type="primary">添加背景音乐</el-button>
        </el-upload>
        <span
          style="font-size:48px;color:blue;height:30px;line-height:25px;cursor: pointer;"
          @click="showupload=true"
        >+</span>
      </el-form-item>
      <!-- 可选的第二组素材 -->
      <el-form-item label="上传素材(2)" prop="valueimg2" v-show="showupload">
        <!-- 上传图片或视频下拉选择框 -->
        <el-select placeholder="请选择" style="width:100px" v-model="form.valueimg2">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input :readonly="true" style="width:190px" placeholder="建议素材格式：16:9或9:1"></el-input>
        <!-- 上传素材 -->
        <el-upload
          name="pic"
          style="display: inline-block;margin-left:30px"
          class="upload-demo"
          action="#"
          :multiple="true"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="imgPreview1"
        >
          <el-button slot="trigger" type="primary">选择素材</el-button>
          <el-button type="primary" @click="submitUpload2">提交素材</el-button>
        </el-upload>
        <!-- 上传背景音乐 -->
        <el-upload
          name="bgm"
          style="display: inline-block"
          class="editor-slide-upload"
          :data="uploadbgm"
          action="/api/ad/client/bgm/"
          :http-request="uploadBgm"
          :show-file-list="false"
        >
          <el-button type="primary">添加背景音乐</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="每张图片显示秒数" prop="seconds">
        <el-input style="width:200px" v-model.number="form.seconds"></el-input>秒
      </el-form-item>
      <div class="form-footer" style="margin-left:130px">
        <p>素材总时长：{{400}}秒</p>
        <p>素材总金额：{{600}}元</p>
        <span>折后总金额：{{380}}元</span>
        <el-tag type="success" style="margin-left:20px" @click="getPrice">优惠政策</el-tag>
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
  mounted() {
    this.getMachine_id()
  },
  data() {
    return {
      // 第二组上传素材显示隐藏
      showupload: false,
      // 表单验证绑定
      form: {
        account: '',
        location: '',
        valuedata: '',
        valueweek: '',
        play_count: '1',
        ad_count: '4',
        valueimg: '',
        valueimg2: '',
        seconds: ''
      },
      // 表单验证规则
      rules: {
        account: [
          { required: true, message: '请选择吸粉账号', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请选择二维码位置', trigger: 'change' }
        ],
        valuedata: [
          { required: true, message: '请选择开始投放时间', trigger: 'change' }
        ],
        valueweek: [
          { required: true, message: '请选择投放周数', trigger: 'change' }
        ],
        play_count: [
          { required: true, message: '请填写连续播放次数', trigger: 'blur' },
          { type: 'number', message: '播放次数必须为数字值' }
        ],
        ad_count: [
          { required: true, message: '请填写每小时播放次数', trigger: 'blur' },
          { type: 'number', message: '播放次数必须为数字值' }
        ],
        valueimg: [
          { required: true, message: '请选择素材类型', trigger: 'change' }
        ],
        valueimg2: [
          { required: true, message: '请选择素材类型', trigger: 'change' }
        ],
        seconds: [
          {
            required: true,
            message: '请填写每张图片显示秒数',
            trigger: 'blur'
          },
          { type: 'number', message: '显示秒数必须为数字值' }
        ]
      },
      // 上传背景音乐
      uploadbgm: {
        token: '',
        ad_id: ''
      },
      // 获取用户已选设备信息
      getMachine: {},
      // 上传二维码
      uploadData: {
        token: '',
        type: '',
        machine_arr: []
      },
      // 吸粉账号类型下拉框数据
      options: [
        {
          value: '微信',
          label: '微信'
        },
        {
          value: '公众号',
          label: '公众号'
        },
        {
          value: '微博',
          label: '微博'
        },
        {
          value: '抖音',
          label: '抖音'
        },
        {
          value: '快手',
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
      // 二维码位置下拉数据
      options0: [
        {
          value: '0',
          label: '左上'
        },
        {
          value: '1',
          label: '左下'
        },
        {
          value: '2',
          label: '右上'
        },
        {
          value: '3',
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
      // 自定义上传素材
      formmatter: {
        silderimgList: [],
        token: ''
      },
      // 计算价格所需参数
      price: {
        token: '',
        length: '',
        start_time: '',
        end_time: '',
        repeat_number: '',
        number: ''
      },
      // 接收视频时长，图片数量
      length1: '',
      pic_number1: '',
      length2: '',
      pic_number2: '',
      // 比较时长的数组
      maxlength: []
    }
  },
  methods: {
    // 计算价格
    getPrice() {
      if (this.showupload === true) {
        if (this.length1 === '') {
          let len = this.pic_number1 * this.form.seconds
          this.maxlength.push(len)
        } else {
          this.maxlength.push(this.length1)
        }
        if (this.length2 === '') {
          let len = this.pic_number2 * this.form.seconds
          this.maxlength.push(len)
        } else {
          this.maxlength.push(this.length2)
        }
        console.log(this.maxlength)
        this.price.length = Math.max.apply(null, this.maxlength)
      } else {
        if (this.length1 === '') {
          this.price.length = this.pic_number1 * this.form.seconds
        } else {
          this.price.length = this.length1
        }
      }
      this.price.start_time = this.form.valuedata / 1000
      this.price.end_time = this.form.valueweek * 604800 + this.price.start_time
      this.price.number = this.uploadData.machine_arr.length
      this.price.repeat_number = this.form.play_count
      this.$http.post('/count_price', JSON.stringify(this.price)).then(res => {
        console.log(res)
      })
    },
    // 图片上传事件
    imgPreview(file, fileList) {
      if (this.form.valueimg === '0' || this.form.valueimg2 === '0') {
        let fileName = file.name
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
        if (regex.test(fileName.toLowerCase())) {
          this.form.silder_image = file.url
        } else {
          this.$message.error('请选择图片文件')
        }
      }
      this.formmatter.silderimgList = []
      for (let i = 0; i < fileList.length; i++) {
        let obj = {}
        obj = fileList[i].raw
        this.formmatter.silderimgList.push(obj)
      }
    },
    // 图片上传事件2
    imgPreview1(file, fileList) {
      if (this.form.valueimg2 === '0') {
        let fileName = file.name
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
        if (regex.test(fileName.toLowerCase())) {
          this.form.silder_image = file.url
        } else {
          this.$message.error('请选择图片文件')
        }
      }
      this.formmatter.silderimgList = []
      for (let i = 0; i < fileList.length; i++) {
        let obj = {}
        obj = fileList[i].raw
        this.formmatter.silderimgList.push(obj)
      }
    },
    // 自定义上传素材
    submitUpload() {
      let url = ''
      let name = ''
      let that = this
      if (that.form.valueimg === '0' || that.form.valueimg2 === '0') {
        url = '/upload_pic'
        name = `pic[]`
      } else {
        url = '/upload_video'
        name = 'video'
      }
      // 打印已包装好的文件格式数组
      let formData = new FormData()
      // that.form.silderimgList值本地预览的图片数组
      for (let i = 0; i < that.formmatter.silderimgList.length; i++) {
        formData.append(name, that.formmatter.silderimgList[i])
      }
      // 商品名
      formData.append('token', that.form.token)
      // 上传服务器的api
      that
        .$http({
          method: 'post', // 指定请求方式
          url: url, // 请求接口
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
          },
          data: formData
        })
        .then(function(res) {
          that.formData = new FormData()
          if (that.form.valueimg === '0') {
            that.uploadbgm.ad_id = res.data.ad_id.join(',')
            that.pic_number1 = res.data.ad_id.length
          } else {
            that.uploadbgm.ad_id = res.data.ad_id
            that.length1 = res.data.ad_length
          }
        })
    },
    // 自定义上传素材2
    submitUpload2() {
      let url = ''
      let name = ''
      let that = this
      if (that.form.valueimg2 === '0') {
        url = '/upload_pic'
        name = `pic[]`
      } else {
        url = '/upload_video'
        name = 'video'
      }
      // 打印已包装好的文件格式数组
      let formData = new FormData()
      // that.form.silderimgList值本地预览的图片数组
      for (let i = 0; i < that.formmatter.silderimgList.length; i++) {
        formData.append(name, that.formmatter.silderimgList[i])
      }
      // 商品名
      formData.append('token', that.form.token)
      // 上传服务器的api
      that
        .$http({
          method: 'post', // 指定请求方式
          url: url, // 请求接口
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
          },
          data: formData
        })
        .then(function(res) {
          that.formData = new FormData()
          if (that.form.valueimg2 === '0') {
            that.uploadbgm.ad_id = res.data.ad_id.join(',')
            that.pic_number2 = res.data.ad_id.length
          } else {
            that.uploadbgm.ad_id = res.data.ad_id
            that.length2 = res.data.ad_length
          }
        })
    },
    // 上传素材的背景音乐
    uploadBgm(f) {
      let upload = new FormData()
      upload.append('bgm', f.file)
      upload.append('token', this.uploadbgm.token)
      upload.append('ad_id', this.uploadbgm.ad_id)
      this.$http.post('/bgm', upload).then(res => {
        this.uploadbgm.ad_id = []
      })
    },
    // 获取用户已选设备信息
    getMachine_id() {
      this.getMachine = JSON.parse(window.sessionStorage.getItem('machine'))
      this.uploadData.machine_arr = this.getMachine.machine_id.split(',')
    },
    // 上传二维码成功回调
    handleAvatarSuccess(res, file) {
      this.imgInfo = URL.createObjectURL(file.raw)
    },
    // 上传二维码前回调
    beforeAvatarUpload(file) {
      this.uploadData.type = this.form.account
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>
<style lang="less" scoped>
.wx {
  display: inline-block;
  width: 120px;
  height: 120px;
  position: absolute;
}
.el-form {
  width: 840px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
