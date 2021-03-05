<template>
    <div>
    <div class="change" @click.stop="">
         <span class="iconfont icon-left" @click="left"></span>
         <span class="iconfont icon-right" @click="right"></span>
    </div>
    <el-popover
  v-if="imagesInformation.copyright"
    placement="top-start"
    width="200"
    trigger="hover"
    :content="imagesInformation.copyright">
    <i class="el-icon-info" slot="reference"></i>
  </el-popover>
    </div>
</template>
<script>
import { defaultSet } from '../partten'
export default {
  data () {
    return {
      imgPage: 0,
      imagesInformation: {}
    }
  },
  created () {
    if (!window.localStorage.getItem('imagesInformation')) {
      return
    }
    this.imagesInformation = JSON.parse(window.localStorage.getItem('imagesInformation'))
  },
  methods: {
    left () {
      if (this.imgPage <= 0) {
        this.imgPage = 8
      }
      this.imgPage--
      this.getimgUrl(this.imgPage)
    },
    right () {
      if (this.imgPage >= 7) {
        this.imgPage = 0
      }
      this.imgPage++
      this.getimgUrl(this.imgPage)
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
      if (res.images[0].url) {
        this.imagesInformation = {
          copyright: res.images[0].copyright,
          copyrightlink: res.images[0].copyrightlink,
          url: 'https://cn.bing.com/' + res.images[0].url,
          backGroundUrlStatus: true
        }
        this.$emit('seaveImgurl', this.imagesInformation)
      } else {
        this.$message.error('切换失败！')
      }
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
    z-index: 2;
}
.iconfont{
     color: rgb(0, 0, 0);
    font-size: 30px;
    margin: 0 10px;
    overflow: hidden;
    cursor: pointer;
}
.el-icon-info{
  position:absolute;
    bottom: 10px;
    left: 10px;
   font-size: 18px;
    margin-left: 5px;
    cursor: pointer;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: rgb(0 0 0 / 20%) 0 0 5px;
}
</style>
