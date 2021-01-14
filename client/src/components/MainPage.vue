<template>
  <div>
      <div class="w-95 px-5 pt-5 pb-3 mx-auto">
        <div class="d-flex align-items-start justify-content-between mx-auto">
          <!-- List Category -->
          <Category v-for="item in categories" 
            :key="item.id"
            :categories="categories"
            :category="item"
            :allTasks="allTasks"
            :task="task"
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
  props: ['categories','allTasks', 'task'],
  methods: {
    addTask() {
      this.$emit('addTask', this.task)
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
  width: 95%;
}
</style>