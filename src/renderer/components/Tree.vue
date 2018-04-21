<template>
  <div>
    <el-tree
      :default-expanded-keys="selectedCategory"
      empty-text="Список категорий пуст"
      @current-change="handleClickNode"
      :props="{ label: 'name' }"
      :data="categories"
      node-key="id"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="rename(data)">
            Rename
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
    <form>
      <input v-model="categoryName" type="text">
      <button @click="add">Add</button>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Tree',
    data() {
      return {
        defaultExpandedKey: [7],
        categoryName: ''
      }
    },
    computed: {
      ...mapGetters(['categories']),
      selectedCategory() {
        return this.$store.getters.keySelectedCategory !== null
          ? [this.$store.getters.keySelectedCategory]
          : [];
      }
    },
    methods: {
      handleClickNode(node) {
        this.$store.dispatch('selectCategory', node);
        this.$store.dispatch('productsLoad', { categoryId: node.id });
      },
      add() {
        this.$store.dispatch('addCategory', { name: this.categoryName });
      },
      remove({ id }) {
        this.$store.dispatch('removeCategory', { id });
      },
      rename({ id, name }) {
        // call popup
        name += ' Rename';
        this.$store.dispatch('renameCategory', { id, name });
      }
    },
    created() {
      this.$store.dispatch('categoriesLoad');
    }
  }
</script>

<style lang="scss">
  .el-tree {
    background: transparent;
  }

  .el-tree-node:focus>.el-tree-node__content {
    background: red;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>


<!--<el-tree-->
<!--:default-expanded-keys="defaultExpandedKey"-->
<!--@current-change="handleClickNode"-->
<!--@node-drop="handleDragLeave"-->
<!---->
<!--:props="{ label: 'name' }"-->
<!--:highlight-current="true"-->
<!--:data="data"-->
<!--node-key="id"-->
<!--ref="tree"-->
<!--draggable-->
<!--/>-->

<!--handleDragLeave(draggingNode, dropNode, type) {-->
<!--console.log({-->
<!--node: draggingNode.data.id,-->
<!--parent: dropNode.data.id,-->
<!--type-->
<!--});-->
<!--},-->
<!--handleClickNode(node) {-->
<!--localStorage.setItem('categoriesSelectedNode', node.id);-->
<!--this.$store.dispatch('productsLoad', { categoryId: node.id });-->
<!--},-->
<!--setCurrentKey(key = localStorage.getItem('categoriesSelectedNode')) {-->
<!--if (key) {-->
<!--this.defaultExpandedKey.push(key);-->
<!--}-->
<!--}-->
