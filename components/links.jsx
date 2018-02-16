import React from 'react';
import { Link } from 'react-router-dom';

const Links = props => {
    return (
        <ul className='links'>
            <li>
                <Link to="/">HOME</Link>
            </li>
            <li>
                <Link to="/resume">RESUME</Link>
            </li>
            <li>
                <Link to="/projects">PROJECTS</Link>
            </li>
            <li>
                <Link to="/about">ABOUT</Link>
            </li>
        </ul>
    );
};

export default Links;