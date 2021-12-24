import Vue from 'vue';
import users from "@/api/users";

const state = {
  username: '',
  name_cn: '',
  email: '',
  avatar: '',
  token: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_BASIC_INFO: (state, info) => {
    // 除了token
    // state.name = info.name
    // state.avatar = info.avatar
    state.id = info.id
    state.email = info.email
    state.username = info.name
    state.auth = info.auth
    state.name_cn = info.name_cn
    state.role_id = info.role_id
  },
}

const actions = {
  loadUserInfo( { commit }, code) {
    return new Promise((resolve, reject) => {
      const userInfo = Vue.$cookies.get('User-Info')
      if (userInfo) {
        commit('SET_USER_BASIC_INFO', {
          id: userInfo.id,
          name_cn: userInfo.name_cn,
          username: userInfo.username,
          avatar: userInfo.avatar,
          email: userInfo.email,
          role_id: userInfo.role_id
        })
        commit('SET_TOKEN', userInfo.token)
        resolve()
      } else {
        users.getAuthInfo(code).then(({ data: res }) => {
          if (res.meta.code !== 0) {
            reject(new Error(res.meta.message))
            return
          }
          commit("SET_USER_BASIC_INFO", res.data)
          commit("SET_TOKEN", res.data.token)

          Vue.$cookies.set("User-Info", JSON.stringify({
            id: res.data.id,
            name_cn: res.data.name_cn,
            username: res.data.username,
            avatar: res.data.avatar,
            email: res.data.email,
            token: res.data.token,
            role_id: res.data.role_id
          }), 60 * 60 * 24 * 28)
          resolve()
        }).catch(err => reject(err))
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

