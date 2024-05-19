import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Users, Roles } from './components';
import CustomLinkContainer from './partials/CustomLinkContainer';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar bg='light' expand='lg'>
                    <Container>
                        <Navbar.Brand href='/'>User Management</Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='me-auto'>
                                <CustomLinkContainer to='/' linkName='Users' />
                                <CustomLinkContainer to='/roles' linkName='Roles' />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container>
                    <Routes>
                        <Route path='/' element={<Users />} />
                        <Route path='/roles' element={<Roles />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;