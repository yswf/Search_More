<template>
    <div class="hidden-md-and-down">
    <span class="iconfont icon-set" @click="getsSet"></span>
    <!-- 设置页面 -->
  <el-dialog
  title="相关设置"
  :visible.sync="setDialogVisible"
  :modal-append-to-body='false'
  :before-close="handleClose"
  @click.stop=""
  >
  <!-- 聚焦设置 -->
  <el-divider> <i class="el-icon-loading"></i> 初始化设置</el-divider>
  <el-row>
    <el-col :span="20">自动聚焦到搜索栏</el-col>
    <el-col :span="4"><el-switch v-model="urls.autoFocus"></el-switch></el-col>
  </el-row>
  <!-- 搜索引擎设置 -->
  <el-divider> <i class="el-icon-search"></i> 搜索引擎设置</el-divider>
  <el-row>
     <el-input placeholder="https://xxx.cn?q=" v-model="urls.baiduUrl">
    <template slot="prepend">baidu</template>
  </el-input>
  </el-row>
  <el-row>
     <el-input placeholder="https://xxx.cn?q=" v-model="urls.bingUrl">
    <template slot="prepend">bing</template>
  </el-input>
  </el-row>
  <el-row>
     <el-input placeholder="https://xxx.cn?q=" v-model="urls.googleUrl">
    <template slot="prepend">google</template>
  </el-input>
  </el-row>
  <el-row>
     <el-input placeholder="https://xxx.cn?q=" v-model="urls.githubUrl">
    <template slot="prepend">github</template>
  </el-input>
  </el-row>
  <el-divider> <i class="el-icon-picture-outline"></i> 背景图片设置</el-divider>
  <p><i class="el-icon-link"></i> 网络图片 <el-switch v-model="backGroundUrlStatus"></el-switch></p>
  <el-row>
     <el-input placeholder="仅支持外链https://xxx" v-model="backGroundUrl" :disabled="!backGroundUrlStatus">
    <template slot="prepend">背景图片地址</template>
  </el-input>
  </el-row>
  <p><i class="el-icon-folder-opened"></i> 本地选择 <el-switch v-model="localBackGroundStatus"></el-switch></p>
   <el-card>
       <!-- 要将父布局的position设置为relative，父布局将无法包裹input -->
    <div style="position: relative;">
        <!--设置input的position为absolute，使其不按文档流排版，并设置其包裹整个布局 -->
        <!-- 设置opactity为0，使input变透明 -->
        <!-- 只接受jpg，gif和png格式 -->
        <input type="file" accept="image/gif, image/jpg, image/png"  @change="changeCoverImg($event)" ref="inputRef"/>
        <!-- 自定义按钮效果 -->
        <span>请选择喜爱的图像设为壁纸,建议图像尺寸：1920×1080 或更高</span>
        <el-button type="primary" size="medium" round @click="selectImg" :disabled="!localBackGroundStatus">选择 <i class="el-icon-folder-opened"></i></el-button>
         <el-image
      style="width: 50%;"
      :src="coverImg"
      fit="fit">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div></el-image>
    </div>
    </el-card>
  <!-- 联系及项目地址 -->
  <el-row>
    <el-divider> <i class="el-icon-chat-line-round"></i> 交流反馈</el-divider>
  </el-row>
   <el-card class="copyright">
     <el-collapse >
  <el-collapse-item title="版权信息" name="1">
     <el-row>
       本页面样式参考<strong>青柠起始页</strong>,搜索api为<strong>夸克</strong>神马搜索,背景图片为<strong>必应壁纸</strong>，翻译api为<strong>有道智云</strong>翻译。
     </el-row>
     <el-row>
       制作本页面初衷为自己写一个好用聚合搜索，上传是为了方便测试反馈
     </el-row>
     <el-row>
       若侵犯您版权请联系我删除，本网站代码完全开源免费没有也不需要捐赠，谨防被骗。
     </el-row>
     <el-row>请勿将本网站开源代码用于商用，仅作学习交流使用，欢迎大家一起完善项目！</el-row>
  </el-collapse-item>
  <el-collapse-item title="相关网站" name="2">
    <el-row>
    <el-col :span="6"><el-link type="success" href="https://a.maorx.cn/" target="_blank" :underline="false">青柠起始页</el-link></el-col>
    <el-col :span="6"><el-link type="success" href="https://www.myquark.cn/" target="_blank" :underline="false">夸克浏览器</el-link></el-col>
    <el-col :span="6"><el-link type="success" href="https://ai.youdao.com/" target="_blank" :underline="false">有道智云</el-link></el-col>
    <el-col :span="6"><el-link type="success" href="https://cn.bing.com/" target="_blank" :underline="false">必应壁纸</el-link></el-col>
    </el-row>
    <el-row>
       以上版权归原网站所有请支持原作者，本页面仅作展示调试使用！
     </el-row>
  </el-collapse-item>
     </el-collapse>
      <el-row>
      欢迎您向本项目您的版本
      <el-link type="success" href="https://github.com/yswf/Search_More" target="_blank" :underline="false">git提交</el-link>,同时发现问题您也可以
      <el-link type="success" href="https://wpa.qq.com/msgrd?v=3&uin=1938268436&site=qq&menu=yes" target="_blank" :underline="false"> bug反馈</el-link>
  </el-row>
   </el-card>
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
  data () {
    return {
      setDialogVisible: false,
      autoFocus: true,
      popoverVisible: false,
      urls: {},
      backGroundUrl: '',
      setData: {},
      coverImg: '',
      backGroundUrlStatus: true,
      localBackGroundStatus: false
    }
  },
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
      this.backGroundUrl = JSON.parse(window.localStorage.getItem('imagesInformation')).url
      this.backGroundUrlStatus = JSON.parse(window.localStorage.getItem('imagesInformation')).backGroundUrlStatus
      this.coverImg = window.localStorage.getItem('base64Image')
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
      this.setData = {
        urls: this.urls,
        backGroundUrl: this.backGroundUrl,
        backGroundUrlStatus: this.backGroundUrlStatus,
        base64Image: this.coverImg
      }
      this.$emit('getSetData', this.setData)
      this.fatherKeylisten()
      this.$message.success('保存成功！')
    },
    // 本地图片保存
    changeCoverImg (e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      const that = this
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        that.coverImg = this.result
      }
    },
    // 选择图片
    selectImg () {
      this.$refs.inputRef.click()
    },
    // 关闭清空设置
    handleClose () {
      this.urls = {}
      this.backGroundUrl = ''
      this.setData = {}
      this.coverImg = ''
    }
    // 设置为主页
    // setHomepage () {

    // }

  },
  watch: {
    backGroundUrlStatus: function () {
      this.localBackGroundStatus = !this.backGroundUrlStatus
    },
    localBackGroundStatus: function () {
      this.backGroundUrlStatus = !this.localBackGroundStatus
    }
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
     color: rgba(17, 17, 17, 0.44);
    font-size: 30px;
     cursor: pointer;
}
.icon-set:hover{
   transform: scale(1.2);
}
.el-row{
  padding: 5px 4px;
}
.el-popover__reference{
  float: left;
}
.el-card{
width: 100%;
height: auto;
}
.el-image{
position: absolute;
left: 10px;
width: 135px !important;
height: 90px;
}
.el-card div input{
  display: none;
}
.el-card div .el-button{
position: absolute;
left: 150px;
top: 50%;
transform: translateY(50%);
}
.el-card div span{
  position: absolute;
  top: 55px;
  left:160px;
  text-align: center;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /*想省略几行就写几*/
  -webkit-box-orient: vertical;
  display:-moz-box;
  -moz-line-clamp: 2; /*想省略几行就写几*/
  -moz-box-orient:vertical;
}
.copyright{
  height: 100%;
}
</style>
