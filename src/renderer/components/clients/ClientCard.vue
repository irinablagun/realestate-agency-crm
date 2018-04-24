<template>
  <div>
    <el-row>
      <el-col :span="12"><h1>Клиенты > {{ data.fio }}</h1></el-col>
      {{ data.id }}
    </el-row>
    <el-row>
    <el-col :span="12"><h1>Клиенты > {{ data.fio }}</h1></el-col>
      {{ data.id }}
    </el-row>
    <el-row>
    <el-col :span="12"><h1>Клиенты > {{ data.fio }}</h1></el-col>
      {{ data.id }}
    </el-row>

    
<!-- this.$message({ type: 'success', message: 'Запись успешна удалена' }); -->




  </div>
</template>

<script>
  import models from '../../db';

  export default {
    name: 'ClientCard',
    data() {
      return {
        data: {}
      }
    },
    methods: {
      loadClient() {
        return models.Client.findById(this.$route.params.id, { raw: true })
          .then((data) => {
            this.data = data;
          })
      }
    },
    created() {
      this.loadClient();
    }
  }
</script>
