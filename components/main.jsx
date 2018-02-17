import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Compass from './compass.jsx';
import Links from './links.jsx';
import About from './about.jsx';
import Footer from './footer.jsx';
import Resume from './resume.jsx';
import Topography from 'Assets/topography.png';
import September from 'Assets/september-calls.png';

// class Animation extends React.Component  {
//     constructor(props) {
//         super(props);
//     }

//     // firstChild(props)

//     componentWillAppear(cb){
//         console.log(this + 'Will appear');
//         cb();
//     }

//     componentDidAppear(){
//         console.log(this + 'Did appear');
//     }

//     componentWillEnter(cb){
//         console.log(this + 'Will enter');
//         cb();
//     }

//     componentDidEnter(){
//         console.log(this + 'Did enter');
//     }

//     componentWillLeave(cb){
//         console.log(this + 'Will leave');
//         cb();
//     }

//     componentDidLeave(){
//         console.log(this + 'Did leave');
//     }

//     render() {
//         return (<div>{...this.props.children}</div>);
//     }
// };

// const AnimatedWrapper = WrappedComponent => class AnimatedWrapper
//  extends Component {
//  constructor(props) {
//   super(props);
//   this.state = {
//    animate: new Animated.Value(0)
//   };
//  }
//  componentWillAppear(cb) {
//   Animated.spring(this.state.animate, { toValue: 1 }).start();
//   cb();
//  }
//  componentWillEnter(cb) {
//   setTimeout(
//    () => Animated.spring(this.state.animate, { toValue: 1 }).start(),
//    250
//   );
//   cb();
//  }
//  componentWillLeave(cb) {
//   Animated.spring(this.state.animate, { toValue: 0 }).start();
//   setTimeout(() => cb(), 175);
//  }
//  render() {
//   const style = {
//    opacity: Animated.template`${this.state.animate}`,
//    transform: Animated.template`
//     translate3d(0,${this.state.animate.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["12px", "0px"]
//    })},0)
//    `
//   };
//   return (
//    <Animated.div style={style} className="animated-page-wrapper">
//     <WrappedComponent {...this.props} />
//    </Animated.div>
//   );
//  }
// };

const firstChild = props => {
    const childArray = React.Children.toArray(props.children);
    return childArray[0] || null;
}

const DaRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} children={({ match }) => (
            <TransitionGroup component={firstChild}>
                {match && component}
            </TransitionGroup>
        )}/>
    );
};

const SocialMediaLinks = () => (
    <div className='social-media'>
        <a href='https://github.com/bowlwinkle'><i className="fa fa-github" aria-hidden="true"></i></a>
        <a href='https://www.linkedin.com/in/lucas-gansberg-99381b33/'><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
    </div>
);

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillAppear(cb) {
        console.log('Home will appear');
        cb();
    }

    render() {
        return (
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
    }
}

const Projects = () => (
    <div className='projects'>
    </div>
);

const CSSAnimation = props => (
    <CSSTransitionGroup transitionName={props.name}
                        transitionEnterTimeout={props.enterTimeout}
                        transitionLeaveTimeout={props.leaveTimeout}>
        {props.children}
    </CSSTransitionGroup>
);

const Main = props => {
    return (
        <Router>
            <div>
                <DaRoute exact path='/' component={<Home/>}/>
                <DaRoute path='/resume' component={<Resume/>}/>
                <DaRoute path='/projects' component={<Projects/>}/>
                <DaRoute path='/about' component={<About/>}/>
            </div>
        </Router>
    );
};

export default Main;