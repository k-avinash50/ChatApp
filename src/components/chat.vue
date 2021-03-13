<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showEdition="true"
      :showDeletion="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="false"
      :messageStyling="messageStyling"
      @onType="handleOnType"
      @edit="editMessage"
    />
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      /* eslint-disable */
      text12: "",
      participants: [
        {
          id: "user1",
          name: "Avinash",
          imageUrl: "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4"
        },
      ], 
      titleImageUrl: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: [
      ],
      newMessagesCount: 0,
      isChatOpen: false, 
      showTypingIndicator: "",
      colors: {
        header: {
          bg: "#4e8cff",
          text: "#ffffff"
        },
        launcher: {
          bg: "#4e8cff"
        },
        messageList: {
          bg: "#ffffff"
        },
        sentMessage: {
          bg: "#4e8cff",
          text: "#ffffff"
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222"
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867"
        }
      },
      alwaysScrollToBottom: false,
      messageStyling: true,
      client: "",
      con: "",
      noDealear: false
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: "support", type: "text", data: { text } })
      }
    },
    dealerNotFound() {
      if (this.noDealear===false){   
        let messageReceived = { author: "user2", type: "text", data:  { text:"Dealer is not available" } }
        this.messageList.push(messageReceived)
        this.messageList.push({ author: "user2", type: "text", data:  { text:"Please share your Name, Contact Numer and Email. So that Dealar can contact you soon." } })
      }
    },
    async onMessageWasSent (message) {
      this.con.sendMessage(message.data.text)
      //setTimeout(() => this.delerNotFound(), 5000  );
      this.messageList = [ ...this.messageList, message ]
    },
    callOn(xyz){
        if (xyz.author!=="siddhartha") {
          console.log(xyz.state)
          let msgRecived = xyz.state.body
          let messageReceived = { author: "user1", type: "text", data:  { text:msgRecived } }
          this.messageList.push(messageReceived)
          this.noDealear =true
        }
        // if (xyz.author=="rohit"){
        //   setTimeout(() => this.dealerNotFound(), 10000  );
        // }
    },
    async openChat () {
      this.isChatOpen = true
      this.newMessagesCount = 0
      this.client = await Twilio.Conversations.Client.create("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzNlYzhlOWY3ODZlYjdkNDU1YmZiMzg5MmQ3MjgzMmUxLTE2MTU1NTU4OTYiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJzaWRkaGFydGhhIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTYjJiODM1YmUzYzI5NDdkNTlkZmU3NmRmYjkwZDIzYzcifX0sImlhdCI6MTYxNTU1NTg5NiwiZXhwIjoxNjE1NTU5NDk2LCJpc3MiOiJTSzNlYzhlOWY3ODZlYjdkNDU1YmZiMzg5MmQ3MjgzMmUxIiwic3ViIjoiQUMzNzVhY2Y1ZDY1M2MzZDliMzJhOGQwNjM5ZWNmNDY1ZiJ9.kNevX7t3WldMU1P5p04LJKNER3UwZNYhObpFjH57FHA");
      this.client.getSubscribedConversations()
      console.log(this.client.user.identity)
      this.con= await this.client.getConversationBySid("CH5eedab4573c9470fbf6f1d9c6f6ad611")
      // await this.con.add(this.client.user.identity)
      // await this.con.add("rohit")
      this.con.on("messageAdded",(xyz) => this.callOn(xyz))
    },
    async closeChat () {
      this.isChatOpen = false
      await this.con.leave()
      await this.client.shutdown()
      console.log(this.client)
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log("Emit typing event")
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  }
}
</script>