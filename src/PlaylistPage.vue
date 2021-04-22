<template>
  <div class="mdui-appbar">
    <div class="mdui-toolbar mdui-color-theme">
      <button class="mdui-btn mdui-btn-icon mdui-ripple" v-on:click="back">
        <i class="mdui-icon material-icons">arrow_back</i>
      </button>
      <span class="mdui-typo-title">歌单</span>
    </div>
  </div>
  <div class="mdui-card">
    <div class="mdui-card-header">
      <img class="mdui-card-header-avatar" v-bind:src="backimg" />
      <div class="mdui-card-header-title">{{ name }}</div>
      <div class="mdui-card-header-subtitle">{{ updTime.toLocaleString() }} 更新</div>
    </div>

    <div class="mdui-card-actions">
      <button class="mdui-btn mdui-ripple">播放</button>
      <button class="mdui-btn mdui-ripple" v-on:click="updateList">刷新</button>
    </div>
  </div>
  <ul class="mdui-list" v-for="item in list">
    <li class="mdui-list-item mdui-ripple">{{ item.name }}</li>
  </ul>
</template>

<script>
import { api_getPlaylist } from "./api.js"
import mdui from "mdui"
let cookie = localStorage.cookie
export default {
  data() {
    return {
      name: "",
      list: [],
      backimg: "",
      updTime: new Date(0),
    }
  },
  methods: {
    updateList: async function () {
      mdui.snackbar("更新中")
      let ret = await api_getPlaylist(this.$route.params.id, cookie)
      localStorage.setItem("list" + this.$route.params.id, JSON.stringify(ret))
      console.log(ret)
      this.list = ret.list
      this.name = ret.name
      this.backimg = ret.img
      this.updTime = ret.updTime
      mdui.snackbar("更新完成")
    },
    back: function () {
      this.$router.back()
    },
  },
  async created() {
    let inf = localStorage.getItem("list" + this.$route.params.id)
    if (inf != null) {
      inf = JSON.parse(inf)
      this.list = inf.list
      this.name = inf.name
      this.backimg = inf.img
      this.updTime = inf.updTime
    } else {
      mdui.snackbar("加载中")
      await this.updateList()
      mdui.snackbar(this.name + "加载完成")
    }
  },
}
</script>
