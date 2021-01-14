<template>
  <div>
    <Navbar 
      :page="page" 
      :changePage="changePage"
      :handleLogout="handleLogout"
      :account="account">
    </Navbar>
    <FormRegister 
      v-if="page == 'register'" 
      :changePage="changePage"
      :user="user"
      @handleRegister="handleRegister"
      @googleLogin="googleLogin">
    </FormRegister>
    <FormLogin 
      v-else-if="page == 'login'" 
      :changePage="changePage"
      :user="user"
      @handleLogin="handleLogin"
      @googleLogin="googleLogin">
    </FormLogin>
    <MainPage 
      v-else-if="page == 'main-page'"
      :account="account"
      :categories="categories"
      :allTasks="allTasks"
      @addTask="addTask"
      @deleteTask="deleteTask"
      @handleEditTask="handleEditTask"
      @handlePatch="handlePatch">
    </MainPage>
  </div>
</template>

<script>
  import axios from 'axios'
  import Navbar from './components/Navbar'
  import FormRegister from './components/FormRegister'
  import FormLogin from './components/FormLogin'
  import MainPage from './components/MainPage'
  export default {
    components: {
      Navbar,
      FormRegister,
      FormLogin,
      MainPage
    },
    data() {
      return {
        baseUrl: 'http://localhost:3000',
        page: 'register',
        account: '',
        categories: ['Backlog', 'Todo', 'Doing', 'Done'],
        allTasks: [],
        user: {}
      }
    },
    methods: {
      changePage(page) {
        this.page = page
      },

      checkAuth() {
        if (localStorage.getItem('access_token')) {
          if (localStorage.getItem('username')) {
            this.account = localStorage.getItem('username')
          }
          this.getAllTask()
          this.changePage('main-page')
        } else {
          this.changePage('login')
        }
      },

      handleRegister() {
        axios({
          method: 'POST',
          url: `${this.baseUrl}/register`,
          data: {
            username: this.user.username,
            email: this.user.email,
            password: this.user.password
          }
        }).then(res => {
          this.user = {}
          this.changePage('login')
        }).catch(err => {
          console.log(err);
        })
      },

      handleLogin() {
        axios({
          method: 'POST',
          url: `${this.baseUrl}/login`,
          data: {
            email: this.user.email,
            password: this.user.password
          }
        }).then(res => {
          this.user = {}
          localStorage.setItem('access_token', res.data.access_token)
          localStorage.setItem('username', res.data.username)
          this.checkAuth()
        }).catch(err => {
          console.log(err);
        })
      },

      googleLogin(token) {
        axios({
          method: 'POST',
          url: `${this.baseUrl}/google-login`,
          data: {
            id_token: token
          }
        }).then(res => {
          console.log(res);
          localStorage.setItem('access_token', res.data.access_token)
          localStorage.setItem('username', res.data.username)
          this.checkAuth()
        }).catch(err => {
          console.log(err);
        })
      },

      handleLogout() {
        localStorage.clear()
        this.checkAuth()
      },

      addTask(value) {
        axios({
          method: 'POST',
          url: `${this.baseUrl}/kanban`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            title: value.title,
            category: value.category
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
        })
      },

      getAllTask() {
        axios({
          method: 'GET',
          url: `${this.baseUrl}/kanban`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        }).then(res => {
          this.allTasks = res.data
        }).catch(err => {
          console.log(err);
        })
      },

      deleteTask(id) {
        console.log(id);
        axios({
          method: 'DELETE',
          url: `${this.baseUrl}/kanban/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
        })
      },

      handleEditTask(value) {
        let id = value.id
        axios({
          method: 'PUT',
          url: `${this.baseUrl}/kanban/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            title: value.title,
            category: value.category
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
          this.checkAuth()
        })
      },

      handlePatch(value) {
        axios({
          method: 'PATCH',
          url: `${this.baseUrl}/kanban/${value.id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            category: value.category
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
          this.checkAuth()
        })
      }

    },
    created() {
      console.log('created');
      this.checkAuth()
    },
    updated() {
      console.log('updated');
      let vm = this
      $('fieldset').each(function () {
        $(this).sortable({
          connectWith: 'fieldset',
          cursor: 'pointer',
          revert: true,
          remove: function (event, ui) {
            event.preventDefault()
            let id = ui.item.children().attr('id')
            let category = ui.item.parent().attr('id')
            let value = {id, category}
            vm.handlePatch(value)
          }
        })
      })
    }

  }
</script>

<style>
body {
    margin: 0;
    padding: 0;
}
</style>