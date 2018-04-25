<template>
  <modal name="test-modal-controller" ref="form" :title="this.isEdit
          ? 'Редактирование информации об объекте недвижимости'
          : 'Добавление объекта недвижимости'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Адрес" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>



      <el-form-item label="Фотографии" v-if="form.photos">
        <el-table size="small" :data="form.photos" style="width: 100%" v-if="form.photos" class="photos">
          <el-table-column prop="id" label="Фото" width="60px">
            <template slot-scope="scope">
              <img :src="scope.row.path" alt="" width="30px" height="30px">
            </template>
          </el-table-column>
          <el-table-column prop="path" label="Файл">
          </el-table-column>
          <el-table-column prop="path" label="Файл">
            <template slot-scope="scope">
              <el-button @click="deleteFile(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button @click="openDialog" size="small" type="primary">select file</el-button>
      </el-form-item>


      <el-form-item label="Категория" prop="category">
        <el-select placeholder="Категория" v-model="form['realty_category.id']" @click="loadCategories" filterable remote>
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Продавец" prop="seller">
        <el-select placeholder="Продавец" v-model="form['seller.id']" @click="loadSellers" filterable remote>
          <el-option
            v-for="item in sellers"
            :key="item.id"
            :label="item.fio"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Комнат" prop="rooms">
        <el-input v-model="form.rooms" ></el-input>
      </el-form-item>
      <el-form-item label="Цена" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="Описание" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal">Отменить</el-button>
        <el-button type="primary" @click="submitForm">Сохранить</el-button>
      </span>
  </modal>
</template>

<script>
  import Modal from '../../controls/Modal';
  import models from '../../db';
  import fs from 'fs';
  import path from 'path';

  const dialog = require('electron').remote.dialog

  import { realtyStatuses } from '../../utils/lists';

  export default {
    name: 'RealtyManageForm',
    components: {
      Modal
    },
    props: ['data'],
    data() {
      return {
        isEdit: false,
        loading: true,
        form: {
          address: null,
          'realty_category.id': null,
          'seller.id': null,
          status: null,
          rooms: null,
          price: null,
          description: null,
          photos: [],
        },
        categories: [],
        sellers: [],
        rules: {
          address: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
          ],
          rooms: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
          ],
          price: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
          ],
          description: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
          ]
        }
      }
    },
    computed: {
      modal() {
        return this.$store.getters.modal;
      },
      realtyStatuses() {
        return realtyStatuses;
      },
      loadCategories() {
        return  models.RealtyCategory.findAll({ raw: true })
          .then((data) => {
            this.categories = data;
          })
      },
      loadSellers() {
        return  models.Client.findAll({ where: { deleted: false, status: 5 }, raw: true })
          .then((data) => {
            this.sellers = data;
          })
      }
    },
    watch: {
      modal(value) {
        if (value && value.name && value.data) {
          this.form = Object.assign({}, value.data);
          this.isEdit =  true;
        } else {
          Object.keys(this.form).forEach((key) => this.form[key] = null);
          this.isEdit = false;
        }
      }
    },
    methods: {
      deleteFile(id) {
        this.form.photos = this.form.photos.filter((p) => p.id !== id);
        models.File.destroy({ where: { id } });
      },
      openDialog() {
        dialog.showOpenDialog({ properties: [ 'openFile' ]}, (files) => {
          const filename = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();
          const filePath = `${path.resolve(__dirname, '../../../../files')}/${filename}.${files[0].split('.').pop()}`;

          fs.createReadStream(files[0]).pipe(fs.createWriteStream(filePath));

          models.File.create({ path: `/files/${filename}.${files[0].split('.').pop()}` }).then(({ id }) => {
            const f = { id, path: `/files/${filename}.${files[0].split('.').pop()}` };
            if (!this.form.photos) {
              this.form.photos = [f]
            } else {
              this.form.photos.push(f);
            }
          })
        });
      },
      closeModal() {
        this.$store.dispatch('closeModal');
        this.$emit('close');
      },
      submitForm() {
        this.$refs.form.validate(async(valid) => {

          if (valid) {
            const loading = this.$loading({ text: 'Создание записи' });

            try {
              if (this.isEdit) {
                await this.updateRealty(this.form);
              } else {
                await this.createRealty(this.form);
              }

              this.closeModal();
              loading.close();
            } catch(error) {
              console.error('RealtyManageForm', error);
              loading.close();
            }
          }
        });
      },
      createRealty({ address, photos, rooms, price, description, ...form }) {
        return models.Realty.create({ photos: photos.map((p) => p.id), address, seller_id: form['seller.id'], category_id: form['realty_category.id'], status: realtyStatuses.value = 1, rooms: Number(rooms), price, description, created_date: new Date(), creator_id: this.$store.getters.user.id })
        .then((realty) => realty.dataValues);
      },
      updateRealty({ id, photos, address, rooms, price, description, ...form }) {
        return models.Realty.update(
          { photos: photos.map((p) => p.id), address, rooms, seller_id: form['seller.id'], category_id: form['realty_category.id'], price, description },
          {
            where: { id }
          }
        )
      }
// <<<<<<< Updated upstream
//       createRealty({ address, rooms, price, description, ...form }) {
//         return models.Realty.create({ address, seller_id: form['seller.id'], category_id: form['realty_category.id'], status: realtyStatuses.value = 1, rooms: Number(rooms), price, description, created_date: new Date(), creator_id: this.$store.getters.user.id })
//           .then((realty) => realty.dataValues);
//       },
//       updateRealty({ id, address, rooms, price, description, ...form }) {
//         return models.Realty.update(
//           { address, rooms, seller_id: form['seller.id'], category_id: form['realty_category.id'], price, description },
// =======
//       createRealty({ address, photos, rooms, price, description, ...form }) {
//         return models.Realty.create({ photos: photos.map((p) => p.id), address, category_id: form['realty_category.id'], status: realtyStatuses.value = 1, rooms: Number(rooms), price, description, created_date: new Date(), creator_id: this.$store.getters.user.id })
//           .then((realty) => {
//             return realty.dataValues;
//           });
//       },
//       updateRealty({ id, photos, address, category, rooms, price, description }) {
//         return models.Realty.update(
//           { address, photos: photos.map((p) => p.id), rooms, category_id: category, price, description },
// >>>>>>> Stashed changes
//           {
//             where: { id }
//           }
//         )
//       }
    },
  }
</script>

<style>
  .photos {
    padding: 0 20px;
  }
</style>
