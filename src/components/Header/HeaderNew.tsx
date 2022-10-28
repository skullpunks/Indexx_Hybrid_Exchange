// import { Button } from 'react-bootstrap';
import { BellOutlined } from '@ant-design/icons';
// import { Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import "./Header.css";

const logOutUser = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.removeItem("user"); //remove one item
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.clear(); //clear all localstorage
    window.location.reload();
    // navigate("/indexx-exchange/buy-sell/login");

}

function HeaderNew() {
    let title = <>{localStorage.getItem("user")}</>
    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/" href="/" className='logo__icon'>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Products" id="collasible-nav-dropdown" className='dark-menu'>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/buy-sell" className='dropdown-item' href="/">Centralized</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/coming-soon?page=decentralized" className="dropdown-item" href="/" >Decentralized</NavDropdown.Item>
                            <NavDropdown.Item href="https://tokens.indexx.ai/" className='dropdown-item' target="_blank" rel="noreferrer">indexx Tokens</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Earn" id="collasible-nav-dropdown" className='dark-menu'>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/trade-to-earn" className="dropdown-item" href="/">Trade to earn</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/coming-soon?page=Indexx Bank" className="dropdown-item" href="/">Indexx Bank</NavDropdown.Item>
                            {/* <NavDropdown.Item as={Link} to="/indexx-exchange/coming-soon?page=Pools" className="dropdown-item" href="/">Pools</NavDropdown.Item> */}
                        </NavDropdown>
                        <NavDropdown title="Company" id="collasible-nav-dropdown" className='dark-menu'>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/help" className="dropdown-item" href="/">About</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/coming-soon?page=Hybrid Exchange" className='dropdown-item' href="/">Hybrid Exchange</NavDropdown.Item>
                            <NavDropdown.Item href="https://register.affiliate.indexx.ai/" target="_blank" rel="noreferrer">Affiliate Program</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/blog" className='dropdown-item' href="/">Blog</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {

                            (localStorage.getItem("user")) ?
                                <>

                                    <Nav.Link as={Link} to="/indexx-exchange/buy-sell/" href="/" className='btn btn-danger text-white'>Buy Crypto</Nav.Link>
                                    <BellOutlined className="p-2 px-3 text-white cursor-pointer" style={{ fontSize: 20 }} />
                                    <NavDropdown title={title} id="collasible-nav-dropdown" className='dark-menu ' >
                                        <NavDropdown.Item as={Link} to="/" className="dropdown-item" href="/">Dashboard</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/" className='dropdown-item' href="/">Account & Settings</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/indexx-exchange/buy-sell/wallet" href="/" className='dropdown-item' >Wallet</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/indexx-exchange/buy-sell/withdraw-crypto" className='dropdown-item' href="/">Withdraw</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/indexx-exchange/buy-sell/deposit-fiat" className='dropdown-item' href="/">Deposit</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/indexx-exchange/buy-sell/transaction-history" className='dropdown-item' href="/">Transaction History</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="" onClick={logOutUser} className='dropdown-item' href="/">Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                : <>
                                    <Nav.Link as={Link} to="/indexx-exchange/buy-sell/login" className='text-white link' href="/">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/indexx-exchange/buy-sell/get-started" href="/" className='btn btn-danger text-white'>Get started</Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderNew;