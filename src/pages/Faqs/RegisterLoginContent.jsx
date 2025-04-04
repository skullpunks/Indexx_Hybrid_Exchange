import './FaqsStyles.css';

const RegisterLoginContent = () => {
  return (
    <div className="faqs-page">
      <h3>How do I register for a new account?</h3>
      <p>To create a new account, follow these steps:</p>
      <ol>
        <li>
          <h4>Email and Password Registration:</h4>
          <ul>
            <li>
              To get started, visit the registration page by clicking{' '}
              <a href="https://indexx.ai/auth/signup-email">here</a> to create
              your account.
            </li>
            <li>Enter your desired email address and click "Next".</li>
            <li>
              Check your email inbox (and spam folder) for a 6-digit
              verification code.
            </li>
            <li>Enter the verification code on the registration page.</li>
            <li>
              You will then be prompted to create and confirm a new password.
            </li>
            <li>After that, you have successfully created the account.</li>
          </ul>
        </li>
        <li>
          <h4>Register using Google:</h4>
          <ul>
            <li>
              Visit the registration page by clicking{' '}
              <a href="https://indexx.ai/auth/signup-google">here</a>.
            </li>
            <li>Click the "Sign up with Google" button.</li>
            <li>
              Follow the on-screen prompts to select your Google account and
              grant the necessary permissions.
            </li>
            <li>You will be registered automatically.</li>
          </ul>
        </li>
      </ol>

      <h3>How do I log in to my account?</h3>
      <p>There are two ways to log in:</p>
      <ol>
        <li>
          <h4>Email and Password Login:</h4>
          <ul>
            <li>
              Visit the login page by clicking{' '}
              <a href="https://indexx.ai/auth/login">here</a>.
            </li>
            <li>Enter your registered email address.</li>
            <li>Enter your password.</li>
            <li>Click "Next".</li>
          </ul>
        </li>
        <li>
          <h4>Login with Google:</h4>
          <ul>
            <li>
              Visit the login page by clicking{' '}
              <a href="https://indexx.ai/auth/login">here</a>.
            </li>
            <li>Click the "Login with Google" button.</li>
            <li>
              Follow the on-screen prompts to select your Google account and
              grant the necessary permissions.
            </li>
            <li>You will be logged in automatically.</li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default RegisterLoginContent;
