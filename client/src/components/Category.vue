<template>
  <div class="category pb-3 bg-light rounded shadow-sm overflow-hidden">
    <div class="p-3 px-3 d-flex justify-content-between bg-secondary shadow-sm">
        <span v-if="!isEdit" class="fs-6 fw-bold text-white">{{ category.name }}</span>
        <input v-if="isEdit" class="form-control form-costum" type="text" v-model="category.name">
        <div v-if="isEdit" class="">
          <button @click="handleEditCategory" type="submit" class="btn btn-success btn-sm">oke</button>
          <button @click="isEdit = false" class="btn btn-danger btn-sm">cancel</button>
        </div>
        <div>
          <svg @click="isActive = !isActive" class="mx-2 text-light" type="button" style="width:1.25rem;height:1.25rem;"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          <div v-if="isActive" class="position-relative">
            <div class="position-absolute shadow-sm rounded bg-white"
              style="left: -2rem; top: 0rem; font-size: .7rem;">
              <a class="dropdown-item rounded" type="button" @click.prevent="editCategory">Edit</a>
              <a class="dropdown-item rounded" type="button" @click.prevent="deleteCategory">Delete</a>
            </div>
          </div>
        </div>
    </div>
    <FormAdd 
      :category="category"
      @addTask="addTask">
    </FormAdd>
    <div class="fieldset">
      <fieldset :id="category.id" class="h-2 px-2 rounded">
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
        add: false,
        isActive: false,
        isEdit: false
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
      },
      deleteCategory(){
        this.$emit('deleteCategory', this.category.id)
        this.isActive = false
      },
      editCategory(){
        this.isEdit = true
        this.isActive = false
      },
      handleEditCategory(){
        let value = {
          id: this.category.id,
          name: this.category.name
        }
        this.$emit('handleEditCategory', value)
        this.isEdit = false
        this.isActive = false
      }
    }
  }
</script>

<style scoped>
.category {
  min-width: 18rem;
  max-height: 34rem;
  margin-left: 10px;
  overflow-x: auto;
}
.fieldset {
  width:100%;
  max-height: 22.9rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.h-2{
  min-height: 2rem;
}
.form-costum {
  max-width: 6rem;
  max-height: 2rem;
}
</style>