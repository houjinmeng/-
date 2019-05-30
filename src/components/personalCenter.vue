<template>
  <el-container>
    <!-- 头部 -->
    <el-header style="height:280px;padding:0">
      <img src="../assets/img/bgc2.png" alt width="100%" height="280px">
      <div
        id="head"
        style="height:80px;width:100%;background: rgba(0, 0, 0, 0.5);position: absolute;top:0"
      >
        <!-- 左侧logo部分 -->
        <div>
          <a href class="left" @click="tohome">
            <div class="left logo">
              <img src="../assets/img/logo.png" alt="" width="80px;heiht:40px">
            </div>
            <div>
              <p style="font-size:20px;margin-top:20px">哇咔传媒</p>
              <p class="Eglish_name">Waka media</p>
            </div>
          </a>
          <span class="left line">|</span>
          <p class="right" style="margin-top:30px">中国领先的广告商</p>
        </div>
        <!-- 右侧登录注册 -->
        <div class="btn">
          <span @click="person" style="margin-right:20px">欢迎：{{username}}</span>
          <el-button type="primary" @click="outlogin">退出登录</el-button>
        </div>
      </div>
    </el-header>
    <!-- 中间部分 -->
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#31373c"
          text-color="#ccced0"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu :index="item.id+''" v-for="(item,k) in menuList" :key="item.id">
            <template slot="title">
              <i :class="'iconfont icon-'+menuicon[k]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id">
              <i style="margin-right:10px"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 底部 -->
    <el-footer id="foot" style="height:210px;">
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
        <p>Copyright © 2014-2019北京哇咔哇咔科技有限公司版权所有</p>
        <p>网站备案号：京ICP备11111111-1 电话：5555555555 电子邮箱：5555@555.com</p>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 已登录用户名
      username: window.sessionStorage.getItem('user'),
      //  左侧导航菜单数据
      menuList: [
        {
          id: 1,
          authName: '我的订单',
          path: null,
          children: [
            {
              id: 8,
              authName: '我的订单',
              path: 'order',
              children: []
            }
          ]
        },
        {
          id: 2,
          authName: '审核记录',
          path: null,
          children: [
            {
              id: 9,
              authName: '审核查询',
              path: 'check',
              children: []
            }
          ]
        },
        {
          id: 3,
          authName: '投放记录',
          path: null,
          children: [
            {
              id: 10,
              authName: '投放历史',
              path: 'putRecord',
              children: []
            }
          ]
        },
        {
          id: 4,
          authName: '数据统计',
          path: null,
          children: [
            {
              id: 11,
              authName: '投放统计',
              path: 'statistics',
              children: []
            },
            {
              id: 12,
              authName: '营销号统计',
              path: 'marketing'
            }
          ]
        },
        {
          id: 5,
          authName: '我的设置',
          path: null,
          children: [
            {
              id: 13,
              authName: '绑定手机号',
              path: 'mySettings',
              children: []
            }
          ]
        }
      ],
      // 设置左侧权限的图标
      menuicon: ['wodedingdan02', 'shenhe', 'JLTJ', 'shuju', 'shezhi']
    }
  },
  methods: {
    // 点击进入个人中心
    person() {
      this.$router.push('/personal')
    },
    // 点击logo返回首页
    tohome() {
      this.$router.push('/')
    },
    // 退出登录
    outlogin(){
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('user')
      location.href= 'http://www.wakamedia.cn'
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  height: 280px;
  padding: 0;
}
// 侧边导航样式
.el-container {
  .el-aside {
    background-color: #ccc;
    color: #333;
    width: 200px;
    overflow-y: hidden;
    .el-menu {
      border-right-width: 0;
      border-bottom: 1px solid#ccc;
    }
  }
  .el-main {
    overflow-y: hidden;
    height: 820px;
  }
}
</style>
