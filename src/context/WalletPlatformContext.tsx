import React, { ReactElement, useContext, useState } from 'react';


interface IWalletPlatformContext {
    isEnableWalletPlatform: boolean;
    SetEnableWalletPlatform: any;
    selectedPlatform: any,
    SetSelectedPlatform: any;
}
export const WalletPlatformContext = React.createContext<IWalletPlatformContext | null>(null);

export const WalletPlatformProvider = ({
    children
}: any) => {
    const [isEnableWalletPlatform, SetEnableWalletPlatform] = useState(false);
    const [selectedPlatform, SetSelectedPlatform] = useState({
        symbol: "BNB",
        logoUrl: "https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        decimals: 18,
        chain: "bsc",
        id: 'binancecoin'
    });

    return (
        <WalletPlatformContext.Provider
            value={{
                isEnableWalletPlatform,
                SetEnableWalletPlatform,
                selectedPlatform,
                SetSelectedPlatform
            }}
        >
            {children}
        </WalletPlatformContext.Provider>
    );
};


export const useWalletPlatform = () => {
    const context = useContext(WalletPlatformContext);

    if (!context) {
        throw new Error('No Context Provider for Address found');
    }

    return context;
};
