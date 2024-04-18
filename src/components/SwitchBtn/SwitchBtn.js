import React from 'react';
import './SwitchBtn.css';

const SwitchButton = ({ value, setValue, text1, text2 }) => {
    const toggleSwitch = () => {
        setValue(!value);
    };

    return (
        <div className="switch-container">
            <label className="switch">
                <input type="checkbox" checked={value} onChange={toggleSwitch} />
                <span className="slider round"></span>
            </label>
            <span>{value ? text1 : text2}</span>
        </div>
    );
};

export default SwitchButton;
