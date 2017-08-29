import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Splash from './splash.jsx';

class Content extends Component {
    render() {
        return (
            <div className='content'>
                <Splash/>
            </div>
        );
    }
}

Content.propTypes = {

};

export default Content;