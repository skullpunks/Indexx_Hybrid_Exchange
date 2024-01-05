import './InvestElite.css';
import calendar from '../../../assets/hive-dashboard/greet-cards/cal.png';
import code from '../../../assets/hive-dashboard/greet-cards/qr black.png';
import code_dark from '../../../assets/hive-dashboard/greet-cards/qr white.png';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const InvestElite = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || "light"
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!isVisible) return null;
  const handleClick = () => {
    // location.href = "https://app.cal.com/brian-z/30min";
    onClose();
    window.open(
      'https://app.cal.com/brian-z/30min',
      '_blank' // <- This is what makes it open in a new window.
    );
}
const handleClickChat = () => {
  // location.href = "https://app.cal.com/brian-z/30min";
  onClose();
  window.open(
    'https://u.wechat.com/kBAwbUcsyTwyhnEnnDQmdV4',
    '_blank' // <- This is what makes it open in a new window.
  );
}

  return (
    <>
      <div class="main-pay-box">
        <div class="elite-box">
          <div className="elite-close-button-pay" onClick={onClose}>
            &times; {/* This is the close button (X) */}
          </div>
          <div class="elite-text-box">Contact Indexx VIP Management to Invest</div>
          <div className='d-flex w-100 align-items-end'>
            
            <div className='elite-det'>

            <img src={calendar} alt="calendar" style={{ height:"224px"}} />
            <div class="elite-button-box ">
              <button className="elite-button-btn" 
              onClick={handleClick} 
              >
              Book 30 mins Appointment 
              </button>
            </div>
            </div>

            <div className='elite-det'>
            <img src={theme === "dark" ? code_dark : code} alt="code"  style={{ height:"224px"}} />
            <div class="elite-button-box" >
              <button className="elite-button-btn"
              onClick={handleClickChat} 
              >
                Indexx.ai WeChat
              </button>
            </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default InvestElite;
