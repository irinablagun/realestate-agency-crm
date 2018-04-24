<template>
  <modal name="test-modal-controller" ref="form" :title="this.isEdit
          ? 'Редактирование информации об объекте недвижимости'
          : 'Добавление объекта недвижимости'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Адрес" prop="address">
        <el-input v-model="form.address"></el-input>
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
          type: null,
          status: null,
          rooms: null,
          price: null,
          description: null,
        },
        categories: [],
        rules: {
          address: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
          ],
          type: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
          ],
          status: [
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
      createRealty({ address, rooms, price, description, ...form }) {
        return models.Realty.create({ address, category_id: form['realty_category.id'], status: realtyStatuses.value = 1, rooms: Number(rooms), price, description, created_date: new Date(), creator_id: this.$store.getters.user.id })
          .then((realty) => realty.dataValues);
      },
      updateRealty({ id, address, category, rooms, price, description }) {
        return models.Realty.update(
          { address, rooms, category_id: category, price, description },
          {
            where: { id }
          }
        )
      }
    },
  }
</script>
