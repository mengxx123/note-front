<template>
    <my-page title="关于" backable>
        <div class="about-box">
            <img class="logo" src="/static/img/logo.svg">
            <div class="version">便签 v1.0.1</div>
            <div class="copyright">© 2018 <a href="https://yunser.com">云设</a></div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .about-box {
        text-align: center;
    }
    .logo {
        display: block;
        width: 80px;
        margin: 80px auto 16px auto;
    }
    .version {
        color: #999;
        margin-bottom: 16px;
    }
    .copyright {
        text-align: center;
        a {
            color: inherit;
        }
    }
</style>
