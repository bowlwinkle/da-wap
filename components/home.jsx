import React from 'react';
import Compass from './compass.jsx';
import Links, {SocialMediaLinks} from './links.jsx';
import September from 'Assets/september-calls.png';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            compassBearing: undefined
        };

        this.onLinkHover = this.onLinkHover.bind(this);
    }

    componentWillAppear(cb) {
        console.log('Home will appear');
        cb();
    }

    onLinkHover(name, value) {
        let bearing = undefined;
        if (value) { //True == hover
            switch(name.toLowerCase()) {
                case 'home':
                    bearing = Compass.Bearings.N;
                    break;
                case 'resume':
                    bearing = Compass.Bearings.W;
                    break;
                case 'projects':
                    bearing = Compass.Bearings.S;
                    break;
                case 'about':
                    bearing = Compass.Bearings.E;
                    break;
            }
        }

        this.setState({compassBearing: bearing});
    }

    render() {
        return (
            <div className='home'>
                <img className='september-calls' src={September} alt='september'/>
                <div className='bg-overlay'/>
                <div className='home-animations'>
                    <Compass bearing={this.state.compassBearing}/>
                    <Links onLinkEnter={this.onLinkHover} onLinkExit={this.onLinkHover}/>
                    <SocialMediaLinks/>
                </div>
            </div>
        );
    }
}

export default Home;