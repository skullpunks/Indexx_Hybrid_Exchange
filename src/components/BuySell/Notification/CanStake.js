import './NeedPermission.css';
import logo from "../../../assets/arts/fortune-07.png";
import normal_logo from "../../../assets/arts/canstake.svg";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import wallet from '../../../assets/BSheader/funding grey 1.svg';
import pig from '../../../assets/arts/pig staking 1.svg';
// import nectar from '../../../assets/arts/nectar 6.svg';
import nectar from '../../../assets/BSheader/nectar black.svg';

const CanStake = ({ isVisible, onClose}) => {
    const navigate = useNavigate();
    if (!isVisible) return null;
    const handleClickWallet = () => {
        navigate(`/indexx-exchange/buy-sell/wallet`, { replace: true });
        onClose();
    }

    const handleClickStake = () => {
        navigate(`/indexx-exchange/buy-sell/staking`, { replace: true });
        onClose();
    }
    return (
        <>
            <div class='main-box'>
                <div class='third-box'>
                <div className='close-button-stake' onClick={onClose}>
                    &times;
                </div>
                    <img src={localStorage.getItem("userlogged") === "normal" ? normal_logo : logo} class="center" style={{ margin: "auto", paddingTop: "1.25rem" }} width={"213px"}  alt="img" /> 
                    <div class='text-box'>
                        Did you know?
                    </div>
                    <div class='text-box-stake'>
                    You can stake your <b> INEX </b> on our new <a className="hive_link" href="/indexx-exchange/buy-sell/staking"> Staking </a>  platform and get the best APY yields in the industry.
                    </div>
                    <div class='button-box-2' style={{width:"87%", gap:"15px"}}>
                    <Button
                        variant="outlined"
                        disableTouchRipple
                        onClick={handleClickWallet}
                        className='ant-btn stake-outlined-btn'
                        style={{height:"44px", color:"var(--dark_text)"}}
                    >
                    <img src={wallet} class="center" style={{ height:"35px", marginRight:"5px" }}  alt="img" />
                        Asset Wallet
                    </Button>
                    <Button
                        variant="contained"
                        disableTouchRipple
                        className='ant-btn ant-btn-primary stake-btn'
                        onClick={handleClickStake}
                        style={{height:"44px", color:"#282828"}}
                    >
                        {localStorage.getItem("userlogged") === "normal" ? 
                        <>
                        <img src={pig} class="center" style={{ height:"35px", marginRight:"5px" }}  alt="img" />
                        Staking
                        </>
                        :
                        <>
                        <img src={nectar} class="center" style={{ height:"33px", marginRight:"5px" }}  alt="img" />
                        Nectar
                        </>
                        }
                    </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CanStake;