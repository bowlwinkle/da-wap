import React from 'react';
import { connect } from 'react-redux';
import Compass from './compass.jsx';
import Links, {SocialMediaLinks} from './links.jsx';
import September from 'Assets/september-calls.png';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            compassBearing: undefined,
            linksCSS: ''
        };

        this.onLinkHover = this.onLinkHover.bind(this);
    }

    componentWillAppear(cb) {
        console.log('Home will appear');
        cb();
    }

    componentWillLeave(cb) {
        this.setState({linksCSS: 'links-leave'});
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
            <div className={`home ${(!this.props.loaded) ? 'animate' : 'static'}`}>
                <img className='september-calls' src={September} alt='september'/>
                <div className='bg-overlay'/>
                <div className='home-animations'>
                    <Compass bearing={this.state.compassBearing} animate={!this.props.loaded}/>
                    <Links className={this.state.linksCSS}
                           onLinkEnter={this.onLinkHover}
                           onLinkExit={this.onLinkHover}
                           fadeIn={!this.props.loaded}/>
                    <SocialMediaLinks fadeIn={!this.props.loaded}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loaded: state.loaded
    }
}

export default connect(mapStateToProps, null)(Home);