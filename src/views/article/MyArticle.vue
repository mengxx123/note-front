<template>
    <div class="page page-home">
        <header class="page-header">
            <ui-appbar title="我的文章">
                <ui-icon-button icon="arrow_back_ios" slot="left" @click="$router.go(-1)" />
            </ui-appbar>
        </header>
        <main class="page-body">
            <ui-list>
                <ui-list-item :title="article.title" :to="`/articles/${article.id}`" v-for="article in articles" :key="article.id">
                    <ui-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
                    <span slot="describe" v-html="article.content"></span>
                    <ui-icon-menu slot="right" icon="more_vert" tooltip="操作">
                        <ui-menu-item title="回复" />
                        <ui-menu-item title="标记" />
                        <ui-menu-item title="删除" />
                    </ui-icon-menu>
                </ui-list-item>
                <ui-divider inset/>
            </ui-list>
            <ui-content-block>


            </ui-content-block>
        </main>
        <ui-float-button class="ui-float-btn" icon="add" to="/articles/add"/>
    </div>
</template>

<script>
    import localActicle from '@/util/article'

    export default {
        data () {
            return {
                articles: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                if (this.$storage.get('accessToken')) {
                    let user = this.$storage.get('user')
                    this.$http.get(`/users/${user.id}/articles`)
                            .then(
                                    response => {
                                        this.articles = response.data
                                    },
                                    response => {
                                        console.log(response)
                                    })
                } else {

                }

                if (user) {

                }

            }
        }
    }
</script>

<style scoped>
</style>
