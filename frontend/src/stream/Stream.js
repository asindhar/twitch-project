import React, { Component } from 'react';
import axios from'axios';
import ChannelVOD from './ChannelVOD';
import './Stream.css';

/*
This component get required channel data for video, chat, VOD
through api calls
*/
class Stream extends Component {
    state = {
        channel: 'monstercat', //default channel to play
        loading: true,
        recentStreams: []
    }
    componentDidMount(){
        let favChannel = this.state.channel;
        if (this.props.location.state !== undefined) {
            if(this.props.location.state.channel !== ''){
                favChannel =  this.props.location.state.channel;
            }
        }
        const script = document.createElement("script");
        //script for embedding twitch video player and chat
        script.src = 'https://embed.twitch.tv/embed/v1.js';
        script.async = true;

        //Get twitch id of input channel name
        //Rquired for api to get recent videos
        axios.get('https://api.twitch.tv/helix/users',
                {
                    params: {login: favChannel},
                    headers: {'Client-ID': 'mgk2vzz8rmegam2b8dkesjdhje4fbo'}
                })
            .then( res => {
                this.setState({channel: favChannel},
                    () => {
                        script.addEventListener('load', () => {
                            new window.Twitch.Embed(this.props.targetID, { ...this.props, ...this.state });
                            });
                        document.body.appendChild(script);
                    });
                const channelID = res.data.data[0].id;
                //Get recent videos of the channel with id from previous api call
                axios.get(`https://api.twitch.tv/kraken/channels/${channelID}/videos`,
                    {
                        //params: {'broadcast_type': 'archive'},
                        headers: {
                                'Accept': 'application/vnd.twitchtv.v5+json',
                                'Client-ID': 'mgk2vzz8rmegam2b8dkesjdhje4fbo'
                                }
                    })
                    .then( res => {
                        //Get array of recent videos from response
                        //Set state
                        //By default this api send 10 videos
                        this.setState({recentStreams:res.data.videos, loading:false, channel: favChannel})
                    })
                    .catch( err => {    
                        console.log(err);
                    });
            })
            .catch( err => {
                console.log(err);
            });
        

    }


    render(){
        const { targetID } = this.props;
        const { loading, recentStreams} = this.state;
        return(
            <div>
                <div id={targetID}></div>
                {loading
                ? <div className={'loader'}></div>
                : <ChannelVOD recentStreams={recentStreams}/>
                }
            </div>
        )
    }
}

// Default properties of stream
Stream.defaultProps = {
    targetID: 'twitch-embed',
    width: '100%',
    height: '480',
    layout: "video-with-chat",
    autoplay: true,
}

export default Stream;