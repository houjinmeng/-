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
      <el-table-column label="播放次数" align="center">
        <template slot-scope="info">
          <el-button
            size="mini"
            style="background-color:#0e9692;color:#fff"
            @click="showDialog(info.row.id)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看弹框 -->
    <el-dialog :visible.sync="dialogTableVisible" width="30%" :modal="false">
      <el-table :data="tableData1" stripe style="width: 100%">
        <el-table-column label="播放时间" align="center">
          <template slot-scope="info">
            <span>{{info.row.start_time*1000|formatDateTwo}}</span>-
            <span>{{info.row.end_time*1000|formatDateTwo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="素材1">
          <template slot-scope="info">{{info.row.item1_play_count}}次</template>
        </el-table-column>
        <el-table-column align="center" label="素材2">
          <template slot-scope="info">{{info.row.item2_play_count}}次</template>
        </el-table-column>
      </el-table>
      <el-button
        size="mini"
        style="background-color: #15a46c;color: #fff;position: absolute;top:25%;right:36%"
        @click="lookone"
      >预览</el-button>
      <el-button
        size="mini"
        style="background-color: #15a46c;color: #fff;position: absolute;top:25%;right:5%"
        @click="looktwo"
      >预览</el-button>
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
    <!-- 预览素材1 -->
    <el-dialog title="素材预览" :visible.sync="dialogTableVisible1">
      <img
        style="width:50%;height:50%"
        v-for="item in imgData"
        :src="item"
        :v-if="imgFlag"
        :key="item.index"
      >
      <video
        :key="item.index"
        v-for="item in videoData"
        :v-if="videoFlag"
        :src="item"
        preload
        height="300px"
        width="50%"
        controls
      ></video>
    </el-dialog>
    <!-- 预览素材2 -->
    <el-dialog title="素材预览" :visible.sync="dialogTableVisible2">
      <img
        style="width:50%;height:50%"
        v-for="item in imgData"
        :src="item"
        :v-if="imgFlag"
        :key="item.index"
      >
      <video
        :key="item.index"
        v-for="item in videoData"
        :v-if="videoFlag"
        :src="item"
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
      return formatDate(date, 'yyyy/MM/dd/hh:mm')
    }
  },
  data() {
    return {
      // 预览素材
      videoData: [],
      imgData: [],
      imgFlag: false,
      videoFlag: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      // 接收查看数据
      tableData1: [],
      // 查看弹框
      dialogTableVisible: false,
      // 总记录数据条数
      tot: 20,
      // 下拉日历的数据
      value1: '',
      value2: '',
      // 获取订单列表所需参数
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: 1,
        keyword: {
          machine_name: '',
          end_time: '',
          machine_address: '',
          start_time: ''
        }
      },
      // 接收列表数据
      tableData: [],
      // 查看
      look: {
        token: window.sessionStorage.getItem('token'),
        check_id: '',
        machine_id: ''
      }
    }
  },
  methods: {
    // 预览素材1
    lookone() {
      this.imgData = []
      this.videoData = []
      this.dialogTableVisible1 = true
      const data = this.tableData1[0].item2_ad
      for (let i = 0; i < data.length; i++) {
        let fileName = data[i].lastIndexOf('.')
        let fileNameLength = data[i].length
        let a = data[i].substring(fileName + 1, fileNameLength)
        if (a === 'jpg' || a === 'pang') {
          this.imgFlag = true
          this.imgData.push(data[i])
        }
        if (a === 'mp4') {
          this.videoFlag = true
          this.videoData.push(data[i])
        }
      }
    },
    // 预览素材2
    looktwo() {
      this.imgData = []
      this.videoData = []
      this.dialogTableVisible2 = true
      const data = this.tableData1[0].ad[1].split(',')
      for (let i = 0; i < data.length; i++) {
        let fileName = data[i].lastIndexOf('.')
        let fileNameLength = data[i].length
        let a = data[i].substring(fileName + 1, fileNameLength)
        if (a === 'jpg' || a === 'pang') {
          this.imgFlag = true
          this.imgData.push(data[i])
        }
        if (a === 'mp4') {
          this.videoFlag = true
          this.videoData.push(data[i])
        }
      }
    },
    // 查看
    showDialog(uid) {
      this.look.check_id = uid.check_id
      this.look.machine_id = uid.machine_id
      this.$http.post('/play_detail', JSON.stringify(this.look)).then(res => {
        this.dialogTableVisible = true
        this.tableData1 = res.data
      })
    },
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      this.tableList.page = arg
      // 根据变化后的页码重新获得数据
      this.getPutlist()
    },
    // 获取表格数据
    getList() {
      this.$http.post('/play_log', JSON.stringify(this.tableList)).then(res => {
        this.tableData = res.data.data
        this.tot = res.data.count
      })
    },
    // 按需搜所
    search() {
      this.tableList.keyword.start_time = this.value1 / 1000
      this.tableList.keyword.end_time = this.value2 / 1000
      this.getList()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
