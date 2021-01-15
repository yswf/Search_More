<template>
  <div class="main" @click="closeSearch">
    <setting></setting>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="keyWorld"
      @focus="inputWorld"
      @click.stop=""
      @input="searchVague"
      @keyup="keyupThen"
      :class="showClass"
      ref="infocus"
    />
    <ul class="searchTools" @click="inputWorld" :class="showIcon">
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
    <div :class="showKeyworld">
      <div class="transfrom" @click.stop="playAuido">
        翻译：{{ keyWorld }}<span class="iconfont icon-sound"></span>
      </div>
      <ul v-for="(item, i) in getKeyList" :key="i">
        <li
          v-if="keyListActive === i"
          class="keyListActive"
          @click="keyListSearch(item.q)"
        >
          {{ item.q }}
        </li>
        <li v-else @click="keyListSearch(item.q)">{{ item.q }}</li>
      </ul>
    </div>
    <change></change>
    <!-- 声音播放 -->
    <audio :src="audioUrl" ref="audioRef"></audio>
  </div>
</template>

<script>
import change from './components/Change'
import setting from './components/Set'
export default {
  components: { setting, change },
  data () {
    return {
      keyWorld: '',
      placeholder: 'Search',
      isFocus: false,
      getKeyList: [],
      status: true,
      keyListActive: -1,
      searchLogoActive: 0,
      audioUrl: ''
    }
  },
  created () {
    this.searchLogoActive = window.localStorage.getItem('searchLogoActive') - 0
  },
  mounted () {
    this.$refs.infocus.focus()
  },
  methods: {
    inputWorld () {
      this.placeholder = ''
      this.isFocus = true
    },
    closeSearch () {
      this.placeholder = 'Search'
      this.isFocus = false
      this.getKeyList = ''
      this.keyWorld = ''
      this.keyListActive = -1
    },
    baidu () {
      this.searchLogoActive = 0
      if (this.keyWorld.trim() !== '') {
        window.open('https://www.baidu.com/s?ie=utf-8&word=' + this.keyWorld)
      }
      this.keyWorld = ''
    },
    bing () {
      this.searchLogoActive = 1
      if (this.keyWorld.trim() !== '') {
        window.open('https://cn.bing.com/search?q=' + this.keyWorld)
      }
      this.keyWorld = ''
    },
    google () {
      this.searchLogoActive = 2
      if (this.keyWorld.trim() !== '') {
        window.open('https://txt.guoqiangti.ga/search?q=' + this.keyWorld)
      }
      this.keyWorld = ''
    },
    github () {
      this.searchLogoActive = 3
      if (this.keyWorld.trim() !== '') {
        window.open('https://github.com/search?q=' + this.keyWorld)
      }
      this.keyWorld = ''
    },
    // 模糊搜索
    searchVague () {
      this.keyListActive = -1
      var timer = null
      if (this.status && this.keyWorld.trim() !== '') {
        this.status = false
        timer = setTimeout(() => {
          this.getWorldKey()
          this.status = true
        }, 500)
      } else {
        clearTimeout(timer)
      }
    },
    // 获取关键词
    getWorldKey () {
      const url =
        'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=' +
        this.keyWorld
      // jsonp方法会自动添加callback
      this.$jsonp(url, {}).then((json) => {
        // 返回的jsonp数据不会放这里，而是在 window.jsonpCallback
        this.getKeyList = json.g
      })
    },
    // 键盘事件
    keyupThen (e) {
      const keys =
        !e.altKey &&
        e.keyCode !== 83 &&
        e.keyCode !== 13 &&
        e.keyCode !== 37 &&
        e.keyCode !== 39 &&
        e.keyCode !== 38 &&
        e.keyCode !== 40
      // 回车搜索
      if (keys) {
        return
      }
      console.log(e.keyCode === 83 && e.altKey)
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
      // 38上，下·40，左37，有39，f12-123
      // 上选
      if (e.keyCode === 38 && this.getKeyList.length) {
        if (this.keyListActive <= 0) {
          this.keyListActive = this.getKeyList.length
        }
        this.keyListActive--
        this.keyWorld = this.getKeyList[this.keyListActive].q
      }

      // 下选
      if (e.keyCode === 40 && this.getKeyList.length) {
        if (this.keyListActive === this.getKeyList.length - 1) {
          this.keyListActive = -1
        }
        this.keyListActive++
        this.keyWorld = this.getKeyList[this.keyListActive].q
      }
      // ctrl+s发声
      if (e.altKey && e.keyCode === 83) {
        console.log('激活了')
        this.playAuido()
      }
    },
    // 联想词条搜索
    keyListSearch (q) {
      this.keyworld = q
      this.searchLogoActive === 0 && this.baidu()
      this.searchLogoActive === 1 && this.bing()
      this.searchLogoActive === 2 && this.google()
      this.searchLogoActive === 3 && this.github()
    },
    // 播放声音英文
    async playAuido () {
      this.audioUrl = ''
      this.audioUrl =
        'http://dict.youdao.com/dictvoice?type=0&audio=' + this.keyWorld
      await this.$refs.audioRef.load()
      this.$refs.audioRef.play()
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
    }
  },
  watch: {
    searchLogoActive: function () {
      window.localStorage.setItem('searchLogoActive', this.searchLogoActive)
    }
  }
}
</script>

<style scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("http://yswf.xyz/api") no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position-x: center;
  /* z-index: -99; */
  -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://yswf.xyz/api', sizingMethod='scale')";
  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://yswf.xyz/api', sizingMethod='scale');
}
/* .mkg {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
   transition: all 0.25s;
} */
.searchTools {
  display: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 265px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
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
  transition: all 0.25s;
  cursor: pointer;
}
.default {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 230px;
  height: 42.8px;
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
}
.default:hover {
  width: 530px;
  color: #111111;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 10px;
}
.active {
  width: 530px;
  color: #111111;
  background-color: #fff;
}
.active:hover {
  width: 530px;
  color: #111111;
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
}
.keyworld li,
.transfrom {
  height: 30px;
  padding-right: 10px;
  text-indent: 20px;
  line-height: 30px;
  cursor: pointer;
  background-color: #cccccc65;
  color: rgba(255, 255, 255);
  border-bottom: solid 1px rgba(0, 0, 0, 0);
  transition: all 0.25s;
}
.keyworld li:hover,
.transfrom:hover {
  padding-left: 10px;
  font-weight: 700;
  background-color: #cccccc98;
  color: rgba(255, 255, 255, 0.9);
}
.show {
  display: block;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
}
.searchLogoActive {
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
  backdrop-filter: blur(10px);
  border: none;
}
.keyListActive {
  font-weight: 700;
  padding-left: 10px;
  background-color: #cccccc98;
  color: rgba(255, 255, 255, 0.9);
}
.icon-sound {
  float: right;
  padding-right: 20px;
}
.icon-sound:hover {
  transform: scale(1.3);
}
</style>
