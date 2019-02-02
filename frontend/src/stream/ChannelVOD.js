import React, { Component } from 'react';
import FlexView from 'react-flexview';

class ChannelVOD extends Component {

    
    render() {
        const {recentStreams} = this.props;
        return(
            <FlexView className={'flex-view'} wrap>
                {recentStreams.map((stream, i) =>
                <section className={'card'} key={i}>
                    <a href={stream.url}>
                        <img src={stream.preview.medium} alt={stream.title} />
                    </a>
                    <h4>{stream.title}</h4>
                </section>
                )}
            </FlexView>
        );
    }
}

export default ChannelVOD;