<template>
  <div>
    <el-form>
      <el-form-item label="商品图" prop="name">
        <el-upload
          action="123"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-change="imgPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="silder_imageVisible">
          <img width="100%" :src="form.silder_image" alt>
        </el-dialog>
      </el-form-item>
      <el-button @click="getimg">提交</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      silder_imageVisible: false,
      form: {
        silderimgList: [],
        token: ''
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log('移除图片')
      this.form.silderimgList = []
      for (let i = 0; i < fileList.length; i++) {
        let str = ''
        str = fileList[i].url
        this.form.silderimgList.push(str)
      }
      console.log(this.form.silderimgList)
      console.log('移除图片')
    },
    // 点击放大图片
    handlePictureCardPreview(file) {
      this.form.silder_image = file.url
      // console.log(file.url)
      this.silder_imageVisible = true
    },
    // 图片上传事件
    imgPreview(file, fileList) {
      let fileName = file.name
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
      if (regex.test(fileName.toLowerCase())) {
        this.form.silder_image = file.url
      } else {
        this.$message.error('请选择图片文件')
      }
      console.log('图片上传事件')
      this.form.silderimgList = []
      for (let i = 0; i < fileList.length; i++) {
        let obj = {}
        obj = fileList[i].raw
        this.form.silderimgList.push(obj)
      }
      this.form.name = fileList[0].raw
      // console.log(file, fileList)
      console.log(this.form.silderimgList)
      console.log('图片上传事件')
    },
    getimg() {
      let that = this
      // 打印已包装好的文件格式数组
      console.log(that.form.silderimgList)
      let formData = new FormData()
      // that.form.silderimgList值本地预览的图片数组
      for (let i = 0; i < that.form.silderimgList.length; i++) {
        formData.append(`pic`, that.form.silderimgList[i])
      }
      // 商品名
      formData.append('token', that.form.token)
      // 打印文件格式数组
      console.log('zuihou:' + formData.get('pic'))
      // 上传服务器的api
      that
        .$http({
          method: 'post', // 指定请求方式
          url: '/upload_pic', // 请求接口
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
          },
          data: formData
        })
        .then(function(res) {
          console.log('成功')
          // if (res.data.code === 0) {
          //   that.$message({
          //     message: '成功',
          //     type: 'success',
          //     duration: 1500
          //   })
          // } else {
          //   that.$message.error(res.data.message)
          // }
        })
    }
  }
}
</script>
<style>
</style>
