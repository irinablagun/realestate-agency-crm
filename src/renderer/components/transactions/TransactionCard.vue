<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h1>Сделка №{{ data.id }}  >  {{ data.address }}</h1>
      </el-col>
    </el-row>
    <div class="moreinfo">
      <p>Создатель: {{ data }}</p>
      <p>Клиент: {{ data }}</p>
      <p>Объект недвижимости: {{ data.price }}</p>
    </div>
     <el-button type="primary" @click="addInvoice">Выставить счёт</el-button>
     <el-button type="primary" @click="completeTransaction">Завершить сделку</el-button>
  </div>
</template>

<script>
  import models from '../../db';

  export default {
    name: 'TransactionCard',
    data() {
      return {
        data: {}
      }
    },
    methods: {
      loadTransactions() {
        return models.Transaction.findById(this.$route.params.id, { raw: true, include: [models.Client] })
          .then((data) => {
            this.data = data;
          })
      },
      async addInvoice() {
        // await models.Transaction.create({ 
        //   stage_id: 1, 
        //   realty_id: this.$route.params.id, 
        //   client_id: form.client, 
        //   created_date: new Date(), 
        //   creator_id: this.$store.getters.user.id 
        // });

        await models.Transaction.update(
          { stage_id: 2 },
          { where: { id: this.$route.params.id } }
        );

        await models.Realty.update(
          { status: 3 },
          { where: { id: this.data.realty_id } }
        );

        await models.Client.update(
          { status: 4 },
          { where: { id: this.data.client_id } }
          // { where: { id: form.client } }
        );
      },
      async completeTransaction() {
        // await models.Transaction.create({ 
        //   stage_id: 1, 
        //   realty_id: this.$route.params.id, 
        //   client_id: form.client, 
        //   created_date: new Date(), 
        //   creator_id: this.$store.getters.user.id 
        // });

        await models.Transaction.update(
          { stage_id: 3 },
          { where: { id: this.$route.params.id } }
        );

        await models.Realty.update(
          { status: 4 },
          { where: { id: this.data.realty_id } }
        );

        await models.Client.update(
          { status: 2 },
          { where: { id: this.data.client_id } }
          // { where: { id: form.client } }
        );
      }
    },
    created() {
      this.loadTransactions();
    }
  }
</script>


<style>
  .moreinfo {
    margin: 40px 0px;
  }
  p {
    margin: 10px 0px;
  }
  h1 {
    font-weight: 600;
  }
</style>
