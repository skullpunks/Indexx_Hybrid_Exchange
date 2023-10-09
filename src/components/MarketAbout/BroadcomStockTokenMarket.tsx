
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/token-icons/BCM.png';
import { marketsData, stockMarketsData } from '../../services/api';
import { useEffect, useState } from 'react';

const BroadcomStockTokenMarket = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    useEffect(() => {
        stockMarketsData("AVGO").then((res) => {
            let requiredData = res.data;
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
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{data?.CirculatingSupply} BCM</p><br />

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
                        header="About"
                        key="2"
                    ><Divider style={{ marginTop: -20 }}></Divider>
                        <div style={{ textAlign: 'left', color: 'var(--body_color)' }}>
                            <Image preview={false} style={{ marginBottom: 10, width: 82, height: 82 }} src={ca}></Image><br />
                            <p style={{ fontSize: 20 }}>AVGO Token </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                                Broadcom's AVGO stock token offers ownership in a global technology leader specializing in semiconductor and infrastructure software solutions. By investing in AVGO tokens, you can participate in Broadcom's role in advancing the technology industry. The current price per AVGO stock token is $400, with prospects for value growth in the next 3 - 6 months.
                            </p>
                            <br />
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default BroadcomStockTokenMarket;