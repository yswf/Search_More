<template>
    <div class="hidden-md-and-down">
    <span class="iconfont icon-set" @click="getsSet"></span>
    <!-- 设置页面 -->
  <el-dialog
  title="相关设置"
  :visible.sync="setDialogVisible"
  :modal-append-to-body='false'
  @click.stop=""
  >
  <!-- 聚焦设置 -->
  <el-row>
    <el-col :span="20">自动聚焦到搜索栏</el-col>
    <el-col :span="4"><el-switch v-model="urls.autoFocus"></el-switch></el-col>
  </el-row>
  <!-- 搜索引擎设置 -->
  <el-row>搜索引擎设置</el-row>
  <el-row>
     <el-input placeholder="请以https开头，搜索词参数结尾如q=" v-model="urls.baiduUrl">
    <template slot="prepend">baidu</template>
  </el-input>
  </el-row>
  <el-row>
     <el-input placeholder="请以https开头，搜索词参数结尾如q=" v-model="urls.bingUrl">
    <template slot="prepend">bing</template>
  </el-input>
  </el-row>
  <el-row>
     <el-input placeholder="请以https开头，搜索词参数结尾如q=" v-model="urls.googleUrl">
    <template slot="prepend">google</template>
  </el-input>
  </el-row>
  <el-row>
     <el-input placeholder="请以https开头，搜索词参数结尾如q=" v-model="urls.githubUrl">
    <template slot="prepend">github</template>
  </el-input>
  </el-row>
  <!-- 联系及项目地址 -->
    <el-row>
      欢迎您向本项目
      <el-link type="success" href="https://github.com/yswf/Search_More" target="_blank" :underline="false">git提交</el-link>您的版本;
  </el-row>
  <el-row>
    同时发现问题您也可以
      <el-link type="success" href="https://wpa.qq.com/msgrd?v=3&uin=1938268436&site=qq&menu=yes" target="_blank" :underline="false">bug反馈</el-link>
  </el-row>
  <section></section>
  <!-- 底部设置按钮 -->
  <span slot="footer" >
    <el-popover
  placement="top-start"
  width="160"
  v-model="popoverVisible">
  <p>即将恢复到首次使用状态重置后重新加载页面</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
    <el-button type="primary" size="mini" @click="initialize">确定</el-button>
  </div>
  <el-button slot="reference" type="warning">重置</el-button>
</el-popover>
    <!-- <el-button type="info" icon="el-icon-house" @click="setHomepage">设为主页</el-button> -->
    <el-button @click="fatherKeylisten">取 消</el-button>
    <el-button type="primary" @click="saveSet">保 存</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
export default {
  created () {
    if (!window.localStorage.getItem('searchLogoActive')) {
      const h = this.$createElement
      this.$notify({
        title: 'SearchMore',
        message: h('i', { style: 'color: teal' }, '清爽简洁，更专注于搜索！'),
        position: 'bottom-right',
        duration: 3000
      })
    }
  },
  data () {
    return {
      setDialogVisible: false,
      autoFocus: true,
      popoverVisible: false,
      urls: {}
    }
  },
  methods: {
    // 关闭设置框获取焦点
    fatherKeylisten () {
      this.popoverVisible = false
      this.setDialogVisible = false
      this.$emit('autoFocusKey')
    },
    // 获取设置信息
    getsSet () {
      this.urls = JSON.parse(window.localStorage.getItem('urls'))
      this.setDialogVisible = true
    },
    // 重置初始化
    initialize () {
      this.setDialogVisible = false
      this.popoverVisible = false
      window.localStorage.clear()
      window.location.reload()
    },
    // save保存设置
    saveSet () {
      this.$emit('getSetData', this.urls)
      this.fatherKeylisten()
      this.$message.success('保存成功！')
    }
    // 设置为主页
    // setHomepage () {

    // }

  }
}
</script>
<style scoped>
@media (max-width: 767px) {
  body .iconfont{
     font-size: 20px ;
  }
}
.icon-set{
    position: absolute;
    right: 10px;
    top: 10px;
    color: rgba(255, 255, 255, 0.45);
    font-size: 30px;
     cursor: pointer;
}
.icon-set:hover{
  color: rgba(17, 17, 17, 0.44);
   transform: scale(1.2);
}
.el-row{
  padding: 5px 4px;
}
.el-popover__reference{
  float: left;
}

</style>
