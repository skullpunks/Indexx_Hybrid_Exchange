
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/token-icons/LTC.png';
import { marketsData } from '../../services/api';
import { useEffect, useState } from 'react';

const LitecoinMarket = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    useEffect(() => {
        marketsData().then((res) => {
            let requiredData = res.data.find((x: { Symbol: string; }) => x.Symbol === "LTC");
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
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>#9</p><br />

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
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>{data?.CirculatingSupply} LTC</p><br />

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
                            <p style={{ fontSize: 20 }}>Litecoin </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>

                                Litecoin (LTC) is an alternative cryptocurrency created in October 2011 by Charles "Charlie" Lee, a former Google engineer. Litecoin was adapted from Bitcoin's open-source code but with several modifications. Like Bitcoin, Litecoin is based on an open-source global payment network that is not controlled by any central authority. Litecoin differs from Bitcoin in aspects like faster block generation rate and use of Scrypt as a proof of work scheme.
                            </p>
                            <br />

                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                                It is considered to be among the first altcoins, derived from Bitcoin's original open-source code.
                                Initially, it was a strong competitor to Bitcoin. However, as the cryptocurrency market has become much more saturated and competitive in recent years with new offerings, Litecoin's popularity has waned somewhat.
                            </p>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default LitecoinMarket;