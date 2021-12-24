/**
 * SSO 回调页面
 */

export default {
  name: 'index',
  mounted() {
    const code = this.$route.query.code;
    this.$store.dispatch('user/loadUserInfo', code).then(() => {
      window.location.href = process.env.VUE_APP_FE_URL;

    }).catch(err => console.log('请求用户地址异常！' + err.toString()))
  },
  render(h) {
    return h()
  }
}

