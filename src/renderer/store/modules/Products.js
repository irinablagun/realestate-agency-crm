import * as db from '../../db';

const state = {
  products: []
};

const getters = {
  products(state) {
    return state.products;
  }
};

const actions = {
  productsLoad({ commit }, { categoryId }) {
    return db.ProductModel.findAll({
      where: {
        category_id: categoryId
      }
    }).then((products) => {
      if (products) {
        commit('set', products.map((node) => node.dataValues));
      }
    })
  }
};

const mutations = {
  set(state, payload) {
    state.products = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
