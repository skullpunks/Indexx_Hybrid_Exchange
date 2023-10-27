
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/token-icons/TRX.png';

import { marketsData } from '../../services/api';
import { useEffect, useState } from 'react';

const TronMarket = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    useEffect(() => {
        marketsData().then((res) => {
            let requiredData = res.data.find((x: { Symbol: string; }) => x.Symbol === "TRX");
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
                        color: 'var(--body_color)',
                    }}
                >
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
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>#9</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>PRICE CHANGE (7D)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>-17.19%</p><br />
                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>VOLUME (24H)</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{Math.floor(data?.Volume * 100) / 100}</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>ALL TIME HIGH</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>$2.35</p><br />


                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>


                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>CIRCULATING SUPPLY</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{data?.CirculatingSupply} TRX</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>PRICE CHANGE (1H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>+0.41%</p><br />



                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>

                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>TYPICAL HOLD TIME</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>1 Year</p><br />

                                    <br />
                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>PRICE CHANGE (24H)</p>
                                    <p style={{ fontSize: 10, color: 'red' }}>-3.66%</p><br />
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
                        header="About"
                        key="2"
                    ><Divider style={{ marginTop: -20 }}></Divider>
                        <div style={{ textAlign: 'left', color: 'var(--body_color)' }}>
                            <Image preview={false} style={{ marginBottom: 10, width: 82, height: 82 }} src={ca}></Image><br />
                            <p style={{ fontSize: 20 }}>TRX </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                            TRON (TRX) is a decentralized blockchain-based operating system developed by the Tron Foundation and launched in 2017. Originally TRX tokens were ERC-20-based tokens deployed on Ethereum, but a year later they were moved to their own network.

                            Initially, the project was created with the aim of providing full ownership rights to makers of digital content. The main goal is to help content creators (who receive only a small part of the income) and encourage them with more rewards for their work. How: invite content consumers to reward content makers directly (without intermediaries like YouTube, Facebook or Apple).

                            The TRON software supports smart contracts, various kinds of blockchain systems, and decentralized applications aka dApps. The cryptocurrency platform uses a transaction model similar to Bitcoin (BTC), namely UTXO. Transactions take place in a public ledger, where users can track the history of operations.
                            </p>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default TronMarket;