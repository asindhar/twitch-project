import React, { Component } from 'react';
import FlexView from 'react-flexview';
import './ChannelVOD.css';

class ChannelVOD extends Component {

    // Function to slice the title string upto 28 char
    shortString = (title) => {
        let sliced = title.slice(0,40);
        return(sliced+'...')
    }

    showPlayer = (e) => {
        e.preventDefault();
        alert("Hiii")
    }
    render() {
        const {recentStreams} = this.props;
        return(
            <div>
                <h2 style={{marginLeft: '10px'}}>Recent Videos:</h2>
                {recentStreams.length > 0
                ?<FlexView className={'flex-view'} wrap>
                {recentStreams.map((stream, i) =>
                    <section className={'card vod'} key={i}>
                        <a href={stream.url} onClick={(e) => this.showPlayer}>
                            <img className={'vod-img'} src={stream.preview.medium} alt={stream.title} />
                        </a>
                        <h4 style={{height: '80px'}}>{this.shortString(stream.title)}</h4>
                    </section>
                    )}
                    </FlexView>
                : <div className={'no-video'}>
                    This has channel has no videos.
                </div>
                //<section key={i}>
                //     <iframe
                //         title= {stream._id}
                //         src={`https://player.twitch.tv/?video=${stream._id}&autoplay=false`}
                //         height="320"
                //         width="280"
                //         frameborder="0"
                //         scrolling="no"
                //         allowfullscreen="true">
                //     </iframe>
                // </section>
                }
            </div>
        );
    }
}

export default ChannelVOD;