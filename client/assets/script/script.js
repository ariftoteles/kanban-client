const app = new Vue({
    el: '#app',
    data: {
        baseUrl: 'http://localhost:3000',
        page: 'register',
        account: '',
        user: {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        changePage (page){
            this.page = page
        },

        checkAuth(){
            if(localStorage.getItem('access_token')){
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
        }
    },

    created () {
        this.checkAuth()
    }
})