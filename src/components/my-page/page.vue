<template>
    <ui-page :title="title" :page="page" ref="page"
                :containerPadding="containerPadding"
                :containerMaxWidth="containerMaxWidth"
                :backable="backable">
        <div slot="drawer">
            <div class="header">
                <ui-avatar class="avatar" :size="48" src="/static/img/avatar.jpg"
                           @click="login"/>
                <div class="username" v-if="!user">游客</div>
                <div class="username" v-if="user" @click="loginout">{{ user.name }}</div>
            </div>
            <ui-divider />
            <ui-list @itemClick="toggle()">
                <ui-list-item title="全部" to="/">
                    <ui-icon value="description" slot="left"/>
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
            <ui-list class="ui-position-bottom">
                <ui-list-item title="设置" to="/settings">
                    <ui-icon value="settings" slot="left"/>
                </ui-list-item>
            </ui-list>
            <ui-dialog :dialogClass="['list-dialog']" :open="dialog" title="新建清单" @close="close">
                <ui-text-field v-model="categoryName" hintText="清单名称"/>
                <ui-flat-button slot="actions" @click="close" primary label="取消"/>
                <ui-flat-button slot="actions" primary @click="save" label="保存"/>
            </ui-dialog>
        </div>
        <slot></slot>
    </ui-page>

    <!--<div class="ui-page" :class="['page-' + name]">-->
        <!--<ui-nav></ui-nav>-->
        <!--<div class="page-content">-->
            <!--<header class="page-header">-->
                <!--<ui-appbar :title="title || page.title">-->
                    <!--<ui-icon-button icon="arrow_back_ios" slot="left" @click="$router.go(-1)" v-if="backable" />-->
                    <!--<ui-icon-button icon="menu" slot="left" v-if="!backable"/>-->
                    <!--<div v-for="item in page.menu" v-if="page.menu" slot="right">-->
                        <!--<ui-icon-button :icon="item.icon" @click.native="item.click"/>-->
                    <!--</div>-->
                <!--</ui-appbar>-->
            <!--</header>-->
            <!--<main class="page-body">-->
                <!--<slot name="header"></slot>-->
                <!--<div :class="{'page-container': padding, 'container-main': padding}">-->
                    <!--<slot></slot>-->
                <!--</div>-->
            <!--</main>-->
            <!--<ui-footer></ui-footer>-->
        <!--</div>-->
    <!--</div>-->
</template>

<script>
    import oss from '@/util/oss'

    export default {
        data() {
            return {
                // 侧栏
                user: null,
                categories: [],
                dialog: false,
                categoryName: ''
            }
        },
        props: {
            title: {
                type: String,
                default: '1'
            },
            name: {
                type: String,
                default: 'default'
            },
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            containerMaxWidth: {
                type: Number,
                default: 1000
            },
            containerPadding: {
                type: Boolean,
                default: true
            },
            padding: {
                type: Boolean,
                default: false
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            document.title = this.title || this.page.title
            this.init()
        },
        methods: {
            toggle() {
                this.$refs.page.hideDrawerIfMobile()
            },
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
                    name: this.categoryName
                })
                this.$storage.set('categories', this.categories)
                this.categoryName = ''
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
    .ui-page {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }
    .page-body {
        min-height: 500px;
    }
    .container-main {
        padding-top: 16px;
    }
    .page-content {
        position: absolute;
        top: 0;
        left: 256px;
        right: 0;
        bottom: 0;
    }
    .page-container {
        padding: 16px;
    }
    .admin-container {
        padding: 16px;
    }
    // 侧栏
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
</style>
