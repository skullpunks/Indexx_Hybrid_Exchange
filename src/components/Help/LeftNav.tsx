import { NavLink } from 'react-router-dom';

const LeftNav = () => {
  return (
    <div className="lef_nav_container d-md-block d-none">
      <div className="nav_Section">
        <ul>
          <li>
            <NavLink to="/indexx-exchange/help" className="" end>
              Indexx Intro
            </NavLink>
          </li>
          <li>
            <NavLink to="/indexx-exchange/help/team">Indexx Team</NavLink>
          </li>
          <li>
            {' '}
            <NavLink to="/indexx-exchange/help/contact">Contact Us</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNav;
