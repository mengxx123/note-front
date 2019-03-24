## 申请登录到站点

* https://account.yunser.com
* https://record.yunser.com
* https://note.yunser.com
* https://password.yunser.com
* https://health.yunser.com

## Vue 接入用户登录系统

```
```

引入 Cookie.js

```
index.html
<script src="https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js"></script>
```

引入 Vuex

```
cnpm install vuex --save




const OauthCallback = resolve => require(['@/views/oauth/Callback'], resolve)
{
      path: '/oauth/callback',
      component: OauthCallback
},





main.js
import cookie from '@/util/cookie'

Vue.prototype.$cookie = cookie


main.js
let accessToken = cookie.get('accessToken')
if (accessToken) {
    console.log('自动登录')
    http.get('https://nodeapi.yunser.com/login/access_token?access_token=' + accessToken).then(
        response => {
            let data = response.data
            storage.set('user', data.user)
            cookie.set('accessToken', data.accessToken)
            store.state.user = data.user
            store.state.loginState = '' + new Date().getTime()
            // this.redirect()
            // router.go(0)
        },
        response => {
            console.log(response)
        })
}


<a href="javascript:;" v-if="!$store.state.user" @click="login">点击登陆</a>

import oss from '@/util/oss'

login() {
    location.href = oss.getOauthUrl()
}


app.vue
<router-view :key="$route.fullPath + $store.state.loginState"/>
```
