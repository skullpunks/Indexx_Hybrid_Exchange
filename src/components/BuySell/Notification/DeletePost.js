import './EditPost.css';
import logo from '../../../assets/hive-dashboard/sidebar/trash_bin 3.png';
import bin_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/trash_bin 3.png';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DeletePost = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
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
    onClose();
  };
  const handleSubmit = () => {
    onClose();
  };

  return (
    <>
      <div class="main-box">
        <div class="post-box">
          <div className="close-button-pay" onClick={onClose}>
            &times; {/* This is the close button (X) */}
          </div>
          <div class="post-text-box p-0">
            <img src={theme === 'dark' ? bin_dark : logo} alt="bin" />
          </div>
          <div class="post-text-box" style={{ fontSize: '15px' }}>
            Are you sure you want to remove this post from Honeycomb?
          </div>
          <div class="post-button-box">
            <button class="button-btn-outlined" onClick={handleClick}>
              Cancel
            </button>
            <button
              class="button-btn"
              onClick={handleSubmit}
              style={{ marginLeft: '20px' }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePost;
