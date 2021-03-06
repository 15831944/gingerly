import socket from './ws-client';
import {ChatForm, ChatList, promptUsername} from "./dom";
import {UserStore} from './storage';


const FORM_SELECTOR='[data-chat="chat-form"]';
const INPUT_SELECTOR='[data-chat="message-input"]';
const LIST_SELECTOR='[data-chat="message-list"]';

//let username = '';
let userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if (!username) {
  username = promptUsername();
  userStore.set(username);
}


class ChatApp {
  constructor(){
    console.log('Hello ES6');
    this.chatForm  = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList  = new ChatList(LIST_SELECTOR, username);

    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(()=>{
      this.chatForm.init((text) =>{
        console.log('=====register openhandler init anonymos call ' + text);
        let message = new ChatMessage({ message: text });
        socket.sendMessage(message.serialize());
      });
      this.chatList.init();

      //let message = new ChatMessage({message:'wow', user: 'zw'});
      //socket.sendMessage(message.serialize());
    });
    socket.registerMessageHandler((data) =>{
      console.log('===register message handler received messsage:' +data.toString());
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
    })

  }
}
class ChatMessage{
  constructor({
    message: m,
    user: u= username,
    timestamp: t=(new Date()).getTime()
  }) {
    this.user = u;
    this.message = m;
    this.timestamp = t;
  }
  serialize(){
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

//new ChatApp();
export default ChatApp;
