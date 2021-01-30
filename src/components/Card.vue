<template>
    <div @click.stop="">
    <section class="special_weather" v-if="message.type==='special_weather'" @click.stop="newTab(message.style.button.url)">
        <img :src="message.style.information[0].weather">
        <p class="now">实时</p>
        <p>{{message.style.title}}</p>
        <span>{{message.style.subtitle}}</span>
        <ul>
            <li v-for="(item , i) in message.style.information" :key="i">
                <img :src="item.weather">
                <span>{{item.time}}</span>
                <span>{{item.low_tem + '-' + item.high_tem}}</span>
            </li>
        </ul>
    </section>
    <section class="strong_1" v-if="message.type==='strong_1'">百科类型：</section>
    <section class="strong_2" v-if="message.type==='strong_2'">列表卡片：大标题 有序列表</section>
    <section class="strong_3" v-if="message.type==='strong_3'">百科类型：标题，下面图片列</section>
    <section class="normal_1" v-if="message.type==='normal_1'">网站卡片：1张图两段文字</section>
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
  }
}
</script>

<style scoped>
div{
    position: relative;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 530px;
    height: 165px;
    /* border: 1px solid red; */
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
}
section{
    cursor: pointer;
}
.special_weather >img{
position: absolute;
top: 10px;
left: 175px;
width: 60px;
height: 60px;
}

.special_weather >p{
position: absolute;
top: 13px;
left: 250px;
font-weight: 600;
}
.special_weather .now{
    top: -8px;
    left: 266px;
}
.special_weather >span{
position: absolute;
top: 50px;
left: 250px;
font-size: 12px;
color: rgb(58, 58, 58);
}
.special_weather ul{
    position: absolute;
    top: 75px;
    left: 20px;
    /* background-color: rgba(255, 255, 255, 0.1); */
}
.special_weather ul li{
    float: left;
    padding: 2px;
    width: 50px;
    height: 65px;
    padding: 10px 10px;
    text-align: center;
    font-size: 12px;
    color: rgb(17, 15, 15);
}
.special_weather ul li img{
    width: 40px;
    height: 40px;
}
</style>
