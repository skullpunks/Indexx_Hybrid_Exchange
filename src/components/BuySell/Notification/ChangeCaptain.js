import './NeedPermission.css';
import logo from "../../../assets/hat2 4.svg";
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useState } from 'react';

const ChangeCaptain = ({ isVisible, onClose}) => {
    const navigate = useNavigate();
    const [referral, setReferral] = useState();
    if (!isVisible) return null;
    const handleClick = () => {
        onClose();
    }
    const handleSubmit = () => {
        onClose();
    }
    return (
        <>
            <div class='main-box'>

                <div class='second-box'>
                    <img src={logo} class="center" style={{ margin: "auto", paddingTop: "1.25rem" }}  width={100} alt="img" /> 
                    <div class='text-box-2 my-2 w-50'>
                        Enter the referral code of the new Captain Bee
                    </div>
                    <div style={{width:"370.89px"}}>

                        <TextField
                    variant="outlined"
                    placeholder="Enter the referral code "
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '100%' }}
                    size="small" // Make the input box smaller
                    value={referral}
                    onChange={(e) => {
                      setReferral(e.target.value);
                    }}
                  />
                    </div>
                    <div class='button-box-2'>
                        <button class='button-btn' onClick={handleClick}>
                            Back
                        </button>
                        <button class='button-btn' onClick={handleSubmit} style={{marginLeft:"20px"}}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangeCaptain;