<template>
  <div class="d-flex justify-content-between">
    <input 
      v-model="category" 
      class="form-control add-form" 
      placeholder="Add category . . .">
    <button type="submit" @click.prevent="addCategory" class="btn btn-success btn-sm mx-2">add category</button>
    <button @click="cancel" class="btn btn-secondary btn-sm">cancel</button>
  </div>
</template>

<script>
export default {
  name: 'FormAddCategory',
  props: ['add'],
  data() {
    return {
      category: ""
    }
  },
  methods: {
    addCategory(){
      this.$emit('addCategory', this.category)
      this.title = ""
    },
    cancel(){
      this.category = ""
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.add-form {
  width: 16rem;
  font-size: .9rem;
}
</style>