import { CloseCircleFilled } from '@ant-design/icons';
import {
    Button,
    notification
} from 'antd';
import { useEffect, useState } from 'react';
import {
    decodeJWT,
    redeemStockCoupon,
    redeemValue
} from '../../services/api';

export const RedeemStock = () => {
    const [loadings, setLoadings] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [voucher, setVoucher] = useState('');
    const [, setIsLoading] = useState(false);
    const [redeemData, setRedeemData] = useState() as any;
    const [, setIsRedeem] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const decodedToken: any = decodeJWT(String(token)) as any;
        setEmail(decodedToken.email);
    }, []);

    const onChangeVoucherUpdate = (e: any) => {
        // if (e.currentTarget.value) {
        console.log(e.currentTarget.value);
        let val = e.currentTarget.value;
        setVoucher(val);
        // }
    };

    const redeemStock = async () => {
        setLoadings(true);
        let res = await redeemStockCoupon(
            voucher,
            email,
        );
        console.log("res", res);
        if (res?.result?.status === 200) {
            setLoadings(false);
            openNotificationWithIcon2(
                'error',
                res?.message
            );
        } else {
            setLoadings(false);
            openNotificationWithIcon2(
                'error',
                res?.error
            );
        }
    };
    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotificationWithIcon2 = (
        type: NotificationType,
        message: string
    ) => {
        notification[type]({
            message: message,
            description: '',
            icon: <CloseCircleFilled />,
            style: {
                border: '1px solid #11be6a',
                boxShadow: 'none',
                borderRadius: 5,
                top: 100,
            },
        });
    };

    const redeemVoucher = async () => {
        try {
            setIsLoading(true);
            let walletAddress;
            console.log(walletAddress);
            const token = localStorage.getItem('access_token');
            const decodedToken: any = decodeJWT(String(token)) as any;
            let results = await redeemValue(voucher, decodedToken?.email);
            console.log("results.data", results)
            if (results?.status === 200) {
                setRedeemData(results.data);
                setIsRedeem(true);
                setIsLoading(false);
            } else {
                console.log("Result", results?.error);
                openNotificationWithIcon2(
                    'error',
                    results?.error
                );
                setIsLoading(false);
            }
        } catch (err) {
            console.log('err', err);
            setIsLoading(false);
        }
    }
    return (
        <div className="scan-container bs_main wd_container">
            <div className="d-flex w_fiat flex-justify-between flex-align-center d_crypto_Container">
                <div className="d-flex flex-align-center top_heading">
                    <span>Redeem Stock</span>
                </div>
            </div>

            <div className="card bs_container sell_screens margin-lr-auto padding-lr-2x margin-t-3x responsive_container">
                <div className="">
                    <div className="padding-t-1x">
                        <label>Voucher Code</label>
                        <br />
                        <div
                            className="select_container d-flex flex-justify-between flex-align-center"
                            style={{ paddingLeft: 10 }}
                        >
                            <input
                                type="text"
                                placeholder="Enter Voucher Code"
                                className="width-100 font_23x outline-none"
                                style={{ border: 'none' }}
                                value={voucher}
                                onChange={onChangeVoucherUpdate}
                            />

                        </div>
                        <br></br>
                        {!redeemData && <Button
                            danger
                            type="primary"
                            block
                            shape="round"
                            size="large"
                            className="btn_xl"
                            style={{
                                height: '55px',
                                borderRadius: '5px',
                            }}
                            disabled={!voucher}
                            loading={loadings}
                            onClick={() => redeemVoucher()}
                        >
                            Redeem Stock
                        </Button>
                        }
                    </div>

                    {redeemData && (
                        <div className="sensitive_data margin-t-2x">
                            <div className="d-flex flex-justify-between flex_buttons margin-t-2x">
                                <div className="w_50">
                                    <div className="brand_opacity_5">Voucher Code</div>
                                    <div>{redeemData?.giftCard.voucher}</div>
                                </div>


                            </div>

                            <div className="d-flex flex-justify-between padding-t-1x">
                                <div className="w_50">
                                    <div className="brand_opacity_5">Amount</div>
                                    <div>{redeemData?.giftCard?.amount} {redeemData?.giftCard?.baseCurrency}</div>
                                </div>

                                <div className="w_50">
                                    <div className="brand_opacity_5">Card Type</div>
                                    <div>{redeemData?.giftCard?.type}</div>
                                </div>
                            </div>

                            <div className="d-flex flex-justify-between padding-t-1x">
                                <div className="w_50">
                                    <div className="brand_opacity_5">Sub-Type</div>
                                    <div>{redeemData?.giftCard?.subType}</div>
                                </div>

                                <div className="w_50">
                                    <div className="brand_opacity_5">Current Stock Price</div>
                                    <div>{Math.floor(redeemData?.options.getStockVale * 100) / 100} {" USD"}</div>
                                </div>
                            </div>

                            <div className="d-flex flex-justify-between padding-t-1x">
                                <div className="w_65">
                                    <div className="brand_opacity_5">Total Stock Tokens</div>
                                    <div>{redeemData?.options.redeemValue} </div>
                                </div>
                            </div>

                            {redeemData?.giftCard?.isUsed === false && (
                                <div className="d-flex flex-justify-between">
                                    <Button
                                        type="primary"
                                        onClick={() => redeemStock()}
                                        loading={loadings}
                                    >
                                        Redeem Now
                                    </Button>
                                </div>
                            )}
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default RedeemStock;
