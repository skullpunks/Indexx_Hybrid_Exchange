import { useTheme } from '@mui/material/styles';
import React from 'react';
import SelectRole from '../../../components/updated/authentication/signup/SelectRole';

const SelectRolePage = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme?.palette?.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <SelectRole />
    </div>
  );
};

export default SelectRolePage;
