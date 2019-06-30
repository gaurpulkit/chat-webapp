import React from 'react';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    handleChange(e){
        this.setState({
            value:e.target.value
        })
    }

    handleClick(event){
        event.preventDefault();
        this.props.handleLogin(this.state.value);
        
    }
    
    render(){
        return(
        <div>
          <form>
              <div>
                  <h6>Username</h6>
              <input id="send" autofocus="autofocus" value={this.state.value} onChange={this.handleChange} type="text" placeholder="Enter username..."/>
              </div>
            <button onClick={this.handleClick}>Submit</button>
          </form>
        </div>
        )
    }
}