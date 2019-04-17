<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="投放地点" prop="name2">
        <el-input v-model="ruleForm.name2"></el-input>
      </el-form-item>
      <el-form-item label="吸粉账号" prop="region">
        <el-col :span="5">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="微信" value="shanghai"></el-option>
            <el-option label="公众号" value="wx1"></el-option>
            <el-option label="微博" value="wx2"></el-option>
            <el-option label="抖音" value="wx3"></el-option>
            <el-option label="快手" value="wx4"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="ruleForm.name22"></el-input>
        </el-col>
        <el-col :span="5" :push="1">
          <el-button type="primary" size="mini">预览</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="二维码位置" prop="region2">
        <el-select v-model="ruleForm.region2" placeholder="请选择">
          <el-option label="左上" value="shanghai2"></el-option>
          <el-option label="左下" value="beijing2"></el-option>
          <el-option label="右上" value="beijing3"></el-option>
          <el-option label="右下" value="beijing4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投开始时间" required>
        <el-col :span="5">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              :picker-options="pickerOptions0"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">投放周数</el-col>
        <el-col :span="5">
          <el-select v-model="ruleForm.date2" placeholder="请选择">
            <el-option v-for="num in weeksNum" :label="num" :value="num" :key="num"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="连续播放次数" prop="name3" label-width="107px">
        <el-input v-model="ruleForm.name3"></el-input>
      </el-form-item>
      <el-form-item label="每小时出现次数" prop="name4" label-width="121px">
        <el-input v-model="ruleForm.name4"></el-input>
      </el-form-item>
      <el-form-item label="上传素材">
        <el-col :span="12">
          <!-- 上传图片或视频下拉选择框 -->
          <el-select v-model="ruleForm.desc" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <!-- 上传图片 -->
        <el-col>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList2"
            list-type="picture"
            :on-error="err_fun"
          >
            <el-button
              size="small"
              type="primary"
              style="padding: 9px 15px;position: relative;top: -39px;left: 243px;"
            >点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="每张显示秒数" prop="name5">
        <el-input v-model="ruleForm.name6" style="width:200px"></el-input>秒
      </el-form-item>
      <el-form-item label="背景音乐" prop="name5">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList2"
          list-type="picture"
          :on-error="err_fun"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <div class="form-footer" style="margin-left:100px">
        <p>素材总时长：{{400}}秒</p>
        <p>素材总金额：{{600}}元</p>
        <span>折后总金额：{{380}}元</span>
        <el-tag type="success" style="margin-left:20px">优惠政策</el-tag>
        <p style="font-size:40px">合计金额：{{380}}元</p>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '设备1',
        name2: '北京市通州区',
        name22: '填写您的账号',
        region: '',
        region2: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '图片'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      options: [
        {
          value: '0',
          label: '图片'
        },
        {
          value: '1',
          label: '视频'
        }
      ],
      weeksNum: [], // 多少周
      // 投放从当前日期开始
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      // 上传图片
      fileList2: []
    }
  },
  created() {
    for (let i = 1; i <= 52; i++) {
      this.weeksNum.push(i)
    }
  },
  methods: {
    err_fun() {
      this.$message.error('上传图片失败')
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
