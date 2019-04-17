<template>
  <div>
    <!-- 头部搜索区域 -->
    <ul class="top_search">
      <li>
        支付状态：
        <el-select placeholder="请选择">
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
          <el-date-picker v-model="value3" type="date" placeholder="选择时间" value-format="timestamp"></el-date-picker>
        </div>
      </li>
      <li>
        <el-button class="btn">搜索</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 下拉日历的数据
      value1: '',
      value2: '',
      value3: '',
      // 审核状态下拉框数据
      options: [
        {
          value: '0',
          label: '未审核'
        },
        {
          value: '1',
          label: '审核成功'
        },
        {
          value: '2',
          label: '审核失败'
        }
      ],
      value: ''
    }
  }
}
</script>
<style>
</style>
