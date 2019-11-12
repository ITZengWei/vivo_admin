<template>
  <div id="app">
    <!-- 显示区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default  {

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  padding-top: 55px;
  padding-bottom: 55px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgb(244,244,244);
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.clearFix::after {
  content: '';
  clear: both;
  font-size: 0;
  overflow: hidden;
  line-height: 0;
}
.floatLeft {
  float: left;
}
.floatRight {
  float: right;
}
#app {
  /*max-width: 667px;*/
  margin: 0 auto;
}

</style>
