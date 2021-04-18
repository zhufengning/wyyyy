<template>
  <div id="app">
    <router-view></router-view>
    <div class="mdui-container-fluid footer mdui-valign mdui-color-grey-100">
      <div class="mdui-card-header mdui-float-left">
        <img class="mdui-card-header-avatar" v-bind:src="songImg" />
        <div class="mdui-card-header-title">{{ hasSong ? songName : "None" }}</div>
        <div class="mdui-card-header-subtitle">{{ hasSong ? songAuther : "None" }}</div>
      </div>
      <button class="mdui-btn mdui-btn-icon mdui-float-right">
        <i class="mdui-icon material-icons">expand_more</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songId: "",
      hasSong: false,
      songName: "",
      songAuther: "",
      songImg:
        "https://p1.music.126.net/jWE3OEZUlwdz0ARvyQ9wWw==/109951165474121408.jpg?param=60y60",
    };
  },
};
</script>

<style>
.footer {
  position: fixed;
  left: 0px;
  bottom: 0px;
}
/* 
.shuzhi {
  position: relative;
  top: 25%;
  height: 100%;
} */
</style>
