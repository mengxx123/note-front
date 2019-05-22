<template>
    <my-page name="todo" :page="page" title="便签" :containerPadding="layout === 'grid'">
        <div class="common-container container">
            <ui-list v-if="articles.length && layout === 'list'">
                <li v-for="article in articles"
                    :key="article.id">
                    <ui-list-item :title="article.title" :to="`/articles/${article.id}`">
                        <ui-icon slot="left" value="grade"/>
                        <span slot="describe" v-html="article.content"></span>
                        <!--<ui-icon-menu slot="right" icon="more_vert" tooltip="操作">-->
                        <!--<ui-menu-item title="回复" />-->
                        <!--<ui-menu-item title="标记" />-->
                        <!--<ui-menu-item title="删除" />-->
                        <!--</ui-icon-menu>-->
                    </ui-list-item>
                    <ui-divider inset/>
                </li>

            </ui-list>

            <div class="article-grid my-row" v-if="articles.length && layout === 'grid'" gutter>
                <div class="my-col" v-for="article in articles" :key="article.id">
                    <div class="my-col-content">
                        <ui-paper class="item" :title="article.title" :to="`/articles/${article.id}`">
                            <router-link class="link ui-match-parent" :to="`/articles/${article.id}`">
                                <h3 class="title">{{ article.title }}</h3>
                                <div class="content">{{ article.content }}</div>
                                <div class="time">{{ simpleTime(article.updateTime) }}</div>
                            </router-link>
                        </ui-paper>
                    </div>
                </div>
            </div>

            <!-- <a href="javascript:;" v-if="$store.state.user">{{ $store.state.user.name }}</a> -->
            <a href="javascript:;" v-if="!$store.state.user" @click="login">点击登陆</a>
            
            <div class="empty-box" v-if="!articles.length">
                <p>你还没有添加任何便签</p>
                <p>点击右下角的 + 添加快速添加便签</p>
            </div>

        </div>
        <ui-float-button class="ui-float-btn" icon="add" to="/articles/add"/>
        <div class="tip" v-if="tipVisible">{{ tip }}</div>
    </my-page>
</template>

<script>
    import localActicle from '@/util/article'
    import {format} from '@/util/time'
    import oss from '@/util/oss'

    export default {
        data () {
            return {
                articles: [],
                input: '',
                todos: [],
                showTip: false,
                layout: 'grid',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: this.layout === 'grid' ? 'list' : 'apps',
                            title: '切换布局',
                            click: this.changeLayout
                        }
                    ]
                },
                tip: '小提示：请不要清理浏览器缓存',
                tipVisible: true
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            // 初始化
            init() {
                // 提示
                this.tipVisible = this.$storage.get('tipVisible', true)
                let now = new Date()
                if (now.getHours() > 1 && now.getHours() < 6) {
                    this.tip = '成功的人，懂得珍惜时间，也懂得休息'
                }

                this.layout = this.$storage.get('layout', 'grid')
                console.log('this.$cookie.get(accessToken)', this.$cookie.get('accessToken'))
                if (this.$cookie.get('accessToken')) {
                    let user = this.$storage.get('user')
                    if (!user) {
                         this.$http.get(`/me`)
                            .then(response => {
                                console.log('个人信息', response.data)
                                 this.getArticles()
                            },
                            response => {
                                console.log(response)
                            })
                        // this.$storage.set('accessToken', null)
                        // this.$route.go(0)
                        return
                    }
                    this.getArticles()
                } else {
                    this.articles = localActicle.getAll()
                    this.articles = this.articles.sort((a, b) => {
                        return b.updateTime - a.updateTime
                    })
                }
            },
            getArticles() {
                let user = this.$store.state.user
                this.$http.get(`/users/${user.id}/articles`)
                    .then(response => {
                        this.articles = response.data
                    },
                    response => {
                        console.log(response)
                    })
            },
            changeLayout() {
                this.layout = this.layout === 'list' ? 'grid' : 'list'
            },
            add() {
                if (!this.input) {
                    // alert('请输入内容'); // TODO 输入框输入回车后也会执行到这里
                    return
                }
                this.dealInput()
            },
            doCheck(todo) {
                for (let i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].id === todo.id) {
                        this.todos[i].isDone = !this.todos[i].isDone
                        this.updateStorage()
                        break
                    }
                }
            },
            remove(todo) {
                for (var i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].id === todo.id) {
                        this.todos.splice(i, 1)
                        this.updateStorage()
                        return
                    }
                }
            },
            // 根据待办事项输入框的值添加待办事项
            dealInput() {
                if (this.input.length) {
                    this.todos.unshift({
                        id: this.getId(),
                        text: this.input,
                        isDone: false
                    })
                    this.updateStorage()
                    this.input = ''
                }
            },
            // 获取唯一ID
            getId() {
                return '' + new Date().getTime()
            },
            updateStorage() {
                this.$storage.set('todos', this.todos)
            },
            simpleTime(time) {
                let date = new Date(time)
                let now = new Date()
                if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() &&
                    date.getDate() === now.getDate()) {
                    return '今天 ' + format(date, 'hh:mm')
                } else if (date.getFullYear() === now.getFullYear()) {
                    return format(date, 'MM月dd日 hh:mm')
                } else {
                    return format(date, 'yyyy-MM-dd hh:mm')
                }
            },
            login() {
                location.href = oss.getOauthUrl()
            }
        },
        watch: {
            layout(value) {
                this.$storage.set('layout', value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";

    .empty-box {
        padding: 80px 0;
        text-align: center;
        color: #999;
    }
    .tip {
        position: absolute;
        bottom: 16px;
        left: 16px;
        color: #999;
    }
    .article-grid {
        /*padding: 8px 0 0 16px;*/
        .item {
            width: 100%;
            /*height: 200px;*/
            /*margin: 8px 16px 8px 0;*/
            /*float: left;*/
            &:hover {
                @include depth(2);
            }
        }
        .link {
            padding: 16px;
        }
        .title {
            color: #333;
            font-size: 18px;
        }
        .content {
            margin-bottom: 16px;
            color: #888;
            max-height: 42px;
            overflow: hidden;
        }
        .time {
            color: #888;
        }
    }
    .my-row {
        column-count: 3;
        column-gap: 0;
        counter-reset: item-counter;
        margin-left: -8px;
        margin-right: -8px;
        @include clearfix;
    }
    .my-col {
        break-inside: avoid;
        /*float: left;*/
        width: 100%;
        /*padding: 8px;*/
    }
    .my-col-content {
        break-inside: avoid;
        position: relative;
        padding: 8px;
    }
    @media all and (max-width: 800px) {
        .my-row {
            column-count: 2;
        }
    }
</style>
