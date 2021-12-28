<template>
<div class="header-container">
  <div class="header-container-upper">
    <img class="header-logo" :src="require('@/assets/avatar.png')">
    <span class="header-url" @click=handleClickName>
      InterviewGuide.cn
    </span>
  </div>
  <div class="header-container-lower">
    <span class="web-name">
      学习鸭-技术让生活更美好!
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: "Header",
  mounted() {
  },
  methods: {
    handleClickName () {
      window.open("http://www.baidu.com")
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {

  width: 100%;
  //height: 100px;
  margin-left: 1%;
  .header-container-upper{

    font-family: Hero-Bold;
    text-decoration: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 24px;
    letter-spacing: .025em;
    color: #555555;
    display: block;
    padding: 0.5rem 0 0 0.1rem;
    height: 60%;
    .header-logo {
      width: 40px;
      height: 40px;
    }
    .header-url{
      color: black;
      &:hover {
        cursor: pointer;
        color: #5F48C5;
      }
    }
  }
  .header-container-lower {
    height: 30%;
    .web-name {
      margin-left: 0.5rem;
      font-size: 20px;
}
}
}

</style>
