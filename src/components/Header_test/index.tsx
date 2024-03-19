import React, { useContext, useEffect, useState } from 'react';
import greetingCard from '../../assets/header-icons/sec_header_greeting.svg';
import logo from '../../assets/header-icons/indexx_logo.svg';
import './style.css';
import CrossIcon from '../../assets/header-icons/cross';
import DarkMode from '../DarkMode/DarkMode';
import { Theme } from '../../utils/themeContext';
import Fantasy_Lotto from '../../assets/BSheader/fantasy.png';
import token from '../../assets/BSheader/tokens icon 1.svg';
import token_white from '../../assets/BSheader/tokens icon  white (1).svg';
import { auth_header_data } from './data';
import header_data from './data';
const HeaderTest: React.FC = () => {
  const themeData = useContext(Theme);
  const [theme, setTheme] = useState<string>(themeData?.theme ?? 'dark');
  const isAuthenticated: boolean = true;
  //   const [activeIndex, setactiveIndex] = useState(0);
  //   const [iconicHeaderData, setIconicHeaderData] = useState(
  //     header_data
  //       .find((el) => el.active === true)
  //       ?.dropDownContent.find((elem) => elem.mainList === true)?.links
  //   );

  useEffect(() => {
    if (themeData?.theme) {
      setTheme(themeData?.theme);
    }
  }, [themeData?.theme]);

  //   const handleItemClick = (path: string, i: number) => {
  //     setactiveIndex(i);
  //     console.log(path, 'path');
  //   };

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000 }}>
        <div className="wrapper">
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div className="logo" style={{ marginRight: '30px' }}>
              <a href="#">
                <img src={logo} />
              </a>
            </div>
            <input type="radio" name="slider" id="menu-btn" />
            <input type="radio" name="slider" id="close-btn" />
            <ul className="nav-links" style={{ flex: 1 }}>
              <label htmlFor="close-btn" className="btn close-btn">
                x
              </label>
              {header_data.map((element) => (
                <>
                  <li className="main">
                    <a
                      href={element.href}
                      className={`desktop-item ${
                        element.active ? 'link_active' : ''
                      }`}
                    >
                      {element.mainTextDesktop}
                    </a>
                    <input type="checkbox" id={element.mainTextDesktop} />
                    <label
                      htmlFor={element.mainTextDesktop}
                      className="mobile-item"
                    >
                      {element.mainTextMob} {element.hasMegaDrop ? '>' : ''}
                    </label>
                    {element.hasMegaDrop ? (
                      <div
                        className="mega-box"
                        style={{
                          background: theme === 'light' ? '#E7E7E7' : '',
                          color: theme === 'light' ? '#434343 !important' : '',
                        }}
                      >
                        <div className="content">
                          {element.dropDownContent.map((elem) => (
                            <div
                              className="row"
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <header>{elem.heading}</header>
                              <ul
                                className={`mega-links ${
                                  elem.mainList ? 'main' : ''
                                }`}
                              >
                                {elem.links.map((el) => (
                                  <li>
                                    <a
                                      href={el.href}
                                      className={
                                        theme === 'light' ? 'dark_color' : ''
                                      }
                                    >
                                      {el.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          <div className="row"></div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </li>
                </>
              ))}

              {auth_header_data
                .filter((el) => el.isAuth === isAuthenticated)
                .map((element, i) => (
                  <>
                    <li
                      className="main"
                      style={{ marginLeft: i === 0 ? 'auto' : '' }}
                    >
                      <a
                        href={element.href}
                        className={`desktop-item ${
                          element.active ? 'link_active' : ''
                        }`}
                      >
                        {element.mainTextDesktop}
                      </a>
                      <input type="checkbox" id={element.mainTextDesktop} />
                      <label
                        htmlFor={element.mainTextDesktop}
                        className="mobile-item"
                      >
                        {element.mainTextMob} {element.hasMegaDrop ? '>' : ''}
                      </label>
                      {element.hasMegaDrop ? (
                        <div
                          className="mega-box"
                          style={{
                            background: theme === 'light' ? '#E7E7E7' : '',
                            color:
                              theme === 'light' ? '#434343 !important' : '',
                          }}
                        >
                          <div className="content">
                            {element.dropDownContent.map((elem) => (
                              <div
                                className="row"
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <header>{elem?.heading}</header>
                                <ul
                                  className={`mega-links ${
                                    elem?.mainList ? 'main' : ''
                                  }`}
                                >
                                  {elem?.links.map((el) => (
                                    <li>
                                      <a
                                        href={el.href}
                                        className={
                                          theme === 'light' ? 'dark_color' : ''
                                        }
                                      >
                                        {el.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            <div className="row"></div>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                ))}
            </ul>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DarkMode />
            <label htmlFor="menu-btn" className="btn menu-btn">
              <CrossIcon />
            </label>
          </div>
        </div>
      </nav>
      {/* <div
        className="secondary_header_root"
        style={{ background: theme === 'dark' ? '#000' : '' }}
      >
        <div className="secondary_header_content">
          {iconicHeaderData?.map((curr: any, i) => (
            <div
              key={i}
              className={`secondary_header_content_item ${
                i === activeIndex ? 'active' : ''
              }`}
              onClick={() => handleItemClick(curr.href, i)}
            >
              <span className="secondary_header_content_img_container">
                <img
                  src={
                    theme !== 'light'
                      ? curr?.imgLight ?? token_white
                      : curr?.imgDark ?? token
                  }
                />
              </span>
              <span>{curr.name}</span>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default HeaderTest;
