<template>
  <div class="row navbar">
    <div class="col-1">
      <img class="w-30 logo" src="../assets/1560.png" />
    </div>
    <div class="col-10 text-center title">{{ $store.state.title }}</div>
    <span class="my-name mr-2">{{ $store.state.name }}</span>
  </div>
</template>
<style scoped>
.navbar {
  background-image: linear-gradient(
    to right,
    rgb(238, 15, 15),
    rgb(143, 29, 8)
  );
}
.logo {
  height: 40px;
  cursor: pointer;
}
.logo:hover {
  color: aqua;
}
.title {
  font-weight: bolder;
  font-size: 6vmin;
  text-shadow: 4px 4px #535050;
  color: white;
}
.my-name {
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px #535050;
  font-size: 20px;
  height: 54px;
  width: 54px;
  border-radius: 50%;
  border: 2px solid rgb(194, 190, 190);
  background: rgb(109, 19, 19);
  padding: 9px;
}
</style>
