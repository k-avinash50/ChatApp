<template>
  <div v-show="$store.state.toList !== ''" class="row">
    <div class="col-12 list-title" v-show="$store.state.toList">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-8">
          <font-awesome-icon class="font-icon" :icon="$store.state.icon" />
          {{ $store.state.toList }}
        </div>
      </div>
    </div>
    <div
      class="col-2"
      v-if="$store.state.todos[$store.state.index].list.length > 0"
    ></div>
    <div
      class="col-6 mt-2 mb-1"
      v-if="$store.state.todos[$store.state.index].list.length > 0"
    >
      <div
        class="tast-list-form row"
        v-for="(task, index) in $store.state.todos[$store.state.index].list"
        :key="task"
      >
        <b-form-checkbox
          :value="index"
          unchecked-value="not-done"
          :checked="task"
          class="col-1 ml-1"
          @change="done(index)"
        />
        <div class="col-9 pl-0">
          {{ task }}
        </div>
        <div class="floating">
          <font-awesome-icon
            class="font-let"
            icon="edit"
            @click="edit(index)"
          />
          <font-awesome-icon
            class="font-lets"
            icon="times"
            @click="close(index)"
          />
        </div>
      </div>
    </div>
    <div
      class="col-3"
      v-if="$store.state.todos[$store.state.index].list.length > 0"
    ></div>
    <div class="col-2"></div>
    <div v-show="$store.state.toList" class="col-6 pt-5">
      <div class="row">
        <b-form-input
          v-model="toDoWork"
          name="toDoWork"
          type="text"
          class="col-12"
          placeholder="Enter Task To Do✍...🤔"
          @keydown="addTask"
        >
        </b-form-input>
        <div
          class="col-12 pl-0 pr-0"
          v-if="$store.state.todos[$store.state.index].done.length > 0"
        >
          <h3 class="mt-2">Task Done.........😊</h3>
          <div
            class="tast-list-form row"
            v-for="(task, index) in $store.state.todos[$store.state.index].done"
            :key="task"
          >
            <b-form-checkbox
              :value="task"
              unchecked-value="not-done"
              :checked="task"
              class="col-1 ml-1"
              @change="notdone(index)"
            />
            <div class="col-9">
              {{ task }}
            </div>
            <font-awesome-icon
              class="done-let col-1"
              icon="times"
              @click="close2(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      toDoWork: "",
      checkIt: ""
    };
  },
  methods: {
    addTask(event) {
      if (event.keyCode === 13) {
        this.$store.commit("taskAdded", {
          index: this.$store.state.index,
          value: event.target.value
        });
        this.toDoWork = "";
      }
    },
    async close(index) {
      this.$store.commit("taskDelete", index);
      await axios.post("http://localhost:2410/posts", this.$store.state.todos);
    },
    async close2(index) {
      this.$store.commit("subTaskDelete", index);
      await axios.post("http://localhost:2410/posts", this.$store.state.todos);
    },
    async edit(index) {
      let ind = this.$store.state.index;
      this.toDoWork = this.$store.state.todos[ind].list[index];
      this.$store.commit("taskEdit", index);
      await axios.post("http://localhost:2410/posts", this.$store.state.todos);
    },
    async notdone(index) {
      this.$store.commit("taskNotDone", index);
      await axios.post("http://localhost:2410/posts", this.$store.state.todos);
    },
    async done(index) {
      this.$store.commit("taskDone", index);
      await axios.post("http://localhost:2410/posts", this.$store.state.todos);
    },
    checkedValue(event) {
      console.log(event);
    }
  }
};
</script>
<style scoped>
.list-title {
  font-weight: bolder;
  font-size: 30px;
  text-shadow: 2px 2px #b9b2b2;
  background: rgb(245, 134, 7);
  padding: 4px;
  opacity: 0.9;
}
.textarea.form-control {
  height: auto;
  border: 4px solid rgb(196, 193, 193);
}
.font-icon {
  margin-right: 8px;
  color: rgb(175, 41, 7);
}
.tast-list-form {
  background: rgb(135, 211, 235);
  border: 2px solid gray;
  margin-top: 2px;
  padding: 4px;
  font-weight: bold;
  box-shadow: 2px 2px rgb(243, 241, 241);
}
.font-let {
  font-weight: bold;
  color: rgb(253, 253, 6);
  font-size: 25px;
  cursor: pointer;
  padding: 2px;
  margin-right: 10px;
}
.font-lets {
  font-weight: bold;
  color: red;
  font-size: 25px;
  cursor: pointer;
  padding: 2px;
}
.font-le {
  font-weight: bold;
  color: green;
  font-size: 25px;
  cursor: pointer;
  padding: 2px;
  margin-right: 10px;
}
.done-let {
  font-weight: bold;
  color: red;
  font-size: 25px;
  cursor: pointer;
  padding: 2px;
  float: right;
}
.floating {
  float: right;
}
</style>
