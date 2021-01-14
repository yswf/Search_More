<template>
  <div>
    <section :class="{mkg:isFocus}">
      <input
        type="text"
        :placeholder="placeholder"
        v-model="keyWorld"
        @focus="inputWorld"
        @blur="blurInput"
        @input="getWorldKey"
        :class="showClass"
        ref="infocus"
      />
      <ul class="searchTools" @click="inputWorld">
        <li @click="baidu"><span class="iconfont icon-baidu"></span></li>
        <li @click="bing"><span class="iconfont icon-bing"></span></li>
        <li @click="google"><span class="iconfont icon-google"></span></li>
      </ul>
      <div :class="showKeyworld">
        <ul>
          <li>翻译：{{ keyWorld }}</li>
          <li v-for="item in getKeyList" :key="item.sa">{{ item.q }}</li>

        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyWorld: '',
      placeholder: 'Search',
      isFocus: false,
      getKeyList: []
    }
  },
  methods: {
    inputWorld () {
      this.$refs.infocus.focus()
      this.placeholder = ''
      this.isFocus = true
    },
    blurInput () {
      this.placeholder = 'Search'
      this.isFocus = false
      this.getKeyList = ''
      // this.keyWorld = ''
    },
    baidu () {
      if (this.keyWorld.trim() !== '') { window.open('https://www.baidu.com/s?ie=utf-8&word=' + this.keyWorld) }
    },
    bing () {
      if (this.keyWorld.trim() !== '') { window.open('https://cn.bing.com/search?q=' + this.keyWorld) }
    },
    google () {
      if (this.keyWorld.trim() !== '') { window.open('https://txt.guoqiangti.ga/search?q=' + this.keyWorld) }
    },
    // 获取关键词
    getWorldKey () {
      const url = 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=' + this.keyWorld
      // jsonp方法会自动添加callback
      this.$jsonp(url, {
      }).then((json) => {
        // 返回的jsonp数据不会放这里，而是在 window.jsonpCallback
        this.getKeyList = json.g
      })
    }
  },
  computed: {
    showClass: function () {
      return {
        default: true,
        active: this.isFocus
      }
    },
    showKeyworld () {
      return {
        keyworld: true,
        show: this.keyWorld.trim() !== ''
      }
    }
  }
}
</script>

<style scoped>
.mkg {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
   transition: all 0.25s;
}
.searchTools {
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
.keyworld li {
  height: 30px;
  padding-right: 10px;
  text-indent: 20px;
  line-height: 30px;
  cursor: pointer;
  background-color: #cccccc65;
  color: rgba(255, 255, 255, 0.8);
  border-bottom: solid 1px rgba(0, 0, 0, 0);
  transition: all 0.25s;
}
.keyworld li:hover {
  padding-left: 10px;
  background-color: #cccccc98;
  color: rgba(255, 255, 255, 0.9);
}
.show{
  display: block;
}
</style>
