<template>
    <nav class="page-nav">
        <div class="header">
            <ui-avatar class="avatar" :size="48" src="/static/img/avatar.jpg"
                       @click="login"/>
            <div class="username" v-if="!user">游客</div>
            <div class="username" v-if="user" @click="loginout">{{ user.name }}</div>
        </div>
        <ui-divider />
        <ui-list>
            <ui-list-item title="全部" to="/">
                <ui-icon value="star" slot="left"/>
            </ui-list-item>
            <!--<ui-list-item title="全部" to="/">-->
                <!--<ui-icon value="tag" slot="left"/>-->
            <!--</ui-list-item>-->
            <!--<ui-list-item title="新建清单" @click="open">-->
                <!--<ui-icon value="add" slot="left"/>-->
            <!--</ui-list-item>-->
        </ui-list>
        <ui-list v-if="categories.length">
            <mu-sub-header>清单</mu-sub-header>
            <ui-list-item :title="category.name" :to="`/categories/${category.id}`"
                          v-for="category in categories" :key="category.id"></ui-list-item>
        </ui-list>
        <ui-list class="bottom-list">
            <ui-list-item title="帮助" to="/help">
                <ui-icon value="star" slot="left"/>
            </ui-list-item>
            <ui-list-item title="设置" to="/settings">
                <ui-icon value="star" slot="left"/>
            </ui-list-item>
        </ui-list>
        <ui-dialog :dialogClass="['list-dialog']" :open="dialog" title="新建清单" @close="close">
            <ui-text-field v-model="name" hintText="清单名称"/>
            <ui-flat-button slot="actions" @click="close" primary label="取消"/>
            <ui-flat-button slot="actions" primary @click="save" label="保存"/>
        </ui-dialog>
    </nav>
</template>

<script>
    import oss from '@/util/oss'

    export default {
        data() {
            return {
                user: null,
                categories: [],
                dialog: false,
                name: ''
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.user = this.$storage.get('user')
                this.categories = this.$storage.get('categories')
                if (!this.categories) {
                    this.categories = []
                }
            },
            login() {
                location.href = oss.getOauthUrl()
            },
            loginout() {
                // TODO 请求
                this.$storage.set('accessToken', null)
                this.$storage.set('user', null)
                this.user = null
                this.$router.push('/')
            },
            save() {
                this.dialog = false

                this.categories.push({
                    id: '' + new Date().getTime(),
                    name: this.name
                })
                this.$storage.set('categories', this.categories)
                this.name = ''
            },
            open () {
                this.dialog = true
            },
            close () {
                this.dialog = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        /*height: 100px;*/
        .avatar {
            display: block;
            margin: 32px auto 8px auto;
        }
        .username {
            margin-bottom: 32px;
            text-align: center;
        }
    }
    .page-nav {
        position: absolute;
        top: 0;
        width: 256px;
        bottom: 0;
        border-right: 1px solid #eee;
    }
    .bottom-list {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>
