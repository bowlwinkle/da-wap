import React from 'react';
import { Link } from 'react-router-dom';

export const SocialMediaLinks = () => (
    <div className='social-media'>
        <a href='https://github.com/bowlwinkle'><i className="fa fa-github" aria-hidden="true"></i></a>
        <a href='https://www.linkedin.com/in/lucas-gansberg-99381b33/'><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
    </div>
);

class Links extends React.Component {
    constructor(props) {
        super(props);

        this.onHover = this.onHover.bind(this);
    }

    onHover(name, value){
        if (this.props.onLinkEnter) {
            this.props.onLinkExit(name, value);
        } else if (this.props.onLinkExit) {
            this.props.onLinkExit(name, value);
        }
    }

    render() {
        return (
            <ul className='links'>
                <li onMouseOver={this.onHover.bind(window.event, 'home', true)} onMouseOut={this.onHover.bind(window.event, 'home', false)}>
                    <Link to="/">HOME</Link>
                </li>
                <li onMouseOver={this.onHover.bind(window.event, 'resume', true)} onMouseOut={this.onHover.bind(window.event, 'resume', false)}>
                    <Link to="/resume">RESUME</Link>
                </li>
                <li onMouseOver={this.onHover.bind(window.event, 'projects', true)} onMouseOut={this.onHover.bind(window.event, 'projects', false)}>
                    <Link to="/projects">PROJECTS</Link>
                </li>
                <li onMouseOver={this.onHover.bind(window.event, 'about', true)} onMouseOut={this.onHover.bind(window.event, 'about', false)}>
                    <Link to="/about">ABOUT</Link>
                </li>
            </ul>
        );
    }
}

export default Links;