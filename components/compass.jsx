import React, {Component} from 'react';
import PropTypes from 'prop-types';

const CompassMenu = (props) => {
    let iconStyle = {};

    return (
        <g className={'compassMenu ' + ((props.menuActive) ? 'active' : '')}>
            <circle className='add' cx={props.x}
                cy={props.y} r={props.nodeRadius * 0.4}/>
            <circle className='remove' cx={props.x}
                cy={props.y} r={props.nodeRadius * 0.4}/>
            <circle className='config' cx={props.x}
                cy={props.y} r={props.nodeRadius * 0.4}/>
            <text className='addIcon' x={props.x} y={props.y} style={iconStyle}>
                &#xf067;
            </text>
            <text className='removeIcon' x={props.x} y={props.y} style={iconStyle}>
                &#xf014;
            </text>
            <text className='configIcon' x={props.x} y={props.y} style={iconStyle}>
                &#xf013;
            </text>
        </g>
    );
};

class Compass extends Component{
    static Bearings = {
        N: 'N',
        S: 'S',
        W: 'W',
        E: 'E'
    };

    constructor(props) {
        super(props);

        this.needleSpinDelay = 3800; //Align with css animations
        this.defaultNeedleRotation = 1113;

        this.state = {
            compass: null,
            bearing: 0,
            needleCSS: ''
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({compass: (<circle id='compass' cx='150px' cy='150px' r='105px'/>)})
        }, 100);

        setTimeout(() => {
            this.setState({bearing: this.defaultNeedleRotation, needleCSS: 'init-complete'});
        }, this.needleSpinDelay)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.bearing !== this.props.bearing) {
            this.bearing(nextProps.bearing);
        }
    }

    bearing(incomingBearing) {
        let bearing = 0;

        switch(incomingBearing) {
            case 'N':
                bearing = this.defaultNeedleRotation - 33;
                break;
            case 'S':
                bearing = this.defaultNeedleRotation - 223;
                break;
            case 'E':
                bearing = this.defaultNeedleRotation + 422;
                break;
            case 'W':
                bearing = this.defaultNeedleRotation - 478;
                break;
            default:
                bearing = this.defaultNeedleRotation;
        }

        this.setState({bearing})
    }

    render() {
        return (
                 <div className='compass'>
                    <svg width='300px' height='300px' viewBox={`0 0 300 300`} version='1.1' xmlns='http://www.w3.org/2000/svg'>
                        <g id='artboard'>
                            {this.state.compass}
                            <circle id='compassTicks' cx='150px' cy='150px' r='105px'/>
                            <g id='text'>
                                <text x='143' y='25'>N</text>
                                <text x='145' y='285'>S</text>
                                <text x='15' y='155'>W</text>
                                <text x='271' y='154'>E</text>
                            </g>
                            <g id='needle' className={this.state.needleCSS} style={{transform: `rotate(${this.state.bearing}deg)`}}>
                                <polygon id='red-needle' points="146,150 150,65 154,150"/>
                                <polygon id='white-needle' points="146,150 150,235 154,150"/>
                            </g>
                        </g>
                    </svg>
                 </div>
        );
    }
}

Compass.propTypes = {
     bearing: PropTypes.string
};

export default Compass;