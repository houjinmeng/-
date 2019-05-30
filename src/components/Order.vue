<template>
  <div style="text-align:center">
    <!-- 头部搜索区域 -->
    <ul class="top_search">
      <li>
        支付状态：
        <el-select placeholder="请选择" v-model="tableList.keyword.is_pay" style="width:100px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">投放时间：</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="开始时间"
            value-format="timestamp"
            :editable="false"
          ></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="结束时间"
            value-format="timestamp"
            :picker-options="pickerOptions"
            :editable="false"
          ></el-date-picker>
        </div>
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">创建时间：</span>
          <el-date-picker
            v-model="value3"
            type="date"
            placeholder="开始时间"
            value-format="timestamp"
            :editable="false"
          ></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker
            v-model="value4"
            type="date"
            placeholder="结束时间"
            value-format="timestamp"
            :picker-options="pickerOptions1"
            :editable="false"
          ></el-date-picker>
        </div>
      </li>
      <li>
        <el-button class="btn" @click="search">搜索</el-button>
      </li>
    </ul>
    <!-- 订单表格数据展示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="序号" type="index" width="150" align="center"></el-table-column>
      <el-table-column prop="machine_name" label="设备名称" width="150" align="center"></el-table-column>
      <el-table-column prop="machine_address" label="设备地点" width="300" align="center"></el-table-column>
      <el-table-column label="投放时间" align="center">
        <template slot-scope="info">
          <span>{{info.row.start_time*1000|formatDate}}</span>-
          <span>{{info.row.end_time*1000|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order_amount" label="金额（元）" align="center"></el-table-column>
      <el-table-column prop="is_pay" label="状态" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="info">
          <span>{{info.row.create_time*1000|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="info">
          <el-button
            size="mini"
            style="background-color:#0e9692;color:#fff"
            @click="showDialog(info.row.id)"
          >查看</el-button>
          <el-button
            size="mini"
            style="background-color:#186fb2;color:#fff"
            @click="payDialog(info.row.id)"
            v-if="info.row.is_pay==='未支付'"
          >支付</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击查看弹框 -->
    <el-dialog :visible.sync="dialogTableVisible" width="30%" :modal="false">
      <div id="box">
        <div>
          <span style="display:inline-block;width:80px">设备名称：</span>
          <i>{{machine_name}}</i>
        </div>
        <div>
          <span style="display:inline-block;width:80px">投放地点：</span>
          <i>{{address}}</i>
        </div>
        <div>
          <span>投放时间：</span>
          <span>{{showList.start_time*1000|formatDate}}</span>至
          <span>{{showList.end_time*1000|formatDate}}</span>
        </div>
        <div>
          <span>连续播放次数：</span>
          <span>{{showList.repeat_number}}次</span>
        </div>
        <div>
          <span>每小时出现次数：</span>
          <span>{{showList.play_count}}次</span>
        </div>
        <div>
          <span>合计金额：</span>
          <span>{{showList.order_amount}}元</span>
        </div>
        <div>
          <span style="line-height: 100px">吸粉账号：</span>
          <span style="line-height: 100px">{{showList.type}}</span>
          <img :src="Url" alt>
        </div>
      </div>
    </el-dialog>
    <!-- 点击支付弹窗 -->
    <el-dialog :visible.sync="dialogTableVisible1" width="30%" :modal="false">
      <div id="pay">
        <div>订单金额：¥ {{order_amount}}</div>
        <div>实付金额：¥ {{order_amount}}</div>
        <el-button type="primary" @click="zhifuPay">支付宝支付</el-button>
        <el-button type="success" style="margin-left:50px;" @click="weixin">微信支付</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogTableVisible5" width="30%" :modal="false" title="提示" center>
      <span style="margin-left:50px">您好，您选择的设备时间被占用，请重新选择设备或者更改投放时间</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible5 = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 数据分页展示 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="this.tot"
      :current-page="tableList.page"
      :page-size="10"
    ></el-pagination>
    <!-- 支付宝二维码弹窗 -->
    <el-dialog :visible.sync="dialogTableVisible2" width="30%" :modal="false">
      <div id="pay">
        <h2>请扫码支付</h2>
        <vue-qr :text="config.value" :size="200" :dotScale="1"></vue-qr>
      </div>
    </el-dialog>
    <!-- 微信支付弹窗 -->
    <el-dialog :visible.sync="dialogTableVisible3" width="30%" :modal="false">
      <div id="pay">
        <h2>请扫码支付</h2>
        <vue-qr :text="config.value1" :size="200" :dotScale="1"></vue-qr>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
  components: { VueQr },
  mounted() {
    this.getOrderList()
  },
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy.MM.dd') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time)
      return formatDate(date, 'hh:mm:ss') // 时间点 例 21点12分12秒的格式
    }
  },
  data() {
    return {
      // 限制投放结束日期
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < this.value1
        }
      },
      // 限制投放结束日期
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() < this.value3
        }
      },
      config: {
        value: '', //显示的值、跳转的地址
        value1: ''
      },
      // 二维码弹框
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      // 接收要支付订单的id
      payId: '',
      // 查看弹框隐藏显示
      dialogTableVisible: false,
      // 支付弹框
      dialogTableVisible1: false,
      dialogTableVisible5: false,
      // 接收查看列表信息
      showList: {},
      machine_name: '',
      address: '',
      Url: '',
      // 记录数据总条数
      tot: 10,
      // 下拉日历的数据
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      // 审核状态下拉框数据
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '已支付'
        },
        {
          value: '0',
          label: '未支付'
        }
      ],
      // 获取订单列表所需参数
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: 1,
        keyword: {
          start_time: '',
          end_time: '',
          create_start_time: '',
          create_end_time: '',
          is_pay: ''
        }
      },
      // 接收列表数据
      tableData: [],
      // 订单金额
      order_amount: '',
      // 监听支付
      ispay: ''
    }
  },
  methods: {
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getOrderList()
    },
    // 支付
    payDialog(uid) {
      this.payId = uid
      const data = {
        token: window.sessionStorage.getItem('token'),
        check_id: ''
      }
      data.check_id = uid
      this.$http.post('/pay', JSON.stringify(data)).then(res => {
        if (res.data.error.length === 0) {
          this.order_amount = res.data.amount
          this.dialogTableVisible1 = true
        } else {
          this.dialogTableVisible5 = true
        }
      })
    },
    // 询问是否支付成功
    payOk() {
      let that = this
      that.$http.post('/order_status', that.ispay).then(res => {
        if (res.data.status === 1) {
          that.$message.success('支付成功！')
          that.getOrderList()
        } else {
          setTimeout(() => {
            that.payOk()
          }, 1000)
        }
      })
    },
    // 支付宝支付
    zhifuPay() {
      const data = {
        token: this.tableList.token,
        check_id: this.payId,
        type_id: 1
      }
      this.$http.post('/ad_pay', JSON.stringify(data)).then(res => {
        this.dialogTableVisible2 = true
        this.dialogTableVisible1 = false
        this.config.value = res.data.url
        this.ispay = res.data.unique_order_id
        this.payOk()
      })
    },
    // 微信支付
    weixin() {
      const data = {
        token: this.tableList.token,
        check_id: this.payId,
        type_id: 2
      }
      this.$http.post('/ad_pay', JSON.stringify(data)).then(res => {
        this.dialogTableVisible3 = true
        this.dialogTableVisible1 = false
        this.config.value1 = res.data.url
        this.ispay = res.data.unique_order_id
        this.payOk()
      })
    },
    // 获取订单表格数据
    getOrderList() {
      this.$http
        .post('/order_list', JSON.stringify(this.tableList))
        .then(res => {
          let data = res.data.data
          data.forEach(e => {
            e.is_pay = e.is_pay === 1 ? '已支付' : '未支付'
          })
          this.tableData = data
          this.tot = res.data.count
        })
    },
    // 点击查看弹框
    showDialog(uid) {
      const data = {
        token: this.tableList.token,
        check_id: uid
      }
      this.$http.post('/order_detail', JSON.stringify(data)).then(res => {
        const data = res.data
        this.showList = res.data
        this.machine_name = data.machine_name.join(';')
        this.address = data.address.join(';')
        this.Url = 'http://' + data.code
        this.dialogTableVisible = true
      })
    },
    // 按需搜所
    search() {
      if (this.value1.length !== 0 && this.value2.length === 0) {
        this.$message.warning('请选择投放结束日期')
        return false
      }
      if (this.value3.length !== 0 && this.value4.length === 0) {
        this.$message.warning('请选择创建结束日期')
        return false
      }
      this.tableList.keyword.start_time = this.value1 / 1000
      this.tableList.keyword.end_time = this.value2 / 1000
      this.tableList.keyword.create_start_time = this.value3 / 1000
      this.tableList.keyword.create_end_time = this.value4 / 1000
      this.getOrderList()
    }
  }
}
</script>
<style lang="less" scoped>
// 查看对话框样式
#box {
  font-size: 16px;
  padding-left: 20%;
  text-align: left;
  div {
    display: flex;
    margin-top: 10px;
    width: 400px;
    i {
      font-style: normal;
      width: 320px;
    }
    img {
      height: 100px;
      width: 100px;
      margin-left: 50px;
    }
  }
}
// 支付弹框样式
#pay {
  div {
    font-size: 20px;
    margin-bottom: 30px;
  }
}
</style>
