
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/token-icons/APPL.png';
import { marketsData } from '../../services/api';
import { useEffect, useState } from 'react';
import ETFComponentsTable from '../ETFComponentsTable/ETFComponentsTable';
import { ETFData } from './ETFData';
import { useMediaQuery  } from '@mui/material'

const TokenBlendETF = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    const [aboutData, setAboutData] = useState() as any;
    const isMobile = useMediaQuery('(max-width:768px)');
    useEffect(() => {
        // stockMarketsData("TOB").then((res) => {
        //     let requiredData = res.data;
        //     console.log("res.data", requiredData);
        //     setData(requiredData);
        // });
        marketsData().then((res) => {
            let requiredData = res.data.find((x: { Symbol: string; }) => x.Symbol === "TOB");
            console.log("requiredData",requiredData)
            setData(requiredData);
        });
      const allDetails = ETFData.filter((item) => item.symbol === "TOB")[0];
        setAboutData(allDetails);
    }, []);
    return (
        <div
            className="d-flex justify-content-center"
            style={{ marginBottom: 200 }}
        >
            <div className="coll">
                <Collapse
                    ghost={true}
                    accordion
                    style={{

                        textAlign: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        color: 'var(--body_color)',
                    }}
                    defaultActiveKey={2}
                >
                    {/* "Name": "Apple Inc",
        "Symbol": "AAPL",
        "Price": "176.63499",
        "Volume": "10635921",
        "Change": "-0.48172",
        "Change24H": "-0.48172",
        "Change7D": "-0.48172",
        "IUSDPrice": 178.4191818181818,
        "BTCPrice": "176.63499",
        "MarketCap": "$316.67B",
        "CirculatingSupply": "18.63M",
        "LowPrice": "175.80499",
        "HighPrice": "177.36000",
        "Favourite": false */}
                    <Panel
                        showArrow={false}
                        style={{ backgroundColor: 'var(--body_background)', fontSize: 30, color: '' }}
                        header="Market"
                        key="1"
                    >
                        <Divider style={{ marginTop: -20 }}></Divider>
                        <p style={{ fontSize: 10 }}>
                            <div className="row">
                                <div className="col" style={{ textAlign: 'left' }}>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>Market Cap</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{data?.MarketCap}</p> <br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>POPULARITY</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>Not enough data</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>PRICE CHANGE (7D)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>{data?.Change7D}%</p><br />
                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>VOLUME (24H)</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{Math.floor(data?.Volume * 100) / 100}</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>ALL TIME HIGH</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{data?.AllTimeHighPrice}</p><br />


                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>


                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>CIRCULATING SUPPLY</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{data?.CirculatingSupply} ETF</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>PRICE CHANGE (1H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>{data?.Change}%</p><br />



                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>TYPICAL HOLD TIME</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>1 Year</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>PRICE CHANGE (24H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>{data?.Change24H}%</p><br />
                                </div>
                            </div>
                        </p>
                    </Panel>
                    <Divider></Divider>
                    <Panel
                        showArrow={false}
                        style={{
                            backgroundColor: 'var(--body_background)',
                            fontSize: 30,
                            color: 'var(--body_color)',
                        }}
                        header="About Token Blend ETF"
                        key="2"
                    ><Divider style={{ marginTop: -20 }}></Divider>
                        <div style={{ textAlign: 'left', color: 'var(--body_color)' }}>
                            <Image preview={false} style={{ marginBottom: 10, width: 82, height: 82 }} src={aboutData?.small_logo}></Image><br />
                            <p style={{ fontSize: 20, marginBottom:20 }}>{aboutData?.name} </p>
                            <p style={{ fontSize: 15, lineHeight: 2, marginBottom:40 }}>
                                {aboutData?.desc}
                            </p>
                            <p style={{ fontSize: 25, fontWeight: "bold", marginBottom: 25 }}>Components of 
                            {isMobile ? <br/> : <>&nbsp;</>}
                            {aboutData?.name} </p>
                            <ETFComponentsTable symbol={"TOB"} data={data}/>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default TokenBlendETF;