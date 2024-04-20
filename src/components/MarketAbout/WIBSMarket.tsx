
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/token-icons/WIBS.png';
import { baseURL, marketsData} from '../../services/api';
import { useEffect, useState } from 'react';
import './MarketAbout.css'
const WIBSMarket = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    useEffect(() => {
        marketsData().then((res) => {
            let requiredData = res.data.find((x: { Symbol: string; }) => x.Symbol === "WIBS");
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
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>$0.00021</p><br />

                                    
                                </div>
                                <div className="col" style={{ textAlign: 'left' }}>


                                    <p style={{ fontSize: 10, color: 'var(--body_color)', opacity: '60%' }}>CIRCULATING SUPPLY</p>
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{data?.CirculatingSupply} WIBS</p><br />

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
                        header="About WhoIsBitcoinSatoshi Meme Coin"
                        key="2"
                    ><Divider style={{ marginTop: -20 }}></Divider>
                        <div style={{ textAlign: 'left', color: 'var(--body_color)' }}>
                            <Image preview={false} style={{ marginBottom: 10, width:82, height:82 }} src={ca}></Image><br />
                            <p style={{ fontSize: 20 }}>WhoIsBitcoinSatoshi Meme Coin </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                               Who Is Bitcoin Satoshi Coin (WIBS) is more than just a cryptocurrency – it's a digital enigma waiting to be unraveled. 
                               With a price of $0.0021 and a symbol of WIBS, this meme coin boasts a total issuance of 210 billion tokens. 
                               Built upon a decentralized framework, the project holds true to Satoshi's vision, with the creator stepping away to 
                               uphold the ethos of anonymity. Utilizing the robust infrastructures of Ethereum blockchais, Who Is Satoshi Coin ensures reliability and scalability.  
                            </p>
                            <br />

                            <p style={{ fontSize: 20 }}>How It Works </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>
                            As the journey unfolds, Who Is Bitcoin Satoshi Coin aims to expand its reach. 
                            Join us in exploring the depths of the digital realm and uncovering the mystery behind Satoshi's legacy.
                            </p>
                            <div className='font_15x d-flex justify-content-center'>
                                <a href={`https://whoisbitcoinsatoshi.wtf/`} className='text_link'>Learn More</a>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default WIBSMarket;