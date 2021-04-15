let baseUrl = "https://netease-cloud-music-api-nine-gray.vercel.app/"

async function api_getLoginStatu(cookie) {
    await fetch(
        baseUrl + "login/refresh"+"?timestamp=" + new Date().getTime(),
        {
            headers: {
                "Accept": "*/*",
                "Accept-Language": "zh-CN",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "omit",
            method: "POST",
            body: "cookie='"+cookie+"'"
        }
    )
    return await fetch(
        baseUrl + "login/status?timestamp="+new Date().getTime(),
        {
            headers: {
                "Accept": "*/*",
                "Accept-Language": "zh-CN",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "omit",
            method: "POST",
            body: "cookie='"+cookie+"'"
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

async function api_getPlaylists(user, cookie) {
    let resp = await fetch(
        baseUrl + "user/playlist?timestamp=" + new Date().getTime(),
        {
            method: "POST",
            body: "uid=" + user+"&cookie='"+cookie+"'"
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
