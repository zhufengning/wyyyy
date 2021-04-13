let musicu = localStorage.getItem("musicu")
let userID = localStorage.getItem("user")
let wyyyy
if (musicu != null) {
    wyyyy = {
        data() {
            return {
                logined: true,
                ava: "http://p2.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg?param=60y60",
                userName: "None"
            }
        }
    }
}
else {
    wyyyy = {
        data() {
            return {
                logined: false,
                ava: "http://p2.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg?param=60y60",
                userName: "None"
            }
        }
    }

}
wyyyy.methods = {
    doLogin : function () {
        var loginPage = new mdui.Dialog("#loginPage")
        loginPage.open()
    }
}
myApp = Vue.createApp(wyyyy).mount("#app")