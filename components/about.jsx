import React from 'react';
import { Howl } from 'howler';
import US from 'Assets/us-no-floor.png';
import Fire from 'Assets/cut-out-fire.png';
import FireAudio from 'Assets/fire-audio.mp3';

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usStyle: {}
        };
    }

    componentDidMount() {
        setTimeout(() =>{
            const style =  {right: this.refs.fire.clientWidth - this.refs.us.clientWidth};
            this.setState({usStyle: style});
        }, 200);

        this.audio = new Howl({
            src: [FireAudio],
            autoplay: true,
            loop: true,
            volume: 0.3,
        });
        this.audio.play();
    }

    componentWillUnmount() {
        if (this.audio) {
            this.audio.stop();
        }
    }


    render() {
        return (
            <div className='about'>
                <img ref='fire' className='fire' src={Fire} alt='home-fire'/>
                <img ref='us' style={this.state.usStyle} className='us' src={US} alt='Me and my wife'/>
            </div>
        );
    }
}

export default About;