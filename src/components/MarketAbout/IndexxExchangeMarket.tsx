
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/about-icons/inex_4_11zon.png';
import { baseURL, marketsData} from '../../services/api';
import { useEffect, useState } from 'react';
import './MarketAbout.css'
const IndexxExchangeMarket = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    useEffect(() => {
        marketsData().then((res) => {
            let requiredData = res.data.find((x: { Symbol: string; }) => x.Symbol === "INEX");
            setData(requiredData);
        });
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
                    <Panel
                        showArrow={false}
                        style={{ backgroundColor: 'var(--body_background)', fontSize: 30, color: 'var(--body_color)' }}
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
                                    <p style={{ fontSize: 10, color: 'red' }}>0%</p><br />
                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>VOLUME (24H)</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{Math.floor(data?.Volume * 100) / 100}</p><br />

                                 <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>ALL TIME HIGH</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>$0.15</p><br />

                                    
                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>


                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>CIRCULATING SUPPLY</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{data?.CirculatingSupply} INEX</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>PRICE CHANGE (1H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>0%</p><br />



                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>TYPICAL HOLD TIME</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>1 Year</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>PRICE CHANGE (24H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>0%</p><br />
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
                        header="About Indexx Exchange"
                        key="2"
                    ><Divider style={{ marginTop: -20 }}></Divider>
                        <div style={{ textAlign: 'left', color: 'var(--body_color)' }}>
                            <Image preview={false} style={{ marginBottom: 10, width:82, height:82 }} src={ca}></Image><br />
                            <p style={{ fontSize: 20 }}>Indexx Exchange </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                                Indexx.ai’s Utility and Reward Token. It will be needed to
                                participate in all derivatives like Daily Fortune, Casino and
                                Games. The price is low at the moment but has the highest
                                potential to increase value because of its characteristics,
                                demand and need. Now is the best time to buy and hold your Indexx INEX tokens. The current price per INEX token is $2.00, while being predicted to increase in value within 3 - 6 months time.  
                            </p>
                            <br />

                            <p style={{ fontSize: 20 }}>How It Works </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                                Indexx Exchange-based apps are built using “smart contracts.”
                                Smart contracts, like regular paper contracts, establish the
                                terms of an arrangement between parties. But unlike an
                                old-fashioned contract, smart contracts automatically execute
                                when the terms are met without the need for either
                                participating party to know who is on the other side of the
                                deal — and without the need for any kind of intermediary.
                            </p>
                            <div className='font_15x d-flex justify-content-center'>
                                <a href={`${baseURL}/indexx-exchange/token-details/inex`} className='text_link'>Learn More</a>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default IndexxExchangeMarket;