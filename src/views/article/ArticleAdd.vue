<template>
    <my-page title="添加便签" :page="page" backable>
        <ui-content-block>
            <div>
                <ui-text-field v-model="title" hintText="标题（可为空）"/>
            </div>
            <div>
                <ui-text-field v-model="content" hintText="内容" multiLine :rows="10" :rowsMax="6"/>
            </div>
        </ui-content-block>
    </my-page>
</template>

<script>
    import localActicle from '@/util/article'

    export default {
        data () {
            return {
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'check',
                            click: this.add
                        }
                    ]
                },
                title: '',
                content: ''
            }
        },
        mounted() {
            console.log(new Date().getTime())
        },
        methods: {
            add() {
                let user = this.$storage.get('user')
                if (!this.content) {
                    alert('请输入内容')
                }
                let title = this.title
                if (!title) {
                    title = this.content.substring(0, 10)
                }
                if (user) {
                    this.$http.post(`/articles`, {
                        title: title,
                        content: this.content,
                        user: {
                            id: user.id
                        }
                    })
                        .then(response => {
                            this.$router.go(-1)
                        },
                        response => {
                            console.log(response)
                        })
                } else {
                    localActicle.add({
                        title: title,
                        content: this.content,
                        createTime: new Date().getTime(),
                        updateTime: new Date().getTime()
                    })
                    this.$router.go(-1)
                }
            }
        }
    }
</script>

<style scoped>
</style>
