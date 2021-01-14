<template>
  <div class="pb-3 bg-light rounded overflow-hidden" style="max-height: 34rem;overflow-x: hidden;">
    <div class="d-flex justify-content-between p-3 px-3 bg-secondary shadow-sm">
      <div class="d-flex justify-content-between">
        <span class="align-middle fs-6 fw-bold text-white">{{ category }}</span>
      </div>
    </div>
    <div style="width:100%;max-height: 22rem;overflow-x: hidden;overflow-y: auto;">
      <fieldset :id="category" class="mt-3 px-2 rounded" style="width: 18rem;">
        <!-- Card Task -->
        <TaskCard 
          v-for="item in allTasks"
          :key="item.id"
          :categories="categories"
          :category="category"
          :item=item
          @deleteTask="deleteTask"
          @handleEditTask="handleEditTask"
          @handlePatch="handlePatch">
        </TaskCard>
      </fieldset>
    </div>
    <!-- Form input -->
    <input v-if="!add" @click="add = !add" type="text" class="form-control mx-3 mt-3"
      style="width: 16rem;font-size: .9rem;" placeholder="Add task ...">
    <div v-if="add" class="mx-3 mt-3">
      <form action="" @submit.prevent="addTask">
        <textarea v-model="task.title" class="form-control" rows="2"
          style="width: 16rem;font-size: .9rem;"></textarea>
        <div class="my-2">
          <button @click="task.category = category" type="submit" class="btn btn-success btn-sm">add task</button>
          <button @click="add = false" class="btn btn-secondary btn-sm">cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import TaskCard from './TaskCard'

  export default {
    name: 'Category',
    components: {
      TaskCard
    },
    props: ['categories','category', 'allTasks', 'task'],
    data () {
      return {
        add: false
      }
    },
    methods: {
      addTask(){
        this.$emit('addTask', this.task)
        this.add = false
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

</style>