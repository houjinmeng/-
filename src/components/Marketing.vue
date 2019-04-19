<template>
  <div style="text-align:center">
    <!-- 头部搜索区域 -->
    <ul class="top_search">
      <li>
        设备名称：
        <input type="text" v-model="tableList.keyword.machine_name">
      </li>
      <li>
        设备地点：
        <input type="text" v-model="tableList.keyword.machine_address">
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
      <li>
        <el-button class="btn" @click="search">搜索</el-button>
      </li>
    </ul>
    <!-- 表格数据展示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="序号" type="index" width="150" align="center"></el-table-column>
      <el-table-column prop="machine_name" label="设备名称" width="150" align="center"></el-table-column>
      <el-table-column prop="address" label="设备地点" align="center"></el-table-column>
      <el-table-column label="投放时间" align="center">
        <template slot-scope="info">
          <span>{{info.row.start_time*1000|formatDate}}</span>-
          <span>{{info.row.end_time*1000|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="营销号类型" align="center"></el-table-column>
      <el-table-column prop="click" label="被扫描次数" align="center"></el-table-column>
      <el-table-column label="投放素材" align="center">
        <template slot-scope="info">
          <el-button
            size="mini"
            style="background-color:#0e9692;color:#fff"
            @click="preview(info.row.new_code)"
          >预览</el-button>
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
    <!-- 预览素材对话框 -->
    <el-dialog title="素材预览" :visible.sync="dialogTableVisible" width="20%">
      <img :src="code" alt>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
  mounted() {
    this.getList()
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
      // 预览对话框显示隐藏
      dialogTableVisible: false,
      // 总记录数据条数
      tot: 20,
      // 下拉日历的数据
      value1: '',
      value2: '',
      // 获取订单列表所需参数
      tableList: {
        token: '',
        page: '',
        keyword: {
          machine_name: '',
          end_time: '',
          machine_address: '',
          start_time: ''
        }
      },
      // 接收列表数据
      tableData: [],
      // 接收素材二维码
      code: ''
    }
  },
  methods: {
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getPutlist()
    },
    // 获取表格数据
    getList() {
      this.$http
        .post('/ad_qrcode', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data
          this.tot = this.tableData.length
        })
    },
    // 按需搜所
    search() {
      this.tableList.keyword.start_time = this.value1 / 1000
      this.tableList.keyword.end_time = this.value2 / 1000
      this.getList()
    },
    // 预览素材
    preview(uid) {
      this.code = ''
      this.dialogTableVisible = true
      this.code = uid
    }
  }
}
</script>
<style>
</style>
