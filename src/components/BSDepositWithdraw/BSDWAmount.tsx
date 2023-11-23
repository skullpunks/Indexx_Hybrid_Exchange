import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
// import RecordedIcon from "../../assets/arts/RecordedIcon.svg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createFiatWithdraw, decodeJWT, getUserWallets } from '../../services/api';
import OpenNotification from '../OpenNotification/OpenNotification';

function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout | null;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout!);
            func(...args);
        };

        clearTimeout(timeout!);
        timeout = setTimeout(later, wait);
    };
}

export const BSDWAmount = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { beneficiaryName,
        accountNumber,
        bankName,
        routingNumber,
        swiftCode,
        addressLine1,
        city,
        state,
        country,
        zipCode } = location.state || {};
    const [email, setEmail] = useState('');
    const [singleWallet, setSingleWallet] = useState() as any;
    const [amount, setAmount] = useState('');
    const [finalAmount, setFinalAmount] = useState('');
    const [loadings, setLoadings] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const decodedToken: any = decodeJWT(String(token)) as any;
        setEmail(decodedToken.email);
        getUserWallets(decodedToken?.email).then((res) => {
            let requiredCoin = res.data.find((x: any) => x.coinSymbol === "USD");
            console.log("requiredCoin", requiredCoin)
            setSingleWallet(requiredCoin)
        });

    }, []);

    const handleSubmit = async () => {
        const res = await createFiatWithdraw(email, "USD", beneficiaryName,
            accountNumber,
            bankName,
            routingNumber,
            swiftCode,
            addressLine1,
            city,
            state,
            country,
            zipCode,
            finalAmount);
        if (res.status === 200) {
            OpenNotification('success', res.data.message);
            setLoadings(false);
        } else {
            setLoadings(false);
            OpenNotification(
                'error',
                'Failed to withdraw. Please try again or contact support'
            );
        }

        navigate("/indexx-exchange/buy-sell/withdraw/recorded");
    }

    const handleEdit = () => {
        navigate("/indexx-exchange/buy-sell/withdraw/info", {
            state: {
                beneficiaryName,
                accountNumber,
                bankName,
                swiftCode,
                addressLine1,
                city,
                state,
                country,
                zipCode
            }
        });
    };
    const performSubtraction = (inputValue: any) => {
        if (inputValue === '') {
            setFinalAmount(''); // Reset the amount if the input is empty
            return;
        }
        let val = Number(inputValue) - 5; // Subtract 5
        setFinalAmount(val.toString());
    };

    const debouncedSubtraction = debounce(performSubtraction, 2000); // 2 seconds delay

    const onchange = (e: any) => {
        const inputValue = e.currentTarget.value;
        setAmount(inputValue);   // store raw input
        debouncedSubtraction(inputValue);  // process and update displayAmount after a delay
    };

    return (
        <div className='scan-container bs_main wd_container'>
            <div className='d-flex w_fiat flex-justify-between flex-align-center deposit_ontainer'>
                <div className='d-flex flex-align-center top_heading'>
                    Withdraw Fiat</div>
                <div className='flex-justify-between flex-grow-1 d-flex'> <div className='order_history'> <Button danger className='margin-l-2x'>Order History<ArrowRightOutlined /></Button></div>
                    <Button danger className='danger_disabled' onClick={() => navigate("/indexx-exchange/buy-sell/withdraw-crypto")}>
                        Withdraw Crypto<ArrowRightOutlined /></Button></div>
            </div>
            <div className='card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x responsive_container'>
                <h1 className='padding-lr-2x padding-t-2x'>2. Enter Amount</h1>
                <div className='padding-t-2x'>
                    <div className='d-flex flex-justify-between'><label>Amount</label><label>Transaction Requirements</label></div>
                    <div className='d-flex flex-justify-between border-1x flex-align-center padding-1x'>
                        {/* <div className='font_23x flex-align-center brand_opacity_5'>Enter 20-50000</div> */}
                        <input type="number" placeholder="Enter 20-50000" className='no-outline brand_color border-0 w-50 font_23x' value={amount} onChange={onchange} />
                        <div className="font_13x">Balance:  <span className='text_link'>{Math.floor(singleWallet?.coinBalance * 100) / 100} USD</span>
                        </div>
                    </div>
                </div>

                <div className='margin-t-2x padding-tb-2x'>
                    <div className='font_!3x'>You receive:</div>
                    <div className='font_23x'>{finalAmount} USD</div>
                </div>
                <div className='d-flex padding-tb-2x'>
                    <div>
                        <div className='font_13x brand_opacity_5'>Bank Account: {accountNumber} {" "}
                            <span className='text_link' onClick={handleEdit}>Edit Account</span></div>
                        <div className='font_13x brand_opacity_5'>Transaction method: Bank Transfer(SWIFT) - {swiftCode}</div>
                        <div className='font_13x brand_opacity_5'>Transaction Fee:  5.00 USD </div>
                        <div className='font_13x brand_opacity_5'>Minimum withdraw:  50.00 USD </div>
                    </div>
                </div>
                <div className='d-flex flex_buttons flex-justify-between margin-b-2x margin-t-auto'>
                    <Button type="primary" onClick={handleEdit}>
                        Previous
                    </Button>

                    <Button type="primary" disabled={!(Number(finalAmount) >= 50 && Number(finalAmount) <= (singleWallet?.coinBalance || 0))} className={!(Number(finalAmount) >= 50 && Number(finalAmount) <= (singleWallet?.coinBalance || 0)) ? 'disabled_button font_23x' : 'font_23x'} onClick={handleSubmit} loading={loadings}>
                        Continue
                    </Button>
                </div>
            </div>
            <div className='margin-lr-auto row'> <p className='margin-lr-auto padding-t-2x max_400 col-md-12'>NOTE: The arrival time of withdrawal depends on the region of your receiving bank. Usually it takes 2-4 business days.</p>
            </div>

        </div>

    )
}

export default BSDWAmount;
