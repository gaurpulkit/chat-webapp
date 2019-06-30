import React from 'react';

export class ChatBox extends React.Component{
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
        this.props.typing();
    }

    handleClick(event){
        event.preventDefault();
        this.props.handleClick(this.state.value);
        this.setState({
            value:""
        })
    }
    
    render(){
        return(
        <div>
          <form>
            <input id="send" value={this.state.value} onChange={this.handleChange} type="text" placeholder="type here..."/>
            <button onClick={this.handleClick}>Submit</button>
          </form>
        </div>
        )
    }
}