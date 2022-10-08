import React, { useEffect, useMemo, useState, useContext } from 'react';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { AddressContext } from 'context/AddressContext';
import { useTranslation } from 'react-i18next';
import { Loader } from 'components/UI/Loader';

// import { useTranslation } from 'react-i18next';
import WalletSend from 'components/WalletSend';
import WalletReceive from 'components/WalletReceive';
import WalletSendResult from 'components/WalletSendResult';
import moment from 'moment';
import { useWalletDetailCurrencyDetailsStyles } from './styles';
import { getRecentTransactions } from '../../api/moralis/accounts';

const WalletDetailsCurrencyDetails = (props: any) => {
  const { t } = useTranslation();

  const { currency, address, chainId, selectedWallet, selectedWalletType } = props;
  const classes = useWalletDetailCurrencyDetailsStyles();
  const [isSendModalOpen, toggleSendModal] = useState(false);
  const [isReceiveModalOpen, toggleReceiveModal] = useState(false);
  const [isSendResultModalOpen, toggleSendResultModal] = useState(false);
  const [txDetails, setTxDetails] = useState({ address: '', txHash: '' });
  const [rows, setRows] = useState<any>([]);
  const [trnxFilter, setTrnxFilter] = useState('ALL');
  const context = useContext(AddressContext);
  const [selectedWalletState] = useState(selectedWallet);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const noOfRecordPerPage = 10;

  useEffect(() => {
    let walletAddress: any;
    const selectedWalletData = localStorage.getItem('selectedWallet');
    if (selectedWalletData === 'KRYPTO Wallet') {
      const tykloAddress = localStorage.getItem('tykloAddress');
      walletAddress = tykloAddress;
    } else {
      const metamaskAddress = localStorage.getItem('metamaskAddress');
      walletAddress = metamaskAddress;
    }
    (async () => {
      try {
        setIsLoading(true);
        const transactions = await getRecentTransactions(
          walletAddress,
          selectedWalletType,
        );
        setIsLoading(false);
        if (transactions.result.length) {
          setRows(
            transactions.result
              .filter((transaction: any) => {
                return (
                  trnxFilter === 'ALL' ||
                  (trnxFilter === 'RECEIVED' &&
                    transaction.to_address === address) ||
                  (trnxFilter === 'SENT' && transaction.to_address !== address)
                );
              })
              .map((transaction: any) => ({
                date: moment(transaction.block_timestamp).format('D MMM YYYY'),
                hash: transaction.hash,
                to: transaction.to_address,
                status:
                  transaction.receipt_status === '1'
                    ? require('assets/icon-successful.png').default
                    : require('assets/icon-fail.png').default,
                amount: (+transaction.value / 1000000000000000000).toFixed(5),
              })),
          );
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [trnxFilter, selectedWalletState, address, chainId, selectedWalletType]);

  const openWalletSendResult = (details: any) => {
    setTxDetails(details);
    toggleSendResultModal(true);
  };

  useEffect(() => {
    setPaginatedData(rows.slice(offset, offset + noOfRecordPerPage))
  }, [currentPage, rows])

  const pageChange = (event: object, page: number) => {
    const offsetValue = page === 1 ? 0 : page * 5;
    setOffset(offsetValue)
    setCurrentPage(page);
  }

  return (
    <div className={classes.currency_details}>
      <WalletSend
        isOpen={isSendModalOpen}
        toggleModal={toggleSendModal}
        openWalletSendResult={openWalletSendResult}
        address={address}
      />
      <WalletSendResult
        isOpen={isSendResultModalOpen}
        toggleModal={toggleSendResultModal}
        txDetails={txDetails}
      />
      <WalletReceive
        isOpen={isReceiveModalOpen}
        toggleModal={toggleReceiveModal}
        address={address}
      />
      <h2 className={classes.currency_name}>{currency.name}</h2>
      <span className={classes.currency_balance}>
        {currency.balance} {currency.symbol}
      </span>
      <div className={classes.button_container}>
        <Button
          className={classes.buttonPrimary}
          onClick={() => toggleSendModal(true)}
        >
          Send
        </Button>
        <Button
          className={classes.button}
          onClick={() => toggleReceiveModal(true)}
        >
          Receive
        </Button>
      </div>
      <div className={classes.transaction_container}>
        <h5 className={classes.transaction_heading}>{t('RECENT_TRANSACTION')}</h5>
        <div className={classes.transaction_filter}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={trnxFilter}
              onChange={(event: any) => setTrnxFilter(event.target.value)}
              className={classes.filter_dropdown}
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="SENT">Sent</MenuItem>
              <MenuItem value="RECEIVED">Received</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.transaction_table_row_head}>
                {t('DATE')}
              </TableCell>
              <TableCell className={classes.transaction_table_row_head}>
                {t('TRAN_HASH')}
              </TableCell>
              <TableCell className={classes.transaction_table_row_head}>
                {t('TO')}
              </TableCell>
              <TableCell
                className={classes.transaction_table_row_head}
                align="center"
              >
                {t('STATUS')}
              </TableCell>
              <TableCell className={classes.transaction_table_row_head}>
                {t('AMOUNT')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? <Loader className={classes.loader} color="#FFC765" /> : paginatedData.map((row: any) => (
              <TableRow key={row.hash}>
                <TableCell className={classes.transaction_table_row}>
                  {row.date}
                </TableCell>
                <TableCell className={classes.transaction_table_row}>
                  {row.hash.substr(0, 9)}...{row.hash.substr(-7)}
                </TableCell>
                <TableCell className={classes.transaction_table_row}>
                  {row.to.substr(0, 9)}...{row.to.substr(-7)}
                </TableCell>
                <TableCell
                  className={classes.transaction_table_row}
                  align="center"
                >
                  <img
                    src={row.status}
                    alt="status"
                    className={classes.status_icon}
                  />
                </TableCell>
                {row.to === address ? (
                  <TableCell
                    className={classes.transaction_table_row}
                    style={{ color: '#4EE65A' }}
                  >
                    + {row.amount} {currency.symbol}
                  </TableCell>
                ) : (
                  <TableCell
                    className={classes.transaction_table_row}
                    style={{ color: '#FF5F5F' }}
                  >
                    - {row.amount} {currency.symbol}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {
          rows && rows.length ? <div className={`${classes.paginationContainer} ${classes.root} `}>
            <Pagination className={`${classes.ul}`} count={Math.round(rows.length / noOfRecordPerPage)} page={currentPage} color="primary"
              variant="outlined" shape="rounded" onChange={pageChange} />
          </div> : ''
        }
      </div>
    </div>
  );
};

export default React.memo(WalletDetailsCurrencyDetails);
