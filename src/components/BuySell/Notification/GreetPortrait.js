import { baseCEXURL, baseHiveURL } from '../../../services/api';
import './GreetLandscape.css';

const GreetPortrait = ({
  isVisible,
  onClose,
  name,
  amount,
  captainName,
  refCode,
  type,
}) => {
  if (!isVisible) return null;

  return (
    <>
      <div class="main-pay-box">
        <div class="greet-portrait-box">
          <div className="close-button-greet" onClick={onClose}>
            &times; {/* This is the close button (X) */}
          </div>
          <div class="main-head">🎄Holiday Cheers from Hive Captain! 🐝🎁</div>
          <div class="greet-text-portrait">
            Dear {name},
            <br />
            Wishing you joy this season! 🎅🎉 Join our hive and enjoy an
            exclusive festive bonus:
            <br />
            <br />
            🌟 Register with{' '}
            {type === 'captainbee' ? (
              <a
                href={`${baseHiveURL}/sign-up?referral=${refCode}`}
                className="hive_link"
              >
                referral link
              </a>
            ) : (
              <a
                href={`${baseCEXURL}/indexx-exchange/buy-sell/get-started-honeybee?referral=${refCode}`}
                className="hive_link"
              >
                referral link
              </a>
            )}{' '}
            <br />
            💰 Instant bonus in your wallet of{' '}
            <span className="fw-bold">
              {amount} {' INEX'}
            </span>
            <br />
            <br />
            🎊 How to Claim:
            <br />
            1. Click the{' '}
            {type === 'captainbee' ? (
              <a
                href={`${baseHiveURL}/sign-up?referral=${refCode}`}
                className="hive_link"
              >
                link
              </a>
            ) : (
              <a
                href={`${baseCEXURL}/indexx-exchange/buy-sell/get-started-honeybee?referral=${refCode}`}
                className="hive_link"
              >
                link
              </a>
            )}
            <br />
            2. Fill the form
            <br />
            3. Verify your email
            <br />
            <br />
            Enjoy your instant bonus!
            <br />
            Dive into the hive as a Hive Captain or Honeybee for growth,
            connections, and perks. Here's to a sweet and successful festive
            season!
            <br />
            <br />
            Best,
            <br />
            Hive Captain {captainName}
            <br />
            Indexx Hive
          </div>
        </div>
      </div>
    </>
  );
};

export default GreetPortrait;
