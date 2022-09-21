import React, { useState } from "react";
import "./sections3.css"

const Actions = {
    "first": [
        {
            heading: "Create an Account in Minutes",
            label: "Buy crypto, easily manage your wallet, and maintain your portfolio",
        },
        {
            heading: "Recurring Buys",
            label: "Automatically invest on a scheduled basis with dollar-cost averaging",
        },
        {
            heading: "Low-Cost Trading",
            label: "Experience our low trading fees",
        },
    ],
    "second": [
        {
            heading: "Advanced Capabilities",
            label: "Powerful interface with real time order books, charting tools, and trade history",
        },
        {
            heading: "More On-Ramps",
            label: "Trade on your terms with numerous cryptocurrency pairs",
        },
        {
            heading: "Dedicated OTC Interface",
            label: "Dedicated OTC Interface Block trading and limited slippage for larger funds",
        },
    ],
    "third": [
        {
            heading: "Dedicated Sales Coverage",
            label: "Customizable institutional trading experience with hands-on support",
        },
        {
            heading: "Higher Funding Limits",
            label: "Increased for both fiat and digital asset funding options",
        },
        {
            heading: "Trading API",
            label: "Integrate with ease and stay connected with the latest charts and markets",
        },
    ]
}

const ActionButtonAndLinks = {
    "second": {
        button: "Get Started",
        link: null
    },
    "third": {
        button: "Apply for Institutional Accounts",
        link: "Official indexx.ai API",
    },
}

const Section3 = () => {
    const [currentData, setCurrentData] = useState("first")
    const getActions = () => {
        const action = Object.entries(Actions).find(entry => entry[0] === currentData)
        const actionLink = Object.entries(ActionButtonAndLinks).find(entry => entry[0] === currentData)
        if (!action) {
            return null
        }

        // console.log(actionLink)
        return (
            <div className="data-right-container">
                {action[1].map((item, key) => (
                    <div className="selected-data" key={key}>
                        <div className="selected-data-header">
                            <div className="selected-circle" />
                            <div className="selected-header">{item.heading}</div>
                        </div>
                        <div className="help-text">
                            {item.label}
                        </div>
                    </div>
                ))}

                {actionLink && actionLink[1] && (
                    <>
                        {actionLink[1].link && <div className="actionLink">{actionLink[1].link}</div>}
                        {actionLink[1].button &&
                            <div className="actionButtonContainer">
                                <div className="actionButton">{actionLink[1].button}</div>
                            </div>
                        }
                    </>
                )}
            </div>
        )
    }

    return (
        <div className="section3-container">
            <div className="data-container">
                <div onClick={() => setCurrentData("first")}
                    className={`label-container ${currentData === "first" ? "selected" : ""}`}>
                    New to <br />Cryptocurrencies
                </div>
                <div onClick={() => setCurrentData("second")}
                    className={`label-container ${currentData === "second" ? "selected" : ""}`}>
                    Experienced <br />Traders
                </div>
                <div
                    onClick={() => setCurrentData("third")}
                    className={`label-container ${currentData === "third" ? "selected" : ""}`}>
                    Institutional <br />Traders
                </div>
            </div>
            {getActions()}
        </div>
    );
};

export default Section3;
