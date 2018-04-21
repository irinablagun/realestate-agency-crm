<template>
  <div class="d-container">

  </div>
</template>

<script>
  import * as UserModel from '../db/models/user';
  import * as CategoryModel from '../db/models/category';


  import NavBar from './NavBar';

  import Tree from './Tree';

  export default {
    name: 'dashboard',
    components: {
      Tree,
      NavBar
    },
    data() {
      return {
        users: [],
        categoires: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {

    },
    async created() {
      this.users = await UserModel.findAll();
    }
  }
</script>

<style>
  
  
</style>