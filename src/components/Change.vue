<template>
    <div class="change" @click.stop="">
         <span class="iconfont icon-left" @click="left"></span>
         <span class="iconfont icon-right" @click="right"></span>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    left () {
      this.$message.success('上一张壁纸')
    },
    right () {
      this.$message.success('下一张壁纸')
    }
  }
}
</script>
<style scoped>
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
