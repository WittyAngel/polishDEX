import axios from 'axios';
import qs from 'qs';

const baseUrl = 'https://dev.krypto.army/referral/api/';

export const contestRegister = async (data) => {
  try {
    const params = qs.stringify(data);
    const response = await axios.post(
      `${baseUrl}contest/register`,
      params
    );
    if (!response?.data && response.data.status !== 1) {
      return null;
    }
    return response.data.data;
  } catch (e) {
    return null;
  }
};

export const getContestRegistration = async (user_id) => {
  try {
    const response = await axios.get(`${baseUrl}contest/users/${user_id}`);
    if (!response?.data && response.data.status !== 1) {
      return null;
    }
    return response.data.data;
  } catch (e) {
    return null;
  }
};

export const getContestResult = async () => {
  try {
    const response = await axios.get(`${baseUrl}contest/result`);
    if (!response?.data && response.data.status !== 1) {
      return null;
    }
    return response.data.data;
  } catch (e) {
    return null;
  }
};
