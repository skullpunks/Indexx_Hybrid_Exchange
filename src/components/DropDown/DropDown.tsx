import React, { useState } from "react";
import "./Dropdown.css"
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

interface DropdownProps {
    label: string;
    items: {
        key: number,
        label: string,
        path?: string
    }[]
}

const Dropdown: React.FC<(DropdownProps)> = ({ label, items }) => {
    const [toggleMenu, setToggleStateMenu] = useState(false)

    return (
        <div className="dropdown-container">
            <label htmlFor="openDropdown" className="dropdown">
                {label}

                {!toggleMenu ? <CaretDownOutlined className="icon" /> : <CaretUpOutlined className="icon" />}
            </label>
            <input type="checkbox" onClick={() => setToggleStateMenu(!toggleMenu)} id="openDropdown" hidden />
            <div className="dropdown-menu">
                {items.map(item => (
                    <span key={item.key}>{item.label}</span>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
