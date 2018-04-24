<template>
  <div>
    <div class="page-header-container">
      <div class="page-header">
        <el-row>
          <el-col :span="12"><h1>Объекты недвижимости</h1></el-col>
        </el-row>
        <el-button type="primary" @click="openModal('test-modal-controller')">Добавить</el-button>
      </div>
    <el-input class="search"
      placeholder="Поиск"
      prefix-icon="el-icon-search"
      v-model="search">
    </el-input>
    </div>

    <el-table :data="data" style="width: 100%" :default-sort = "{prop: 'created_date', order: 'descending'}">
      <el-table-column prop="address" label="Адрес" sortable width="400"></el-table-column>

      <el-table-column label="Категория" width="150">
        <template slot-scope="scope">
          {{ scope.row['realty_category.name'] }}
        </template>
      </el-table-column>

      <el-table-column prop="status" label="Статус" width="170">
        <template slot-scope="scope">
          {{ realtyStatuses(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column prop="rooms" label="Комнат" width="130"></el-table-column>
      <el-table-column prop="price" label="Цена, руб." width="150"></el-table-column>
      <!-- <el-table-column prop="creator_id" label="Создал"> -->
        <!-- <template slot-scope="scope">
          {{ scope.row['user.fio'] }}
        </template>
      </el-table-column> -->
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
    <realty-manage-form @close="this.loadRealty"/>
  </div>
</template>

<script>
  import models from '../../db';
  import RealtyManageForm from './RealtyManageForm';
  import { realtyStatuses } from '../../utils/lists';
  import { createdDate } from '../../utils/utils';
  
  import { mapActions } from 'vuex';

  export default {
    name: 'Realty',
    components: {
      RealtyManageForm
    },
    data() {
      return {
        data: [],
        form: null,
        search: '',
        realtyCategories: {}
      }
    },
    watch: {
      search() {
          if (this.search && this.search.length > 0) {
              this.searchRealty()
          } else {
            this.loadRealty()
          }
          
      }
    },
    methods: {
      filterType(value, row) {
        return row.type == value;
      },
      searchRealty(){
        return models.Realty.findAll({ where: { address: { like: '%' + this.search + '%' }}, raw: true})
          .then((data) => {
            this.data = data;
        })
      },
      createdDate(date) {
        return createdDate(date);
      },
      // realtyTypes(value) {
      //   const realty = realtyTypes.find((type) => {
      //       return type.value === value
      //   });

      //   return realty && realty.label;
      // },
      realtyStatuses(value) {
        const realty = realtyStatuses.find((status) => {
            return status.value === value
        });

        return realty && realty.label;
      },
      loadRealty() {
        return models.Realty.findAll({ where: { deleted: false }, raw: true, include: [models.RealtyCategory, models.User]})
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
        this.$router.push({ path: `/realty/${row.id}` });
      },
      handleDelete({ id, address }) {
        this.$confirm(
          `Вы действительно хотите удалить объект с адресом "${address}"`,
          'Предупреждение',
          {
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            type: 'warning'
          }
        )
        .then(() => this.removeRealty(id))
        .then(() => {
          this.loadRealty();
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
        return models.Realty.update(
          { deleted: true },
          { where: { id } }
        ).then((response) => {
          if (!response[0]) {
            throw new Error('Запись не найдена');
          }
          return models.Realty.findAll({ where: { deleted: false }})
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
