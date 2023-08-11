
import { Collapse, Divider, Image } from 'antd';
import ca from '../../assets/token-icons/ETH.png';
import { marketsData } from '../../services/api';
import { useEffect, useState } from 'react';

const EthereumMarket = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState() as any;
    useEffect(() => {
        marketsData().then((res) => {
            let requiredData = res.data.find((x: { Symbol: string; }) => x.Symbol === "ETH");
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
                                    <p style={{ fontSize: 10, color: 'var(--body_color)' }}>{data?.CirculatingSupply} ETH</p><br />

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
                        header="About"
                        key="2"
                    ><Divider style={{ marginTop: -20 }}></Divider>
                        <div style={{ textAlign: 'left', color: 'var(--body_color)' }}>
                            <Image preview={false} style={{ marginBottom: 10, width: 82, height: 82 }} src={ca}></Image><br />
                            <p style={{ fontSize: 20 }}>Ethereum </p>
                            <p style={{ fontSize: 15, lineHeight: 2 }}>

                                Ethereum (ETH) is the second-largest cryptocurrency token in terms of market capitalization. This is due to the fact that it has brought a lot of innovation and use-cases within the industry by introducing smart contract functionality, which has paved the way for the decentralized finance industry (DeFi) and decentralized apps, or Dapps.
                                <br />

                                Ethereum allows users to build and deploy software, commonly in the form of Dapps, which are then powered by a global distributed network of computers all running Ethereum. The Ethereum network is decentralized, making it highly resistant to any form of censorship or downtime.
                                In addition, Ethereum is an open-source blockchain platform that runs on the usage of its native currency, called Ether or ETH. All network transaction fees, or gas fees, are paid in ETH.
                                <br />

                                Ethereum or ETH is a token that is specifically used by the Ethereum blockchain to pay for transactions. This token is responsible for powering just about everything that occurs within the network.
                                <br />

                                The Ethereum network can be used by anybody to create and run smart contracts, which are software programs that run autonomously, without user intervention. Ethereum’s growth can be attributed in part to its smart contract capability, which has enabled a growing ecosystem of Dapps, non-fungible tokens (NFTs) and more.
                                By default, Ethereum uses the Proof-of-Work (PoW) consensus mechanism, but the network is slowly migrating to a Proof-of-Stake (PoS) as part of its Ethereum 2.0 upgrade. The Ethereum 2.0 upgrade started in December of 2020 with the launch of the Beacon Chain. The ETH community supported this upgrade by staking 1 million ETH in the first week alone.

                                .
                            </p>
                            <br />
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
};

export default EthereumMarket;