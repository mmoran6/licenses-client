import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css'

const NavBar = () => {
    return (
        <Navbar className='my-3 mx-3 navbar'>
            <Link to="/"><img src='https://typsa.net/img/parte/TYPSA.JPG' className='logo'/></Link>
        </Navbar>
    )
}

export default NavBar