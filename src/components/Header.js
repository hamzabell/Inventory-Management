import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllTypes } from '../store/slices/typeSlice';

export default function Header() {
    const navigate = useNavigate();
    const types = useSelector(selectAllTypes);
    return (
       <Navbar bg="light" expand="md">
      <Container fluid>
        <Navbar.Brand href="#">IM</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            {
                types.map((type, index) => (
                    <Nav.Link key={index} onClick={() => navigate(`/customlist?model=${type.name}`)}>{type.name}</Nav.Link>

                ))
            }
            <Nav.Link onClick={() => navigate('/manage')}>Manage</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}