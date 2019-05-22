<template>
    <div id="app" class="app">
        <router-view :key="$route.fullPath + $store.state.loginState"/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data: {},
        beforeMount() {
            this.init()
        },
        mounted() {
        },
        methods: {
            init() {
                this.login()
            },
            login() {
                this.$http.get('/me')
                    .then(response => {
                        let data = response.data
                        console.log(data)
                        this.$store.state.user = data
                    },
                    response => {
                        console.log(response)
                    })
            }
        }
    }
</script>
