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
      <div class="options">
        <div class="checkboxes">
          <el-checkbox class="checkbox" v-model="completedSuccessfully" @change="loadTransactions">Показать завершённые успешно</el-checkbox>
          <el-checkbox class="checkbox" v-model="completed" @change="loadTransactions">Показать закрытые</el-checkbox>
        </div>

        <el-button :disabled="!(row && row.stage_id && row.stage_id !== 3 && row.stage_id !== 4)" type="success" icon="el-icon-check" @click="handleDelete(row)"></el-button>
      </div>
    </div>

    <el-table :data="data" highlight-current-row @row-click="handleRowSelect" @row-dblclick="handleRowClick" style="width: 100%" :default-sort = "{prop: 'created_date', order: 'descending'}">
      <el-table-column prop="realty_id" label="Адрес">
        <template slot-scope="scope">
          {{ scope.row['realty.address'] }}
        </template>
      </el-table-column>
      <el-table-column label="Этап" width="250">
        <template slot-scope="scope">
          {{ scope.row['stage.name'] }}
        </template>
      </el-table-column>
      <el-table-column prop="created_date" label="Создан">
        <template slot-scope="scope">
          {{ createdDate(scope.row.created_date) }}
        </template>
      </el-table-column>
    </el-table>
    <transaction-manage-form @close="this.loadTransactions"/>
  </div>
</template>

<script>
  import models from '../../db';
  import TransactionManageForm from './TransactionManageForm';
  import { createdDate } from '../../utils/utils';
  
  import { mapActions } from 'vuex';

  export default {
    name: 'Transaction',
    components: {
      TransactionManageForm
    },
    data(){
      return {
        data: [],
        search: '',
        row: null,
        completedSuccessfully: false,
        completed: false
      }
    },
    methods: {
      handleRowSelect(row) {
        this.row = row;
      },
      createdDate(date) {
        return createdDate(date);
      },
      loadTransactions() {
          return models.Transaction.findAll({ raw: true, include: [models.User, models.Realty, models.Client, models.Stage ]})
          .then((data) => {
            if (this.completedSuccessfully == true && this.completed == true) {
              this.data = data;
            } else {
              if (this.completedSuccessfully == true) {
                return this.data = data.filter((row) => row.stage_id !== 4);
              }

              if (this.completed == true) {
                return this.data = data.filter((row) => row.stage_id !== 3);
              }

              this.data = data.filter((row) => row.stage_id !== 4 && row.stage_id !== 3);
            }

          })
      },
      handleRowClick(row) {
        this.$router.push({ path: `/transactions/${row.id}` });
      },
      handleDelete(row) {
        this.$confirm(
          `Вы действительно хотите закрыть сделку №"${row.id}"`,
          'Предупреждение',
          {
            confirmButtonText: 'Закрыть',
            cancelButtonText: 'Отмена',
            type: 'warning'
          }
        )
        .then(() => this.removeTransaction(row))
        .then(() => {
          this.loadTransactions();
          this.$message({ type: 'success', message: 'Сделка успешно закрыта' });
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
      
      async removeTransaction(row) {
        return models.Transaction.update(
          { stage_id: 4 },
          { where: { id: row.id } }
        ).then((response) => {
          if (!response[0]) {
            throw new Error('Запись не найдена');
          } else {
              models.Realty.update(
                { status: 1 },
                { where: { id: row.realty_id } }
              );

              models.Client.update(
                { status: 1 },
                { where: { id: row.client_id } }
              );
          }
          this.loadTransactions();
        });
      },
      ...mapActions(['openModal'])
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
    margin-left: 0px;
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
  .checkboxes {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
