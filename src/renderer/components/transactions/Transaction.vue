<template>
  <div>
    <div class="page-header-container">
      <div class="page-header">
        <el-row>
          <el-col :span="12"><h1>Сделки</h1></el-col>
        </el-row>
      </div>
    <!-- <el-input class="search"
      placeholder="Поиск"
      prefix-icon="el-icon-search"
      v-model="search">
    </el-input> -->
    </div>
    <el-table :data="data" style="width: 100%" :default-sort = "{prop: 'created_date', order: 'descending'}">
      <el-table-column prop="realty_id" label="Адрес">
        <template slot-scope="scope">
          {{ scope.row['realty.address'] }}
        </template>
      </el-table-column>
      <el-table-column label="Этап" width="150">
        <template slot-scope="scope">
          {{ scope.row['stage.name'] }}
        </template>
      </el-table-column>
      <el-table-column prop="created_date" label="Создан">
        <template slot-scope="scope">
          {{ createdDate(scope.row.created_date) }}
        </template>
      </el-table-column>
      <el-table-column label="" width="102">
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
  </div>
</template>

<script>
  import models from '../../db';
  import { createdDate } from '../../utils/utils';
  
  import { mapActions } from 'vuex';

  export default {
    name: 'Transaction',
    data(){
      return {
        data: [],
        search: '',
      }
    },
    watch: {
        // search() {
        //     if (this.search && this.search.length > 0) {
        //         this.searchTransactions()
        //     } else {
        //       this.loadTransactions()
        //     }
            
        // }
    },
    methods: {
      createdDate(date) {
        return createdDate(date);
      },
      // searchTransactions(){
      //   return models.Transaction.findAll({ where: { 'realty.address': { like: '%' + this.search + '%' }}, raw: true, include: [models.Realty]})
      //     .then((data) => {
      //       this.data = data;
      //   })
      // },
      loadTransactions() {
        return models.Transaction.findAll({ where: { deleted: false }, raw: true, include: [models.User, models.Realty, models.Client, models.Stage ]})
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
        this.$router.push({ path: `/transactions/${row.id}` });
      },
      handleDelete(id) {
        this.$confirm(
          `Вы действительно хотите удалить сделку №"${id}"`,
          'Предупреждение',
          {
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            type: 'warning'
          }
        )
        .then(() => this.removeTransaction(id))
        .then(() => {
          this.loadTransactions();
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
      removeRealty(id) {
        return models.Transaction.update(
          { deleted: true },
          { where: { id } }
        ).then((response) => {
          if (!response[0]) {
            throw new Error('Запись не найдена');
          }
          return models.Transaction.findAll({ where: { deleted: false }})
        });
      }
    },
    created() {
      this.loadTransactions();
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
  h1 {
    font-weight: 600;
    font-size: 20px;
    color: #282F3B;
    width: 300px
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
</style>
