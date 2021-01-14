<template>
  <div class="mx-3 mt-3">
    <form action="" @submit.prevent="addTask">
      <textarea 
        v-model="title" @click="add = true" 
        class="form-control add-form"
        :rows="add ? 2 : 1"
        placeholder="Add task . . ."></textarea>
      <div v-if="add" class="my-2">
        <button type="submit" class="btn btn-success btn-sm">add task</button>
        <button @click="cancel" class="btn btn-secondary btn-sm">cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormAdd',
  props: ['category'],
  data() {
    return {
      title: "",
      add: false
    }
  },
  methods: {
    addTask(){
      let value = {
        title: this.title,
        category: this.category
      }
      this.$emit('addTask', value)
      this.add = false
      this.title = ""
    },
    cancel(){
      this.add = false
      this.title = ""
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