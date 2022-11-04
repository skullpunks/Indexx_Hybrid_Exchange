import { Tabs } from 'antd';
import './First.css';
import { Select,  Menu} from 'antd';
const First = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className='flex justify-center text-grey text-3xl mb-3 mt-36'>Crypto Exchange</div>
            <div class='flex justify-center text-grey'>Free from sign-up, limits, complications</div>
            <div class='mx-[550px] border border-grey border-opacity-20 rounded px-5 py-3 mt-7 text-grey'>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Swap" key="1">
                        <input placeholder='You send' class='py-1 border border-opacity-20 border-grey px-3 pr-16 mt-6' />
                        <span class='inline-flex ml-4 text-grey'>
                        <Select
                        defaultValue="BTC"
                        style={{
                            width: 75,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'ada',
                                label: 'ADA',
                            },
                            {
                                value: 'algo',
                                label: 'ALGO',
                            },
                            {
                                value: 'enj',
                                label: 'ENJ',
                            },
                            {
                                value: 'eth',
                                label: 'ETH',
                            },
                        ]}
                    />
                        </span>
                        <div class='text-blue text-[10px] bg-blue bg-opacity-20 ml-7 mt-0.5 mr-28 rounded-sm py-[1px] px-2 whitespace-pre'>Min amount:                           0.00184853</div>

                        <input placeholder='You get' class='py-1 border border-opacity-20 border-grey px-3 pr-16 my-6 ' />
                        <span class='inline-flex ml-4'>
                        <Select
                        defaultValue="ETH"
                        style={{
                            width: 75,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'ada',
                                label: 'ADA',
                            },
                            {
                                value: 'algo',
                                label: 'ALGO',
                            },
                            {
                                value: 'enj',
                                label: 'ENJ',
                            },
                            {
                                value: 'eth',
                                label: 'ETH',
                            },
                        ]}
                    />
                        </span>
                        <a href='/ExchangeSwap'><div class='bg-blue flex justify-center text-white rounded-sm py-2 mb-6'>Exchange</div></a>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Buy/ Sell Crypto" key="2">
                        <input placeholder='You send' class='py-1 border border-opacity-20 border-grey px-3 pr-16 mt-6' />
                        <span class='inline-flex ml-3 text-grey'>
                        <Select
                        defaultValue="USD"
                        style={{
                            width: 75,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'ada',
                                label: 'ADA',
                            },
                            {
                                value: 'algo',
                                label: 'ALGO',
                            },
                            {
                                value: 'enj',
                                label: 'ENJ',
                            },
                            {
                                value: 'eth',
                                label: 'ETH',
                            },
                        ]}
                    />
                        </span>
                        <div class='text-blue text-[10px] bg-blue bg-opacity-20 ml-7 mt-0.5 mr-24 rounded-sm py-[1px] px-2 whitespace-pre'>Min amount:                                           50</div>
                        <input placeholder='You get' class='py-1 border border-opacity-20 border-grey px-3 pr-16 my-6 ' />
                        <span class='inline-flex ml-3'>
                        <Select
                        defaultValue="BTC"
                        style={{
                            width: 75,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'ada',
                                label: 'ADA',
                            },
                            {
                                value: 'algo',
                                label: 'ALGO',
                            },
                            {
                                value: 'enj',
                                label: 'ENJ',
                            },
                            {
                                value: 'eth',
                                label: 'ETH',
                            },
                        ]}
                    />
                        </span>
                        <a href='/Exchange'><div class='bg-blue flex justify-center text-white rounded-sm py-2 mb-6'>Exchange</div></a>
                    </Tabs.TabPane>
                </Tabs>



            </div>

        </>
    );
}

export default First;
