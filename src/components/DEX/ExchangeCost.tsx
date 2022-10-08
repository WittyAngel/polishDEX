import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.css';

const ExchangeCost = ({ estimatedResult }: { estimatedResult: any }) => {
    const { t } = useTranslation();

    return (<div className='outer-container'>
        {/* <div className='outer-data'>
            <span className='cost'>{t('ESTIMATED_COST')}</span>
            <span style={{ float: 'right', fontSize: '11px' }}>00</span>
        </div>
        <div className='outer-data'>
            <span className='cost'>{t('PRICE_IMPACT')}</span>
            <span style={{ float: 'right', fontSize: '11px' }}>00</span>
        </div>
        <div className='outer-data'>
            <span className='cost'>{t('MIN_RECEIVED')}</span>
            <span style={{ float: 'right', fontSize: '11px' }}>00</span>
        </div> */}
        <div className='outer-data'>
            <span className='cost'>Estimated Gas Price</span>
            <span style={{ float: 'right', fontSize: '11px' }}>{estimatedResult?.estimatedGas}</span>
        </div>
    </div>);
}

export default ExchangeCost;