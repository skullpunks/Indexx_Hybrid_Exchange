
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
    return (
        <div className="lef_nav_container">
            <div className="nav_Section">
                <ul>
                    <li><NavLink to="/indexx-exchange/help" className="" end>
                        Indexx Swap Intro
                    </NavLink></li>
                    <li><NavLink to="/indexx-exchange/help/team">Indexx Swap Team</NavLink></li>
                    <li> <NavLink to="/indexx-exchange/help/contact">Contact Us</NavLink></li>
                </ul>
            </div>
        </div >
    )
}

export default LeftNav