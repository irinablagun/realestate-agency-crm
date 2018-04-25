<template>
  <modal name="test-modal-controller" ref="form" :title="this.isEdit
          ? 'Редактирование информации о клиенте'
          : 'Добавление клиента'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="ФИО" prop="fio">
        <el-input v-model="form.fio"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="phone">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Пароль" prop="phone" v-if="!isEdit">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Группа" prop="group">
        <el-select placeholder="Группа" v-model="form['group.id']" @click="loadGroups" filterable remote>
          <el-option
                  v-for="item in groups"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
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

  import { clientTypes } from '../../utils/lists';
  import { clientStatuses } from '../../utils/lists';

  export default {
    name: 'ClientManageForm',
    components: {
      Modal
    },
    props: ['data'],
    data() {
      return {
        isEdit: false,
        groups: [],
        loading: true,
        form: {
          fio: null,
          phone: null,
          type: null,
          status: null
        },
        rules: {
          fio: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur, change'] },
          ]
        }
      }
    },
    computed: {
      loadGroups() {
        return  models.Group.findAll({ raw: true })
        .then((data) => {
          this.groups = data;
        })
      },
      modal() {
        return this.$store.getters.modal;
      },
      clientTypes() {
        return clientTypes;
      },
      clientStatuses() {
        return clientStatuses.filter((status) => status.value === 1 || status.value == 5);
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
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            const loading = this.$loading({ text: 'Создание записи' });

            try {
              if (this.isEdit) {
                await this.updateClient(this.form);
              } else {
                await this.createClient(this.form);
              }

              this.closeModal();
              loading.close();
            } catch(error) {
              console.error('ClientManageForm', error);
              loading.close();
            }
          }
        });
      },
      createClient({ fio, email, password, ...form }) {
        return models.User.create({ fio, email, password, group_id: form['group.id'] })
          .then((client) => {
            client.dataValues;
          });
      },
      updateClient({ id, fio, email, ...form }) {
        return models.User.update(
          { fio, email, group_id: form['group.id'] },
          {
            where: { id }
          }
        )
      }
    },
  }
</script>
