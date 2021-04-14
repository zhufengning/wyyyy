let baseUrl = "https://netease-cloud-music-api-nine-gray.vercel.app/"

async function api_getLoginStatu(cookie) {
    await fetch(
        baseUrl + "login/refresh?cookie="+encodeURIComponent(cookie),
        {
            headers: {
                "Accept": "*/*",
                "Accept-Language": "zh-CN",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "omit"
        }
    )
    return await fetch(
        baseUrl + "login/status?cookie="+encodeURIComponent(cookie),
        {
            headers: {
                "Accept": "*/*",
                "Accept-Language": "zh-CN",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "omit"
        }
    )
}

async function api_login(user, pass) {
    let resp = await fetch(
        baseUrl + "login/cellphone",
        {
            method: "POST",
            body: "phone=" + user + "&password=" + pass,
            headers: {
                "Accept": "*/*",
                "Accept-Language": "zh-CN",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "omit"
        }
    )
    return resp
}

// async function api_logout() {
//     let resp = await fetch(
//         baseUrl + "logout",
//         {
//             method: "GET",
//             headers: {
//                 "Accept": "*/*",
//                 "Accept-Language": "zh-CN",
//                 "Content-Type": "application/x-www-form-urlencoded"
//             },
//             credentials: "omit",
//             mode: 'cors'
//         }
//     )
//     return resp
// }