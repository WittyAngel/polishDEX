import React from 'react';

const OrderRoute = () => {
    return (
        <div className='order-route-container'>
            <span>Order Route</span>
            <div className='order-route'>
                <div className='order'>eth</div>
                <div className='order'>usdt</div>
            </div>
            <div className='routes'>
                <div className='route'><span>a</span></div>
                <div className='route'>b</div>
            </div>
        </div>
    )
}

export default OrderRoute;