import React, { useState } from "react";
import "./Dropdown.css"
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface DropdownProps {
    label: string;
    items: {
        key: number,
        label: string,
        path?: string
    }[]
}



const Dropdown: React.FC<(DropdownProps)> = ({ label, items }) => {
    const [toggleMenu, setToggleStateMenu] = useState(false);
    const random = "openDropdown" + Math.random();

    // document.addEventListener("click", (event) => {
    //     const concernedElement = document.querySelector(".open,.dropdown-container");
    //     if (concernedElement && concernedElement.contains(event.target as Element)) {
    //         
    //     } else {
    //         
    //         setToggleStateMenu(false);
    //     }
    // });

    return (
        <div className="dropdown-container">
            <label htmlFor={random} className="dropdown">
                {label}

                {!toggleMenu ? <CaretDownOutlined className="icon" /> : <CaretUpOutlined className="icon" />}
            </label>
            <input type="checkbox" onClick={() => setToggleStateMenu(!toggleMenu)} id={random} hidden />
            {toggleMenu ?
                <div className="dropdown-menu open">
                    {items.map(item => (
                        <Link key={item.key} to={item.path || ''}>{item.label}</Link>
                    ))}
                </div> : <></>
            }
        </div>
    );
};

export default Dropdown;
