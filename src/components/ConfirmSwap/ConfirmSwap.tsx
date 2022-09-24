import React from 'react'

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const ConfirmSwap: React.FC<(Props)> = ({ setStatus }) => {
    return (
        <div className="scan-container">
            <div className='card'>
                <div>ConfirmSwap</div>
            </div>
        </div>
    )
}

export default ConfirmSwap