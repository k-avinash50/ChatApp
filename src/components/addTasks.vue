<template>
  <div>
    <b-button class="btn btn-light addTask mt-3" @click="openTask">
      Add Task
      <font-awesome-icon class="font-icon" icon="plus" />
    </b-button>
    <div v-show="task" class="mono mt-1">
      <input
        v-model="addTask"
        type="text"
        class="col-12 mt-3 input"
        placeholder="Add Your Task"
      />
      <b-form-select
        class="mt-2 input"
        v-model="logo"
        name="logo"
        :options="options"
        label="Select Logo"
      >
      </b-form-select>
      <button class="btn btn-success mr-4 ml-1 mt-2" @click="submit">
        Submit Task
      </button>
      <button class="btn btn-danger mt-2" @click="closeTask">Close</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      addTask: "",
      logo: "",
      options: [
        { value: null, text: "Select Logo", disabled: true },
        { value: "book", text: "Book", disabled: false },
        { value: "calculator", text: "Calculator", disabled: false },
        { value: "desktop", text: "Desktop", disabled: false },
        { value: "gamepad", text: "Game", disabled: false },
        { value: "glass-cheers", text: "Party", disabled: false }
      ],
      task: false
    };
  },
  async created() {
    let data = await axios.get("http://localhost:2410/task");
    console.log(data);
    this.$store.commit("addApi", data.data);
  },
  methods: {
    async closeTask() {
      this.task = false;
    },
    openTask() {
      this.task = true;
    },
    async submit() {
      this.$store.dispatch("taskAdd", {
        name: this.addTask,
        image: this.logo,
        list: [],
        done: []
      });
      this.task = false;
      let data = await axios.post("http://localhost:2410/post", {
        name: this.addTask,
        image: this.logo,
        list: [],
        done: []
      });
      console.log(data);
    }
  }
};
</script>
<style scoped>
.addTask:hover {
  background: rgb(52, 168, 214);
}
.addTask {
  background: rgb(241, 121, 121);
  font-weight: bold;
  font-size: 20px;
  width: 215px;
  box-shadow: 2px 2px rgb(228, 226, 226);
}
.mono {
  background: rgb(153, 145, 145);
  font-weight: bold;
  font-size: 20px;
  width: 215px;
  border: 2px solid gray;
  border-radius: 6px;
  box-shadow: 2px 2px rgb(228, 226, 226);
}
.input {
  border-radius: 6px;
}
</style>
