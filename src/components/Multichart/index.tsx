import React, { useEffect, useState } from 'react';

import {
    makeStyles, fade,
} from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { getTokenList } from 'api/1Inch/oneInch';
import { PreLoader } from 'components/UI/PreLoader';
import { Resizable } from 'react-resizable';

import TokenTable from './TokenTable';

import TradingViewChart from './TradingViewChart';
import ResizeBox from './ResizeBox';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex: 1
    },
    parentContainer: {
        display: 'flex',
        // flexBasis: '100%',
        // width: '100%',
        margin: '20px 40px',
        // flexDirection: 'row',
        // justifyContent: 'center'
    },
    multiChartContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flexBasis: "100%"
    },
    tokenContainer: {
        marginTop: "50px",
        position: 'sticky',
        top: 50,
        alignSelf: 'flex-start'
    },
    chartContainer: {
        display: 'flex',
        flex: '1',
        flexWrap: 'wrap',
        justifyContent: "center"

    },
    emptyBox: {
        width: '370px',
        height: '385px',
        margin: '15px 10px 10px 10px',
        background: '#575656',
    },
    chart: {
        width: '290px',
        height: '360px',
        margin: '15px 10px 20px 10px',
        background: '#141722!important',
    },

    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    search: {
        width: "400px",
        // marginLeft: "7%"
    },
    go: {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.white,
        textTransform: 'capitalize',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    searchIconBtn: {
        fill: theme.colors.primaryText,
    },
}));

const MultiChart = () => {
    const classes = useStyles();
    const metamaskChainId = localStorage.getItem('metamaskChainId')
    const [platformId, SetPlatformID] = useState<any>(metamaskChainId ? Number(metamaskChainId) : 1)

    const [emptyBox, setEmptyBox] = useState<any>([{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }, { key: 6 }, { key: 7 }, { key: 8 }, { key: 9 }]);
    const { t } = useTranslation();
    const [tokenList, setTokenList] = useState([]);
    const isSearchable = true;
    const [selectedOption, setSelectedOption] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const [options, setOptions] = useState([
    ]);

    useEffect(() => {
        (async () => {
            let tokenListData: any;
            setIsFetching(true);
            try {
                tokenListData = await getTokenList(platformId);
            } catch (err: any) {
                setIsFetching(false);
            }
            if (Object.keys(tokenListData).length) {
                const tokensKey: any = Object.keys(tokenListData);

                const tempTokenList: any = [];

                tokensKey.forEach((tokenRecordKey: any) => {
                    const selectedTokenRecord: any = tokenListData[tokenRecordKey];
                    if (selectedTokenRecord) {
                        tempTokenList.push({
                            value: selectedTokenRecord.symbol,
                            label: selectedTokenRecord.symbol,
                            symbol: selectedTokenRecord.symbol,
                            logoUrl: selectedTokenRecord.logoURI,
                            address: selectedTokenRecord.address,
                            decimals: selectedTokenRecord.decimals,
                            name: selectedTokenRecord.name
                        })
                    }
                    return selectedTokenRecord;
                });
                setTokenList(tempTokenList);
                setOptions(tempTokenList);
            }
            setIsFetching(false);

        })();
    }, [])



    const removeHandler = (token: any, selectedIndex: any) => {
        const clone = [...emptyBox];
        const index = clone.findIndex((box: any) => {
            return Object.keys(box).length && box.a === token.a
        });
        if (index !== -1) {
            const indexData = selectedIndex + 1;
            clone[selectedIndex] = { key: indexData };
        }
        setEmptyBox(clone)
    }


    const tockenClickHandler = (selectedToken: any) => {
        const clone = [...emptyBox];
        const index = clone.findIndex(box => Object.keys(box).length === 1);
        const selectedTokenData = { ...selectedToken, key: index + 1 }
        if (index !== -1) {
            clone[index] = selectedTokenData;
        }
        setEmptyBox(clone);
        setSelectedOption(null)
    }



    const selectHandler = (event: any) => {
        tockenClickHandler(event);
    }

    const promiseOptions = (inputValue: string) =>
        new Promise<any[]>((resolve) => {
            let searchOption: any = [];
            if (inputValue === '') {
                searchOption = options;
            } else {
                searchOption = options.filter((option: any) => option.symbol.toLowerCase().includes(inputValue.toLowerCase()))
            }
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                resolve(
                    searchOption
                );
            }, 1000);
        });

    if (isFetching) {
        return <PreLoader />
    }
    return (
        <div className={classes.container}>
            <div className={classes.parentContainer}>
                <div className={classes.multiChartContainer}>
                    <div className={classes.multiChartContainer}>
                        {options && options.length ? <AsyncSelect className={classes.search}
                            defaultValue={selectedOption}
                            onChange={selectHandler}
                            defaultOptions={options}
                            value={selectedOption}
                            isSearchable={isSearchable}
                            isLoading={isLoading}
                            loadOptions={promiseOptions}
                            placeholder="Enter token name"
                        /> : null}
                    </div>

                    <div className={classes.chartContainer}>
                        {
                            emptyBox.map((box: any, index: any) => {
                                return (
                                    <div key={box.key}>
                                        <ResizeBox
                                            box={box} index={index}
                                            removeHandler={removeHandler} />
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
                {/* <Resizable
                    defaultSize={{
                        width: 200,
                        height: 200
                    }}
                >
                    001
                </Resizable> */}
                {/* <div className={classes.tokenContainer}>
                    {tokenList && tokenList.length ? <TokenTable tokenList={tokenList}
                        tockenClickHandler={tockenClickHandler} /> : null}
                </div> */}
            </div>
        </div>
    )
}

export default MultiChart;
