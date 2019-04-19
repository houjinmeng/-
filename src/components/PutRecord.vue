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
        <input type="text" v-model="tableList.keyword.address">
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
    <!-- 订单表格数据展示 -->
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
      <el-table-column prop="order_amount" label="金额（元）" align="center"></el-table-column>
      <el-table-column label="投放素材" align="center">
        <template slot-scope="info">
          <el-button
            size="mini"
            style="background-color:#0e9692;color:#fff"
            @click="preview(info.row.ad_id)"
          >预览</el-button>
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
          >再次投放</el-button>
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
    <el-dialog title="素材预览" :visible.sync="dialogTableVisible">
      <img
        style="width:50%;height:50%"
        v-for="item in imgData"
        :src="'http://192.168.1.144'+item"
        v-show="imgFlag"
        :key="item.index"
      >
      <video
        :key="item.index"
        v-for="item in videoData"
        v-show="videoFlag"
        :src="'http://192.168.1.144'+item"
        preload
        height="300px"
        width="50%"
        controls
      ></video>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
  mounted() {
    this.getPutlist()
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
          address: '',
          start_time: ''
        }
      },
      // 接收列表数据
      tableData: [],
      // 接收传回的素材数据
      imgData: [],
      videoData: [],
      imgFlag: false,
      videoFlag: false
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
    // 获取投放记录列表
    getPutlist() {
      this.$http
        .post('/check_history', JSON.stringify(this.tableList))
        .then(res => {
          this.tableData = res.data
          this.tot = this.tableData.length
        })
    },
    // 按需搜所
    search() {
      this.tableList.keyword.start_time = this.value1 / 1000
      this.tableList.keyword.end_time = this.value2 / 1000
      this.getPutlist()
    },
    // 预览素材
    preview(uid) {
      this.imgData = []
      this.videoData = []
      this.imgFlag = false
      this.videoFlag = false
      this.dialogTableVisible = true
      for (let i = 0; i < uid.length; i++) {
        let fileName = uid[i].lastIndexOf('.')
        let fileNameLength = uid[i].length
        let a = uid[i].substring(fileName + 1, fileNameLength)
        if (a === 'jpg' || a === 'pang') {
          this.imgFlag = true
          this.imgData.push(uid[i])
        }
        if (a === 'mp4') {
          this.videoFlag = true
          this.videoData.push(uid[i])
        }
      }
    }
  }
}
</script>
<style>
</style>
