import './EditPost.css';
import logo from "../../../assets/infro icon 2.svg";
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';

import frame from '../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../assets/hive-dashboard/dummy.jpeg';
import { useState } from 'react';

const EditPost = ({ isVisible, onClose, message, captainData}) => {
    const navigate = useNavigate();
    console.log(message, "msg first");
    const [msg, setmsg] = useState(message?.publicMessage);
    if (!isVisible) return null;
    const handleClick = () => {
        setmsg();
        onClose();
    }
    console.log(message.publicMessage, "msg");
    const handleSubmit = () => {
        onClose();
    }
    return (
        <>
        <div class="main-box">
        <div class="post-box">
          <div className="close-button-pay" onClick={onClose}>
            &times; {/* This is the close button (X) */}
          </div>
          
          <Box className="d-flex align-items-center">
                      <Box
                        style={{
                          width: '80px',
                          height: '80px',
                          backgroundImage: `url(${frame})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          position: 'relative',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          // border:"none"
                        }}
                      >
                        <Box className="bee-hexagon">
                          <img
                            alt=""
                            src={(captainData?.affiliateUserProfile?.photoIdFileurl !== undefined) ? captainData?.affiliateUserProfile?.photoIdFileurl : dummy}
                            width={'63px'}
                            height={'66px'}
                            ml={'-6px'}
                            border={'none'}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "baseline",
                          backgroundColor: 'transparent',
                          border: "none",
                          height: '50px',
                          marginLeft: '-35px',
                          pl: 4,
                          width: '311px',
                          transition: "0.3s ease-in-out",
                        }}
                      >
                        <div className="font_15x d-flex align-items-center">
                          Captain Bee {captainData?.affiliateUserProfile?.accname}
                        </div>
                        </Box>
                      </Box>
                      <TextField
                    variant="outlined"
                    placeholder="Message"
                    InputLabelProps={{ shrink: true }}
                    sx={{ my: 2, width: '100%' }}
                    size="small" // Make the input box smaller
                    value={msg}
                    defaultValue={message?.publicMessage}
                    onChange={(e) => {
                      setmsg(e.target.value);
                    }}
                  />
          <div class='post-button-box'>
                        <button class='button-btn-outlined' onClick={handleClick}>
                            Cancel
                        </button>
                        <button class='button-btn' onClick={handleSubmit} style={{marginLeft:"20px"}}>
                            Save
                        </button>
                    </div>
        </div>
      </div>
        </>
    );
}

export default EditPost;