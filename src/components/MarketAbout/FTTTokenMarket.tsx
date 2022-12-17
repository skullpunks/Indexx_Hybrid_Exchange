
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/token-icons/FTT.png';
import { marketsData } from '../../services/api';
import { useEffect, useState } from 'react';

const FTTTokenMarket = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    useEffect(() => {
        marketsData().then((res) => {
            let requiredData = res.data.find((x: { Symbol: string; }) => x.Symbol === "FTT");
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
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>Not enough data</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>PRICE CHANGE (7D)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>0%</p><br />
                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>VOLUME (24H)</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>{Math.floor(data?.Volume * 100) / 100}</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>ALL TIME HIGH</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>$0.15</p><br />


                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>


                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>CIRCULATING SUPPLY</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>{data?.CirculatingSupply} FTT</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>PRICE CHANGE (1H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>0%</p><br />



                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>TYPICAL HOLD TIME</p>
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>1 Year</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: '#5F5F5F', opacity: '60%' }}>PRICE CHANGE (24H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>0%</p><br />
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
                            <Image preview={false} style={{ marginBottom: 10, width: 82, height: 82 }} src={ca}></Image><br />
                            <p style={{ fontSize: 20 }}>FTT Token </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                                FTX is a crypto derivatives exchange built to offer futures, leveraged tokens, and OTC trading. Derivatives are a financial contract between two or more parties that can trade on an exchange. Futures are the derivatives that make the parties obligated to transact an asset at the future date and price. Over-the-counter (OTC) is the process of how securities are traded through a broker-dealer network. These securities are traded directly without being listed on the exchange..
                            </p>
                            <br />

                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                                The mission of FTX is to solve the futures exchanges’ crippling flaws that are holding the space back and move the derivatives space towards becoming institutional-grade. According to the whitepaper summary, FTX wants to be one of the best crypto derivatives exchanges.
                            </p>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default FTTTokenMarket;