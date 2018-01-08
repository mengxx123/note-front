<template>
    <ui-page name="todo" title="云设便签">
        <ui-list v-if="articles.length">
            <ui-list-item :title="article.title" :to="`/articles/${article.id}`" v-for="article in articles"
                          :key="article.id">
                <!--<ui-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>-->
                <span slot="describe" v-html="article.content"></span>
                <!--<ui-icon-menu slot="right" icon="more_vert" tooltip="操作">-->
                    <!--<ui-menu-item title="回复" />-->
                    <!--<ui-menu-item title="标记" />-->
                    <!--<ui-menu-item title="删除" />-->
                <!--</ui-icon-menu>-->
            </ui-list-item>
            <ui-divider inset/>
        </ui-list>
        <div class="empty-box" v-if="!articles.length">
            <p>你还没有添加任何便签</p>
            <p>点击右下角的 + 添加快速便签</p>
        </div>
        <ui-float-button class="ui-float-btn" icon="add" to="/articles/add"/>
        <div class="tip">小提示：请不要清理浏览器缓存</div>
    </ui-page>
</template>

<script>
    import localActicle from '@/util/article'

    export default {
        data () {
            return {
                articles: [],
                input: '',
                todos: [],
                showTip: false
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            // 初始化
            init() {
                if (this.$storage.get('accessToken')) {
                    let user = this.$storage.get('user')
                    this.$http.get(`/users/${user.id}/articles`)
                        .then(response => {
                            this.articles = response.data
                        },
                        response => {
                            console.log(response)
                        })
                } else {
                    this.articles = localActicle.getAll()
                }
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-float-btn {
        position: fixed;
        bottom: 16px;
        right: 16px;
    }
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
</style>
