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
  toToken: string;
  amount: number;
  toAmount: number;
  fee: number;
  orderType: string;
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
    toToken: "IN500",
    amount: 0,
    toAmount: 0,
    fee: 0.05,
    orderType: "Buy"
  });

  return <BSContext.Provider value={{ BSvalue, setBSvalue }}>{children}</BSContext.Provider>;
};

