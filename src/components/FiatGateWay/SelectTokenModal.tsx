import React, { ReactElement, useMemo, useState } from 'react';
import {
  Label,
  DesktopModal,
} from 'components/UI';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { DEFAULT_TOKENS } from 'constants/tokens';

import { useTranslation } from 'react-i18next';
import useStyles from './style';

type Token = {
  symbol: string,
  logoUrl: string,
  platforms: string,
  decimals: number,
  id: string
};

const SelectTokenModal = ({
  isOpen,
  toggleModal,
  setSelectedToken,
  selectedToken,
  tokenList,
  isSelectedAddress,
  setAddress,
  isTrade,
  isReceive
}: {
  isOpen: boolean;
  toggleModal: any;
  tokenList: Token[],
  setSelectedToken?: any,
  selectedToken: any;
  isSelectedAddress?: boolean,
  setAddress?: any,
  isTrade?: boolean,
  isReceive?: boolean
}): ReactElement => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [filter, setFilter] = useState('');
  const filteredTokens = useMemo<Token[]>(() => {
    let filtered = [];
    const excludedTokens = tokenList.filter((token: Token) => DEFAULT_TOKENS.findIndex(dt => dt.id === token.id) < 0);
    const allTokens = [...DEFAULT_TOKENS, ...excludedTokens];

    if (filter) {
      if (filter.length > 20) {
        filtered = allTokens.filter((token: Token) => token.platforms.toLowerCase().includes(filter.toLowerCase()));
      } else {
        filtered = allTokens.filter((token: Token) => token.symbol.toLowerCase().includes(filter.toLowerCase()));
      }
    } else {
      filtered = [...DEFAULT_TOKENS];
    }

    return filtered;
  }, [filter, tokenList]);

  const handleFormClose = () => {
    toggleModal(!isOpen);
    setFilter('');
  };

  const selectWalletHandler = (event: any) => {
    setSelectedToken(event);
    if (isSelectedAddress) {
      setAddress(event, isTrade, isReceive)
    }
    handleFormClose();
  }

  const changeHandler = (event: any) => {
    setFilter(event.target.value);
  }

  return (
    <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
      <>
        <div className={classes.root}>
          <div className={classes.header}>
            <Label
              component="div"
              variant="h2"
              className={classes.infoMsg}
              text="SELECT_TOKEN"
            />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon classes={{ root: classes.searchIconBtn }} />
              </div>
              <InputBase
                placeholder={t('TOKEN_SEARCH')}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={filter}
                onChange={(event) => changeHandler(event)}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </div>
        </div>
        <div className={classes.tokenContainer}>
          {
            filteredTokens.map((token: Token) => {
              return (
                <div className={classes.test} key={token.id}>
                  <Button
                    onClick={() => selectWalletHandler(token)}
                    className={`${classes.currency_item}  ${selectedToken?.symbol === token.symbol ? classes.active : ''}`}
                  >
                    {token.logoUrl ? (
                      <img
                        style={{
                          height: '20px',
                          width: '20px',
                          borderRadius: "50px"
                        }}
                        src={token.logoUrl} alt="token logo"
                      />
                    ) : null}
                    <div className={classes.currency_details}>
                      <span className={classes.currency_name}>{token.symbol}</span>
                      <span style={{ fontSize: "12px", color: "#9e9e9e" }}>{token.platforms}</span>
                    </div>
                  </Button>
                </div>
              )
            })
          }
        </div></>
    </DesktopModal>
  );
};

export default SelectTokenModal;
