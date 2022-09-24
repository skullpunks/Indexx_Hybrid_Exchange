import React from 'react'

interface Props {
    setStatus: (value: string | ((prevVar: string) => string)) => void;
}

const TransactionSubmit: React.FC<(Props)> = ({ setStatus }) => {
    console.log(setStatus);
    return (
        <div className='scan-container'>
            <div className='card'>
                TransactionSubmit
            </div>
        </div>
    )
}

export default TransactionSubmit