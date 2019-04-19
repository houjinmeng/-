<template>
  <div style="text-align:center">
    <!-- 头部搜索区域 -->
    <ul class="top_search">
      <li>
        审核状态：
        <el-select placeholder="请选择" v-model="tableList.keyword.status">
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
      <el-table-column prop="machine_address" label="设备地点" align="center"></el-table-column>
      <el-table-column label="投放时间" align="center">
        <template slot-scope="info">
          <span>{{info.row.start_time*1000|formatDate}}</span>-
          <span>{{info.row.end_time*1000|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="info">
          <span>{{info.row.create_time*1000|formatDate}}</span>
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
            v-if="info.row.is_press===0"
          >催办</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据分页展示 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="this.tot"
    ></el-pagination>
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
      return formatDate(date, 'yyyy.MM.dd') // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time)
      return formatDate(date, 'hh:mm:ss') // 时间点 例 21点12分12秒的格式
    }
  },
  data() {
    return {
      // 总记录数据条数
      tot: 20,
      // 接收日历值
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
          value: '0',
          label: '未审核'
        },
        {
          value: '1',
          label: '审核中'
        },
        {
          value: '2',
          label: '审核失败'
        },
        {
          value: '3',
          label: '审核成功'
        }
      ],
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
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getCheckList()
    },
    // 获取审核列表数据
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
          this.tot = this.tableData.length
        })
    },
    // 按需搜所
    search() {
      this.tableList.keyword.start_time = this.value1 / 1000
      this.tableList.keyword.end_time = this.value2 / 1000
      this.tableList.keyword.create_start_time = this.value3 / 1000
      this.tableList.keyword.create_end_time = this.value4 / 1000
      this.getCheckList()
    }
  }
}
</script>
<style>
</style>
