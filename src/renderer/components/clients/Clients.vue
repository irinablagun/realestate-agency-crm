<template>
  <div>
    <el-row>
      <el-col :span="12"><h1>Клиенты</h1></el-col>
    </el-row>
    <el-button size="mini" @click="openModal('test-modal-controller')">Добавить</el-button>
    <!-- <a @click="showDeactive" href="#">erre</a> -->
    <el-checkbox @change="loadClients">Показать неактивных</el-checkbox>

    <el-table :data="data" style="width: 100%">
      <el-table-column prop="fio" label="ФИО"></el-table-column>
      <el-table-column prop="phone" label="Телефон"></el-table-column>
      <el-table-column prop="type" label="Тип">
        <template slot-scope="scope">
          {{ clientTypes(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Статус">
        <template slot-scope="scope">
          {{ clientStatuses(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="responsible_id" label="Ответственный"></el-table-column>
      <el-table-column prop="created_date" label="Дата создания">
        <template slot-scope="scope">
          {{ createdDate(scope.row.created_date) }}
        </template>
      </el-table-column>
      <el-table-column label="" width="260">
        <template slot-scope="scope">
          <el-dropdown @command="(command) => handleCommand(command, scope.row)">
            <span class="el-dropdown-link">
              Действия<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="preview">Просмотр</el-dropdown-item>
              <el-dropdown-item command="edit">Изменить</el-dropdown-item>
              <el-dropdown-item command="delete">Удалить</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <client-manage-form @close="this.loadClients"/>
  </div>
</template>

<script>
  import models from '../../db';
  import ClientManageForm from './ClientManageForm';
  import { clientTypes, clientStatuses } from '../../utils/lists';
  import { createdDate } from '../../utils/utils';
  
  import { mapActions } from 'vuex';

  export default {
    name: 'Clients',
    components: {
      ClientManageForm
    },
    data() {
      return {
        data: [],
        form: null
      }
    },
    methods: {
      createdDate(date) {
        return createdDate(date);
      },
      clientTypes(value) {
        const client = clientTypes.find((type) => {
            return type.value === value
        });

        return client && client.label;
      },
      clientStatuses(value) {
        const client = clientStatuses.find((status) => {
            return status.value === value
        });

        return client && client.label;
      },
      loadClients(deactive = false) {
        const where = { deleted: false };

        if (!deactive) {
          where.status = { not: 2 };
        }

        return models.Client.findAll({ where, raw: true})
          .then((data) => {
            this.data = data;
          })
      },
      handleCommand(command, row) {
        switch(command) {
          case 'preview': 
            this.handleRowClick(row)
            break;
          case 'edit': 
            this.handleEdit(row)
            break;
          case 'delete': 
            this.handleDelete(row)
            break;
        }
      },
      handleRowClick(row) {
        this.$router.push({ path: `/clients/${row.id}` });
      },
      handleDelete({ id, fio }) {
        this.$confirm(
          `Вы действительно хотите удалить клиента "${fio}"?`,
          'Предупреждение',
          {
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            type: 'warning'
          }
        )
        .then(() => this.removeClient(id))
        .then(() => {
          this.loadClients();
          this.$message({ type: 'success', message: 'Запись успешно удалена' });
        })
        .catch((error) => {
          if (error && error !== 'cancel') {
            this.$message({
              type: 'error',
              message: error && error.message || error
            });
          }
        });
      },
      handleEdit(row) {
        this.$store.dispatch('openModal', {
          name: 'test-modal-controller',
          data: row
        });
      },
      removeClient(id) {
        return models.Client.update(
          { deleted: true },
          { where: { id } }
        ).then((response) => {
          if (!response[0]) {
            throw new Error('Запись не найдена');
          }
        });
      },
      ...mapActions(['openModal'])
    },
    created() {
      this.loadClients();
    }
  }
</script>
