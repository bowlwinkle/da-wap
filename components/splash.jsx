import React, {Component} from 'react';
import Badge from '../assets/badge-white.svg';
import Antler from '../assets/antler-outline.png';
import Topography from '../assets/topography.png';

const Splash = () => {
    return (
        <div className='fillContent'>
            <img className='topography' src={Topography} alt='Topography'/>
            <div className='splashContainer'>
                <div className='splash'>
                    <div className='badge'>
                        <img src={Badge} alt='Badge'/>
                    </div>
                    <div className='antler-left'>
                        <img src={Antler} alt='Left Full'/>
                    </div>
                    <div className='antler-right'>
                        <img src={Antler} alt='Right outline'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Splash;