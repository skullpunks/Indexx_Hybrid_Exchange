
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/token-icons/BNB.png';

import { marketsData} from '../../services/api';
import { useEffect, useState } from 'react';

const BinanceMarket = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    useEffect(() => {
        marketsData().then((res) => {
            let requiredData = res.data.find((x: { Symbol: string; }) => x.Symbol === "BNB");
            setData(requiredData);
        });
    }, []);
    return (
        <div
            className="d-flex justify-content-center"
            style={{ marginBottom: 300 }}
        >
            <div className="coll">
                <Collapse
                    ghost={true}
                    accordion
                    style={{

                        textAlign: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        color: '#5f5f5f',
                    }}
                >
                    <Panel
                        showArrow={false}
                        style={{ backgroundColor: 'white', fontSize: 30, color: '' }}
                        header="Market"
                        key="1"
                    >
                        <Divider style={{ marginTop: -20 }}></Divider>
                        <p style={{ fontSize: 10 }}>
                            <div className="row">
                                <div className="col" style={{ textAlign: 'left' }}>
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>Market Cap</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>{data?.MarketCap}</p> <br />

                                    <br />
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>POPULARITY</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>#5</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>PRICE CHANGE (7D)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>-17.19%</p><br />
                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>VOLUME (24H)</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>{Math.floor(data?.Volume * 100) / 100}</p><br />

                                 <br />
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>ALL TIME HIGH</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>$690.93</p><br />

                                    
                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>


                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>CIRCULATING SUPPLY</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>{data?.CirculatingSupply} BNB</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>PRICE CHANGE (1H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>+0.41%</p><br />



                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>TYPICAL HOLD TIME</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>1 Year</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>PRICE CHANGE (24H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>-3.66%</p><br />
                                </div>
                            </div>
                        </p>
                    </Panel>
                    <Divider></Divider>
                    <Panel
                        showArrow={false}
                        style={{
                            backgroundColor: 'white',
                            fontSize: 30,
                            color: '#5F5F5F',
                        }}
                        header="About"
                        key="2"
                    ><Divider style={{ marginTop: -20 }}></Divider>
                        <div style={{ textAlign: 'left', color: '#5F5F5F' }}>
                            <Image preview={false} style={{ marginBottom: 10, width:82, height:82 }} src={ca}></Image><br />
                            <p style={{ fontSize: 20 }}>Binance </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                                BNB is a cryptocurrency that can be used to trade and pay fees on the Binance cryptocurrency exchange. BNB is also the cryptocurrency coin that powers the BNB Chain ecosystem. As one of the world's most popular utility tokens, BNB is useful to users in a wide range of applications and use cases.
                            </p>
                            <br />

                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                                BNB was launched through an Initial Coin Offering (or ICO) that took place from June 26th to July 3rd, 2017 - 11 days before the Binance Exchange opened for trading. The issue price was 1 ETH for 2,700 BNB or 1 BTC for 20,000 BNB. Although BNB was launched through an ICO, BNB does not provide users with a claim on Binance profits and does not represent an investment in Binance.
                            </p>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default BinanceMarket;