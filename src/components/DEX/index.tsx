import React from 'react';
import { useTranslation } from 'react-i18next';

import ExchangeToken from './ExchangeToken';
import ExchangeGraph from './ExchangeGraph';
import ExchangeTable from './ExchangeTable';
import MainDex from './MainDex';


import './index.css';

const DEX = () => {
    const { t } = useTranslation();

    return (<div className='dex-container'>
        <h1 className="header-dex"> {t('EXCHANGE')} </h1>
        <div className="container">
            <ExchangeToken />
        </div>

    </div>);
}

export default DEX;