import './NeedPermission.css';
import logo from "../../../assets/infro icon 2.svg";
import { useNavigate } from 'react-router-dom';

const NeedPermission = ({ isVisible, onClose, message, id }) => {
    const navigate = useNavigate();
    console.log(id, "id");
    if (!isVisible) return null;
    const handleClick = () => {
        navigate(`/indexx-exchange/dashboard/capt-mybees/${id}`, { replace: true }); 
        onClose();
    }
    return (
        <>
            <div class='main-box'>
            <div className='close-button' onClick={onClose}>
                &times; {/* This is the close button (X) */}
            </div>

                <div class='second-box'>
                    <img src={logo} class="center" style={{ margin: "auto", paddingTop: "1.25rem" }}  width={78} alt="img" /> 
                    <div class='text-box-2'>
                        {message}
                    </div>
                    <div class='button-box'>
                        <button class='button-btn' onClick={handleClick}>
                            Apply for permission
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NeedPermission;