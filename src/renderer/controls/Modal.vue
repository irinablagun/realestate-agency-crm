<template>
  <el-dialog
          :title="title"
          :visible="isVisible"
          :before-close="closeModal"
          :width="width">
      <slot></slot>
      <div slot="footer">
        <slot name="footer"></slot>
      </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Modal',
    props: ['name', 'title', 'width'],
    computed: {
      isVisible() {
        return this.$store.getters.modal && this.name === this.$store.getters.modal.name;
      }
    },
    methods: {
      closeModal() {
        this.$store.dispatch('closeModal');
      }
    }
  }
</script>
