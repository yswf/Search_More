<template>
    <div class="hidden-md-and-down">
    <span class="iconfont icon-set" @click="setDialogVisible = true"></span>
    <!-- 设置页面 -->
  <el-dialog
  title="相关设置"
  :visible.sync="setDialogVisible"
  :modal-append-to-body='false'
  width="50%">
   <el-table
      :data="SettableData"
      style="width: 100%">
      <el-table-column
        prop="setting"
        label="设置"
        width="180">
      </el-table-column>
      <el-table-column
        prop="default"
        label="默认状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="newseething"
        label="修改">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
            ></el-switch>
          </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="4" :offset="18"> <el-link type="success" href="http://wpa.qq.com/msgrd?v=3&uin=1938268436&site=qq&menu=yes" target="_blank" :underline="false">点击联系我</el-link></el-col>
  </el-row>
  <span slot="footer" >
    <el-button @click="setDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="setDialogVisible = false">确 定</el-button>
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
      SettableData: [
        {
          setting: '默认引擎',
          default: 'baidu',
          newseething: '完善中',
          status: false
        },
        {
          setting: '自动聚焦',
          default: '自动',
          newseething: '完善中',
          status: true
        },
        {
          setting: '默认背景',
          default: '每日必应',
          newseething: '完善中',
          status: true
        },
        {
          setting: '自定义搜索',
          default: '未定义',
          newseething: '完善中',
          status: false
        },
        {
          setting: '自定义LOGO',
          default: '未定义',
          newseething: '完善中',
          status: false
        }

      ]
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
</style>
