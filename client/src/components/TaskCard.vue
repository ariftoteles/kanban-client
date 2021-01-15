<template>
<div v-if="item.category == category" class="task rounded" >
  <div :id="item.id" class="bg-white shadow-sm rounded overflow-hidden mb-2 w-17">
    <div :class="checkColor">
      <div class="d-flex justify-content-start">
        <div class="bg-secondary" style="padding-left: .25rem;"></div>
        <div class="p-3 w-100">
          <p v-if="!isEdit" class="overflow-hidden fs-9">{{ item.title }}</p>
          <div v-if="isEdit">
            <form action="" @submit.prevent="handleEditTask">
              <textarea type="text" class="form-control mb-2 fs-9" v-model="item.title"></textarea>
              <div class="my-2">
                <button @click="item.category = category" type="submit" class="btn btn-success btn-sm">edit task</button>
                <button @click="isEdit = false" class="btn btn-secondary btn-sm">cancel</button>
              </div>
            </form>
          </div>
          <div class="d-flex justify-content-between ">
            <small class="fs-7">
              author :
              <span class="text-muted">{{ item.User.username }}</span>
            </small>
            <div class="d-flex justify-content-between text-muted">
              <svg class="icon-svg mx-2" type="button" @click="isPatch = !isPatch"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              <div v-if="isPatch" class="position-relative">
                <div class="position-absolute shadow-sm rounded bg-white"
                  style="left: 0rem; bottom: 0rem; font-size: .7rem;">
                  <a v-for="(cat, idx) in filterCategories" :key="idx"
                    class="dropdown-item" type="button" @click="handlePatch(cat)">{{ cat }}</a>
                </div>
              </div>
              <svg class="icon-svg mx-2" type="button" @click="isEdit = !isEdit"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <svg class="icon-svg mx-2" type="button" @click="deleteTask"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'TaskCard',
    props: ['item','categories','category','account'],
    data() {
      return {
        isEdit: false,
        isPatch: false
      }
    },
    methods: {
      deleteTask(){
        this.$emit('deleteTask', this.item.id)
      },
      handleEditTask(){
        let value = {
          id: this.item.id,
          title: this.item.title,
          category: this.item.category
        }
        this.$emit('handleEditTask', value)
        this.isEdit = false
      },
      handlePatch(cat){
        let value = {
          id: this.item.id,
          category: cat
        }
        this.$emit('handlePatch', value)
        this.isPatch = false
      }
    },

    computed: {
      checkColor(){
        if (this.item.User.username == this.account){
          return {'bg-active': true}
        }
      },
      filterCategories(){
        return this.categories.filter( cat => cat != this.category)
      }
    }
  }
</script>

<style scoped>
.bg-active {
  background-color: #fff8cd;
}
.icon-svg {
  width: 1rem; 
  height: 1rem;
}
.fs-7 {
  font-size: .75rem;
}
.fs-9 {
  font-size: .9rem;
}
.w-17 {
  width: 17rem;
}
.task:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
}
</style>