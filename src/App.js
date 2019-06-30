/* global $ */
import React from 'react';
import './App.css';
import $ from 'jquery';
import { ChatBox } from './components/ChatBox';
const io=require('socket.io-client')
const socket=io.connect('192.168.43.13:4368')

function send(message){
  console.log("sent message")
  socket.emit('message',message);
}

socket.on('chat', function(msg){
  $('#recv').append($('<li>').text(msg));
})



class App extends React.Component {
  constructor (props){
    super(props);
    this.handleClick=this.handleClick.bind(this)
  }
  handleClick(message){
    send(message)
  }
  render(){
    return (
      <div className="Chat App">
        <header className="App-header">
          <ul id="recv">

          </ul>
          <ChatBox handleClick={this.handleClick}/>
        </header>
      </div>
    );
  }
}

export default App;
