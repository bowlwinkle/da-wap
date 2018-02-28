import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Provider } from 'react-redux';

import Store from 'Redux/store';
import {loaded} from 'Redux/actions';
import Home from './home';
import Projects from './projects';
import Links, {SocialMediaLinks} from './links';
import About from './about';
import Footer from './footer';
import Resume from './resume';

import Map from './projects/SteepNDeep/map';
import KMLMap from './projects/SteepNDeep/kml-map';

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

const CSSAnimation = props => (
    <CSSTransitionGroup transitionName={props.name}
                        transitionEnterTimeout={props.enterTimeout}
                        transitionLeaveTimeout={props.leaveTimeout}>
        {props.children}
    </CSSTransitionGroup>
);

const ANIMATION_TIME = 5 * 1000;

const Main = props => {
    //Dispatch the app loaded action after animation is finished
    setTimeout(() => {
        Store.dispatch(loaded(true));
    }, ANIMATION_TIME);

    return (
        <Provider store={Store}>
            <Router>
                <div>
                    <DaRoute exact path='/' component={<Home/>}/>
                    <DaRoute path='/resume' component={<Resume/>}/>
                    <DaRoute path='/projects' component={<Projects/>}/>
                    <DaRoute path='/about' component={<About/>}/>
                    <DaRoute path='/idaho' component={<Map/>}/>
                    <DaRoute path='/idaho-kml' component={<KMLMap/>}/>
                </div>
            </Router>
        </Provider>
    );
};

export default Main;