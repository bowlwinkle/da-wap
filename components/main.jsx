import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TransitionGroup from "react-transition-group/TransitionGroup";
import Compass from './compass.jsx';
import Links from './links.jsx';
import Footer from './footer.jsx';
import Resume from './resume.jsx';
import Topography from 'Assets/topography.png';
import HomeFire from 'Assets/home-fire.png';
import September from 'Assets/september-calls.png';

const DaRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            auth.loggedIn() ? (
                component
            ) : (
                <Redirect to={{
                    pathname: '/authenticate',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    );
};

const SocialMediaLinks = () => (
    <div className='social-media'>
        <a href='https://github.com/bowlwinkle'><i className="fa fa-github" aria-hidden="true"></i></a>
        <a href='https://www.linkedin.com/in/lucas-gansberg-99381b33/'><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
    </div>
);

const Home = () => (
    <div className='home'>
        <img className='september-calls' src={September} alt='september'/>
        <div className='bg-overlay'/>
        <div className='home-animations'>
            <Compass/>
            <Links/>
            <SocialMediaLinks/>
        </div>
    </div>
);

const Projects = () => (
    <div className='projects'>
    </div>
);

const About = () => (
    <div className='about'>
        <img className='home-fire' src={HomeFire} alt='home-fire'/>
    </div>
);



const Main = props => {
    return (
        <Router>
            <div>
                <Route exact path='/' component={Home}/>
                <Route path='/resume' component={Resume}/>
                <Route path='/projects' component={Resume}/>
                <Route path='/about' component={Resume}/>
            </div>
        </Router>
    );
};

export default Main;