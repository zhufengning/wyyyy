let baseUrl = "https://netease-cloud-music-api-nine-gray.vercel.app/"
export async function api_getLoginStatu(cookie) {
    await fetch(
        baseUrl + "login/refresh" + "?timestamp=" + new Date().getTime(),
        {
            headers: {
                "Accept": "*/*",
                "Accept-Language": "zh-CN",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "omit",
            method: "POST",
            body: "cookie='" + cookie + "'"
        }
    )
    return await fetch(
        baseUrl + "login/status?timestamp=" + new Date().getTime(),
        {
            headers: {
                "Accept": "*/*",
                "Accept-Language": "zh-CN",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "omit",
            method: "POST",
            body: "cookie='" + cookie + "'"
        }
    )
}
export async function api_login(user, pass) {
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
export async function api_getPlaylists(user, cookie) {
    let resp = await fetch(
        baseUrl + "user/playlist?timestamp=" + new Date().getTime(),
        {
            method: "POST",
            body: "uid=" + user + "&cookie='" + cookie + "'",
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
export async function api_getPlaylist(id, cookie) {
    let list = []
    let resp1 = await (await fetch(
        baseUrl + "playlist/detail?timestamp=" + new Date().getTime(),
        {
            method: "POST",
            body: "id=" + id + "&cookie='" + cookie + "'",
            headers: {
                "Accept": "*/*",
                "Accept-Language": "zh-CN",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "omit"
        })).json()
    let trackIds = resp1["playlist"]["trackIds"]
    let cnt = 0
    let div = 1000
    if (trackIds.length > 0) {
        while (trackIds.length - cnt > div) {
            let reqs = ""

            for (var i = cnt; i < cnt + div; ++i) {
                reqs = reqs + trackIds[i].id
                if (i < cnt + div - 1) {
                    reqs += ","
                }
            }
            cnt += div
            let resp2 = await (await fetch(
                baseUrl + "song/detail?timestamp=" + new Date().getTime(),
                {
                    method: "POST",
                    body: "ids=" + reqs + "&cookie='" + cookie + "'",
                    headers: {
                        "Accept": "*/*",
                        "Accept-Language": "zh-CN",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    credentials: "omit"
                })).json()
            for (var i = 0; i < resp2["songs"].length; ++i) {
                list.push({
                    name: resp2["songs"][i].name,
                    id: resp2["songs"][i].id
                })
            }
        }

        let reqs = ""
        for (var i = cnt; i < trackIds.length; ++i) {
            ++cnt
            reqs = reqs + trackIds[i].id
            if (i < trackIds.length - 1) {
                reqs += ","
            }
        }
        let resp2 = await (await fetch(
            baseUrl + "song/detail?timestamp=" + new Date().getTime(),
            {
                method: "POST",
                body: "ids=" + reqs + "&cookie='" + cookie + "'",
                headers: {
                    "Accept": "*/*",
                    "Accept-Language": "zh-CN",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                credentials: "omit"
            })).json()

        for (var i = 0; i < resp2["songs"].length; ++i) {
            list.push({
                name: resp2["songs"][i].name,
                id: resp2["songs"][i].id
            })
        }
    }
    return {
        list: list,
        name: resp1["playlist"]["name"],
        img: resp1["playlist"]["coverImgUrl"],
        updTime: new Date().toLocaleString()
    }
}