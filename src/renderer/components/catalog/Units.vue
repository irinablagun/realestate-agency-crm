<template>
  <div>
    <el-row>
      <el-col :span="12"><h1>Единицы измерения</h1></el-col>
    </el-row>
    
    <el-button size="mini" @click="openModal('test-modal-controller')">Add</el-button>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="name" label="Название"></el-table-column>
      <el-table-column prop="desc" label="Описание"></el-table-column>
      <el-table-column label="Операции" width="260">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            size="mini">
            Изменить
          </el-button>
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            type="danger"
            size="mini">
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <unit-manage-form @close="this.loadUnits"/>
  </div>
</template>

<script>
  import { UnitModel } from '../../db';
  import UnitManageForm from './UnitManageForm';
  
  import { mapActions } from 'vuex';

  export default {
    name: 'Units',
    components: {
      UnitManageForm
    },
    data() {
      return {
        data: [],
        form: null
      }
    },
    methods: {
      loadUnits() {
        return UnitModel.findAll({ where: { delete: false } })
        .then((data) => data.map((unit) => unit.dataValues))
        .then((data) => {
          this.data = data;
        })
      },
      handleDelete(index, { id, name }) {
        this.$confirm(
          `Вы действительно хотите удалить еденицу измерения "${name}"`,
          'Предупреждение',
          {
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            type: 'warning'
          }
        )
        .then(() => this.removeUnit(id))
        .then(() => {
          this.data.splice(index);
          this.$message({ type: 'success', message: 'Запись успешна удалена' });
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
      handleAdd() {
        return UnitModel.create({
          name: 'кг ' + Math.random(),
          desc: 'кг1'
        })
      },
      removeUnit(id) {
        return UnitModel.update(
          { delete: true },
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
      this.loadUnits();
    }
  }
</script>
