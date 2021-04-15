cookie = localStorage.cookie
const DEFUALT_AVA = "https://p2.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg?param=60y60"
async function checkLogin() {
    if(cookie == null) {
        myApp.logined = false
        myApp.userName = ""
        myApp.ava = DEFUALT_AVA
        mdui.snackbar({
            message: "状态：未登录"
        })
        return
    }
    
    mdui.snackbar({
        message: "登录中"
    })
    let resp = await api_getLoginStatu(cookie)
    let data = await resp.json()
    if (data["data"]["profile"] != null) {
        myApp.logined = true
        myApp.userName = data["data"]["profile"]["nickname"]
        myApp.ava = data["data"]["profile"]["avatarUrl"]
        myApp.account = data["data"]["account"]["id"]
        mdui.snackbar({
            message: "状态：已登录"
        })
        myApp.doUpdatePLaylists()
    } else {
        myApp.logined = false
        myApp.userName = ""
        myApp.ava = DEFUALT_AVA
        mdui.snackbar({
            message: "状态：未登录"
        })
    }
}

let wyyyy = {
    data() {
        return {
            logined: false,
            ava: DEFUALT_AVA,
            userName: "None",
            phone: "",
            password: "",
            account: "",
            playLists: []
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
        },
        doUpdatePLaylists: async function() {
            let resp = await (await api_getPlaylists(this.account,cookie)).json()
            myApp.playLists = resp["playlist"]
        }
    }
}
myApp = Vue.createApp(wyyyy).mount("#app")

checkLogin()
