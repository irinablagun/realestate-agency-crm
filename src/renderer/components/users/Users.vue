<template>
  <div>

    <div class="page-header-container">
      <div class="page-header">
        <el-row>
          <el-col :span="12"><h1>Пользователи</h1></el-col>
        </el-row>
        <el-button class="headerButton" type="primary" @click="openModal('test-modal-controller')">Добавить</el-button>
      </div>
    <el-input class="search"
      placeholder="Поиск"
      prefix-icon="el-icon-search"
      v-model="search">
    </el-input>
      <div>

        <el-button :disabled="!(row)" type="primary" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
        <el-button :disabled="!(row)" type="danger" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
      </div>
    </div>


    <el-table :data="data" highlight-current-row @row-click="handleRowSelect" @row-dblclick="handleRowClick" style="width: 100%">
      <el-table-column prop="fio" label="ФИО"></el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
      <el-table-column prop="responsible_id" label="Ответственный">
        <template slot-scope="scope">
          {{ scope.row['group.name'] }}
        </template>
      </el-table-column>
      <el-table-column prop="created_date" label="Дата регистрации">
        <template slot-scope="scope">
          {{ createdDate(scope.row.created_date) }}
        </template>
      </el-table-column>
    </el-table>
    <user-manage-form @close="this.loadUsers"/>
  </div>
</template>

<script>
  import models from '../../db';
  import UserManageForm from './UserManageForm';
  import { clientTypes, clientStatuses } from '../../utils/lists';
  import { createdDate } from '../../utils/utils';

  import { mapActions } from 'vuex';

  export default {
    name: 'Users',
    components: {
      UserManageForm
    },
    data() {
      return {
        data: [],
        form: null,
        row: null,
        search: ''
      }
    },
    watch: {
      search() {
          if (this.search && this.search.length > 0) {
              this.searchClients()
          } else {
            this.loadUsers()
          }

      }
    },
    methods: {
      handleRowSelect(row) {
        this.row = row;
      },
      searchClients(){
        return models.Client.findAll({ where: { fio: { like: '%' + this.search + '%' }}, raw: true})
          .then((data) => {
            this.data = data;
        })
      },
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
      loadUsers(deactive = false) {
        // const where = { deleted: false };
        //
        // if (!deactive) {
        //   where.status = { not: 2 };
        // }

        return models.User.findAll({ raw: true, include: [models.Group]})
          .then((data) => {
            this.data = data;
          })
      },
      // handleCommand(command, row) {
      //   switch(command) {
      //     case 'preview':
      //       this.handleRowClick(row)
      //       break;
      //     case 'edit':
      //       this.handleEdit(row)
      //       break;
      //     case 'delete':
      //       this.handleDelete(row)
      //       break;
      //   }
      // },
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
          this.loadUsers();
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
          } else {
            //
            return models.Realty.update(
              { deleted: true },
             { where: { seller_id: id } }
            ).then(() => {
              return models.Realty.findAll({ where: { deleted: false }})
            });
          }
        });
      },
      ...mapActions(['openModal'])
    },
    created() {
      this.loadUsers();
    }
  }
</script>

<style>
  .el-table, .el-row, .el-input, .el-button  {
    font-size: 14px;
  }
  .search {
    width: 400px;
  }
  .el-dropdown-link {
    color: #282F3B;
  }
  /* .el-row {
    width: 150px;
  } */
  h1 {
    font-weight: 600;
    font-size: 20px;
    color: #282F3B;
    /* width: 150px; */
  }
  .page-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px 40px 0px;
  }
  .page-header {
    /* width:400px; */
    display: flex;
    justify-content: flex-start;
    align-items: center
  }
  .checkbox {
    margin-right: 30px;
  }
  .el-button--primary {
    color: #fff;
    background-color: #6978B8;
    border-color:  #6978B8;
  }
  .el-button--primary:hover, .el-button--primary:focus {
    background-color: #495692;
    border-color:  #495692;
  }
  .el-button--danger {
    color: #fff;
    background-color: #D94640;
    border-color:  #D94640;
  }
  .el-button--danger:hover, .el-button--danger:focus {
    background-color: #C43733;
    border-color:  #C43733;
  }
  .headerButton {
    margin-left: 50px;
  }
</style>
