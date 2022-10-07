import React from 'react'
interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const BSTractionHistory:React.FC<(Props)> = ({ setScreenName }) => {
  return (
    <div>BSTractionHistory</div>
  )
}

export default BSTractionHistory;