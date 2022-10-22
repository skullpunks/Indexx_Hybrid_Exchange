import tradeIcon from "../../assets/arts/tradeIcon.svg";
import earnIcon from "../../assets/arts/earnIcon.svg";


const Intro = () => {
    return (
        <div className="help_content_page" style={{ height: "max-content" }}>
            <div className="nav_main_header border-b">
                <h1> Indexx Intro </h1>
            </div>
            <div className="info">
                Indexx helps you make the most out of your crypto in two ways: Trade
                and Earn.
            </div>
            <div className="trade_content nav_section border-b">
                <div className="section_header d-flex">
                    <h1><img src={tradeIcon} alt="trade icon" />Trade</h1>
                </div>
                <p>Instantly  crypto tokens: no registration or account needed.</p>
                <h1>The people's choice</h1>
                <p>
                    indexx is the leading decentralized exchange on BNB Smart Chain,
                    with the highest trading volumes in the market.
                </p>
                <h1>Low fees</h1>
                <p className="margin-b-0 ">
                    Why pay more? indexx runs on BNB Smart Chain, a blockchain with
                    much lower transaction costs than Ethereum or Bitcoin.
                </p>
                <p className="margin-t-0">
                    Trading fees are lower than other top decentralized exchanges too, so
                    that's a double win for you!
                </p>
                <h1>Decentralized</h1>
                <p className="margin-b-0">Trade directly from your wallet app.</p>
                <p className="margin-t-0 margin-b-0">
                    Unlike centralized exchanges like Binance or Coinbase, Indexx
                    doesn’t hold your funds when you trade: you have 100% ownership of
                    your own crypto
                </p>
            </div>
            <div className=" earn_content nav_section">
                <div className="section_header d-flex">
                    <h1><img src={earnIcon} alt="Earn icon" /> Earn</h1>
                </div>
                <p>
                    Earn INDEXX tokens and other tokens for free with super high interest
                    rates.
                </p>
                <h1>Earn tokens with Syrup Pools</h1>
                <p className="margin-b-0 ">
                    take INDEXX, earn free tokens. It’s really that easy.
                </p>
                <p className="margin-t-0 ">
                    INDEXX holders right now are earning tens of millions of USD worth of
                    free tokens each week from major projects. New projects join the party
                    frequently, so you can earn more, for even longer.
                </p>
                <h1>Earn INDEXX Token with Yield Farms</h1>

                <p>
                    Stake LP tokens, earn INDEXX tokens. You take on a little more
                    exposure to market fluctuations than with the Syrup Pools, but can
                    earn higher APR to offset the risk.
                </p>
                <h1>Earn Trading Fees</h1>
                <p>
                    No farm? No problem. Even if your trading pair isn’t supported on the
                    Farms page, you can still earn trading fees when you stake your tokens
                    in Liquidity Pools (LPs).
                </p>
            </div>
        </div>
    )
}

export default Intro