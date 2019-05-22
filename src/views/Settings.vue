<template>
    <my-page name="todo" title="设置" backable :containerMaxWidth="480">
        <div class="common-container container">
            <ui-sub-header class="sub-header">界面</ui-sub-header>
            <ui-list class="list">
                <ui-list-item disableRipple @click="handleToggle()" title="显示小提示">
                    <ui-switch v-model="tipVisible" slot="right"/>
                </ui-list-item>
            </ui-list>

            <ui-sub-header class="sub-header">关于</ui-sub-header>
            <ui-list class="list">
                <ui-list-item title="关于" to="/about" />
                <ui-list-item title="开源" href="https://github.com/yunser/note-front" target="_blank" />
            </ui-list>

            <ui-sub-header class="sub-header">帮助与反馈</ui-sub-header>
            <ui-list class="list">
                <ui-list-item title="帮助" describeText="帮助与注意事项" to="/help" />
                <ui-list-item title="Bug 反馈" href="https://github.com/yunser/note-front/issues" target="_blank" />
            </ui-list>

            <ui-sub-header class="sub-header">应用推荐</ui-sub-header>
            <ui-list class="list">
                <ui-list-item title="云设工具" href="http://tool.yunser.com/" target="_blank" />
                <ui-list-item title="待办事项" href="http://todo.yunser.com/" target="_blank" />
            </ui-list>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                tipVisible: true
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.tipVisible = this.$storage.get('tipVisible', true)
            },
            handleToggle() {
                this.tipVisible = !this.tipVisible
                this.$storage.set('tipVisible', this.tipVisible)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";

    .sub-header {
        padding-left: 0;
    }
    .list {
        margin-bottom: 16px;
        background-color: #fff;
        @include depth()
    }
    @media all and (max-width: 800px) {
    }
</style>
