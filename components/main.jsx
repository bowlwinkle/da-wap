import React from 'react';
import Header from './header.jsx';
import Content from './content.jsx';
import Footer from './footer.jsx';

const Main = props => {
    return (
        <div className='fillContent'>
            <Header/>
            <Content/>
        </div>
    );
};

export default Main;