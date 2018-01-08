<template>
    <header class="page-header">
        <ui-appbar :title="title">
            <ui-icon-button icon="arrow_back_ios" slot="left" @click="$router.go(-1)" v-if="backable" />
            <ui-icon-button icon="menu" slot="left" v-if="!backable"/>
        </ui-appbar>
    </header>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>
