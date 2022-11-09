// import { Button } from 'react-bootstrap';
import { BellOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
// import { Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import "./Header.css";
import loaderGif from "../../assets/arts/loaderIcon.gif";


const logOutUser = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.removeItem("user"); //remove one item
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.clear(); //clear all localstorage
    if (window.location.pathname.includes("trade-to-earn"))
        window.location.reload();
    else
        window.location.href = "/indexx-exchange/buy-sell/login";

}


const Links = [
    { label: "Centralized", value: "buy-sell", url: "/indexx-exchange/buy-sell" },
    { label: "Centralized", value: "trade-to-earn", url: "/indexx-exchange/trade-to-earn" },
    { label: "Markets", value: "markets", url: "/indexx-exchange/markets" },
    { label: "Tokens", value: "tokens", url: "/indexx-exchange/tokens" },
    { label: "", value: "/", url: "/" }
]



const HeaderNew = () => {
    let title = <>{localStorage.getItem("user")}</>
    const [isInsideApp, setIsInsideApp] = useState(false);
    // const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    let pageName = searchParams.get("page");
    // alert(pageName)
    useEffect(() => {
        if (location) {
            setIsInsideApp(location.pathname.includes("/indexx-exchange/"))
        }
    },
        [location]
    )

    const showText: any = Links.filter((link) => window.location.pathname.includes(link.value)).map(obj => obj.label);
    const showUrl: any = Links.filter((link) => window.location.pathname.includes(link.value)).map(obj => obj.url);
    console.log(isInsideApp);

    if (window.location.pathname.includes("get-started") || window.location.pathname.includes("login") || window.location.pathname.includes('/indexx-exchange/kyc')) {
        return <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
            <Container>
                <div className='d-flex logo__holder'>
                    <Navbar.Brand href="/" className='logo__icon'>index.ai</Navbar.Brand>

                </div>
            </Container>
            <div className="loader" id="loaderLayer"> <img src={loaderGif} alt="loader" /></div>
        </Navbar>
    }
    else return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
            <Container>
                <div className='d-flex logo__holder'>
                    <Navbar.Brand as={Link} to="/" href="/" className='logo__icon'>index.ai</Navbar.Brand>
                    <Nav.Link as={Link} to={showUrl[0]} href="#" className="logo__text">{pageName || showText[0]}</Nav.Link>

                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Products" id="collasible-nav-dropdown" className='dark-menu'>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/buy-sell" className='dropdown-item' >Centralized</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/coming-soon?page=Decentralized" className="dropdown-item" href="/" >Decentralized</NavDropdown.Item>
                            <NavDropdown.Item href="https://tokens.indexx.ai/" className='dropdown-item' target="_blank" rel="noreferrer">indexx Tokens</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/indexx-exchange/markets" className='text-white link' href="#">Markets</Nav.Link>
                        <NavDropdown title="Earn" id="collasible-nav-dropdown" className='dark-menu'>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/trade-to-earn" className="dropdown-item" href="/">Trade to earn</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/coming-soon?page=Indexx Bank" className="dropdown-item" href="/">Indexx Bank</NavDropdown.Item>
                            {/* <NavDropdown.Item as={Link} to="/indexx-exchange/coming-soon?page=Pools" className="dropdown-item" href="/">Pools</NavDropdown.Item> */}
                        </NavDropdown>
                        <NavDropdown title="Company" id="collasible-nav-dropdown" className='dark-menu'>
                            <NavDropdown.Item as={Link} to="/indexx-exchange/about" className="dropdown-item" href="/">About</NavDropdown.Item>
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
                                        <NavDropdown.Item as={Link} to="/indexx-exchange/dashboard" className="dropdown-item" href="/">Dashboard</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/indexx-exchange/account" className='dropdown-item' href="/">Account & Settings</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/indexx-exchange/buy-sell/wallet" href="/" className='dropdown-item' >Wallet</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/indexx-exchange/buy-sell/withdraw-crypto" className='dropdown-item' href="/">Withdraw</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/indexx-exchange/buy-sell/deposit-crypto" className='dropdown-item' href="/">Deposit</NavDropdown.Item>
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
            <div className="loader" id="loaderLayer"> <img src={loaderGif} alt="loader" /></div>
        </Navbar>
    );
}

export default HeaderNew;