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
        title: '',
        category: '',
        user: {
            username: '',
            email: '',
            password: ''
        },
        tasks: []
    },
    methods: {
        changePage (page){
            this.page = page
        },

        checkAuth(){
            if(localStorage.getItem('access_token')){
                this.getAllTask()
                this.changePage('main-page')
            } else {
                this.changePage('login')
            }
        },

        handleRegister(){
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

        handleLogin(){
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
                this.account = localStorage.getItem('username')
                this.checkAuth()
            }).catch(err => {
                console.log(err);
            })
        },

        handleLogout(){
            localStorage.clear()
            this.checkAuth()
        },

        getAllTask(){
            console.log('get all task');
            axios({
                method: 'GET',
                url: `${this.baseUrl}/kanban`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            }).then( res => {
                this.tasks = res.data
                console.log(this.tasks);
            }).catch( err => {
                console.log(err);
            })
        },

        addTask(){
            console.log(this.category);
            console.log(this.title);
            axios({
                method: 'POST',
                url: `${this.baseUrl}/kanban`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    title: this.title,
                    category: this.category
                }
            }).then(res => {
                console.log(res);
                this.addBacklog = false
                this.addTodo = false
                this.addDoing = false
                this.addDone = false
                this.title = ''
                this.checkAuth()
            }).catch(err => {
                console.log(err);
            })
        }
    },

    created () {
        this.checkAuth()
    },

    computed: {
        backlogFilter(){
            return this.tasks.filter( task => task.category === 'backlog')
        },

        todoFilter(){
            return this.tasks.filter( task => task.category === 'todo')
        },

        doingFilter(){
            return this.tasks.filter( task => task.category === 'doing')
        },

        doneFilter(){
            return this.tasks.filter( task => task.category === 'done')
        }
    }
})