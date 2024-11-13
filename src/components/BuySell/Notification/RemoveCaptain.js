import './NeedPermission.css';
import logo from '../../../assets/infro icon 2.svg';
import { useNavigate } from 'react-router-dom';

const RemoveCaptain = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  if (!isVisible) return null;
  const handleClick = () => {
    onClose();
  };
  const handleSubmit = () => {
    onClose();
  };
  return (
    <>
      <div class="main-box">
        <div class="second-box">
          <img
            src={logo}
            class="center"
            style={{ margin: 'auto', paddingTop: '1.25rem' }}
            width={78}
            alt="img"
          />
          <div class="text-box-2 my-3">
            Are you sure you want to remove your Hive Captain?
          </div>
          <div class="button-box">
            <button class="button-btn" onClick={handleClick}>
              Back
            </button>
            <button
              class="button-btn"
              onClick={handleSubmit}
              style={{ marginLeft: '20px' }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveCaptain;
