import React from 'react';
import "./WaitForConfirmation.css";

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const WaitForConfirmation: React.FC<(Props)> = ({ setStatus }) => {
    console.log(setStatus);
    return (
        <div className='scan-container'>
            <div className='card'>
                WaitForConfirmation
            </div>
        </div>
    )
}

export default WaitForConfirmation