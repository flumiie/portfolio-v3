import React from 'react';
import './styles/App.css';

import NavbarImage from './images/navbar_links.png';

function App() {
  return (
    <div className='main-container'>
      <div>
        {/* Header font goes here */}
        <img src={NavbarImage} alt='' id='navbar-home' />
        <img src={NavbarImage} alt='' id='navbar-works' />
        <img src={NavbarImage} alt='' id='navbar-contacts' />
      </div>
    </div>
  );
}

export default App;
