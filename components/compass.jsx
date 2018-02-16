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
                 {/* <svg width={`${this.state.width}px`} height={`${this.state.height}px`} viewBox={`0 0 1255 681`} version='1.1' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'> */}
                    <svg width='300px' height='300px' viewBox={`0 0 300 300`} version='1.1' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'>
                        {this.state.compass}
                        {/* <circle id='ripple' cx='50%' cy='45%' r='10%'/> */}
                        <circle id='compassTicks' cx='50%' cy='45%' r='35%'/>
                        <text x='143' y='10'>N</text>
                        <text x='15' y='140'>W</text>
                        <text x='145' y='270'>S</text>
                        <text x='271' y='139'>E</text>
                        <g id='needle'>
                            <polygon points="146,140 150,50 154,140" style={{fill:'red',stroke:'red',strokeWidth:'1'}} />
                            <polygon points="146,138 150,50 154,138" style={{transform: 'rotateX(180deg) translateY(-85px) ', transformOrigin: 'center', fill:'whitesmoke',stroke:'whitesmoke',strokeWidth:'1'}} />
                            {/* <circle cx='628' cy='303' r='5' fill='#454545' stroke='transparent'/> */}
                        </g>
                    </svg>
                 </div>
        );
    }
}

export default Compass;