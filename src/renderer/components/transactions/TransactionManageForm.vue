<template>
  <modal name="test-modal-controller" ref="form" title="Добавление сделки" width="500px">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Клиент" prop="client">
        <el-select placeholder="Клиент" v-model="form.client" @click="loadClients" filterable remote>
          <el-option
            v-for="item in clients"
            :key="item.id"
            :label="item.fio"
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

  export default {
    name: 'TransactionManageForm',
    components: {
      Modal
    },
    props: ['data'],
    data() {
      return {
        loading: true,
        form: {
          client: []
        },
        clients: null,
        rules: {
          client: [
            { required: true, message: 'Поле обязательно для заполнения', trigger: 'blur' },
          ]
        }
      }
    },
    computed: {
      modal() {
        return this.$store.getters.modal;
      },
      loadClients() {
        return models.Client.findAll({ where: { deleted: false, status: { not: 2 } }, raw: true})
          .then((data) => {
            this.clients = data;
          })
      }
    },
    watch: {
      modal(value) {
        if (value && value.name && value.data) {
          this.form = Object.assign({}, value.data);
        } else {
          Object.keys(this.form).forEach((key) => this.form[key] = null);
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
              const form = Object.assign({}, this.form);
              await this.createTransaction(form);
              this.closeModal();
              loading.close();
            } catch(error) {
              console.error('TransactionManageForm', error);
              loading.close();
            }
          }
        });
      },
      async createTransaction(form) {
        await models.Transaction.create({ 
          stage_id: 1, 
          realty_id: this.$route.params.id, 
          client_id: form.client, 
          created_date: new Date(), 
          creator_id: this.$store.getters.user.id 
        });

        await models.Realty.update(
          { status: 2 },
          { where: { id: this.$route.params.id } }
        );

        await models.Client.update(
          { status: 3 },
          { where: { id: form.client } }
        );
      }
    },
  }
</script>
