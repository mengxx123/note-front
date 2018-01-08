<template>
    <div class="ui-page" :class="['page-' + name]">
        <ui-nav></ui-nav>
        <div class="page-content">
            <header class="page-header">
                <ui-appbar :title="title || page.title">
                    <ui-icon-button icon="arrow_back_ios" slot="left" @click="$router.go(-1)" v-if="backable" />
                    <ui-icon-button icon="menu" slot="left" v-if="!backable"/>
                    <div v-for="item in page.menu" v-if="page.menu" slot="right">
                        <ui-icon-button :icon="item.icon" @click.native="item.click"/>
                    </div>
                </ui-appbar>
            </header>
            <main class="page-body">
                <slot name="header"></slot>
                <div :class="{'page-container': padding, 'container-main': padding}">
                    <slot></slot>
                </div>
            </main>
            <ui-footer></ui-footer>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            title: {
                type: String,
                default: ''
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
        },
        methods: {
            toggle(flag) {
                this.open = !this.open
                this.docked = !flag
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
</style>
