import axios from 'axios';

const oneInchBaseUrl = 'https://api.1inch.exchange/v3.0/';
export const getQuote = async (chain: any, currentTrade: any, amount: any) => {
    let quote: any = {};
    try {
        const response = await axios.get(`${oneInchBaseUrl}${chain}/quote`, {
            params: {
                fromTokenAddress: currentTrade.from,
                toTokenAddress: currentTrade.to,
                amount,
            }
        });
        if (response.status === 200) {
            quote = response.data;
        }
    }
    catch (err) {
        console.error(err);
    }
    return quote;
}

export const getSwap = async (
    chain: any,
    fromTokenAddress: any,
    toTokenAddress: any,
    amount: any,
    fromAddress: any,
    slippage: any,
    gasPrice: any
) => {
    let swapData: any = {};
    try {
        const response = await axios.get(`${oneInchBaseUrl}${chain}/swap`, {
            params: {
                fromTokenAddress,
                toTokenAddress,
                amount,
                fromAddress,
                slippage,
                // gasPrice,
                fee: 0.15,
                referrerAddress: '0xF4b7B3cA0b67D47fB2f172085E034b8f83cE451b'
            }
        })
        if (response.status === 200) {
            swapData = response.data;
        } else {
            swapData = response.data;
            console.log(swapData)
        }
    }
    catch (err) {
        console.error(err);
    }
    return swapData;
}

export const getTokenList = async (chain: any) => {
    let tokenList: any = [];
    try {
        // const response = await axios.get(`${oneInchBaseUrl}${chain}/tokens`, {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true', {
        })
        if (response.status === 200) {
            const tkList = response.data;
            // tokenList = tkList.filter((e: any) => (e.platforms.ethereum));
            if (chain === 1) {
                tokenList = tkList.filter((e: any) => (e.platforms.ethereum));
            } else if (chain === 56) {
                tokenList = tkList.filter((e: any) => (e.platforms["binance-smart-chain"]));
            }
            console.log(tokenList)
            // tokenList = response.data.tokens;
        }
    }
    catch (err) {
        console.error(err);
    }
    return tokenList;
}

export const approveCallData = async (chain: any, tokenAddress: any, amount: any) => {
    let approveResult: any = [];

    try {
        const response = await axios.get(`${oneInchBaseUrl}${chain}/approve/calldata`, {
            params: {
                tokenAddress,
                amount
            }
        });
        if (response.status === 200) {
            approveResult = response.data;
            console.log(approveResult)
        }
    }
    catch (err) {
        console.error(err);
    }
    return approveResult
}



export const approveSpender = async (chain: any) => {
    let approveResult: any = [];

    try {
        const response = await axios.get(`${oneInchBaseUrl}${chain}/approve/spender`);
        if (response.status === 200) {
            approveResult = response;
        }
    }
    catch (err) {
        console.error(err);
    }
    return approveResult
}