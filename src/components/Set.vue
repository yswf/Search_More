<template>
    <div class="hidden-md-and-down">
    <span class="iconfont icon-set" @click="setMore"></span>
    <!-- 设置页面 -->
  <el-dialog
  title="相关设置"
  :visible.sync="setDialogVisible"
  :modal-append-to-body='false'
  @click.stop=""
  width="30%">
  <el-row>
    <el-col :span="16">自动聚焦到搜索栏</el-col>
    <el-col :span="8"><el-switch v-model="autoFocus"></el-switch></el-col>
  </el-row>
  <el-row>搜索引擎设置</el-row>
  <el-row>
     <el-input placeholder="请输入内容" v-model="urls.baiduUrl">
    <template slot="prepend">baidu</template>
  </el-input>
  </el-row>
  <el-row>
     <el-input placeholder="请输入内容" v-model="urls.bingUrl">
    <template slot="prepend">bing</template>
  </el-input>
  </el-row>
  <el-row>
     <el-input placeholder="请输入内容" v-model="urls.googleUrl">
    <template slot="prepend">google</template>
  </el-input>
  </el-row>
  <el-row>
     <el-input placeholder="请输入内容" v-model="urls.githubUrl">
    <template slot="prepend">github</template>
  </el-input>
  </el-row>
    <el-row>
      <el-col :span="4" :offset="18"> <el-link type="success" href="http://wpa.qq.com/msgrd?v=3&uin=1938268436&site=qq&menu=yes" target="_blank" :underline="false">点击联系我</el-link></el-col>
  </el-row>
  <span slot="footer" >
    <el-button @click="fatherKeylisten">取 消</el-button>
    <el-button type="primary" @click="fatherKeylisten">确 定</el-button>
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
        message: h('i', { style: 'color: teal' }, '更少样式，更多体验，更专注于搜索！'),
        position: 'bottom-right',
        duration: 3000
      })
    }
  },
  data () {
    return {
      setDialogVisible: false,
      autoFocus: true,
      urls: {}
    }
  },
  methods: {
    fatherKeylisten () {
      this.setDialogVisible = false
      this.$emit('autoFcousKey')
    },
    setMore () {
      this.urls = JSON.parse(window.localStorage.getItem('urls'))
      console.log(this.urls)
      this.setDialogVisible = true
    }
  }
}
</script>
<style scoped>
@media (max-width: 980px) {
  .hidden-md-and-down{
    display: none !important;
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
  padding: 2px 4px;
}
</style>
