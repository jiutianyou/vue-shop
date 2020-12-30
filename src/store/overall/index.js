const Overall = {
  state: {
    loading: null
  },
  mutations: {
    SET_LOADING (state, data) {
      state.loading = data
    }
  },
  actions: {
    async updateLoading ({ commit, state }, data) {
      if (!data && state.loading) await state.loading.close()
      commit('SET_LOADING', data)
    }
  }
}

export default Overall
