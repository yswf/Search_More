<template>
    <div class="hidden-md-and-down">
    <span class="iconfont icon-set" @click="getsSet" style="display:none"></span>
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
  <!-- 遮蔽层 -->
  <el-row>
    <el-col :span="20">是否开启遮蔽层 (建议25左右) </el-col>
    <el-col :span="4"><el-switch v-model="mkgStatus"></el-switch></el-col>
  </el-row>
  <el-row>
    <el-col :span="10">遮蔽层参数</el-col>
    <el-col :span="10"><el-slider
      v-model="mkgValue"
      input-size="mini"
      :disabled="!mkgStatus"
    >
    <el-col :span="4"></el-col>
    </el-slider></el-col>
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
        <input type="file" accept="image/*"  @change="changeCoverImg($event)" ref="inputRef"/>
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
  <el-collapse-item title="快捷操作" name="1">
     <el-row>
      本页面含有很多快捷操作(PC端)
     </el-row>
     <el-row>
      1.自动聚焦到搜索框：打开网页时自动聚焦输入框（可以在上面关闭），关闭时按任意键也可以聚焦；
     </el-row>
     <el-row>
       2.搜索关键词后可通过上下切换关键词，左右切换搜索引擎，双击(或delete键)清空输入；
     </el-row>
     <el-row>
       3.输入关键词可以实时翻译，支持有道翻译所有语种，点击翻译阅读，输入中英都只阅读英文(只支持阅读英文)；
     </el-row>
      <el-row>
       4.背景图片可以复制粘贴过来图片网址(推荐)，也可以上传本地，但是上传其实也base64编码存本地并不会缓存；
     </el-row>
      <el-row>
       5.当网络图片开关打开时，主页右下角会出现两个切换按钮可以切换最近一星期必应壁纸；
     </el-row>
     <el-row>
       6.可能有人没用过夸克浏览器，你试试搜索天气、名人、名书、电影、歌曲、学校、作文、1+1...你会发现新世界。
     </el-row>
  </el-collapse-item>
  <el-collapse-item title="版权信息" name="2">
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
  <el-collapse-item title="相关网站" name="3">
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
  props: {
    settingShow: {
      type: Boolean,
      default: false
    }
  },
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
      localBackGroundStatus: false,
      mkgStatus: false,
      mkgValue: 25
    }
  },
  created () {
    if (!window.localStorage.getItem('searchLogoActive')) {
      const h = this.$createElement
      this.$notify({
        title: '欢迎您首次使用',
        message: h('p', { style: 'color: rgb(144,147,153)' }, '本页面隐藏了很多快捷操作: 鼠标右键唤起自定义设置和介绍; 你会发现新大陆！. '),
        position: 'bottom-right',
        iconClass: 'el-icon-ship',
        duration: 0
      })
      window.localStorage.setItem('searchLogoActive', 0)
    }
  },
  methods: {
    // 关闭设置
    fatherKeylisten () {
      this.urls = {}
      this.backGroundUrl = ''
      this.setData = {}
      this.coverImg = ''
      this.popoverVisible = false
      this.setDialogVisible = false
      this.$emit('closeSetting')
    },
    // 点击其他关闭清空设置
    handleClose () {
      this.fatherKeylisten()
    },
    // 获取设置信息
    getsSet () {
      this.urls = JSON.parse(window.localStorage.getItem('urls'))
      const imagesInformation = JSON.parse(window.localStorage.getItem('imagesInformation'))
      this.backGroundUrl = imagesInformation.url
      this.backGroundUrlStatus = imagesInformation.backGroundUrlStatus
      const mkgSetting = JSON.parse(window.localStorage.getItem('mkgSetting'))
      this.mkgValue = mkgSetting.mkgValue
      this.mkgStatus = mkgSetting.mkgStatus
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
        base64Image: this.coverImg,
        mkgStatus: this.mkgStatus,
        mkgValue: this.mkgValue

      }
      this.$emit('getSetData', this.setData)
      this.fatherKeylisten()
      this.$message.success('保存成功！')
    },
    // 本地图片保存
    changeCoverImg (e) {
      const file = e.target.files[0]
      // 还有其他东西要存所以不是4194304
      if (file.size > 4000000) {
        return this.$message.error('超过4M请选用网络图片')
      }
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
    },
    settingShow: function () {
      this.settingShow ? this.getsSet() : this.fatherKeylisten()
    }
  }
}
</script>
<style scoped>
@media (max-width: 979px) {
  body .iconfont{
     font-size: 25px ;
  }
  .icon-set{
    display: inline !important;
  }
}
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
     z-index: 2;
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
