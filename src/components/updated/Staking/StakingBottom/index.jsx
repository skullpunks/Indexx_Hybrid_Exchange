import React from 'react';
import StakingTable from './StakingTable';

const StakingBottom = ({refresh}) => {
  return (
    <div>
      <StakingTable refresh={refresh}/>
    </div>
  );
};

export default StakingBottom;
