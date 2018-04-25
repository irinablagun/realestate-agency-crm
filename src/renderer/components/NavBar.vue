<template>
  <header class="header">
    <router-link to="/" class="logo">
      <img src="../assets/images/logo.svg" alt="">
    </router-link>
    <div class="header-container">
      <nav class="header-menu">
        <router-link to="/layout/realty">Объекты недвижимости</router-link>
        <router-link to="/layout/clients">Клиенты</router-link>
        <router-link to="/layout/transactions">Сделки</router-link>
        <router-link to="/layout/users" v-if="isAdmin">Пользователи</router-link>
        <!-- <router-link to="/catalog/tasks">Задачи</router-link> -->
      </nav>
      <div class="header-profile">
        <el-dropdown trigger="click" @command="handleCommand">
          <span>
            {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>Профиль</el-dropdown-item>
            <el-dropdown-item disabled>Настройки</el-dropdown-item>
            <el-dropdown-item command="exit" divided>Выйти</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters(['userName', 'isAdmin'])
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'exit':
            this.$store.dispatch('logout');
        }
      }
    }
  }
</script>


<!--<router-link to="/test" class="disabled">Заказы</router-link>-->
<!--<router-link to="/test" class="disabled">Накладные</router-link>-->
<!--<router-link to="/test" class="disabled">Сотрудники</router-link>-->
<!--<router-link to="/test" class="disabled">Сводка</router-link>-->
<!--<router-link to="/test" class="disabled">Справочники</router-link>-->

<style lang="scss">
  @import "../assets/scss/variables";

  .header {
    display: flex;
    align-items: center;

    background: $color-gunmetal;
    height: 60px;
    padding: 0 20px;
  }

  .header-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .header-profile {
    span {
      font-size: 0.875rem;
      color: #C9CACD;
      cursor: pointer;
    }
  }

  .header-menu {
    font-size: 0.875rem;

    a {
      display: inline-block;
      padding-right: 15px;
      padding-left: 15px;

      text-decoration: none;
      line-height: 60px;
      color: #C9CACD;

      transition: color ease 0.3s;

      &.disabled {
        opacity: 0.5;
      }

      &:hover,
      &.router-link-active {
        color: #fff;
      }
    }
  }

  .logo {
    margin-right: 50px;
    padding: 5px;
  }
</style>
