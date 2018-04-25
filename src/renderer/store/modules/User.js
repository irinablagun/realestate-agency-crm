import models from '../../db';
import { createJwtToken, verifyJwtToken } from '../../libs/jwt';

const state = {
  authenticated: false,
  user: null
};

const getters = {
  authenticated(state) {
    return state.authenticated;
  },
  user(state) {
    return state.user;
  },
  userName(state) {
    return state.user && state.user.fio;
  },
  isAdmin(state) {
    return state.user && state.user.group_id === 1;
  }
};

const actions = {
  login({ commit, dispatch }, { email, password }) {
    return models.User.findOne({
      where: {
        email
      }
    }, {
      attributes: ['id', 'salt', 'hashedPassword']
    }).then((user) => {
      if (user && user.authenticate(password)) {
        createJwtToken({ user_id: user.dataValues.id }, process.env.APP_AUTH_SECRET, '6h')
          .then((token) => {
            localStorage.setItem('token', token)
          });

        commit('authenticated');
        dispatch('loadUser', user.dataValues.id);
      } else {
        throw new Error('Email or password invalid');
      }
    });
  },
  logout({ commit }) {
    localStorage.removeItem('token');
    commit('logout');
  },
  loadUser({ commit }, payload) {
    return models.User.findById(payload, { attributes: ['id', 'fio', 'email', 'group_id'] }).then((user) => {
      commit('setUser', user.dataValues);
    })
  },
  authenticate({ commit, dispatch }) {
    return new Promise(async (resolve) => {
      const token = localStorage.getItem('token');

      const decoded = await verifyJwtToken(token, process.env.APP_AUTH_SECRET);

      if (decoded && decoded.user_id) {
        commit('authenticated');
        dispatch('loadUser', decoded.user_id);
      }

      resolve();
    })

  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  authenticated() {
    state.authenticated = true;
  },
  logout(state) {
    state.authenticated = false;
    state.user = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
