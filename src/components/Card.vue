<template>
  <div @click.stop="">
    <section
      class="special_weather"
      v-if="message.type === 'special_weather'"
      @click="newTab(message.style.button.url)"
    >
      <img :src="message.style.information[0].weather" />
      <p class="now">实时</p>
      <p>{{ message.style.title }}</p>
      <span>{{ message.style.subtitle }}</span>
      <ul>
        <li v-for="(item, i) in message.style.information" :key="i">
          <img :src="item.weather" />
          <span>{{ item.time }}</span>
          <span>{{ item.low_tem + "-" + item.high_tem }}</span>
        </li>
      </ul>
    </section>
    <section class="strong_1" v-if="message.type === 'strong_1'" @click="newTab(message.style.button.url)">
      <div class="pic" :style="backGroundUrl"></div>
      <h3>{{ message.word }}</h3>
      <span>{{ message.style.label }}</span>
      <p v-if="message.style.addition_information.data.length === 1">{{message.style.addition_information.data[0].value}}</p>
      <p class="moretext" v-else v-for="(item, i) in message.style.addition_information.data" :key="i">{{item.source + item.value}}</p>
      <nav>
        <a :href="item.url" v-for="(item, i) in message.style.nav" :key="i" target="_blank" @click.stop="">{{item.text}}</a>
      </nav>
    </section>
    <section class="strong_2" v-if="message.type === 'strong_2'">
      列表卡片：大标题 有序列表
    </section>
    <section class="strong_3" v-if="message.type === 'strong_3'">
      百科类型：标题，下面图片列
    </section>
    <section class="normal_1" v-if="message.type === 'normal_1'">
      网站卡片：1张图两段文字
    </section>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    newTab (url) {
      window.open(url)
    }
  },
  computed: {
    backGroundUrl () {
      return {
        backgroundImage: 'url(' + this.message.style.pic.url + ')'
      }
    },
    inHtmltext () {
      let text = ''
      this.message.style.addition_information.data.forEach(data => {
        text += (data.value + '<br>')
      })
      return text
    }
  }
}
</script>

<style scoped>
div {
  position: relative;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 530px;
  height: 165px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}
section {
  cursor: pointer;
}
/* 天气 */
.special_weather > img {
  position: absolute;
  top: 10px;
  left: 175px;
  width: 60px;
  height: 60px;
}

.special_weather > p {
  position: absolute;
  top: 13px;
  left: 250px;
  font-weight: 600;
}
.special_weather .now {
  top: -8px;
  left: 266px;
}
.special_weather > span {
  position: absolute;
  top: 50px;
  left: 250px;
  font-size: 12px;
  color: rgb(58, 58, 58);
}
.special_weather ul {
  position: absolute;
  top: 75px;
  left: 20px;
  /* background-color: rgba(255, 255, 255, 0.1); */
}
.special_weather ul li {
  float: left;
  padding: 2px;
  width: 50px;
  height: 65px;
  padding: 10px 10px;
  text-align: center;
  font-size: 12px;
  color: rgb(17, 15, 15);
}
.special_weather ul li img {
  width: 40px;
  height: 40px;
}
/* 百科 */
.strong_1 .pic {
  position: absolute;
  top: 35px;
  left: 70px;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position-x: center;
}
.strong_1 h3{
  position: absolute;
  top: 13px;
  left: 141px;
}
.strong_1 span{
  position: absolute;
  top: 35px;
  right: 30px;
  padding: 3px;
  font-size: 13px;
  color: rgb(249,224,222);
  /* background-color: rgba(240,174,169,1); */
  border-radius: 6px;
}
.strong_1 p{
  position: absolute;
  top: 47px;
  left: 130px;
  /* text-indent:2em; */
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /*想省略几行就写几*/
  -webkit-box-orient: vertical;
}
/* 多类型文本时候 */
.strong_1 .moretext{
   -webkit-line-clamp: 1; /*想省略几行就写几*/
}
.strong_1 p:nth-of-type(2){
 top: 68px;
}
.strong_1 p:nth-of-type(3){
 top: 90px;
}
.strong_1 nav{
  position: absolute;
  bottom: 7px;
  left: 141px;
  display: flex;
  justify-content: space-around;
  width: 370px;

}
.strong_1 nav a{
  float: left;
  flex: 1;
  padding: 2px;
  margin: 0 10px;
  color: black;
  font-size: 16px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
}
</style>
