import { Link } from 'react-router-dom';

import NavbarImage from '../images/navbar_links.png';
import '../styles/navbar.scss';

function Navbar() {
  return (
    <nav className='navbar'>
      <Link to='/'>
        <img src={NavbarImage} alt='' id='navbar-home' />
      </Link>
      <Link to='/works'>
        <img src={NavbarImage} alt='' id='navbar-works' />
      </Link>
      <Link to='/contacts'>
        <img src={NavbarImage} alt='' id='navbar-contacts' />
      </Link>
    </nav>
  );
}

export default Navbar;
