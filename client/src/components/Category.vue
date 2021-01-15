<template>
  <div class="category pb-3 bg-light rounded shadow-sm overflow-hidden">
    <div class="p-3 px-3 bg-secondary shadow-sm">
        <span class=" fs-6 fw-bold text-white">{{ category }}</span>
    </div>
    <div class="fieldset">
      <fieldset :id="category" class="h-2 mt-3 px-2 rounded">
        <!-- Card Task -->
        <TaskCard 
          v-for="item in allTasks"
          :key="item.id"
          :account="account"
          :categories="categories"
          :category="category"
          :item="item"
          @deleteTask="deleteTask"
          @handleEditTask="handleEditTask"
          @handlePatch="handlePatch">
        </TaskCard>
      </fieldset>
    </div>
    <!-- Form Add -->
    <FormAdd 
      :category="category"
      @addTask="addTask">
    </FormAdd>
  </div>
</template>

<script>
  import TaskCard from './TaskCard'
  import FormAdd from './FormAdd'

  export default {
    name: 'Category',
    components: {
      TaskCard,
      FormAdd
    },
    props: ['categories','category', 'allTasks','account'],
    data () {
      return {
        add: false
      }
    },
    methods: {
      addTask(value){
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

<style scoped>
.category {
  max-height: 34rem;
  overflow-x: auto;
}
.fieldset {
  width:100%;
  max-height: 22rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.h-2{
  min-height: 2rem;
}
</style>