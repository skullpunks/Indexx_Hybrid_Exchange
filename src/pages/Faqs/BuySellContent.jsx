import './FaqsStyles.css';

const BuySellContent = () => {
  return (
    <div className="faqs-page">
      <h3>How do I buy cryptocurrency?</h3>
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/LLKmL5YU52E"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h3>To buy cryptocurrency, please follow these steps:</h3>
      <ul className='custom-list'>
        <li>
          If you don't have an account, please register by clicking{' '}
          <a href="https://indexx.ai/auth/signup-email">here</a>.
        </li>
        <li>
          If you already have an account, log in by clicking{' '}
          <a href="https://indexx.ai/auth/login">here</a>.
        </li>
        <li>
          Select the "Exchange" option from the menu. You can also access the
          Exchange through the navigation bar by clicking "Exchange/Buy Crypto".
        </li>
        <li>
          Enter the amount in USD that you wish to spend on cryptocurrency.
        </li>
        <li>
          Choose the cryptocurrency token you want to purchase from the list of
          available options.
        </li>
        <li>Select your preferred payment method from the options provided.</li>
        <li>Click the "Buy" button to complete your purchase.</li>
      </ul>

      <h3>How do I sell cryptocurrency?</h3>
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/Gl-rvCGtsY0"
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
      <h3>To sell cryptocurrency, please follow these steps:</h3>
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
          Select the "Exchange" option from the menu. You can also access the
          Exchange through the navigation bar by clicking "Exchange/Buy Crypto".
        </li>
        <li>
          By default, the Exchange is set to the "Buy" option. Switch to "Sell"
          to proceed with selling.
        </li>
        <li>
          Select the cryptocurrency token you wish to sell from the drop-down
          menu or the options listed on the left.
        </li>
        <li>
          Review the amount you will receive in USD, which will be credited
          directly to your asset wallet.
        </li>
        <li>Click the "Sell" button to finalize your sale.</li>
      </ul>
    </div>
  );
};

export default BuySellContent;
