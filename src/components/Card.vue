<template>
  <main @click.stop="">
    <!-- 天气卡片 -->
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
    <!-- strong_1类型卡片 -->
    <section class="strong_1" v-if="message.type === 'strong_1'" @click="newTab(message.style.button.url)">
      <div class="pic" :style="backGroundUrl"></div>
      <h3>{{ message.style.title }}</h3>
      <span>{{ message.style.label }}</span>
      <p v-if="message.style.addition_information.data.length === 1">{{message.style.addition_information.data[0].value}}</p>
      <p class="moretext" v-else v-for="(item, i) in message.style.addition_information.data" :key="i">{{item.source + item.value}}</p>
      <nav>
        <a :href="item.url" v-for="(item, i) in message.style.nav" :key="i" target="_blank" @click.stop="" >{{item.text}}</a>
      </nav>
    </section>
    <!-- strong_2类型卡片 -->
    <section class="strong_2" v-if="message.type === 'strong_2'" @click="newTab(message.style.url)">
      <div class="pic" :style="backGroundUrl"></div>
      <h3>{{ message.style.title }}</h3>
      <span>{{message.style.subtitle}}</span>
      <p>{{message.style.content}}</p>
    </section>
    <!-- strong_3类型卡片 -->
    <section class="strong_3" v-if="message.type === 'strong_3'" @click="newTab(message.style.url)">
      <h4>{{message.style.title}}</h4>
      <nav>
        <a :href="item.link" :title="item.title" v-for="(item,i) in message.style.pics" :key="i" target="_blank" @click.stop="">
        <img :src="item.url">
        <p>{{item.title}}</p>
        <span>{{item.information}}</span>
      </a>
      </nav>
    </section>
    <!-- strong_5类型卡片 -->
    <section class="strong_5" v-if="message.type === 'strong_5'" @click="newTab(message.style.url)">
      <div class="pic" :style="backGroundUrl"></div>
      <h3>{{ message.style.title }}</h3>
      <span>{{ message.style.label }}</span>
      <p v-if="message.style.addition_information.data.length === 1">{{message.style.addition_information.data[0].value}}</p>
      <p class="moretext" v-else v-for="(item, i) in message.style.addition_information.data" :key="i">{{item.source + item.value}}</p>
    </section>
    <!-- normal_1类型卡片 -->
    <section class="normal_1" v-if="message.type === 'normal_1'" @click="newTab(message.style.button.url)">
       <div class="pic" :style="backGroundUrl"></div>
       <h3>{{ message.style.title }}</h3>
       <div class="cardType">{{message.style.label}}</div>
       <span>{{message.style.addition_information.data[0].value}}</span>
       <el-button type="primary" v-if="message.style.button.text">{{message.style.button.text}}</el-button>
    </section>
    <!-- 计算器卡片 -->
    <section class="special_calculator" v-if="message.type === 'special_calculator'" @click="newTab(message.style.url)">
      <img :src="message.style.pic.url">
      <p>{{message.style.title}}</p>
      <h3>{{message.style.answer}}</h3>

    </section>
  </main>
</template>
<script>
export default {
  // 获取父组件传过来数据，注意设置默认对象
  props: {
    message: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    // 打开卡片链接
    newTab (url) {
      window.open(url)
    }
  },
  computed: {
    // 获取卡片图片
    backGroundUrl () {
      const imgurl = this.message.style.pic.url || require('../assets/img/default.png')
      return {
        backgroundImage: 'url(' + imgurl + ')'
      }
    }
  }
}
</script>

<style scoped>
main{
  position: relative;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 530px;
  height: 165px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}
section {
  cursor: pointer;
}
/* 初始化pic */
.pic{
width: 100px;
  height: 100px;
  border-radius: 10px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position-x: center;
}
/* span初始化 */
section span{
  padding: 3px;
  font-size: 13px;
  color: rgb(249,224,222);
}
.moretext{
   -webkit-line-clamp: 1; /*想省略几行就写几*/
   -moz-line-clamp: 1;
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
  left: 22px;
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
  /* background-color: rgba(240,174,169,1); */
  border-radius: 6px;
}
.strong_1 p{
  position: absolute;
  top: 47px;
  left: 130px;
  padding: 0 10px;
  /* -ms-max-height: 3.5em; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /*想省略几行就写几*/
  -webkit-box-orient: vertical;
  display:-moz-box;
  -moz-line-clamp: 3; /*想省略几行就写几*/
  -moz-box-orient:vertical;
}
/* 多类型文本时候 */
.strong_1 .moretext{
   -webkit-line-clamp: 1; /*想省略几行就写几*/
   -moz-line-clamp: 1;
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
.strong_1 nav a:nth-of-type(n+5){
 display: none;
}
/* strong_2 */
.strong_2 .pic{
position: absolute;
top: 10px;
left: 12px;
width: 80px;
height: 80px;
}
.strong_2 h3{
  position: absolute;
  top: 20px;
  left: 85px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /*想省略几行就写几*/
  -webkit-box-orient: vertical;
  display:-moz-box;
  -moz-line-clamp: 1; /*想省略几行就写几*/
  -moz-box-orient:vertical;
}
.strong_2 span{
  position: absolute;
  top: 65px;
  left: 85px;
}
.strong_2 p{
  position: absolute;
  top: 80px;
  left: 10px;
   overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /*想省略几行就写几*/
  -webkit-box-orient: vertical;
  display:-moz-box;
  -moz-line-clamp: 3; /*想省略几行就写几*/
  -moz-box-orient:vertical;
}
/* strong_3部分 */
.strong_3 h4{
  margin: 0;
  padding: 10px 0;
  text-align: center;
}
.strong_3 nav{
  display: flex;
justify-self: center;
  width: 100%;
  height: 120px;
}
.strong_3 nav a{
  flex: 1;
position: relative;
margin: 0 13px;
width: 80px;
height: 80px;
}
.strong_3 nav a img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.strong_3 nav a:hover{
  transform: scale(1.1);
}
.strong_3 nav a p{
  position: absolute;
 font-size: 14px;
 width: 100%;
 text-align: center;
  bottom: -35px;
  left: 0;
  color: black;
overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /*想省略几行就写几*/
  -webkit-box-orient: vertical;
  display:-moz-box;
  -moz-line-clamp: 1; /*想省略几行就写几*/
  -moz-box-orient:vertical;

}
.strong_3 nav a span{
  position: absolute;
  bottom: -40px;
  left: 0;
  font-size: 12px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /*想省略几行就写几*/
  -webkit-box-orient: vertical;
  display:-moz-box;
  -moz-line-clamp: 1; /*想省略几行就写几*/
  -moz-box-orient:vertical;
}
/*.strong_5部分  */
.strong_5 .pic{
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 0;
  width: 95px;
  height: 128px;
}
.strong_5 h3{
position: absolute;
top: 0;
left: 140px;
}
.strong_5 span{
position: absolute;
bottom: 20px;
right: 12px;
}
.strong_5 p{
  position: absolute;
  left: 140px;
}
.strong_5 p:nth-of-type(1){
top: 50px;
}
.strong_5 p:nth-of-type(2){
top: 70px;
}
.strong_5 p:nth-of-type(3){
top: 90px;
}
/* normal_1部分 */
.normal_1 .pic{
 position: absolute;
    top: 22px;
    left: 22px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
.normal_1 h3{
  position: absolute;
  top: 22px;
  left:155px;
}
.normal_1 span{
  position: absolute;
  top: 66px;
  font-size: 14px;
  left: 155px;
}
.cardType{
  width: 100%;
  margin: 10px 0;
  color: rgba(81,81,83,0.8);
  text-align: center;
}
.el-button{
  position: absolute;
  top:70px ;
  right: 30px;
  border-radius: 20px;
}
/* 计算器 */
.special_calculator img{
  width: 150px;
  height: 150px;
margin: auto;
}
.special_calculator p{
position: absolute;
top: 14px;
left: 146px;
}
.special_calculator h3{
  position: absolute;
top: 35px;
left: 150px;
}
</style>
