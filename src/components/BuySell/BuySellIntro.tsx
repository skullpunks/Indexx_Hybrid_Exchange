import React from "react";
import { Tabs } from "antd";
import BSConvertIntro from "./BSConvertIntro";
import BSSellIntro from "./BSSellIntro";
import BuyContent from "./BuyContent";
import { BSContext, BSContextType } from '../../utils/SwapContext';
import { useNavigate, useSearchParams } from "react-router-dom";
import lockedimage from "../../assets/arts/locked.png"
import { Button, Checkbox, Form, Input, Modal, notification ,Image} from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { geolocationData } from '../../services/api';
import { useState, useEffect } from 'react';
import "./BuySellIntro.css"

interface Props {
    setScreenName: (value: string | ((prevVar: string) => string)) => void;
}

const filteredArray = (items: any, keyName: any, key: any) => {
    return items.filter(function (obj: any) {
        return obj[keyName] === key;
    });
}

const BuySellIntro: React.FC<(Props)> = ({ setScreenName }) => {

    const [ip, setIP] = useState('');
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [isTransferModalVisible, setIsTransferModalVisible] = useState(true);
    const handleTransferOk = () => {
        localStorage.setItem('userIp', ip);
        setIsTransferModalVisible(false);
    };

    const handleTransferCancel = () => {
        setIsTransferModalVisible(false);
    };

    const handleOk = () => {
        // setLoading(true);
    };

    const [loadings, setLoadings] = useState<boolean>(false);


    useEffect(() => {
        geolocationData().then((res: any) => {
       // axios.get('https://geolocation-db.com/json/').then((res: any) => {
            console.log(res.data);
            setIP(res.data.IPv4);
            setCountry(res.data.country_name);
            setCountryCode(res.data.country_code);
            if (res.data.country_code === 'US') {
                setIsTransferModalVisible(true);
            }
        })
    }, []);


       



    const userId = localStorage.getItem("user");
    const navigate = useNavigate();
    const { BSvalue, setBSvalue } = React.useContext(BSContext) as BSContextType;
    const items = [
        { label: 'Buy', key: '1', value: "buy", children: <BuyContent setScreenName={setScreenName} /> }, // remember to pass the key prop
        { label: 'Sell', key: '2', value: "sell", children: <BSSellIntro setScreenName={setScreenName} /> },
        { label: 'Convert', key: '3', value: "convert", children: <BSConvertIntro setScreenName={setScreenName} /> },
    ];
    const callback = function (key: any) {
        // console.log(key);
        if (key ==="2" && (country === "United States" || countryCode === "US")){
            setIsTransferModalVisible(true)
        }

        const filteredFromArray = items.filter(function (obj) {
            return obj?.key === key;
        });
        if (setBSvalue && BSvalue) {
            setBSvalue({ ...BSvalue, orderType: filteredFromArray[0].value ,amount:0});
        }
        navigate(`/indexx-exchange/buy-sell?type=${filteredFromArray[0].value}`);
    };

    let activeKey = "1";
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(setSearchParams);
    let orderType = searchParams.get("type");
    if (orderType) {
        let fileteredArrayWithItem = filteredArray(items, "value", orderType);
        activeKey = fileteredArrayWithItem[0].key;
    }
    
 
      
    return (<div className="bs_container card">
        {(userId) ?
            <div>
        <Modal centered={true}  visible={isTransferModalVisible} onOk={handleTransferOk} onCancel={handleTransferCancel} width={670} maskClosable={false} 
                            footer={[

                                <Button
                                    className="btn text-white  btn-primary"
                                    danger
                                    size='large'
                                    href="https://dex.indexx.ai"
                                    style={{marginBottom:20,width:"100%"}}
                                    type="primary"
                                    onClick={handleOk}>
                                    
                                    Go To Decentralized
                                </Button>,

                                <Button
                                    className="center"
                                    type="link"
                                    onClick={handleTransferCancel}>
                                    Cancel
                                </Button>,

                            ]}>
                                
                            <div className="align-center text-center">
                                <Image preview={false} src={lockedimage}></Image>
                                <p className="text-center" style={{fontSize:30,fontWeight:400,}}>Service Notice</p>
                                <p>Your IP address indicates that you’re attempting to access our services from the USA. As per our Terms and Use, we’re unable to provide services to users from the region. Instead, please register on our partner platform dedicated to American customers. </p>
                            </div>
                        </Modal>
            <Tabs defaultActiveKey={activeKey} items={items} className="bs_tab_item" onChange={callback} />
            </div>
            :
            <>
                <div className="bs_container_header">
                    <h1>Buy Crypto</h1>
                </div>
                <BuyContent setScreenName={setScreenName} />
            </>
        }


    </div>
    )

}


export default BuySellIntro;