<template>
  <div class="mdui-appbar mdui-shadow-0">
    <div class="mdui-toolbar">
      <span class="mdui-typo-title">CloudMusic</span>
    </div>
    <div class="mdui-tab mdui-tab-centered" mdui-tab>
      <a href="#favLists" class="mdui-ripple" v-on:show.mdui.tab="doUpdatePLaylists"
        >歌单</a
      >
      <a href="#search" class="mdui-ripple">搜索</a>
      <a href="#me" class="mdui-ripple">我</a>
    </div>
  </div>
  <div id="favLists" class="mdui-p-a-2">
    <div id="loginMsg" v-if="!logined">你还没有登录或正在登录中</div>
    <div id="realLists" v-if="logined">
      <ul class="mdui-list">
        <li class="mdui-list-item mdui-ripple" v-for="item in playLists">
          <div class="mdui-list-item-avatar">
            <img v-bind:src="item['coverImgUrl'] + '?param=60y60'" />
          </div>
          <div class="mdui-list-item-content">
            <router-link v-bind:to="'/playlist/' + item['id']">{{
              item["name"]
            }}</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div id="search" class="mdui-p-a-2"></div>
  <div id="me" class="mdui-p-a-2">
    <div class="mdui-card">
      <!-- 卡片头部，包含头像、标题、副标题 -->
      <div class="mdui-card-header">
        <img class="mdui-card-header-avatar" v-bind:src="ava" />
        <div class="mdui-card-header-title">{{ userName }}</div>
      </div>

      <!-- 卡片的按钮 -->
      <div class="mdui-card-actions">
        <button
          v-if="!logined"
          class="mdui-btn mdui-ripple"
          mdui-dialog="{target:'#loginPage'}"
        >
          登录
        </button>
        <button v-if="logined" class="mdui-btn mdui-ripple" v-on:click="doLogOut">
          退出
        </button>
      </div>
    </div>
  </div>
  <div class="mdui-dialog" id="loginPage">
    <div class="mdui-dialog-content">
      <div class="mdui-dialog-title">登录</div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">手机号码</label>
        <input class="mdui-textfield-input" v-model="phone" />
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">密码</label>
        <input class="mdui-textfield-input" type="password" v-model="password" />
      </div>
    </div>
    <div class="mdui-dialog-actions">
      <button
        class="mdui-btn mdui-ripple"
        id="loginOk"
        v-on:click="doRealLogin"
        mdui-dialog-close
      >
        OK
      </button>
      <button class="mdui-btn mdui-ripple" id="loginCancel" mdui-dialog-close>
        取消
      </button>
    </div>
  </div>
</template>
<script>
import { api_getLoginStatu, api_getPlaylists, api_login } from "./api"
import mdui from "mdui"
const DEFUALT_AVA =
  "https://p2.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg?param=60y60"
let cookie = localStorage.cookie
export default {
  data() {
    return {
      logined: false,
      ava: DEFUALT_AVA,
      userName: "None",
      phone: "",
      password: "",
      account: "",
      playLists: [],
    }
  },
  created() {
    this.checkLogin()
  },
  mounted() {
    this.rebuildUI()
  },
  watch: {
    $route: "rebuildUI",
  },
  methods: {
    rebuildUI: function () {
      mdui.mutation()
    },
    doRealLogin: async function () {
      mdui.snackbar({
        message: "登录中",
      })
      let resp = await (await api_login(this.phone, this.password)).json()
      cookie = resp["cookie"]
      localStorage.cookie = cookie
      await this.checkLogin()
    },
    doLogOut: async function () {
      //await api_logout()
      localStorage.cookie = null
      cookie = ""
      await this.checkLogin()
    },
    doUpdatePLaylists: async function () {
      let resp = await (await api_getPlaylists(this.account, cookie)).json()
      this.playLists = resp["playlist"]
      localStorage.myLists = JSON.stringify(this.playLists)
    },
    checkLogin: async function () {
      if (localStorage.myLists != null) {
        try {
          this.logined = true
          this.playLists = JSON.parse(localStorage.myLists)
          this.account = localStorage.account
          return
        } catch (error) {
          console.log(error)
        }
      }
      if (cookie == null) {
        this.logined = false
        this.userName = ""
        this.ava = DEFUALT_AVA
        mdui.snackbar({
          message: "状态：未登录",
        })
        return
      }

      mdui.snackbar({
        message: "验证登录中",
      })
      let data = await (await api_getLoginStatu(cookie)).json()

      if (data["data"]["profile"] != null) {
        this.logined = true
        this.userName = data["data"]["profile"]["nickname"]
        this.ava = data["data"]["profile"]["avatarUrl"]
        this.account = data["data"]["account"]["id"]
        localStorage.account = this.account
        mdui.snackbar({
          message: "状态：已登录",
        })
        await this.doUpdatePLaylists()
      } else {
        this.logined = false
        this.userName = ""
        this.ava = DEFUALT_AVA
        mdui.snackbar({
          message: "状态：未登录",
        })
      }
    },
  },
}
</script>
