/* global $ */
import React from 'react';
import './App.css';
import $ from 'jquery';
import { ChatBox } from './components/ChatBox';
import  Header  from './components/Header';
const io=require('socket.io-client')
const socket=io.connect('192.168.43.13:4368')
var timeOut;
function send(message){
  console.log("sent message")
  socket.emit('message',message);
}

socket.on('chat', function(msg){
  $('#recv').append($('<li>').text(msg));
})

socket.on('new',function(){
  $('#new').show();
  setTimeout(() => {
  $('#new').hide();    
  }, 5000);
})

socket.on('gone',function(){
  $('#gone').show();
  setTimeout(() => {
  $('#gone').hide();    
  }, 5000);
})

socket.on('typing',function(){
  $('#typing').show();
  clearTimeout(timeOut);
  timeOut=setTimeout(() => {
  $('#typing').hide();    
  }, 1000);
})


class App extends React.Component {
  constructor (props){
    super(props);
    this.handleClick=this.handleClick.bind(this)
  }
  handleClick(message){
    send(message)
  }
  handleTyping(){
    socket.emit('typing')
  }

  componentDidMount(){
  $('#new').hide();    
  $('#gone').hide();    
  $('#typing').hide();    
  }
  render(){
    return (
      <div className="Chat App">
        <header className="App-header">
        <Header/> 
          <ul id="recv"></ul>
          <div>
             <h6 id="new" style={{color:"green"}}>New user connected!</h6>
             <h6 id="gone" style={{color:"red"}}>User Disconnected!</h6>
             <h6 id="typing" style={{color:"grey"}}>User is typing!</h6>
          </div>
          <ChatBox typing={this.handleTyping} handleClick={this.handleClick}/>
        </header>
      </div>
    );
  }
}

export default App;
