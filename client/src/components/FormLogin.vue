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
          <div id="login" class="p-5">
            <div class="mb-3 text-center">
              <h4>Login</h4>
              <p>Dont have an account, please <a href="#" @click="changePage('register')">register first</a></p>
            </div>
            <form @submit.prevent="handleLogin" class="w-100 mb-3" id="form-login">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-model="user.email">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="user.password">
              </div>
              <button type="submit" class="btn btn-primary w-100" id="submit-login">Login</button>
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
    name: "FormLogin",
    props: ['changePage', 'user'],
    methods: {
      handleLogin(){
        this.$emit('handleLogin', this.user)
      }
    }
  }
</script>

<style>

</style>