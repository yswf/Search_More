<template>
    <div class="change" @click.stop="">
         <span class="iconfont icon-left" @click="left"></span>
         <span class="iconfont icon-right" @click="right"></span>
    </div>
</template>
<script>
import { defaultSet } from '../partten'
export default {
  data () {
    return {
      imgPage: 0
    }
  },
  methods: {
    left () {
      if (this.imgPage <= 0) {
        this.imgPage = 7
      }
      this.imgPage--
      this.getimgUrl(this.imgPage)
      this.$message.success('上一张壁纸')
    },
    right () {
      if (this.imgPage >= 7) {
        this.imgPage = 0
      }
      this.imgPage++
      this.getimgUrl(this.imgPage)
      this.$message.success('下一张壁纸')
    },
    // 获取图片
    async getimgUrl (n) {
      const { data: res } = await this.$http.get(defaultSet.bingApi, {
        params: {
          format: 'js',
          idx: n,
          n: 1
        }
      })
      this.$emit('seaveImgurl', 'https://cn.bing.com/' + res.images[0].url)
    }
  }
}
</script>
<style scoped>
@media (max-width: 767px) {
  body .iconfont{
     font-size: 25px ;
     margin: 0 8px;
  }
}
.change{
    position:absolute;
    bottom: 10px;
    right: 10px;
}
.iconfont{
     color: rgb(0, 0, 0);
    font-size: 30px;
    margin: 0 10px;
    cursor: pointer;
}
</style>
