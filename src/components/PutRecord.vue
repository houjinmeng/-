<template>
  <div style="text-align:center">
    <!-- 头部搜索区域 -->
    <ul class="top_search">
      <li>
        设备名称：
        <input type="text" v-model="tableList.keyword.machine_name" placeholder="请输入设备名称">
      </li>
      <li>
        设备地点：
        <input type="text" v-model="tableList.keyword.address" placeholder="请输入设备地点">
      </li>
      <li class="rili">
        <div class="block">
          <span class="demonstration">投放时间：</span>
          <el-date-picker v-model="value1" type="date" placeholder="开始时间" value-format="timestamp" :editable='false'></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">至</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="结束时间"
            value-format="timestamp"
            :picker-options="pickerOptions"
            :editable='false'
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
    <!-- 点击查看弹框 -->
    <el-dialog :visible.sync="dialogTableVisible1" width="30%" :modal="false">
      <div id="box">
        <div>
          <span>设备名称：</span>
          <span>{{machine_name}}</span>
        </div>
        <div>
          <span>投放地点：</span>
          <span>{{address}}</span>
        </div>
        <div>
          <span style="line-height: 100px">吸粉账号：</span>
          <span style="line-height: 100px">{{showList.type}}</span>
          <img :src="Url" alt>
        </div>
        <div>
          <span>投放时间：</span>
          <span>{{showList.start_time*1000|formatDate}}</span>至
          <span>{{showList.end_time*1000|formatDate}}</span>
        </div>
        <div>
          <span>连续播放次数：</span>
          <span>{{showList.play_count}}次</span>
        </div>
        <div>
          <span>每小时出现次数：</span>
          <span>{{showList.repeat_number}}次</span>
        </div>
        <div>
          <span>合计金额：</span>
          <span>{{showList.order_amount}}元</span>
        </div>
      </div>
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
    <!-- 预览素材对话框 -->
    <el-dialog title="素材预览" :visible.sync="dialogTableVisible">
      <img
        style="width:50%;height:50%"
        v-for="item in imgData"
        :src="item"
        v-show="imgFlag"
        :key="item.index"
      >
      <video
        :key="item.index"
        v-for="item in videoData"
        v-show="videoFlag"
        :src="item"
        preload
        height="300px"
        width="50%"
        controls
      ></video>
    </el-dialog>
    <!-- 再次投放 -->
    <el-dialog title="请选择时间" :visible.sync="dialogTableVisible2" width="30%">
      <ul class="top_search" style="margin-bottom:50px">
        <li class="rili">
          <div class="block">
            <span class="demonstration">投放时间：</span>
            <el-date-picker
              v-model="value3"
              type="date"
              placeholder="开始时间"
              value-format="timestamp"
              :editable='false'
            ></el-date-picker>
          </div>
          <div class="block">
            <span class="demonstration">投放周数</span>
            <el-select placeholder="请选择" v-model="valueweek">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </li>
      </ul>
      <el-button type="info" style="margin-left:150px" @click="dialogTableVisible2=false">取消投放</el-button>
      <el-button type="success" @click="putAgain">确定投放</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.js' // 在组件中引用date.js
export default {
  mounted() {
    this.getPutlist()
    this.getoptions()
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
      // 投放周数下拉数据
      options1: [],
      valueweek: '',
      // 再次投放
      dialogTableVisible2: false,
      // 查看对话框
      dialogTableVisible1: false,
      // 预览对话框显示隐藏
      dialogTableVisible: false,
      // 总记录数据条数
      tot: 10,
      // 下拉日历的数据
      value1: '',
      value2: '',
      value3: '',
      // 获取订单列表所需参数
      tableList: {
        token: window.sessionStorage.getItem('token'),
        page: 1,
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
      videoFlag: false,
      // 接收查看列表信息
      showList: {},
      machine_name: '',
      address: '',
      Url: '',
      // 再次投放
      put: {
        token: window.sessionStorage.getItem('token'),
        check_id: '',
        start_time: '',
        end_time: ''
      }
    }
  },
  methods: {
    // 动态循环投放周数下拉框数据
    getoptions() {
      for (var i = 1; i <= 52; i++) {
        this.options1[i - 1] = { value: i, label: i }
      }
    },
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
          this.tableData = res.data.data
          this.tot = res.data.count
        })
    },
    // 按需搜所
    search() {
      if (this.value1.length !== 0 && this.value2.length === 0) {
        this.$message.warning('请选择结束日期')
        return false
      }
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
    },
    // 点击查看弹框
    showDialog(uid) {
      const data = {
        token: this.tableList.token,
        check_id: uid
      }
      this.$http
        .post('/check_history_detail', JSON.stringify(data))
        .then(res => {
          const data = res.data
          this.showList = res.data
          this.machine_name = data.machine_name
          this.address = data.address
          this.Url = data.qrocde
          this.dialogTableVisible1 = true
        })
    },
    // 再次投放
    payDialog(uid) {
      this.value3 = ''
      this.dialogTableVisible2 = true
      this.put.check_id = uid
    },
    // 确定再次投放
    putAgain() {
      this.put.start_time = this.value3 / 1000
      this.put.end_time = this.valueweek * 604800 + this.put.start_time
      this.$http
        .post('/check_history_again', JSON.stringify(this.put))
        .then(res => {
          if (res.data.status === 1) {
            this.$message.success('投放成功！')
          } else {
            this.$message.error('投放失败！')
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
// 查看对话框样式
#box {
  font-size: 20px;
  div {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    img {
      height: 100px;
      width: 100px;
      margin-left: 50px;
    }
  }
}
</style>
