<template>
  <div>
      <div class="w-95 px-5 pt-5 pb-3 mx-auto">
        <div class="d-flex align-items-start justify-content-between mx-auto">
          <!-- List Category -->
          <Category v-for="item in categories" 
            :key="item.id"
            :account="account"
            :categories="categories"
            :category="item"
            :allTasks="allTasks"
            @addTask="addTask"
            @deleteTask="deleteTask"
            @handleEditTask="handleEditTask"
            @handlePatch="handlePatch">
          </Category>
        </div>
      </div>
  </div>
</template>

<script>
import Category from './Category'
export default {
  name: 'MainPage',
  components: {
    Category
  },
  props: ['categories','allTasks','account'],
  methods: {
    addTask(value) {
      this.$emit('addTask', value)
    },
    deleteTask(id){
      this.$emit('deleteTask', id)
    },
    handleEditTask(value){
      this.$emit('handleEditTask', value)
    },
    handlePatch(value){
      this.$emit('handlePatch', value)
    }
  }
}
</script>

<style>
.w-95 {
  width: 97%;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    opacity: 100;
}

::-webkit-scrollbar-thumb {
    background: rgb(243, 234, 234);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgb(197, 186, 186);
}
</style>