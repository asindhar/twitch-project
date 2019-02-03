import React, { Component } from 'react';
import io from 'socket.io-client';
import FontAwesome from 'react-fontawesome';
import './Login.css';
import {API_URL} from '../config.js'


const socket = io(API_URL);
const provider = 'twitch';

/*
This component authenticates twitch account through server via socket.
Then collect favourite channel through form
*/

class Login extends Component {

  state = {
    authenticated: false,
    user: {},
    token: '',
    channel: '',
    disabled: '',
  }

  componentDidMount(){
      //Socket connection 
      socket.on(provider, userData => {
        //console.log("User data from Backend", userData);
        this.popup.close();
        this.setState({
          user: userData,
          token: userData.token,
          authenticated: true,
        })
      });
  }

  //Method to disable login when popup is open
  //@memberof Login
  checkPopup = () => {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  //Open new window with default size
  //@memberof Login
  openPopup = () => {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  //Method to start authorization process
  //@memberof Login
  startAuth = (e) => {
    if (!this.state.disabled) {
      e.preventDefault()
      this.popup = this.openPopup()
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  //Logout user
  //@memberof Login
  closeCard = () => {
    this.setState({user: {}, authenticated: false})
  }

  //Update state of favourite channel
  updateChannel = (e) => {
    this.setState({ channel: e.target.value });
  }

  //Form handler
  //@memberof Login
  submitForm = (e) => {
    e.preventDefault();
    const state = {channel: this.state.channel}
    this.props.history.push('/stream', state);
  }
  render() {
    const { authenticated, disabled, user, channel } = this.state;
    return (
      <div className={'wrapper'}>
        <div className={'header'}>
            <h2>
              Stream Favourite Twitch Channel
            </h2>
        </div>
        {authenticated
          ? <div className={'container'}> 
              <div className={'card'}>              
                <img className={'profile-img'} src={user.photo} alt={user.name}/>
                <FontAwesome
                  name={'times-circle'}
                  className={'close'}
                  onClick={this.closeCard}
                />
                <h4>{user.name}</h4>
                <div className={'input-div'}>
                  <form onSubmit={this.submitForm} autoComplete='off'>
                    <label>Please enter your favourite channel</label>
                    <input required type='text' value={channel} onChange={(e) => this.updateChannel(e) }
                            placeholder='ex: monstercat'/>
                    <button className={'btn-submit'}>Submit</button>
                  </form>
                </div>
              </div>
            </div>
          : <div className={'button-wrapper fadein-fast login'}>
              <button 
                onClick={this.startAuth} 
                className={`${provider} ${disabled} button`}
              >
                <FontAwesome
                  name={provider}
                />
                <span className={'span-text'}>LOGIN</span>
              </button>
            </div>
        }
      </div>
    );
  }
}

export default Login;