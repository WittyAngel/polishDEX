import axios from 'axios';
import qs from 'qs';

const baseUrl = 'https://dev.krypto.army/referral/api/';

export const generateToken = async (user_id, referral_code = '') => {
    try {
        const params = { user_id }
        if (referral_code) {
            params.referral_code = referral_code;
        }
        const data = qs.stringify(params);
        const response = await axios.post(
            `${baseUrl}users/genReferralCode`,
            data
        );
        if (!response?.data && response.data.status !== 1) {
            return null;
        }
        return response.data.data.referral_code;
    } catch (e) {
        return null;
    }
};



export const contestRegister = async () => {
    try {
        const response = await axios.post(
            `${baseUrl}contest/register`,
            {}
        );
        if (!response?.data && response.data.status !== 1) {
            return null;
        }
        return response.data.data.referral_code;
    } catch (e) {
        return null;
    }
};


export const getContestResult = async () => {
    try {
        const response = await axios.get(
            `${baseUrl}contest/result`
        );
        if (!response?.data && response.data.status !== 1) {
            return null;
        }
        return response.data.data;
    } catch (e) {
        return null;
    }
};
