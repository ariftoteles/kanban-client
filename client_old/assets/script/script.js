const app = new Vue({
  el: '#app',
  data: {
    baseUrl: 'http://localhost:3000',
    page: 'register',
    account: '',
    addBacklog: false,
    addTodo: false,
    addDoing: false,
    addDone: false,
    edit: false,
    patch: false,
    idPatch: '',
    idTask: '',
    titleAdd: '',
    titleEdit: '',
    category: '',
    user: {
      username: '',
      email: '',
      password: ''
    },
    tasks: []
  },
  methods: {
    changePage(page) {
      this.page = page
    },

    checkAuth() {
      if (localStorage.getItem('access_token')) {
        if (localStorage.getItem('username')){
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
        console.log(res.data);
        this.user.username = ''
        this.user.email = ''
        this.user.password = ''
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
        console.log(res.data);
        this.user.email = ''
        this.user.password = ''
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

    getAllTask() {
      console.log('get all task');
      axios({
        method: 'GET',
        url: `${this.baseUrl}/kanban`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(res => {
        this.tasks = res.data
        console.log(this.tasks);
      }).catch(err => {
        console.log(err);
      })
    },

    addTask() {
      axios({
        method: 'POST',
        url: `${this.baseUrl}/kanban`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: this.titleAdd,
          category: this.category
        }
      }).then(res => {
        console.log(res);
        this.addBacklog = false
        this.addTodo = false
        this.addDoing = false
        this.addDone = false
        this.titleAdd = ''
        this.checkAuth()
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
        console.log(res);
        this.checkAuth()
      }).catch(err => {
        console.log(err);
      })
    },

    editTask(id) {
      axios({
        method: 'GET',
        url: `${this.baseUrl}/kanban/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(res => {
        this.idTask = id
        this.edit = true
        this.titleEdit = res.data.title
      }).catch(err => {
        console.log(err);
      })
    },

    handleEditTask(id) {
      axios({
        method: 'PUT',
        url: `${this.baseUrl}/kanban/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: this.titleEdit,
          category: this.category
        }
      }).then(res => {
        console.log(res.data);
        this.edit = false
        this.titleEdit = ''
        this.checkAuth()
      }).catch(err => {
        console.log(err);
      })
    },


    patchTask(id) {
      axios({
        method: 'GET',
        url: `${this.baseUrl}/kanban/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(res => {
        this.idPatch = id
        this.patch = !this.patch
      }).catch(err => {
        console.log(err);
      })
    },

    handlePatch(id, category){
      axios({
        method: 'PATCH',
        url: `${this.baseUrl}/kanban/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          category
        }
      }).then(res => {
        console.log(res.data);
        this.patch = false
        this.checkAuth()
      }).catch(err => {
        console.log(err);
        this.patch = false
        this.checkAuth()
      })
    }

  },

  beforeCreate(){
    console.log('before cr');
  },

  created() {
    console.log('created');
    this.checkAuth()
  },

  // still not work 
  mounted: function(){
    console.log('mounted');
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
          vm.handlePatch(id,category)
        }
      })
    })
  },

  computed: {

    backlogFilter() {
      return this.tasks.filter(task => task.category === 'backlog')
    },

    todoFilter() {
      return this.tasks.filter(task => task.category === 'todo')
    },

    doingFilter() {
      return this.tasks.filter(task => task.category === 'doing')
    },

    doneFilter() {
      return this.tasks.filter(task => task.category === 'done')
    }
  }
})

