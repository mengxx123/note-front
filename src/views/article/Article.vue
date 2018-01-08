<template>
    <div class="page page-home">
        <header class="page-header">
            <ui-appbar title="文章列表">
                <ui-icon-button icon="arrow_back_ios" slot="left" @click="$router.go(-1)" />
            </ui-appbar>
        </header>
        <main class="page-body">
            <ui-content-block>
                <p>云设工具致力于开发工具类 App，方便提高用户日常生活的效率。如果你有需求，我们也可以为你开发工具类 App！</p>
                <p>给我们发邮件：admin@yunser.com</p>

                <ui-list>
                    <ui-sub-header>评论</ui-sub-header>
                    <ui-list-item title="这个周末一起吃饭么?">
                        <ui-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
                        <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
      </span>
                        <ui-icon-menu slot="right" icon="more_vert" tooltip="操作">
                            <ui-menu-item title="回复" />
                            <ui-menu-item title="标记" />
                            <ui-menu-item title="删除" />
                        </ui-icon-menu>
                    </ui-list-item>
                    <ui-divider inset/>
                    <ui-list-item title="Alex Qin">
                        <ui-avatar src="/images/avatar2.jpg" slot="leftAvatar"/>
                        <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">看电影啊</span> <br/>
        我们去看电影，最近有部烂片上映，又有吐槽的了
      </span>
                        <ui-icon-menu slot="right" icon="more_vert" tooltip="操作">
                            <ui-menu-item title="回复" />
                            <ui-menu-item title="标记" />
                            <ui-menu-item title="删除" />
                        </ui-icon-menu>
                    </ui-list-item>
                    <ui-divider inset/>
                    <ui-list-item title="LOL">
                        <ui-avatar src="/images/avatar3.jpg" slot="leftAvatar"/>
                        <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">去打游戏啊</span><br/>
        周末一起 LOL
      </span>
                        <ui-icon-menu slot="right" icon="more_vert" tooltip="操作">
                            <ui-menu-item title="回复" />
                            <ui-menu-item title="标记" />
                            <ui-menu-item title="删除" />
                        </ui-icon-menu>
                    </ui-list-item>
                    <ui-divider inset/>
                    <ui-list-item title="Myron Liu">
                        <ui-avatar src="/images/uicon.jpg" slot="leftAvatar"/>
                        <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">哇去</span><br/> 实在编不下去，这就是个demo
      </span>
                        <ui-icon-menu slot="right" icon="more_vert" tooltip="操作">
                            <ui-menu-item title="回复" />
                            <ui-menu-item title="标记" />
                            <ui-menu-item title="删除" />
                        </ui-icon-menu>
                    </ui-list-item>
                </ui-list>
            </ui-content-block>
        </main>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                items: [{
                    name: '跑步',
                    startTime: 1510381344285,
                    endTime: 1510381944285
                }, {
                    name: '吃饭',
                    startTime: 1510381344285,
                    endTime: 1510381944285
                }, {
                    name: '吃饭',
                    startTime: 1510381344285,
                    endTime: 1510381944285
                }],
                bottomNav: 'recents'
            }
        },
        mounted() {
            console.log(new Date().getTime())
        },
        methods: {
            time(item) {
                let startTime = new Date(item.startTime)
                let endTime = new Date(item.endTime)
                let minute = (endTime.getTime() - startTime.getTime()) / 1000 / 60
                return minute
            },
            handleChange(val) {
                this.bottomNav = val
            }
        }
    }
</script>

<style scoped>
</style>
