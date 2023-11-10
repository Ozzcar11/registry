export default {
  state: {
    selectedCheckBox: []
  },
  actions: {
    IDtoStore ({ commit }, payload) {
      commit('setIDsToStore', payload)
    },
    removeIDs ({ commit }, payload) {
      commit('deleteIDsFromStore', payload)
    }
  },
  mutations: {
    setIDsToStore: function (state, localSelectedIds) {
      state.selectedCheckBox = state.selectedCheckBox.concat(localSelectedIds)
    },
    deleteIDsFromStore: function (state, { parentIds, childIds }) {
      state.selectedCheckBox = state.selectedCheckBox.filter(i => !parentIds.includes(i))
      state.selectedCheckBox = state.selectedCheckBox.filter(i => !childIds.includes(i))
    }
  },
  getters: {
    getSelectedIDs: state => state.selectedCheckBox
  }
}
