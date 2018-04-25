<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="E-mail" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">Login</el-button>
      <el-button>Forgot password</el-button>
    </el-form>
    Login
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
  import * as user from '../db/models/user';
  import * as crypto from 'crypto';

  export default {
    name: 'login',
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            { required: true, message: 'Email test', trigger: 'change' },
            { type: 'email', message: 'Email test 2', trigger: 'change' },
          ],
          password: [
            { required: true, message: 'Pass test', trigger: 'change' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      login() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const { email, password } = this.form;
            this.$store.dispatch('login', {  email, password }).then(() => {
              this.$router.push('/');
            });
          }
        });
      },
    },
  }
</script>

<style>
  .login {
    position: absolute;
    width: 300px;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
</style>
