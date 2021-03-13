<template>
  <div id="app">
    <img class="imgs w-100" src="./assets/E5PE1X.jpg" />
    <navbar></navbar>
    <div class="row">
      <div class="col-lg-2 col-md-4">
        <leftPannel />
        <add-tasks />
      </div>
      <div class="col-lg-10 col-md-5">
        <rightPannel />
        <chat />
      </div>
    </div>
  </div>
</template>

<script>
import leftPannel from "./components/leftPannel.vue";
import rightPannel from "./components/rightPannel.vue";
import navbar from "./components/navbar.vue";
import addTasks from "./components/addTasks.vue";
import chat from "./components/chat.vue";
export default {
  name: "App",
  components: {
    leftPannel,
    rightPannel,
    navbar,
    addTasks,
    chat
  }
};
</script>
<style scoped>
.app {
  position: relative;
}
.imgs {
  opacity: 0.8;
  z-index: -1;
  position: fixed;
  height: 630px;
}
</style>
