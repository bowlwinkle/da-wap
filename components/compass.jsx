import React, {Component} from 'react';

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
    constructor(props) {
        super(props);

        this.state = {
            compass: null,
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.resize = this.resize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);

        setTimeout(() => {
            this.setState({compass: (<circle id='compass' cx='50%' cy='45%' r='35%'/>)})
        }, 100);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize() {
        this.setState({height: window.innerHeight, width: window.innerWidth});
    }

    render() {
        return (
                 <div className='compass'>
                    <svg width='300px' height='300px' viewBox={`0 0 300 300`} version='1.1' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'>
                        {this.state.compass}
                        <circle id='compassTicks' cx='50%' cy='45%' r='35%'/>
                        <text x='143' y='10'>N</text>
                        <text x='15' y='140'>W</text>
                        <text x='145' y='270'>S</text>
                        <text x='271' y='139'>E</text>
                        <g id='needle'>
                            <polygon points="146,140 150,50 154,140" style={{fill:'red'}} />
                            <polygon points="146,138 150,50 154,138" style={{transform: 'rotateX(180deg) translateY(-85px) ', transformOrigin: 'center', fill:'whitesmoke'}} />
                        </g>
                    </svg>
                 </div>
        );
    }
}

export default Compass;