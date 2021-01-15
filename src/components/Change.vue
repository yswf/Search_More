<template>
    <div class="change" @click.stop="">
         <span class="iconfont icon-left"></span>
         <span class="iconfont icon-right"></span>
    </div>
</template>
<script>
export default {
  data () {
    return {

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
     color: #000000;
    font-size: 30px;
    margin: 0 10px;
    cursor: pointer;
}
</style>
