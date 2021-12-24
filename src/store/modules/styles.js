
const state = {
  breadCrumbItem: '',
  subHeaderIcon: '',
  subHeaderTailContent: '问题回收站',
  asideMenuActivePath: 'Dashboard'
}

const mutations = {
  SET_BREAD_CRUMB_ITEM: (state, data) => {
    state.breadCrumbItem = data;
  },
  SET_SUB_HEADER_ICON: (state, data) => {
    state.subHeaderIcon = data;
  },
  SET_SUB_HEADER_TAIL_CONTENT: (state, data) => {
    state.subHeaderTailContent = data;
  },
  SET_ASIDE_MENU_ACTIVE_PATH: (state, data) => {
    state.asideMenuActivePath = data;
  }
}

const actions = {
  setBreadCrumbItem({ commit }, data) {
    commit('SET_BREAD_CRUMB_ITEM', data)
  },
  setSubHeaderIcon({ commit }, data) {
    commit('SET_SUB_HEADER_ICON', data)
  },
  setSubHeaderTailContent({ commit }, data) {
    commit('SET_SUB_HEADER_TAIL_CONTENT', data)
  },
  setAsideMenuActivePath({ commit }, data) {
    commit('SET_ASIDE_MENU_ACTIVE_PATH', data)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

