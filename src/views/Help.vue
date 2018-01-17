<template>
    <my-page title="帮助" padding backable>
        <ui-article class="article">
            <h1>帮助</h1>
            <h2>离线使用</h2>
            <p>这是一个款简洁的便签应用，无需登录也可使用。</p>
            <p>需要注意的是，在没有登陆的情况下，所有的数据都是存储在本地的。如果清理了浏览器缓存，会造成数据丢失的情况。</p>
            <p>由于浏览器的限制，储存的数据一般不超过 5M。</p>
            <h2>在线使用</h2>
            <p>在已经登陆云设的条件下，点击头像可以使用在线版。</p>
        </ui-article>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style scoped>
    .article {

    }
</style>
