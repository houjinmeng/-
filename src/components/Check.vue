<template>
  <div>
    <!-- 头部搜索区域 -->
    <ul class="top_search">
      <li>
        审核状态：
        <el-select placeholder="请选择" v-model="value">
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
        <el-button class="btn">搜索</el-button>
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
      <el-table-column prop="status" label="状态" align="center"></el-table-column>
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
            v-show="showBtn"
          >催办</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
  mounted() {
    this.getCheckList()
  },
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time)
      return formatDate(date, 'hh:mm:ss') // 时间点 例 21点12分12秒的格式
    }
  },
  data() {
    return {
      // 催办按钮显示隐藏
      showBtn: false,
      // 下拉日历的数据
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      // 审核状态下拉框数据
      options: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '已支付'
        },
        {
          value: '2',
          label: '未支付'
        }
      ],
      value: '',
      // 获取订单列表所需参数
      tableList: {
        token: '',
        page: '',
        keyword: {
          start_time: '',
          end_time: '',
          status: '',
          create_start_time: '',
          create_end_time: ''
        }
      },
      // 接收列表数据
      tableData: []
    }
  },
  methods: {
    getCheckList() {
      this.$http
        .post('/check_list', JSON.stringify(this.tableList))
        .then(res => {
          let data = res.data
          data.forEach(e => {
            if (e.status === 0) {
              e.status = '未审核'
            } else if (e.status === 1) {
              e.status = '审核中'
            } else if (e.status === 2) {
              e.status = '审核失败'
            } else {
              e.status = '审核成功'
            }
          })
          this.tableData = data
        })
    }
  }
}
</script>
<style>
</style>
