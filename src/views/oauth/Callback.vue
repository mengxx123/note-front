<template>
    <div class="page-about">
        <ui-header></ui-header>
        <main class="page-body">
            <div class="container">
                <div>登陆回调</div>
            </div>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                version: ''
            }
        },
        mounted() {
//            let code = this.$route.query.code
//            let state = this.$route.query.state
            let accessToken = this.$route.query.accessToken
            this.$storage.set('accessToken', accessToken)

            this.$http.get('/login/access_token?access_token=' + accessToken).then(
                response => {
                    let data = response.data
                    this.$storage.set('user', data.user)
                    this.$storage.set('accessToken', data.accessToken)
                    this.redirect()
                },
                response => {
                    console.log(response)
                })
        },
        methods: {
            redirect() {
                let redirectUri = this.$route.query.redirect_uri
                location.href = redirectUri
            }
        }
    }
</script>

<style scoped>
</style>
