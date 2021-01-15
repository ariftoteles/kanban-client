<template>
  <div>
     <div class="d-flex justify-content-between align-items-center p-3 px-5">
          <div class="mx-3 d-flex align-items-center">
            <div v-if="!add">
              <span class="align-middle fs-4">New Category</span>
              <span>
                <svg @click="add = true" class="mx-2 p-2 bg-light rounded-circle text-muted" style="width: 2.25rem; height: 2.25rem;"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  id="btn-add-todo" type="button">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
            </div>
            <!-- Add Category -->
            <FormAddCategory
              v-if="add"
              :add="add"
              @cancel="cancel"
              @addCategory="addCategory">
            </FormAddCategory>
          </div>
          <div class="mx-2">
            <input class="form-control" id="search-task" type="search" placeholder="Search Task">
          </div>
        </div>
      <div class="px-5 pb-3 mx-auto">
        <div class="d-flex justify-content-between align-items-start mx-auto" style="overflow-x: auto;">
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
            @handlePatch="handlePatch"
            @deleteCategory="deleteCategory"
            @handleEditCategory="handleEditCategory">
          </Category>
        </div>
      </div>
  </div>
</template>

<script>
import Category from './Category'
import FormAddCategory from './FormAddCategory'
export default {
  name: 'MainPage',
  components: {
    Category,
    FormAddCategory
  },
  data (){
    return {
      add: false
    }
  },
  props: ['categories','allTasks','account'],
  methods: {
    cancel(){
      this.add = false
    },
    addCategory(value){
      this.$emit('addCategory', value)
      this.add = false
    },
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
    },
    deleteCategory(id){
      this.$emit('deleteCategory', id)
    },
    handleEditCategory(value){
      this.$emit('handleEditCategory', value)
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
    border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgb(197, 186, 186);
}
</style>