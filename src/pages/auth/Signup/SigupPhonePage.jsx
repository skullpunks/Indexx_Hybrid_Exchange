import { useTheme } from '@mui/material/styles';

import SignupPhone from '../../../components/updated/authentication/signup/SignupPhone';

const SignUpPhonePage = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme?.palette?.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <SignupPhone />
    </div>
  );
};

export default SignUpPhonePage;
