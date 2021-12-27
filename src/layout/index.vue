<template>
  <div class="main-layout">
    <div class="header">
      <div class="header-left">
        <div class="logo" @click="$router.push({name: 'GrindGain'}).catch(()=>{})">
          <img class="logo-img" src="@/assets/logo.png" alt="" />
        </div>
        <div>
          <h4 style="color: #1f2125; font-weight: bold">{{ $t('app.name') }}</h4>
          <!--          <div style="font-weight: bold; font-size: 18px">Grinder </div>-->
          <!--          <div style="font-size: 10px; font-weight: normal; transform: scale(0.8);">{{ $t('app.name') }}</div>-->
        </div>
        <div class="service-selector">
          <product-selector />
        </div>
      </div>
      <div class="header-right">
        <!--        <ul class="btn-list">-->
        <!--          <li>-->
        <!--            <el-badge is-dot :hidden="hideNotificationDot">-->
        <!--              <i class="el-icon-message-solid"/>-->
        <!--            </el-badge>-->
        <!--          </li>-->
        <!--          <li><i class="el-icon-document"/> </li>-->
        <!--          <li><i class="el-icon-s-promotion"/> </li>-->
        <!--        </ul>-->
        <div class="user-box">
          <el-dropdown trigger="click" @command="handleDropdownCommand">
            <div class="user-display">
<!--              <div class="user-avatar"><img class="user-avatar" :src="userInfo.avatar || require('@/assets/avatar.png')" alt=""-->
              <div class="user-avatar"><img class="user-avatar" :src="require('@/assets/avatar.png')" alt=""/></div>
              <i class="el-icon-arrow-down"/>
            </div>
            <el-dropdown-menu slot="dropdown">
              <div class="dropdown-user-box">
                <div class="avatar-wrapper"><img class="avatar" :src="require('@/assets/avatar.png')" alt=""/></div>
<!--                <div class="username">{{ userInfo.name_cn }}</div>-->
<!--                <div class="email">{{  userInfo.email }}</div>-->
              </div>
              <!--              <el-dropdown-item command="favorite">-->
              <!--                <i class="el-icon-star-on"/> {{ $t('my_favorite') }}-->
              <!--              </el-dropdown-item>-->
              <el-dropdown-item divided>
                <el-dropdown placement="left" @command="handleLangDropdownCommand" style="width: 100%">
                  <div style="display: flex; justify-content: space-between; width: 100%">
                    <div><i class="el-icon-s-flag"/> {{ $t('language') }}</div>
                    <div><span style="color: #969696">{{ currentLang }}</span> <i class="el-icon-arrow-right"/></div>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="简体中文">简体中文</el-dropdown-item>
                    <el-dropdown-item command="English">English</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <i class="el-icon-s-cooperation"/> {{ $t('logout') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main-body">
      <router-view/>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import ProductSelector from "@/layout/components/product-selector";

export default {
  name: "index",
  components: {ProductSelector},
  data () {
    return {
      hideNotificationDot: false,
      selectedProject: "TikTok",
      userInfo: {},
      currentLang: '简体中文'
    }
  },
  mounted() {
    this.userInfo = this.$cookies.get('User-Info')
    const lang = this.$cookies.get('lang') || 'zh_CN'
    if (lang === 'en_US') this.currentLang = 'English'
  },
  computed: {
    // ...mapGetters(['userInfo'])
  },
  methods: {
    handleDropdownCommand(command) {
      switch (command) {
          // case 'language':
          //   if (this.$i18n.locale === 'zh_CN') {
          //     // setLanguage('en_US')
          //     this.$i18n.locale = 'en_US'
          //     this.$cookies.set('lang', 'en_US')
          //   } else {
          //     // setLanguage('zh_CN')
          //     this.$i18n.locale = 'zh_CN'
          //     this.$cookies.set('lang', 'zh_CN')
          //   }
          //   break;
        case 'favorite':
          break;
        default:

      }
    },
    handleLangDropdownCommand (command) {
      let breadCrumbItem = null
      switch (command) {
        case '简体中文':
          this.$i18n.locale = 'zh_CN'
          this.$cookies.set('lang', 'zh_CN')
          this.currentLang = '简体中文'
          breadCrumbItem = [{ name: this.$t('menu.' + this.$route.meta.title), key: this.$t('menu.' + this.$route.meta.title), to: {} }]
          this.$store.dispatch('styles/setBreadCrumbItem', breadCrumbItem)
          document.title = this.$t('menu.' + this.$route.meta.title) + ' - 淘金平台'
          break
        case 'English':
          this.$i18n.locale = 'en_US'
          this.$cookies.set('lang', 'en_US')
          this.currentLang = 'English'
          breadCrumbItem = [{ name: this.$t('menu.' + this.$route.meta.title), key: this.$t('menu.' + this.$route.meta.title), to: {} }]
          this.$store.dispatch('styles/setBreadCrumbItem', breadCrumbItem)
          document.title = this.$t('menu.' + this.$route.meta.title) + ' - 淘金平台'
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  height: 100%;

  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    //background-color: #1f2125;
    background-color: white;
    box-shadow: 0 2px 3px #eaeaea;
    color: white;
    padding-left: 10px;
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;

    .header-left {
      display: flex;
      align-items: center;

      .logo {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        //background-color: white;
        margin-right: 10px;
        line-height: 34px;
        text-align: center;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          cursor: pointer;
          //color: #5F48C5;
          //background-color: #393b40;
          background-color: #f5f5f5;
        }

        .logo-img {
          width: 28px;
          height: 28px;
        }
      }

      .service-selector {
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      //width: 260px;
      justify-content: space-between;

      .btn-list {
        list-style: none;

        >li {
          display: inline-block;
          font-size: 20px;
          margin: 0 10px;
          &:hover {
            cursor: pointer;
          }
        }
      }

      .user-box {
        .user-display {
          display: flex;
          align-items: center;
          //color: white;
          height: 46px;
          //background-color: #5F48C5;
          padding: 0 10px;

          &:hover {
            cursor: pointer;
            //background-color: #46494e;
            background-color: #f5f5f5;
          }

          .user-avatar {
            height: 26px;
            width: 26px;
            background-color: white;
            border-radius: 50%;
            margin-right: 8px;
          }
        }
      }
    }
  }
  .main-body {
    position: relative;
    padding-top: 46px;

    height: 100%;
  }
}

.dropdown-user-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;

  padding: 10px 24px;

  .avatar {
    width: 50px;
    height: 50px;
    background-color: gainsboro;
    border-radius: 50%;
    margin: 14px;
  }
  .username {
    margin: 6px 0;
  }
  .email {
    font-size: 14px;
    color: gray;
  }
}
</style>

