let socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting to ' + url);

}

function registerOpenHandler(handlerFunction){
  socket.onopen = () => {
    console.log('on open ');
    handlerFunction();
  }
}
function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    console.log('rester message handler wiht message ' + e.data);
    let data = JSON.parse(e.data);
    console.log('message after json parse ' + data);
    handlerFunction(data);
  }
}
function sendMessage(payload) {
  console.log('sock send payload message ' +JSON.stringify(payload) );
  socket.send(JSON.stringify(payload));
}


export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
