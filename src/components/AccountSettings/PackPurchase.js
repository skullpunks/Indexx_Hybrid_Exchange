import './Congrats.css';
import logo from '../../assets/packpurchase.svg';
import { baseCEXURL } from '../../services/api';

const PackPurchase = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleClick = () => {
    window.location.href = `${baseCEXURL}/indexx-exchange/power-pack`;
    onClose();
  };
  return (
    <>
      <div class="main-box">
        <div class="second-box" style={{ width: '500px' }}>
          <img
            src={logo}
            class="logo-img"
            style={{ margin: 'auto', paddingTop: '1.25rem' }}
            alt="img"
          />
          <div class="congrats">Congratulations!</div>
          <div class="text-box">
            Thank you for registering with Indexx Hive! To achieve Hive Captain
            status and begin earning, it's essential to acquire the Captain
            Power Pack. Simply click here to make the purchase – it's the
            minimum requirement to become a Hive Captain.
          </div>
          <div class="button-box w-100 mx-0">
            <button class="button-btn w-75" onClick={handleClick}>
              Buy Power Pack
            </button>
          </div>
          <div class="large-text">
            You will be able to buy/sell crypto once you have purchased the
            power pack and your KYC is verified within 1-2 Working Days.
          </div>
        </div>
      </div>
    </>
  );
};

export default PackPurchase;
