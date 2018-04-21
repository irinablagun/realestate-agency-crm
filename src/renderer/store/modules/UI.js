const state = {
  modal: null
};

const getters = {
  modal(state) {
    return state.modal
  }
};

const actions = {
  openModal({ commit }, payload) {
    commit('setModal', typeof payload === 'string' ? { name: payload } : payload);
  },
  closeModal({ commit }) {
    commit('setModal', null);
  }
};

const mutations = {
  setModal(state, payload) {
    state.modal = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
