import React, { Component } from 'react';
import axios from'axios';
import ChannelVOD from './ChannelVOD';

class Stream extends Component {
    state = {
        channel: 'monstercat',
        loading: true,
        recentStreams: []
    }
    componentDidMount(){
        let favChannel = this.state.channel;
        if (this.props.location.state !== undefined) {
            favChannel =  this.props.location.state.channel;
        }
        const script = document.createElement("script");
        script.src = 'https://embed.twitch.tv/embed/v1.js';
        script.async = true;
        script.addEventListener('load', () => {
            new window.Twitch.Embed(this.props.targetID, { ...this.props, ...this.state });
        });
        document.body.appendChild(script);
        
        axios.get('https://api.twitch.tv/helix/users',
                {
                    params: {login: favChannel},
                    headers: {'Client-ID': 'mgk2vzz8rmegam2b8dkesjdhje4fbo'}
                })
            .then( res => {
                console.log(res);
                const channelID = res.data.data[0].id;
                axios.get(`https://api.twitch.tv/kraken/channels/${channelID}/videos`,
                    {
                        //params: {'broadcast_type': 'archive'},
                        headers: {
                                'Accept': 'application/vnd.twitchtv.v5+json',
                                'Client-ID': 'mgk2vzz8rmegam2b8dkesjdhje4fbo'
                                }
                    })
                    .then( res => {
                        console.log(res);
                        //Get array of recent videos
                        this.setState({recentStreams:res.data.videos, loading:false});
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
                ? "Fetching data..."
                : <ChannelVOD recentStreams={recentStreams}/>
                }
            </div>
        )
    }
}

Stream.defaultProps = {
    targetID: 'twitch-embed',
    width: '100%',
    height: '480',
    layout: "video-with-chat",
    autoplay: true,
}

export default Stream;