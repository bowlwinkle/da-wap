import React, { Component } from 'react';
import PropTypes from 'prop-types';
import USMap from './projects/HuntingMap/us-map';

class Projects extends Component {
    render() {
        return (
            <div className='projects'>
                <USMap/>
            </div>
        );
    }
}

Projects.propTypes = {

};

export default Projects;