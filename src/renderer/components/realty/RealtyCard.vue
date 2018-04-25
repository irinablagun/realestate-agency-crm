<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h1>Объект недвижимости  >  {{ data.address }}</h1>
      </el-col>
    </el-row>
    <el-row v-if="photos">
      <div class="photos">
        <img :src="photo.path" v-for="(photo, index) in photos" :key="photo.id" class="photo">
      </div>
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
        data: {},
        photos: []
      }
    },
    methods: {
      loadRealty() {
        return models.Realty.findById(this.$route.params.id, { raw: true })
          .then((data) => {
            if (data.photos) {
              const photos = JSON.parse(data.photos);

              models.File.findAll({ where: { id: { in: photos } }, raw: true }).then((files) => {
                this.photos = files;
              })
            }

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
  .photos {
    display: flex;
    flex-direction: row;
    padding: 30px 0;
  }

  .photo {
    display: block;
    height: 300px;

    border: 1px solid #ccc;
    margin-right: 10px;
    border-radius: 5px;
  }
</style>
