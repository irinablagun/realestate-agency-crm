<template>
  <div class="app-container">
    <nav-bar/>
    <div class="app-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import NavBar from './NavBar';

  export default {
    name: 'Home',
    components: {
      NavBar
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';

  .app-container {
    min-height: 100%;
    height: 100%;
  }

  .app-content {
    flex: 1;
  }

  .app-container,
  .app-content {
    display: flex;
    flex-direction: column;
  }
</style>
