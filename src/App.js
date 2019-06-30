import React from 'react';
import './App.css';
import $ from 'jquery';
import { ChatBox } from './components/ChatBox';
import  Header  from './components/Header';
import  Login  from './components/Login';
const io=require('socket.io-client')
const socket=io.connect('localhost:4368')


var timeOut;
function send(message){
  // console.log("sent message")
  socket.emit('message',message);
}

socket.on('chat', function(data){
  $('#recv').append($('<li>').text(data.message + "       --"+data.user));
})

socket.on('new',function(user){
  // console.log(user)
  // console.log($("#new").html())
  $('#new').html(user.name+" Connected!")
  // console.log($("#new").html())
  $('#new').show();
  setTimeout(() => {
  $('#new').hide();    
  }, 5000);
})

socket.on('gone',function(user){
  $('#gone').html(user.name+" Disconnected!")
  $('#gone').show();
  setTimeout(() => {
  $('#gone').hide();    
  }, 5000);
})

socket.on('typing',function(user){
  $('#typing').html(user.name+" is typing!")
  $('#typing').show();
  clearTimeout(timeOut);
  timeOut=setTimeout(() => {
  $('#typing').hide();    
  }, 1000);
})




class App extends React.Component {
  constructor (props){
    super(props);
    this.state={
      isLogin:true,
      userName:null
    }
    this.handleClick=this.handleClick.bind(this)
    this.handleLogin=this.handleLogin.bind(this)
  }
  handleClick(message){
    send(message)
  }
  handleTyping(){
    socket.emit('typing')
  }
  handleLogin(userName){
    var userData = {name:userName , userId:socket.id}
    socket.emit('setUser',userData);
    // console.log("setting username ",userData)
    this.setState({
      isLogin:false,
      userName:userName
    })
    $('#user').show();
    $('#new').hide();    
    $('#gone').hide();    
    $('#typing').hide();    
  }

  componentDidMount(){
  $('#new').hide();    
  $('#gone').hide();    
  $('#typing').hide();    
  $('#user').hide();    
  }
  render(){
    return (
      <div className="Chat App">
        <header className="App-header">
        
          {this.state.userName?<h6 id="user" style={{color:"white"}}>User: {this.state.userName}</h6>:<div></div>}
        <Header/> 
        {this.state.isLogin ?
          <React.Fragment>
            <div id="login">
              <Login handleLogin={this.handleLogin}/>
            </div>
          </React.Fragment>
            :
          <React.Fragment>
            <ul id="recv"></ul>
            <div>
              <h6 id="new" style={{color:"green",display:"none"}}>New user connected!</h6>
              <h6 id="gone" style={{color:"red",display:"none"}}>User Disconnected!</h6>
              <h6 id="typing" style={{color:"grey",display:"none"}}>User is typing!</h6>
            </div>
            <ChatBox typing={this.handleTyping} handleClick={this.handleClick}/>
          </React.Fragment>
          }
          </header>
      </div>
      
    );
  }
}

export default App;
