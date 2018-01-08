<template>
    <ui-page title="文章详情" :page="page" backable>
        <ui-content-block>
            <div v-if="article">
                <div>
                    <ui-text-field v-model="article.title" hintText="标题（可为空）"/>
                </div>
                <div>
                    <ui-text-field v-model="article.content" hintText="内容" multiLine :rows="10" :rowsMax="6"/>
                </div>
            </div>
        </ui-content-block>
        <ui-list v-if="false">
            <ui-sub-header>评论</ui-sub-header>
            <ui-list-item title="小明" v-for="comment in comments">
                <ui-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
                <span slot="describe" v-html="comment.content"></span>
                <div>{{ comment.updateTime }}</div>
                <ui-icon-menu slot="right" icon="more_vert" tooltip="操作">
                    <ui-menu-item title="回复" />
                    <ui-menu-item title="标记" />
                    <ui-menu-item title="删除" />
                </ui-icon-menu>
            </ui-list-item>
            <ui-divider inset/>
        </ui-list>
        <div v-if="false">
            <ui-text-field hintText="评论内容"/>
            <ui-raised-button label="评论" class="demo-raised-button" primary/>
        </div>
    </ui-page>
</template>

<script>
    import localActicle from '@/util/article'

    export default {
        data () {
            return {
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'delete',
                            click: this.remove
                        },
                        {
                            type: 'icon',
                            icon: 'check',
                            click: this.update
                        }
                    ]
                },
                article: null,
                comments: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let id = this.$route.params.id
                if (this.$storage.get('accessToken')) {
                    // 文章信息
                    this.$http.get(`/articles/${id}`)
                            .then(response => {
                                        this.article = response.data
                                    },
                                    response => {
                                        console.log(response)
                                    })
                } else {
                    this.article = localActicle.getById(id)
                }

                // 文章评论
                this.$http.get(`/articles/${id}/comments`)
                    .then(response => {
                          let data = response.data
                          console.log(data)
                          if (data.code === 0) {
                              this.comments = data.data
                          }
                      },
                      response => {
                          console.log(response)
                      })
            },
            update() {
                let user = this.$storage.get('user')
                if (!this.article.content) {
                    alert('请输入内容')
                }
                let title = this.article.title
                if (!title) {
                    title = this.content.substring(0, 10)
                }
                if (user) {
                    this.$http.put(`/articles/${this.article.id}`, {
                        title: title,
                        content: this.article.content
                    })
                        .then(response => {
                                this.$router.go(-1)
                            },
                            response => {
                                console.log(response)
                            })
                } else {
                    localActicle.update(this.article.id, {
                        title: title,
                        content: this.article.content
                    })
                    this.$router.go(-1)
                }
            },
            remove() {
                let id = this.$route.params.id
                if (this.$storage.get('accessToken')) {
                    this.$http.delete(`/articles/${id}`)
                            .then(
                                    response => {
                                        this.$router.go(-1)
                                    },
                                    response => {
                                        console.log(response)
                                    })
                } else {
                    this.article = localActicle.getById(id)
                }
            }
        }
    }
</script>

<style scoped>
</style>
