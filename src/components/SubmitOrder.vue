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
    <el-form label-width="100px" class="demo-ruleForm">
      <el-form-item label="设备名称">
        <el-input style="width:400px" v-model="this.$route.query.use.machine_name"></el-input>
      </el-form-item>
      <el-form-item label="投放地点">
        <el-input style="width:400px"  v-model="this.$route.query.use.address"></el-input>
      </el-form-item>
      <el-form-item label="投放类型">
        <el-select placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item label="吸粉账号">
        <el-select placeholder="请选择">
          <el-option label="微信" value="shanghai"></el-option>
          <el-option label="公众号" value="wx1"></el-option>
          <el-option label="微博" value="wx2"></el-option>
          <el-option label="抖音" value="wx3"></el-option>
          <el-option label="快手" value="wx4"></el-option>
        </el-select>
        <el-button type="primary" size="mini">上传二维码</el-button>
      </el-form-item>
      <el-form-item label="二维码位置">
        <el-select placeholder="请选择">
          <el-option label="左上" value="shanghai2"></el-option>
          <el-option label="左下" value="beijing2"></el-option>
          <el-option label="右上" value="beijing3"></el-option>
          <el-option label="右下" value="beijing4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投开始时间" required>
        <el-date-picker type="date" placeholder="选择日期"></el-date-picker>投放周数
        <el-select placeholder="请选择">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="连续播放次数" label-width="107px">
        <el-input style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="每小时出现次数" label-width="121px">
        <el-input style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="上传素材">
        <!-- 上传图片或视频下拉选择框 -->
        <el-select placeholder="请选择" style="width:100px">
          <el-option></el-option>
        </el-select>
        <el-input :readonly="true" style="width:190px" placeholder="建议素材格式：16:9或9:1"></el-input>
        <el-button size="small" type="primary">选择素材</el-button>
        <el-button size="small" type="primary">添加背景音乐</el-button>
      </el-form-item>
      <el-form-item label="每张图片显示秒数">
        <el-input style="width:200px"></el-input>秒
      </el-form-item>
      <div class="form-footer" style="margin-left:100px">
        <p>素材总时长：{{400}}秒</p>
        <p>素材总金额：{{600}}元</p>
        <span>折后总金额：{{380}}元</span>
        <el-tag type="success" style="margin-left:20px">优惠政策</el-tag>
        <p style="font-size:20px">合计金额：{{380}}元</p>
      </div>
      <el-form-item>
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
    this.get()
  },
  data() {
    return {
      machine_message: ''
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.el-form {
  width: 800px;
  margin: 0 auto;
}
</style>
