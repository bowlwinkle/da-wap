import React from 'react';
import { Howl } from 'howler';
import Links from './links.jsx';
import US from 'Assets/us-no-floor.png';
import Fire from 'Assets/cut-out-fire.png';
import FireAudio from 'Assets/fire-audio.mp3';

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            linksCSS: ''
        };
    }

    componentWillAppear(cb) {
        this.setState({linksCSS: 'links-enter'});
        cb();
    }

    componentWillLeave(cb) {
        this.setState({linksCSS: 'links-leave'});
        cb();
    }

    componentDidMount() {
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
                <Links className={this.state.linksCSS}/>
                <img ref='fire' className='fire' src={Fire} alt='home-fire'/>
                <img ref='us' className='us' src={US} alt='Me and my wife'/>
            </div>
        );
    }
}

export default About;