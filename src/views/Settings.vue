<template>
    <ui-page name="todo" title="设置">
        <!--<ui-list>-->
            <!--<ui-list-item disabled title="通知与信息设置" describeText="总是中断"/>-->
        <!--</ui-list>-->
        <!--<ui-divider />-->
        <!--<ui-list>-->
            <!--<ui-sub-header>声音开启设置</ui-sub-header>-->
            <!--<ui-list-item disableRipple @click="handleToggle('events')" title="事件和提醒">-->
                <!--<ui-switch v-model="events"  slot="right"/>-->
            <!--</ui-list-item>-->
            <!--<ui-list-item disableRipple @click="handleToggle('calls')" title="电话">-->
                <!--<ui-switch v-model="calls" slot="right"/>-->
            <!--</ui-list-item>-->
            <!--<ui-list-item disableRipple @click="handleToggle('messages')" title="信息">-->
                <!--<ui-switch v-model="messages" slot="right"/>-->
            <!--</ui-list-item>-->
        <!--</ui-list>-->
        <ui-list>
            <ui-sub-header>关于</ui-sub-header>
            <ui-list-item title="关于" to="/about">
                <ui-icon value="next" slot="right" />
            </ui-list-item>
        </ui-list>
    </ui-page>
</template>

<script>
    export default {
        data () {
            return {
                events: false,
                calls: false,
                messages: false,
                notifications: false,
                sounds: false,
                videoSounds: false
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {

            },
            handleToggle(key) {
                this[key] = !this[key]
            }
        }
    }
</script>

<style scoped>
</style>
