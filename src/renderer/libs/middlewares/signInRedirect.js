import store from '../../store';
export default (to, from, next) => {
  if (store.getters.authorized) {
    next('/');
  } else next();
}
