const state = {
  statisticsDuration: []
}

const mutations = {
  SET_STATISTICS_DURATION: (state, data) => {
    state.statisticsDuration = data;
  }
}

const actions = {
  setStatisticsDuration({ commit }, data) {
    commit('SET_STATISTICS_DURATION', data);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

