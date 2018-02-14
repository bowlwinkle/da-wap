import React, {Component} from 'react';
import Compass from 'Assets/white-compass.png';

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

//633.35693359375
class DrawCompass extends Component{
    constructor(props) {
        super(props);

        this.state = {
            compass: null,
            compassTicks: null
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({compass: (<circle id='compass' cx='50%' cy='45%' r='10%'/>)})
        }, 100);
    }

    render() {
        return (
            <svg width='1255px' height='681px' viewBox='0 0 1255 681' version='1.1' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'>
                {this.state.compass}
                {/* <circle id='ripple' cx='50%' cy='45%' r='10%'/> */}
                <circle id='compassTicks' cx='50%' cy='45%' r='10%'/>
                <text x='622' y='188'>N</text>
                <text x='499' y='311'>W</text>
                <text x='622' y='440'>S</text>
                <text x='742' y='311'>E</text>
                <g id='needle'>
                    <polygon points="626,303 628,220 630,303" style={{fill:'red',stroke:'red',strokeWidth:'1'}} />
                    <polygon points="626,303 628,220 630,303" style={{transform: 'rotateX(180deg) translateY(-90px) ', transformOrigin: 'center', fill:'whitesmoke',stroke:'whitesmoke',strokeWidth:'1'}} />
                    {/* <circle cx='628' cy='303' r='5' fill='black' stroke='transparent'/> */}
                </g>
            </svg>
        )
    }
}

class Header extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                 <div className='logo'>
                     {/* <img src={Compass} alt='logo'/>
                     <svg className='compass-cross'>
                         <CompassMenu />
                     </svg> */}
                     <DrawCompass/>
                 </div>
             </nav>
        );
    }
}

export default Header;