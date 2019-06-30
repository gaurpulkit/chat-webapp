/* global $ */
import React from 'react';
import './App.css';
import $ from 'jquery';
const io=require('socket.io-client')
const socket=io.connect('http://localhost:4368')

function handleClick(event){
  event.preventDefault();
  console.log("sent message")
  socket.emit('message',$("#send").val());
  $("#send").val('')
  
}

socket.on('message', function(msg){
  $('#recv').append($('<li>').text(msg));
})



function App() {
  return (
    <div className="Chat App">
      <header className="App-header">
        <ul id="recv">

        </ul>
        <div>
          <form>
            <input id="send" style={{margin:"20px"}} type="text" placeholder="type here..."/>
            <button onClick={handleClick}>Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
