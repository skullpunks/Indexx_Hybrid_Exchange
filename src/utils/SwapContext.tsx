import React, { useState, createContext, useContext } from 'react';

interface FromTokenContext {
  fromToken: string;
  setFromToken?: ((fromToken: any) => void) | undefined;
}

interface ToTokenContext {
  toToken: string;
  setToToken?: ((toToken: any) => void) | undefined;

}

const defaultFromTokenState = {
  fromToken: "0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A"
}

const defaultToTokenState = {
  toToken: "IN500"
}

export const SwapFromContext = createContext<FromTokenContext>(defaultFromTokenState);
export const useFromTokenContext = () => useContext(SwapFromContext);

export const SwapToContext = createContext<ToTokenContext>(defaultToTokenState);
export const useToTokenContext = () => useContext(SwapToContext);


export type BuySellData = {
  fromToken: string;
  fromTitle: string;
  fromGraph: string;
  toToken: string;
  toTitle: string;
  toGraph: string;
  amount: number;
  toAmount: number;
  fee: number;
  orderType: string;
  orderId: string
}

export type BSContextType = {
  BSvalue: BuySellData | null,
  setBSvalue: React.Dispatch<React.SetStateAction<BuySellData>>
}

type UserContextProviderProps = {
  children: React.ReactNode
}

export const BSContext = createContext<BSContextType | null>(null);
export const useBSContext = () => useContext(BSContext);

// export const BSContext = createContext<UserContextType | null>(null)
// export const BSContext = createContext({} as BSContextType)
/*
export const BSProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<BuySellData | null>(null)

  return (
    <BSContext.Provider value={{ user, setUser }}>
      {children}
    </BSContext.Provider>
  )
}*/

export const BSProvider = ({ children }: UserContextProviderProps) => {

  const [BSvalue, setBSvalue] = useState<BuySellData>({
    fromToken: "0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A",
    fromTitle: "IN500",
    fromGraph: "Indexx500Graph",
    toToken: "0x7325E062EA31E7b977fbEBBcC45De30c3e894988",
    toTitle: "INXC",
    toGraph: "IndexxCrypto",
    amount: 0,
    toAmount: 0,
    fee: 0.05,
    orderType: "buy",
    orderId: ""
  });

  return <BSContext.Provider value={{ BSvalue, setBSvalue }}>{children}</BSContext.Provider>;
};

