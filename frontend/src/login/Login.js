import React, { Component } from 'react';
import io from 'socket.io-client';
import FontAwesome from 'react-fontawesome';
import './Login.css';
import {API_URL} from '../config.js'
import { Link } from 'react-router-dom'


const socket = io(API_URL);
const provider = 'twitch';

class Login extends Component {

  state = {
    authenticated: false,
    user: {},
    token: '',
    channel: '',
    disabled: '',
    session: false
  }

  componentDidMount(){
    console.log("Component mounted..")
    // if(sessionStorage.sessionData){
    //   let userData = JSON.parse(sessionStorage.userData);
    //   console.log(userData)
    //   this.setState({
    //     user: userData,
    //     token: userData.token,
    //     authenticated: true
    //   })
    //   console.log(sessionStorage.userData.name)
    // } else {
      socket.on(provider, userData => {
        console.log("User data from Backend", userData);
        this.popup.close();
        this.setState({
          user: userData,
          token: userData.token,
          authenticated: true,
          session: true
        })
        window.sessionStorage.setItem("sessionData", true)
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
      });
    //}
  }

  checkPopup = () => {
    console.log("checkpopUP..")
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }


  openPopup = () => {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    console.log(provider, socket, `${API_URL}/${provider}?socketId=${socket.id}`)
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth = (e) => {
    if (!this.state.disabled) {
      e.preventDefault()
      this.popup = this.openPopup()
      console.log("checking popup..")  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  closeCard = () => {
    this.setState({user: {}, authenticated: false})
    sessionStorage.removeItem("sessionData");
    sessionStorage.removeItem("userData");
  }

  updateChannel = (e) => {
    console.log(e.target.value);
    this.setState({ channel: e.target.value });
  }

  render() {
    const { authenticated, disabled, user, channel } = this.state;
    return (
      <div className={'wrapper'}>
        {authenticated
          ? <div>
              <div className={'card'}>              
                <img src={user.photo} alt={user.name} />
                <FontAwesome
                  name={'times-circle'}
                  className={'close'}
                  onClick={this.closeCard}
                />
                <h4>{user.name}</h4>
              </div>
              <div>
                <h3>Please enter your favourite channel</h3>
                <input value={channel} onChange={(e) => this.updateChannel(e) }/> 
                <Link to={
                  {
                    pathname: '/stream',
                    state: {channel: channel}
                  }
                  }>
                  Submit
                </Link>
              </div>
            </div>
          : <div className={'button-wrapper fadein-fast'}>
              <button 
                onClick={this.startAuth} 
                className={`${provider} ${disabled} button`}
              >
                <FontAwesome
                  name={provider}
                />
              </button>
            </div>
        }
      </div>
    );
  }
}

export default Login;
