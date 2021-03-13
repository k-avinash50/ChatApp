import Vue from "vue";
import vuex from "vuex";
Vue.use(vuex);
const store = new vuex.Store({
  state() {
    return {
      title: "To Do List",
      name: "Avi",
      todos: [{ name: "OFFICE", image: "desktop", list: [], done: [] }],
      toList: "",
      icon: "desktop",
      index: 0
    };
  },
  mutations: {
    taskAdded(state, dict) {
      state.todos[dict.index].list.push(dict.value);
    },
    subTaskDelete(state, index) {
      state.todos[state.index].done.splice(index, 1);
    },
    taskNotDone(state, index) {
      state.todos[state.index].list.push(state.todos[state.index].done[index]);
      state.todos[state.index].done.splice(index, 1);
    },
    taskDone(state, index) {
      state.todos[state.index].done.push(state.todos[state.index].list[index]);
      state.todos[state.index].list.splice(index, 1);
    },
    taskDelete(state, index) {
      state.todos[state.index].list.splice(index, 1);
    },
    taskEdit(state, index) {
      state.todos[state.index].list.splice(index, 1);
    },
    addTask(state, data) {
      state.todos.push(data);
    },
    addApi(state, data) {
      console.log(data);
      state.todos = data;
    }
  },
  actions: {
    taskAdd(contex, payload) {
      contex.commit("addTask", payload);
    }
  },
  getters: {
    getList(state) {
      return state.todos;
    }
  }
});

export default store;
