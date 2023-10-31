import React from 'react'
import { Route, Routes } from 'react-router-dom';
// import Footer from '../Footer/Footer';
// import BSDepositCryptoSelect from './BSDepositCryptoSelect';
import '../BSDepositWithdraw/BSWithdraw.css';
import './BSDeposit.css';
import BSDepositFiatSelect from './BSDepositFiatSelect';
import BSDepositFiatAmount from './BSDepositFiatAmount';
import BSDepositFiatInfo from './BSDepositFiatInfo';


export interface DialogCtxState {
    depositeAmount: string;
    setDepositeAmount: React.Dispatch<React.SetStateAction<string>>;
}

const initialDialogState: DialogCtxState = {
    depositeAmount: "",
    setDepositeAmount: () => { }
};

export const DialogContext = React.createContext<DialogCtxState>(initialDialogState);

export const BSDepositFiatLayout = () => {
    const [depositeAmount, setDepositeAmount] = React.useState<string>("");
    return (
        <div className=''>
            <div className='flex-align-stretch bs_main'>
                <DialogContext.Provider value={{ depositeAmount, setDepositeAmount }}>
                    <Routes>
                        <Route index element={<BSDepositFiatSelect />} />
                        <Route path="/deposit-fiat-amount" element={<BSDepositFiatAmount />} />
                        <Route path="/deposit-fiat-info" element={<BSDepositFiatInfo />} />
                    </Routes>
                </DialogContext.Provider>
            </div>
            {/* <Footer footerArt="flipWoman" /> */}
        </div>
    )

}

export default BSDepositFiatLayout;