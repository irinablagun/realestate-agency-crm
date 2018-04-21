import * as db from '../../db';

const state = {
  keySelectedCategory: Number(localStorage.getItem('key-selected-category')),
  categories: [],
};

const getters = {
  categories(state) {
    let list = state.categories.map((node) => Object.assign({}, node));
    let map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i;
      list[i].children = [];
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent_id !== null) {
        list[map[node.parent_id]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  },
  keySelectedCategory(state) {
    return state.keySelectedCategory;
  },
  selectedCategory({ categories, keySelectedCategory }) {
    return keySelectedCategory
      ? categories.find((category) => category.id === keySelectedCategory)
      : null;
  }
};

const actions = {
  categoriesLoad({ commit }) {
    return db.CategoryModel.findAll({})
      .then((data) => data.map((node) => node.dataValues))
      .then((data) => {
        commit('setCategories', data);
      });
  },
  selectCategory({ commit }, { id }) {
    if (id) {
      localStorage.setItem('key-selected-category', id);
      commit('setKeySelectedCategory', id);
    }
  },
  addCategory({ commit, state }, { name }) {
    return db.CategoryModel.create({
      name,
      parent_id: state.keySelectedCategory
    }).then((category) => category.dataValues)
      .then((category) => {
        commit('addCategory', category);
      });
  },
  renameCategory({ commit }, { id, name }) {
    return db.CategoryModel.update(
      { name },
      {
        where: { id }
      }
    ).then(() => {
      commit('renameCategory', { id, name });
    });
  },
  removeCategory({ commit }, { id }) {
    return db.CategoryModel.destroy(
      {
        where: { id }
      }
    ).then(() => {
      commit('removeCategory', { id });
    });
  }
};

const mutations = {
  removeCategory(state, { id }) {
    state.categories = state.categories.filter((category) => category.id !== id);
  },
  renameCategory(state, { id, name }) {
    const category = state.categories.find((category) => category.id === id);

    if (category) {
      category.name = name;
    }
  },
  addCategory(state, payload) {
    state.categories.push(payload);
  },
  setCategories(state, payload) {
    state.categories = payload;
  },
  setKeySelectedCategory(state, payload) {
    state.keySelectedCategory = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
