<template>
  <div class="main" @click="closeSearch" :style="backGroundPath" @contextmenu.prevent="rightClick">
    <!-- 设置组件 -->
    <setting @click.native.stop="removeKeyListen" @closeSetting="closeSetting" @getSetData='getSetData' :settingShow="settingStatus"></setting>
    <card :message="getKeyList[0]" :class="showCard"></card>
    <!-- 输入框 -->
    <input
      type="text"
      :placeholder="placeholder"
      v-model="keyWorld"
      @focus="inputWorld"
      @dblclick.stop="cleanSearch"
      @click.stop=""
      @input="searchVague"
      @keyup="keyupThen"
      :class="showClass "
      ref="infocus"
    />
    <!-- 搜索工具 -->
    <ul
      class="searchTools"
      :class="showIcon"
    >
      <li
        @click.stop="baidu"
        v-if="searchLogoActive === 0"
        class="searchLogoActive"
      >
        <span class="iconfont icon-baidu"></span>
      </li>
      <li @click.stop="baidu" v-else>
        <span class="iconfont icon-baidu"></span>
      </li>
      <li
        @click.stop="bing"
        v-if="searchLogoActive === 1"
        class="searchLogoActive"
      >
        <span class="iconfont icon-bing"></span>
      </li>
      <li @click.stop="bing" v-else>
        <span class="iconfont icon-bing"></span>
      </li>
      <li
        @click.stop="google"
        v-if="searchLogoActive === 2"
        class="searchLogoActive"
      >
        <span class="iconfont icon-google"></span>
      </li>
      <li @click.stop="google" v-else>
        <span class="iconfont icon-google"></span>
      </li>
      <li
        @click.stop="github"
        v-if="searchLogoActive === 3"
        class="searchLogoActive"
      >
        <span class="iconfont icon-huaban88"></span>
      </li>
      <li @click.stop="github" v-else>
        <span class="iconfont icon-huaban88"></span>
      </li>
    </ul>
    <!-- 相关搜索 -->
    <div :class="showKeyworld">
      <div class="transfrom" @click.stop="playAuido">
        翻译：{{ transfromHtml
        }}
      <span class="iconfont icon-sound"> alt+/ </span>
        <i class="el-icon-document-copy" v-clipboard:copy="transfromHtml" v-clipboard:success="onCopy" v-clipboard:error="onError" @click.stop=""> 复制</i>
      </div>
      <ul v-for="(item, i) in getKeyList" :key="i">
        <li
          v-if="keyListActive === i"
          class="keyListActive"
          @click.stop="keyListSearch(item.word || item.style.title)"
        >
          {{ item.word || item.style.title}}
        </li>
        <li v-else @click.stop="keyListSearch(item.word || item.style.title)">{{ item.word || item.style.title}}</li>
      </ul>
    </div>
    <!-- 背景控制 -->
    <change @seaveImgurl="seaveImgurl" :class="changeNext"></change>
    <!-- 遮蔽层 -->
    <div class="mkg" :style="mkgCss">
    </div>
    <!-- 声音播放 -->
    <audio :src="audioUrl" ref="audioRef"></audio>
  </div>
</template>

<script>
import change from './components/Change'
import setting from './components/Set'
import card from './components/Card'
// 引入常量
import { defaultSet, chinese, defaultImagesInformation, base64Image } from './partten'
export default {
  components: { setting, change, card },
  data () {
    return {
      // 用户搜索词
      keyWorld: '',
      // 翻译词
      transfromWorld: '',
      transfromHtml: '',
      // 默认搜索框提示
      placeholder: 'Search',
      // 是否聚焦搜索框
      isFocus: false,
      // 设置按钮是否显示
      settingStatus: false,
      // 获取关键词
      getKeyList: [],
      // 关键词获取节流阀
      status: true,
      // 翻译节流阀
      playAuidoStatus: true,
      // 上下选初始化
      keyListActive: -1,
      // 左右选初始化
      searchLogoActive: 0,
      // 音频合成url
      audioUrl: '',
      // 是否有卡片
      isCard: false,
      // 默认配置
      urls: {},
      // 是否全局监听键盘事件
      keyStatus: true,
      // 背景图片链接
      imagesInformation: {
        url: '',
        copyright: '',
        // 是否启用网络图片
        backGroundUrlStatus: false
      },
      // 上传图片
      base64Image: '',
      // 遮蔽设置
      mkgSetting: {
        mkgStatus: false,
        mkgValue: 0
      }
    }
  },
  created () {
    // 网站类信息
    if (!window.localStorage.getItem('urls')) {
      window.localStorage.setItem('urls', JSON.stringify(defaultSet))
    }
    this.urls = JSON.parse(window.localStorage.getItem('urls'))
    this.searchLogoActive = window.localStorage.getItem('searchLogoActive') - 0
    this.audioUrl = this.urls.youdaoUrl + 'null'
    // 必应图片信息
    window.localStorage.getItem('imagesInformation') ? (this.imagesInformation = JSON.parse(window.localStorage.getItem('imagesInformation'))) : window.localStorage.setItem('imagesInformation', JSON.stringify(defaultImagesInformation))
    // 用户上传图片信息
    window.localStorage.getItem('base64Image') ? (this.base64Image = window.localStorage.getItem('base64Image')) : window.localStorage.setItem('base64Image', base64Image)
    // 遮蔽层配置
    window.localStorage.getItem('mkgSetting') ? (this.mkgSetting = JSON.parse(window.localStorage.getItem('mkgSetting'))) : window.localStorage.setItem('mkgSetting', JSON.stringify(this.mkgSetting))
  },
  mounted () {
    // 自动获取焦点
    this.urls.autoFocus && this.autoFocusKey()
  },
  methods: {
    // 复制成功时的回调函数
    onCopy (e) {
      this.$message.success('内容已复制到剪切板！')
    },
    // 复制失败时的回调函数
    onError (e) {
      this.$message.error('抱歉，复制失败！')
    },
    // 获取搜索框
    inputWorld () {
      this.placeholder = ''
      this.isFocus = true
      this.removeKeyListen()
    },
    // 关闭搜索
    closeSearch () {
      this.placeholder = 'Search'
      this.isFocus = false
      this.getKeyList = []
      this.keyWorld = ''
      this.keyListActive = -1
      this.transfromHtml = ''
      window.addEventListener('keyup', this.autoFocusKey)
    },
    // 双击和delete清理搜索框内容
    cleanSearch () {
      this.getKeyList = []
      this.keyWorld = ''
      this.keyListActive = -1
      this.transfromHtml = ''
    },
    // 右击打开设置
    rightClick () {
      this.settingStatus = true
    },
    baidu () {
      this.searchLogoActive = 0
      if (this.keyWorld.trim() !== '') {
        window.open(this.urls.baiduUrl + encodeURI(this.keyWorld))
      }
    },
    bing () {
      this.searchLogoActive = 1
      if (this.keyWorld.trim() !== '') {
        window.open(this.urls.bingUrl + encodeURI(this.keyWorld))
      }
    },
    google () {
      this.searchLogoActive = 2
      if (this.keyWorld.trim() !== '') {
        window.open(this.urls.googleUrl + encodeURI(this.keyWorld))
      }
    },
    github () {
      this.searchLogoActive = 3
      if (this.keyWorld.trim() !== '') {
        window.open(this.urls.githubUrl + encodeURI(this.keyWorld))
      }
    },
    // 模糊搜索
    searchVague () {
      this.keyListActive = -1
      var timer = null
      if (this.status && this.keyWorld.trim() !== '') {
        this.status = false
        timer = setTimeout(() => {
          this.transfromWorld = this.keyWorld
          this.getWorldKey()
          this.status = true
        }, 500)
      } else {
        clearTimeout(timer)
      }
    },
    // 获取关键词
    async getWorldKey () {
      if (this.keyWorld.trim() === '') {
        this.getKeyList = []
        return
      }
      const { data: res } = await this.$http.get(this.urls.quarkApi, {
        params: {
          q: this.keyWorld
        }
      })
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          duration: 1000,
          message: '接口繁忙！',
          type: 'error'
        })
        return
      }
      // 配置返回对象某些默认属性
      let cardType
      try {
        // 在此运行代码
        cardType = res.data.value[0].type || false
      } catch (err) {
        cardType = false
        return
      }

      this.getKeyList = res.data.value
      cardType && cardType !== 'text' && cardType !== 'special_tinyapp' ? this.isCard = true : this.isCard = false
    },
    // 获取翻译
    async getTransfrom () {
      if (this.transfromWorld.trim() === '') {
        this.transfromWorld = ''
        this.transfromHtml = ''
        return
      }
      const { data: res } = await this.$http.get(this.urls.translationApi, {
        params: {
          word: this.transfromWorld
        }
      })
      if (res.code !== 200) {
        this.$message({
          showClose: true,
          duration: 1000,
          message: '您输入确定是个词么？',
          type: 'warning'
        })
        return
      }
      // 展示结果
      this.transfromHtml = res.translation
      // 更改音频只读英文
      !chinese.test(this.transfromHtml)
        ? (this.audioUrl = this.urls.youdaoUrl + this.transfromHtml)
        : (this.audioUrl = this.urls.youdaoUrl + this.keyWorld)
    },
    // 键盘事件
    keyupThen (e) {
      // 获取焦点
      // 快捷键播放翻译
      if (e.altKey && (e.keyCode === 191 || e.keyCode === 229)) {
        this.playAuido()
      }
      const keys =
        e.keyCode === 13 ||
        e.keyCode === 37 ||
        e.keyCode === 39 ||
        e.keyCode === 38 ||
        e.keyCode === 40 ||
        e.keyCode === 46
      // 回车搜索
      if (!keys) {
        return
      }
      e.preventDefault()
      // 回车搜索
      if (e.keyCode === 13) {
        this.searchLogoActive === 0 && this.baidu()
        this.searchLogoActive === 1 && this.bing()
        this.searchLogoActive === 2 && this.google()
        this.searchLogoActive === 3 && this.github()
      }
      // 左选
      if (e.keyCode === 37) {
        if (this.searchLogoActive === 0) {
          this.searchLogoActive = 4
        }
        this.searchLogoActive--
      }
      // 右选
      if (e.keyCode === 39) {
        if (this.searchLogoActive === 3) {
          this.searchLogoActive = -1
        }
        this.searchLogoActive++
      }
      // 38上，下·40，左37，右39，f12-123
      // 上选
      if (e.keyCode === 38 && this.getKeyList.length) {
        if (this.keyListActive <= 0) {
          this.keyListActive = this.getKeyList.length
        }
        this.keyListActive--
        this.keyWorld = this.getKeyList[this.keyListActive].word || this.getKeyList[this.keyListActive].style.title
        // this.searchVague()
      }

      // 下选
      if (e.keyCode === 40 && this.getKeyList.length) {
        if (this.keyListActive === this.getKeyList.length - 1) {
          this.keyListActive = -1
        }
        this.keyListActive++
        this.keyWorld = this.getKeyList[this.keyListActive].word || this.getKeyList[this.keyListActive].style.title
        // this.searchVague()
      }
      // delete 清空搜索框
      if (e.keyCode === 46 && this.keyWorld !== '') {
        this.cleanSearch()
      }
    },
    // 联想词条搜索
    keyListSearch (q) {
      this.keyWorld = q
      this.searchLogoActive === 0 && this.baidu()
      this.searchLogoActive === 1 && this.bing()
      this.searchLogoActive === 2 && this.google()
      this.searchLogoActive === 3 && this.github()
    },
    // 播放声音英文
    playAuido () {
      var timer = null
      if (this.keyWorld.trim() !== '' && this.playAuidoStatus) {
        this.playAuidoStatus = false
        timer = setTimeout(() => {
          this.$message({
            showClose: true,
            duration: 1000,
            message: '只读英文哦！',
            type: 'success'
          })
          this.$refs.audioRef.play()
          this.playAuidoStatus = true
        }, 500)
      } else {
        clearTimeout(timer)
        this.$refs.audioRef.ended
          ? this.$message({
            showClose: true,
            duration: 1000,
            message: '你手速太快了！',
            type: 'error'
          })
          : this.$message({
            showClose: true,
            duration: 1000,
            message: '还没播完呢！',
            type: 'warning'
          })
      }
    },
    // 全局键盘监听自动获取焦点
    autoFocusKey () {
      this.$refs.infocus.focus()
    },
    // 移除全局键盘监听
    removeKeyListen () {
      window.removeEventListener('keyup', this.autoFocusKey)
    },
    // 关闭设置框
    closeSetting () {
      window.addEventListener('keyup', this.autoFocusKey)
      this.settingStatus = false
      this.autoFocusKey()
    },
    // 获取set组件传过来设置数据
    getSetData (data) {
      this.urls = data.urls
      this.imagesInformation = {
        url: data.backGroundUrl,
        backGroundUrlStatus: data.backGroundUrlStatus,
        copyright: ''
      }
      this.base64Image = data.base64Image
      this.mkgSetting = {
        mkgStatus: data.mkgStatus,
        mkgValue: data.mkgValue
      }
    },
    // 获取change组件传过来imgurl
    seaveImgurl (images) {
      this.imagesInformation = images
    }
  },
  computed: {
    // 输入框样式控制
    showClass: function () {
      return {
        default: true,
        active: this.isFocus
      }
    },
    // 联想词控制
    showKeyworld () {
      return {
        keyworld: true,
        show: this.keyWorld.trim() !== ''
      }
    },
    // 搜索图标控制
    showIcon: function () {
      return {
        show: this.isFocus
      }
    },
    // 卡片视图控制
    showCard: function () {
      return {
        cardBlock: true,
        show: this.isCard && this.keyWorld.trim() !== ''
      }
    },
    // 上下一页按钮隐藏控制
    changeNext: function () {
      return {
        changeNext: !this.imagesInformation.backGroundUrlStatus
      }
    },
    // 用户背景图片自定义
    backGroundPath: function () {
      if (this.imagesInformation.url && this.imagesInformation.backGroundUrlStatus) {
        return { backgroundImage: 'url(' + this.imagesInformation.url + ')' }
      }
      if (this.base64Image && !this.imagesInformation.backGroundUrlStatus) {
        return { backgroundImage: 'url(' + this.base64Image + ')' }
      }
      return {}
    },
    // 遮蔽层配置
    mkgCss: function () {
      if (this.mkgSetting.mkgStatus && this.isFocus) {
        return {
          background: 'rgba(0, 0, 0, ' + this.mkgSetting.mkgValue / 100 + ')'
        }
      }
      return {}
    }
  },
  watch: {
    // 监听设置搜索工具
    searchLogoActive: function () {
      window.localStorage.setItem('searchLogoActive', this.searchLogoActive)
    },
    // 自动保存更改设置
    urls: function () {
      window.localStorage.setItem('urls', JSON.stringify(this.urls))
    },
    imagesInformation: function () {
      window.localStorage.setItem('imagesInformation', JSON.stringify(this.imagesInformation))
    },
    base64Image: function () {
      window.localStorage.setItem('base64Image', this.base64Image)
    },
    mkgSetting: function () {
      window.localStorage.setItem('mkgSetting', JSON.stringify(this.mkgSetting))
    },
    // 自动翻译
    transfromWorld: function () {
      this.getTransfrom()
    }
  }
}
</script>

<style scoped>
/* 媒体查询适配背景 */
body .main {
  position: fixed;
  width: 100%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position-x: center;
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1200px) {
  .main {
    background: url("https://cn.bing.com/th?id=OHR.ChateauBeynac_ZH-CN8777586167_1920x1080.jpg")
      no-repeat;
    /* z-index: -99; */
    -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://cn.bing.com/th?id=OHR.ChateauBeynac_ZH-CN8777586167_1920x1080.jpg', sizingMethod='scale')";
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://cn.bing.com/th?id=OHR.ChateauBeynac_ZH-CN8777586167_1920x1080.jpg', sizingMethod='scale');
  }
}

/*默认*/
@media (min-width: 980px) {
  .main {
    background: url("https://cn.bing.com/th?id=OHR.ChateauBeynac_ZH-CN8777586167_1920x1080.jpg")
      no-repeat;
    /* z-index: -99; */
    -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://cn.bing.com/th?id=OHR.ChateauBeynac_ZH-CN8777586167_1920x1080.jpg', sizingMethod='scale')";
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://cn.bing.com/th?id=OHR.ChateauBeynac_ZH-CN8777586167_1920x1080.jpg', sizingMethod='scale');
  }
}

/* 平板电脑和小屏电脑之间的分辨率 */
@media (min-width: 768px) and (max-width: 979px) {
  .main {
    background: url("https://cn.bing.com/ImageResolution.aspx?w=1366&h=1024")
      no-repeat;
  }
}
/* 横向放置的手机和竖向放置的平板之间的分辨率 */
@media (max-width: 767px) {
  .main {
    background: url("https://cn.bing.com/ImageResolution.aspx?w=768&h=1024")
      no-repeat;
  }
}
/* 显示所有信息最小屏幕宽 */
@media (max-width: 705px){
    .main {
    background: url("https://cn.bing.com/ImageResolution.aspx?w=768&h=1024")
      no-repeat;
  }
/* input输入框 */
body .default {
  top: 80px;
  left: 50%;
  width: 215px;
  height:30px;
  border-radius: 25px;
}
body .default:hover{
  width: 280px;
}
body .active {
  width: 280px;
}
body .active:hover {
  width: 280px;
}
/* 搜索logo */
body .searchTools {
  left: 50%;
  animation: searchOptBoxPhone .25s forwards ease;
}
body .searchTools .searchLogoActive{
  padding: 6px 8px;
}
body .searchTools li {
  font-size: 14px;
  padding: 5px 7px;
  margin: 4px;
}
/* 搜索建议 */
body .keyworld {
  top: 168px;
  left: 50%;
  width: 280px;
  height: 180px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
body .keyworld::-webkit-scrollbar {
  width: 10px !important;
  height: 10px !important;
  border-radius: 5px;
}
body .keyworld::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.35);
  /* 滚动条的颜色 */
  background-color:rgba(255,255,255,0.35);
 }
body .keyworld li,
body .transfrom {
  font-size: 14px;
  height: 24px;
  line-height: 24px;
}
body .el-icon-document-copy{
  right: 10px;
  }
body .cardBlock {
  display: none !important;
}
body .icon-sound{
  display: none !important;
}
}

/* 横向放置的手机及分辨率更小的设备 */
@media (max-width: 480px) {
  .main {
    background: url("https://cn.bing.com/ImageResolution.aspx?w=540&h=720")
      no-repeat;
  }
}
.mkg {
  position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* 毛玻璃效果，兼容不好 */
    /* -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    transform: scale(1.1);
    transition: opacity 1s, transform .25s, filter .25s; */
    z-index: -99;
}
.searchTools {
  display: none;
  padding: 0;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 265px;
  transform: translateX(-50%);
  animation: searchOptBox .25s forwards ease;
}
@keyframes searchOptBox {
0% {
z-index: -99;
top: 242px;
}
100% {
z-index: 10;
top: 265px;
}
}
@keyframes searchOptBoxPhone {
0% {
z-index: -99;
top: 242px;
}
100% {
z-index: 10;
top: 120px;
}
}
.searchTools li {
  display: inline-block;
  border: 1px solid;
  font-size: 14px;
  color: #fff;
  padding: 5px 30px;
  margin-left: 5px;
  margin-right: 5px;
  /* background-color: #cccccc; */
  border-radius: 20px;
  /* transition: property duration timing-function delay; */
  transition: color 0.25s , border 0.25s ;
  cursor: pointer;
}
.searchTools li:hover {
  color: rgba(17, 17, 17, 0.9);
  transform: scale(1.1);
}
.default {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 230px;
  height: 40px;
  border-radius: 30px;
  border: none;
  outline: none;

  color: rgba(255, 255, 255, 0.8);
  font-size: small;
  font-weight: normal;
  font-family: "Microsoft Yahei", sans-serif;

  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
  backdrop-filter: blur(10px);
  transition: color 0.25s, background-color 0.25s, box-shadow 0.25s, left 0.25s,
    opacity 0.25s, top 0.25s, width 0.25s;
  z-index: 2;
}
.default:hover {
  width: 530px;
  color: rgb(17, 17, 17);
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 10px;
}
.active {
  width: 530px;
  color: rgb(17, 17, 17);
  background-color: rgb(255, 255, 255);
}
.active:hover {
  width: 530px;
  color: rgb(17, 17, 17);
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 10px;
}
.keyworld {
  display: none;
  position: absolute;
  top: 315px;
  left: 50%;
  transform: translateX(-50%);
  width: 530px;
  /* border: 1px solid black; */
  border-radius: 15px;
  transition: all 0.25s;
  overflow: hidden;
  z-index: 2;
}
.keyworld li,
.transfrom {
  position: relative;
  height: 30px;
  padding-right: 10px;
  text-indent: 20px;
  line-height: 30px;
  cursor: pointer;
  background-color: rgba(204, 204, 204, 0.25);
  color: rgb(255, 255, 255);
  border-bottom: solid 1px rgba(0, 0, 0, 0);
  transition: all 0.25s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.transfrom{
  padding-right: 150px;
}
.keyworld li:hover,
.transfrom:hover {
  padding-left: 10px;
  font-weight: 700;
  background-color: rgba(204, 204, 204, 0.5);
  color: rgba(255, 255, 255, 0.9);
}
.show {
  display: block !important;
}
.searchTools .searchLogoActive {
  /* color: rgba(255, 255, 255, 0.9); */
  color: rgb(17, 17, 17);
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
  backdrop-filter: blur(10px);
  border: none;
  padding: 6px 31px;
}
.main .keyListActive {
  font-weight: 700;
  padding-left: 10px;
  color: rgba(255, 255, 255, 0.9);
}
.icon-sound {
  position: absolute;
  right: 0;
  padding-right: 20px;
}
.icon-sound:hover,.el-icon-document-copy:hover {
  transform: scale(1.2);
}
/* 卡片隐藏 */
.cardBlock{
  display: none;
}
/* 上下一张壁纸隐藏 */
.changeNext{
  display: none;
}
/* 复制按钮 */
.el-icon-document-copy{
  position: absolute;
  right: 95px;
  line-height: 30px;
}
</style>
