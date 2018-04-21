<template>
  <modal name="test-modal-controller" ref="form" :title="this.isEdit
          ? 'Редактирование единицы измерения'
          : 'Создание единицы измерения'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Название" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Описание">
        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
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
  import { UnitModel } from '../../db';

  export default {
    name: 'UnitManageForm',
    components: {
      Modal
    },
    props: ['data'],
    data() {
      return {
        isEdit: false,
        loading: true,
        form: {},
        rules: {
          name: [
            { required: true, message: 'Пожалуйста введите название единицы измерения', trigger: 'blur' },
          ]
        }
      }
    },
    computed: {
      modal() {
        return this.$store.getters.modal;
      }
    },
    watch: {
      modal(value) {
        if (value.name && value.data) {
          this.form = Object.assign({}, value.data);
          this.isEdit =  true;
        } else {
          
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
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            const loading = this.$loading({ text: 'Создание записи' });

            try {
              if (this.isEdit) {
                await this.updateUnit(this.form);
              } else {
                await this.createUnit(this.form);
              }

              this.closeModal();
              loading.close();
            } catch(error) {
              console.error('UnitManageForm', error);
              loading.close();
            }
          }
        });
      },
      createUnit({ name, desc }) {
        return UnitModel.create({ name, desc })
          .then((unit) => unit.dataValues);
      },
      updateUnit({ id, name, desc }) {
        return UnitModel.update(
          { name, desc },
          {
            where: { id }
          }
        )
      }
    },
  }
</script>
