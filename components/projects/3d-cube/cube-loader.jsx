import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CUBE_POSITIONS = {
    left: 'animate-left',
    right: 'animate-right',
    front: 'animate-front',
    back: 'animate-back',
    top: 'animate-top',
    bottom: 'animate-bottom'
};

class CubeLoader extends Component {
    constructor() {
		super();

		this.state = {
			position: '',
            intervalID: undefined
		};

        this.enableCube = this.enableCube.bind(this);
        this.disableCube = this.disableCube.bind(this);
	}

    componentWillReceiveProps(nextProps) {
        if (nextProps.enabled != this.props.enabled) {
            if (nextProps.enabled) {
                this.enableCube();
            } else {
                this.disableCube();
            }
        }
    }

    componentDidMount() {
        if (this.props.enabled) {
            this.enableCube();
        }
    }

    componentWillUnmount() {
        if (this.state.intervalID) {
            clearInterval(this.state.intervalID);
        }
    }

    enableCube() {
        if (this.state.intervalID) {
            clearInterval(this.state.intervalID);
        }

        let id = setInterval(this.flipCube.bind(this), 2000);
        this.setState({position: CUBE_POSITIONS.left, intervalID: id});
    }

    disableCube() {
        if (this.state.intervalID){
            clearInterval(this.state.intervalID);
            this.setState({intervalID: undefined, position: ''});
        }
    }

    flipCube() {
        let values = Object.values(CUBE_POSITIONS);
        let index = values.indexOf(this.state.position);

        if (index >= (values.length - 1)) {
            index = 0;
        } else {
            index++;
        }

        this.setState({position: values[index]});
    }

    render() {
        let style = (!this.props.enabled) ? {transform: 'scale(0.6) rotateX(180deg)'} : {};
        return (
            <div className='cube-container' style={style}>
                <div className={`cube ${this.state.position}`}>
                    <div className='side front'>
                        <svg className='cross'>
                            <line x1='0' y1='0' x2='100%' y2='100%'/>
                            <line x1='100%' y1='0' x2='0' y2='100%'/>
                        </svg>
                    </div>
                    <div className='side back'>
                        <svg className='cross'>
                            <line x1='0' y1='0' x2='100%' y2='100%'/>
                            <line x1='100%' y1='0' x2='0' y2='100%'/>
                        </svg>
                    </div>
                    <div className='side top'>
                        <svg className='cross'>
                            <line x1='0' y1='0' x2='100%' y2='100%'/>
                            <line x1='100%' y1='0' x2='0' y2='100%'/>
                        </svg>
                    </div>
                    <div className='side bottom'>
                        <svg className='cross'>
                            <line x1='0' y1='0' x2='100%' y2='100%'/>
                            <line x1='100%' y1='0' x2='0' y2='100%'/>
                        </svg>
                    </div>
                    <div className='side left'>
                        <svg className='cross'>
                            <line x1='0' y1='0' x2='100%' y2='100%'/>
                            <line x1='100%' y1='0' x2='0' y2='100%'/>
                        </svg>
                    </div>
                    <div className='side right'>
                        <svg className='cross'>
                            <line x1='0' y1='0' x2='100%' y2='100%'/>
                            <line x1='100%' y1='0' x2='0' y2='100%'/>
                        </svg>
                    </div>
                </div>
            </div>

        )
    }
};

CubeLoader.propTypes = {
    enabled: PropTypes.bool
};

export default CubeLoader;