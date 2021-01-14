<template>
  <div>
    <div class="container-fluid d-flex justify-content-between w-75 mx-auto mt-5 h-35">
      <div class="w-100 p-3 text-center">
        <h3>Structured work with the kanban</h3>
        <p>Highly effective teams get work done with kanban</p>
        <img class="img" src="../assets/images/bg.svg" alt="">
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
            <button class="btn btn-success w-100">
              <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                Sign in with Google
              </g-signin-button>
            </button>
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
    data() {
      return {
        googleSignInParams: {
        client_id: '1085055301058-vunuuk5052jfr4e7tlkhjk5it7hctcgf.apps.googleusercontent.com'
      }
      }
    },
    methods: {
      handleRegister(){
        this.$emit('handleRegister', this.user)
      },

      onSignInSuccess (googleUser) {
        const id_token = googleUser.getAuthResponse().id_token
        this.$emit('googleLogin', id_token)
      },

      onSignInError (error) {
        console.log('OH NOES', error)
      }
    }
  }
</script>

<style>
.h-35 {
  height: 35rem;
}
.img {
  height: 20rem;
  width: 30rem;
}
</style>