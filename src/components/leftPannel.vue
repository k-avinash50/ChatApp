<template>
  <div class="row">
    <div
      class="col-12 todo"
      v-for="todo in taskList"
      :key="todo.name"
      @click="todoOpen(todo)"
    >
      <font-awesome-icon class="font-icon" :icon="todo.image" /> {{ todo.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "leftPannel",
  data() {
    return {
      list: ""
    };
  },
  computed: {
    taskList() {
      return this.$store.getters.getList;
    }
  },
  methods: {
    todoOpen(data) {
      this.$store.state.toList = data.name;
      this.$store.state.icon = data.image;
      let inde = this.$store.state.todos.findIndex(p => p.name === data.name);
      this.$store.state.index = inde;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo {
  border: 1px solid lightgray;
  cursor: pointer;
  padding-left: 23px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 800;
  text-shadow: 2px 2px #cac7c7;
  box-shadow: 2px 2px #e2e1e1;
  border-radius: 6px;
}
.todo:hover {
  background: rgb(52, 168, 214);
}
.font-icon {
  margin-right: 8px;
  color: rgb(175, 41, 7);
}
</style>
