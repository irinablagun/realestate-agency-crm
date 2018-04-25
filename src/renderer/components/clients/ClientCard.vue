<template>
  <div>
    <el-row>
      <el-col><h1>Клиенты > {{ data.fio }}</h1></el-col>
    </el-row>
    <br>
    <br>
    <br>
    <p>Комментарии</p>
    <br>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="Введите текст комментария"
      v-model="comment">
    </el-input>
    <el-button type="primary" @click="checkComment">Добавить комментарий</el-button>
    <br>
    <br>
    <br>
    <br>
    <div v-for="item in comments" :key="item.id" class="comment-box">
      <p class="comment-user">{{ item['user.fio'] }}</p>
      <p class="comment-date">{{ createdDateTime(item.created_date) }}</p>
      <div class="comment-text-box"><p class="comment-text">{{ item.text }}</p></div>
    </div>
  </div>
</template>

<script>
  import models from '../../db';
  import { createdDateTime } from '../../utils/utils';

  export default {
    name: 'ClientCard',
    data() {
      return {
        data: {},
        comment: '',
        comments: []
      }
    },
    computed: {
      reverse() {
          return this.comments.reverse();
      }
    },
    methods: {
      createdDateTime(date) {
        return createdDateTime(date);
      },
      loadClient() {
        return models.Client.findById(this.$route.params.id, { raw: true })
          .then((data) => {
            this.data = data;
            this.loadComments();
          })
      },
      loadComments() {
        return models.Comments.findAll({ where: { deleted: false, client_id: this.data.id }, raw: true, include: [models.User]})
          .then((data) => {
            this.comments = data;
            this.reverse()
          })
      },
      checkComment() {
        if(this.comment && this.comment != '') {
          this.createComment()
        }
      },
      createComment() {
        return models.Comments.create({ text: this.comment, created_date: new Date(), creator_id: this.$store.getters.user.id, client_id: this.data.id })
          .then(() => {
            this.comment = '';
            this.loadComments();
          });
      }
    },
    created() {
      this.loadClient();
    }
  }
</script>

<style>
  .comment-user, .comment-date {
    display: inline;
  }
  .comment-user {
    font-weight: 500;
    margin-right: 20px;
  }
  .comment-date {
    font-size: 12px;
    color: #6E6E6E;
  }
  .comment-text-box {
    margin-top: 10px;
    padding: 20px;
    background-color: #F7F7F7;
  }
  .comment-box {
    margin: 30px 0px;
  }
</style>
