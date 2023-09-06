
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/token-icons/INXC.png';
import { marketsData } from '../../services/api';
import { useEffect, useState } from 'react';

const IndexxAMZNMarket = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    useEffect(() => {
        marketsData().then((res) => {
            let requiredData = res.data.find((x: { Symbol: string; }) => x.Symbol === "INXC");
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
                                    <p style={{ fontSize: 10, color: '#5F5F5F' }}>{data?.CirculatingSupply} AMZN</p><br />

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
                            <p style={{ fontSize: 20 }}>Indexx Amazon Stock </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>

                                Indexx Amazon stock

                                Indexx Amazon stock is a High Velocity, High Risk, High Reward Hyper Token
                                Long-term Grow
                                This Indexx Amazon stock token holds the amazon stock assets, allowing the token price to track movements of the broader crypto market.

                            </p>
                            <br />

                            <p style={{ fontSize: 20 }}>How It Works </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                                This Indexx Amazon stock token holds the amazon stock assets, allowing the token price to track movements of the broader crypto market. The token's holdings are re-balanced on a weekly basis (with no asset taking up over 10%). This greatly simplifies the effort required to track the broader market's performance.
                            </p>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default IndexxAMZNMarket;