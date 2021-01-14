<template>
  <nav id="navbar" class="navbar navbar-light px-5 bg-light shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand home" href="#">
        <h4>Kanban App</h4>
      </a>
      <div>
        <span v-if="page == 'main-page'" v-text="account" class="mx-2" id="user-account"></span>
        <button v-if="page == 'login'" @click="changePage('register')" class="btn btn-outline-dark btn-register"
          id="">Register</button>
        <button v-if="page == 'register'" @click="changePage('login')" class="btn btn-outline-dark btn-login"
          id="">Login</button>
        <button v-if="page == 'main-page'" @click="handleLogout" class="btn btn-outline-dark btn-logout"
          id="">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Navbar",
    props: ['page', 'changePage','account','handleLogout'],
    methods: {

    }
  }
</script>

<style>

</style>