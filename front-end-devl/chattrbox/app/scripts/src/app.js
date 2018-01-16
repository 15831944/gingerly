import socket from './ws-client';
import {ChatForm, ChatList} from "./dom";

const FORM_SELECTOR='[data-chat="chat-form"]';
const INPUT_SELECTOR='[data-chat="message-input"]';
const LIST_SELECTOR='[data-chat="message-list"]';

class ChatApp {
  constructor(){
    console.log('Hello ES6');
    this.chatForm  = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList  = new ChatList(LIST_SELECTOR, 'snow');

    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(()=>{
      this.chatForm.init((text) =>{
        console.log('=====register openhandler init anonymos call ' + text);
        let message = new ChatMessage({ message: text });
        socket.sendMessage(message.serialize());
      })

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
    user: u='anonymous',
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
