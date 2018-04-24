<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h1>Объект недвижимости  >  {{ data.address }}</h1>
      </el-col>
    </el-row>
    <div class="moreinfo">
      <p>Адрес: {{ data.address }}</p>
      <p>Кол-во комнат: {{ data.rooms }}</p>
      <p>Цена: {{ data.price }}</p>
      <p>Описание: {{ data.description }}</p>
      <el-button type="primary" @click="openModal('test-modal-controller')">Добавить сделку</el-button>
    </div>
    <transaction-manage-form @close="this.loadRealty"/>
  </div>
</template>

<script>
  import models from '../../db';
  import TransactionManageForm from '../transactions/TransactionManageForm.vue';

  import { mapActions } from 'vuex';

  export default {
    name: 'RealtyCard',
    components: {
      TransactionManageForm
    },
    data() {
      return {
        data: {}
      }
    },
    methods: {
      loadRealty() {
        return models.Realty.findById(this.$route.params.id, { raw: true })
          .then((data) => {
            this.data = data;
          })
      },
      handleAdd(row) {
        this.$store.dispatch('openModal', {
          name: 'test-modal-controller',
          data: row
        });
      },
      ...mapActions(['openModal'])
    },
    created() {
      this.loadRealty();
    }
  }
</script>


<style>
  .moreinfo {
    margin: 40px 0px;
  }
  p {
    margin: 10px 0px;
  }
  h1 {
    font-weight: 600;
  }
</style>
