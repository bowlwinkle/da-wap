import React, {Component} from 'react';
import Badge from '../assets/badge-white.svg';
import Antler from '../assets/antler-outline.png';

const Splash = () => {
    return (
        <div>
            <img className='badge' src={Badge} alt='Badge'/>
            <img className='antler' src={Antler} alt='Left Full'/>
            <img className='antler-outline' src={Antler} alt='Right outline'/>
        </div>
    );
};

export default Splash;