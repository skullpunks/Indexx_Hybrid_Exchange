import { createContext, useContext } from 'react';

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
  toToken: "0xa18f33e2C63C0A781f6836f9Ae8F5f6517Ce4e90"
}

export const SwapFromContext = createContext<FromTokenContext>(defaultFromTokenState);
export const useFromTokenContext = () => useContext(SwapFromContext);

export const SwapToContext = createContext<ToTokenContext>(defaultToTokenState);
export const useToTokenContext = () => useContext(SwapToContext);