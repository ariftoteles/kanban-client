<template>
  <div>
    <div class="container-fluid d-flex justify-content-between w-75 mx-auto mt-5" style="height: 35rem;">
      <div class="w-100 p-3 text-center">
        <h3>Structured work with the kanban</h3>
        <p>Highly effective teams get work done with kanban</p>
        <img src="../assets/images/bg.svg" alt="" style="width: 30rem;height: 20rem;">
      </div>
      <div class="w-75">
        <div class="shadow rounded">
          <div id="register" class="p-5">
            <div class="mb-3 text-center">
              <h4>Register</h4>
              <p>Already have an account, please <a href="#" @click="changePage('login')">login</a></p>
            </div>
            <form class="w-100 mb-3" @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" v-model="user.username">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" v-model="user.email">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="user.password">
              </div>
              <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
            <div class="d-flex justify-content-start">
              <span class="mx-2 align-bottom">Login from Google: </span>
              <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FormRegister",
    props: ['changePage','user'],
    methods: {
      handleRegister(){
        this.$emit('handleRegister', this.user)
      }
    }
  }
</script>

<style>

</style>