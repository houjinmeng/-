<template>
  <div>
    <!-- 头部搜索区域 -->
    <ul class="top_search">
      <li>
        支付状态：
        <el-select placeholder="请选择" v-model="tableList.keyword.is_pay">
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
          <el-date-picker v-model="value1" type="date" placeholder="开始时间" value-format="timestamp"></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker v-model="value2" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
        </div>
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">创建时间：</span>
          <el-date-picker v-model="value3" type="date" placeholder="开始时间" value-format="timestamp"></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker v-model="value4" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
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
    <el-dialog :visible.sync="dialogTableVisible" width="20%" :modal="false">
      <div>
        <span>设备名称：</span>
        <input type="text" readonly>
      </div>
      <div>
        <span>投放地点：</span>
        <input type="text" readonly>
      </div>
      <div>
        <span>吸粉账号：</span>
        <select name id style="width:65px"></select>
        <input type="text" readonly style="width:100px">
      </div>
      <div>
        <span>投放时间：</span>
        <input type="text" readonly style="width:75px">至
        <input type="text" readonly style="width:75px">
      </div>
      <div>
        <span>连续播放次数：</span>
        <input type="text" readonly>
      </div>
      <div>
        <span>每小时出现次数：</span>
        <input type="text" readonly>
      </div>
      <div>
        <span>合计金额：</span>
        <input type="text" readonly>
      </div>
      <div>
        <span>驳回原因：</span>
        <input type="text" readonly>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
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
      // 查看弹框隐藏显示
      dialogTableVisible: false,
      // 记录数据总条数
      tot: 0,
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
        token: '',
        page: '',
        keyword: {
          start_time: '',
          end_time: '',
          create_start_time: '',
          create_end_time: '',
          is_pay: ''
        }
      },
      // 接收列表数据
      tableData: []
    }
  },
  methods: {
    // 获取订单表格数据
    getOrderList() {
      this.$http
        .post('/order_list', JSON.stringify(this.tableList))
        .then(res => {
          let data = res.data
          data.forEach(e => {
            e.is_pay = e.is_pay === 1 ? '已支付' : '未支付'
          })
          this.tableData = data
          this.tot = this.tableData.length
        })
    },
    // 点击查看弹框
    showDialog(uid) {
      this.dialogTableVisible = true
    },
    // 按需搜所
    search() {
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
// 点击查看对话框样式
.el-dialog {
  span {
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-top: 10px;
  }
}
</style>
