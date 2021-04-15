cookie = localStorage.cookie
async function checkLogin() {
    let resp = await api_getLoginStatu(cookie)
    let data = await resp.json()
    console.log(data)
    if (data["data"]["profile"] != null) {
        myApp.logined = true
        myApp.userName = data["data"]["profile"]["nickname"]
        myApp.ava = data["data"]["profile"]["avatarUrl"]
        mdui.snackbar({
            message: "状态：已登录"
        })
    } else {
        myApp.logined = false
        myApp.userName = ""
        myApp.ava = "http://p2.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg?param=60y60"
        mdui.snackbar({
            message: "状态：未登录"
        })
    }
}

let wyyyy = {
    data() {
        return {
            logined: false,
            ava: "http://p2.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg?param=60y60",
            userName: "None",
            phone: "",
            password: ""
        }
    },
    methods: {
        doRealLogin: async function() {
            let resp = await(await api_login(this.phone, this.password)).json()
            cookie = resp["cookie"]
            localStorage.cookie = cookie
            await checkLogin()
        },
        doLogOut: async function() {
            //await api_logout()
            localStorage.cookie=null
            cookie=""
            await checkLogin()
        }
    }
}
myApp = Vue.createApp(wyyyy).mount("#app")

checkLogin()
