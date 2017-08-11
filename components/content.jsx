import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from '../assets/badge-white.svg';
import Antler from '../assets/antler-white.svg';

class Content extends Component {
    render() {
        return (
            <div>
                <img className='badge' src={Badge} alt='Badge'/>
                <img className='antler' src={Antler} alt='Main Logo'/>
            </div>
        );
    }
}

Content.propTypes = {

};

export default Content;