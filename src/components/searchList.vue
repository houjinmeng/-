<template>
  <div class="conter">
    <el-container>
      <el-main>
        <el-button type="success" size="medium" @click="buyBatch">批量购买</el-button>
        <p class="hint">注：点击左侧（复选框）可批量购买，一次最多可选择10条进行购买</p>
        <el-table
          ref="multipleTable"
          :data="tableData"
          @selection-change="changeFun"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="name" label="设备名称" width="120">
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column prop="address" label="设备地点" width="220"></el-table-column>
          <el-table-column prop="proportion" label="屏幕大小" width="120"></el-table-column>
          <el-table-column prop="duration" label="剩余时长"></el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="buy(scope.row)">购买</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :current-page="querycdt.pagenum"
          :total="querycdt.tot"
          :page-size="querycdt.pagesize"
          @current-change="handleCurrentChange"
          background
        ></el-pagination>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 列表数据
      tableData: [
        {
          date: '2016-05-03',
          name: '设备一',
          proportion: '16：9',
          duration: '可用',
          address: '上海市普陀区金'
        },
        {
          date: '2016-05-03',
          name: '设备2',
          proportion: '16：9',
          duration: '可用',
          address: '上海市普陀区金'
        },
        {
          date: '2016-05-03',
          name: '设备3',
          proportion: '16：9',
          duration: '可用',
          address: '上海市普陀区金'
        },
        {
          date: '2016-05-03',
          name: '设备一',
          proportion: '16：9',
          duration: '可用',
          address: '上海市普陀区金'
        },
        {
          date: '2016-05-03',
          name: '设备一',
          proportion: '16：9',
          duration: '可用',
          address: '上海市普陀区金'
        }
      ],
      querycdt: {
        pagenum: 1, // 当前页码
        pagesize: 3, // 每页展示条数
        tot: 100 // 总条数
      },
      selectionOpt: []
    }
  },
  methods: {
    // 批量购买
    buyBatch() {
      if (this.selectionOpt.length === 0) {
        return this.$message.warning('您没选中任何商品')
      }
      console.log(this.selectionOpt)
    },
    // 单独购买
    buy(val) {
      console.log(val)
    },
    // 选中的表单
    changeFun(val) {
      console.log(val)
      this.selectionOpt = val
    },
    // 第几页
    handleCurrentChange(arg) {
      console.log(arg)
      this.querycdt.pagenum = arg
    }
  }
}
</script>

<style lang="less">
.conter {
  width: 1200px;
  margin: 0 auto;
  .search_box {
    width: 100%;
    display: flex;
    input {
      width: 70%;
    }
  }
  .hint {
    color: red;
    font-size: 12px;
  }
}
</style>
