import './FaqsStyles.css';

const ConvertContent = () => {
  return (
    <div className="faqs-page">
      <h3>How do I convert cryptocurrency?</h3>
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/reDfKZkLwbU"
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
      <h3>To convert cryptocurrency, please follow these steps:</h3>
      <ul>
        <li>
          If you don't have an account, please register by clicking{' '}
          <a href="https://indexx.ai/auth/signup-email">here</a>.
        </li>
        <li>
          If you already have an account, log in by clicking{' '}
          <a href="https://indexx.ai/auth/login">here</a>.
        </li>
        <li>
          Navigate to the "Exchange" option in the menu. You can also access the
          Exchange by clicking "Exchange/Convert Crypto" in the navigation bar.
        </li>
        <li>
          Select the "Convert" option from the top menu to initiate the
          conversion process.
        </li>
        <li>
          Choose the cryptocurrency you want to convert from and the
          cryptocurrency you wish to receive.
        </li>
        <li>Enter the amount of cryptocurrency you wish to convert.</li>
        <li>
          Click the "Preview Conversion" button to see the details of your
          transaction.
        </li>
        <li>
          Review the conversion details, including the amount you will receive
          after the conversion.
        </li>
        <li>
          If everything looks good, click the "Confirm Convert" button to
          complete the transaction.
        </li>
      </ul>
    </div>
  );
};

export default ConvertContent;
