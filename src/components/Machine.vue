<template>
  <div style="text-align:center">
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
    <!-- 中间表格 -->
    <div>
      <div id="btn">
        <el-button size="small">返回</el-button>
        <el-button size="small" @click="handleCheckAllChange">全选</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage - 1) * pagesize,currentPage * pagesize)"
        style="width: 100%;"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="170px" align="right"></el-table-column>
        <el-table-column label="序号" type="index" width="200px" align="center"></el-table-column>
        <el-table-column prop="machine_name" label="设备名称" align="center"></el-table-column>
        <el-table-column prop="address" label="设备地点" width align="center"></el-table-column>
        <el-table-column prop="px" label="屏幕比例" align="center"></el-table-column>
        <el-table-column prop="count_down" label="剩余时长" align="center"></el-table-column>
      </el-table>
      <el-button id="shopping" size="small" @click="shopping">购买</el-button>
      <!-- 数据分页展示 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="this.tot"
      ></el-pagination>
    </div>
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
    this.getMachineList()
  },
  data() {
    return {
      // 点击购买要传的参
      buy: {
        token: '',
        machine_ids: ''
      },
      // 总记录数据条数
      tot: 20,
      // 获取列表数据要传的参
      machineList: {
        keywords: '',
        page: ''
      },
      // 接收设备列表数据
      tableData: [],
      checkAll: false,
      isIndeterminate: false,
      currentPage: 1,
      pagesize: 10,
      page: 1,
      // 接收选中设备id
      machine_id: []
    }
  },
  methods: {
    /**  数据分页相关1 */
    // 当前页码变化的回调处理
    handleCurrentChange(arg) {
      // arg: 变化后的当前页码值
      // console.log(arg)
      this.machineList.page = arg
      // 根据变化后的页码重新获得数据
      this.getMachineList()
    },
    // 获取设备列表
    getMachineList() {
      this.$http
        .post('/machine_list', JSON.stringify(this.machineList))
        .then(res => {
          this.tableData = res.data
          this.tot = this.tableData.length
        })
    },
    getRowKeys(row) {
      return row.number
    },
    // 多选框回调事件
    handleSelectionChange(val) {
      if (val.length === 0) {
        this.machine_id = []
      } else {
        for (let i = 0; i < val.length; i++) {
          if (this.machine_id.indexOf(val[i].machine_id) === -1) {
            this.machine_id.push(val[i].machine_id)
          } else if (val.length !== this.machine_id.length) {
            this.machine_id = []
            for (let i = 0; i < val.length; i++) {
              this.machine_id.push(val[i].machine_id)
            }
          }
        }
      }
      let vlength = val.length
      this.checkAll = vlength === this.pagesize
      this.isIndeterminate = vlength > 0 && vlength < this.pagesize
    },
    // 点击全选
    handleCheckAllChange() {
      if (this.machine_id.length !== 0) {
        this.machine_id = []
      }
      this.$refs.multipleTable.toggleAllSelection()
      this.isIndeterminate = false
    },
    // 点击购买
    shopping() {
      this.buy.machine_ids = this.machine_id.join(',')
      this.$http.post('/buy', JSON.stringify(this.buy)).then(res => {
        window.sessionStorage.setItem('machine', JSON.stringify(res.data))
        this.$router.push('/submitOrder')
      })
    }
  }
}
</script>
<style lang="less" scoped>
header {
  height: 280px;
}
#btn {
  position: absolute;
  z-index: 1500;
  margin-left: 24px;
  margin-top: 8px;
  .el-button {
    background-color: #152743;
    color: #fff;
    width: 80px;
    margin: 0;
  }
}
.el-table {
  position: relative;
  z-index: 1000;
}
#shopping {
  position: absolute;
  right: 100px;
  background-color: #152743;
  color: #fff;
  width: 80px;
  margin-top: 20px;
}
</style>
