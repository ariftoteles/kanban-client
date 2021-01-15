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
      @addCategory="addCategory"
      @addTask="addTask"
      @deleteTask="deleteTask"
      @handleEditTask="handleEditTask"
      @handlePatch="handlePatch"
      @deleteCategory="deleteCategory"
      @handleEditCategory="handleEditCategory">
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
        // categories: ['Backlog', 'Todo', 'Doing', 'Done','Test'],
        categories: [],
        allTasks: [],
        user: {
          username: '',
          email: '',
          password: ''
        }
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
          this.getCategories()
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
          // console.log(err.response.data.message[0])
          this.$fire({
            title: "Something Error",
            text: err.response.data.message[0],
            type: "error",
            timer: 3000
          })
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
          this.$fire({
            title: "Something Error",
            text: err.response.data.message,
            type: "error",
            timer: 3000
          })
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
          this.$fire({
            title: "Something Error",
            text: err.response.data.message,
            type: "error",
            timer: 3000
          })
        })
      },

      handleLogout() {
        localStorage.clear()
        this.checkAuth()
      },

      getCategories(){
        axios({
          method: 'GET',
          url: `${this.baseUrl}/categories`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        }).then(res => {
          this.categories = res.data
        }).catch(err => {
          console.log(err);
        })
      },

      addCategory(value){
        console.log(value);
        axios({
          method: 'POST',
          url: `${this.baseUrl}/categories`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            name: value
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
          this.$fire({
            title: "Something Error",
            text: err.response.data.message,
            type: "error",
            timer: 3000
          })
        })
      },
      
      deleteCategory(id){
        this.$fire({
          title: "Are you sure?",
          type: "warning",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `OK`,
          cancelButtonText: `Cancel`, 
        }).then(result => {
          console.log(result);
          if (result.value) {
            this.handleDeleteCategory(id)
          } else (
            this.checkAuth()
          ) 
        });
      },

      handleEditCategory(value){
        console.log(value);
        axios({
          method: 'PATCH',
          url: `${this.baseUrl}/categories/${value.id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            name: value.name
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
          this.$fire({
            title: "Something Error",
            text: err.response.data.message,
            type: "error",
            timer: 3000
          })
          this.checkAuth()
        })
      },

      handleDeleteCategory(id){
        axios({
          method: 'DELETE',
          url: `${this.baseUrl}/categories/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
          this.$fire({
            title: "Something Error",
            text: err.response.data.message,
            type: "error",
            timer: 3000
          })
        })
      },

      addTask(value) {
        console.log(value);
        axios({
          method: 'POST',
          url: `${this.baseUrl}/kanban`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            title: value.title,
            categoryId: value.categoryId
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
          this.$fire({
            title: "Something Error",
            text: err.response.data.message,
            type: "error",
            timer: 3000
          })
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
        this.$fire({
          title: "Are you sure?",
          type: "warning",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `OK`,
          cancelButtonText: `Cancel`, 
        }).then(result => {
          console.log(result);
          if (result.value) {
            this.handleDelete(id)
          } else (
            this.checkAuth()
          ) 
        });
      },

      handleDelete(id){
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
          this.$fire({
            title: "Something Error",
            text: err.response.data.message,
            type: "error",
            timer: 3000
          })
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
            categoryId: value.categoryId
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
          this.$fire({
            title: "Something Error",
            text: err.response.data.message,
            type: "error",
            timer: 3000
          })
          this.checkAuth()
        })
      },

      handlePatch(value) {
        console.log(value);
        axios({
          method: 'PATCH',
          url: `${this.baseUrl}/kanban/${value.id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            categoryId: value.categoryId
          }
        }).then(res => {
          this.checkAuth()
        }).catch(err => {
          console.log(err);
          this.$fire({
            title: "Something Error",
            text: err.response.data.message,
            type: "error",
            timer: 3000
          })
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
            let categoryId = ui.item.parent().attr('id')
            let value = {id, categoryId}
            console.log(value);
            vm.handlePatch(value)
          }
        })
      })

      $('#search-task').on("keyup", function () {
        const value = $(this).val().toLowerCase();
        $(".task").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    }

  }
</script>

<style>
body {
    margin: 0;
    padding: 0;
}
</style>