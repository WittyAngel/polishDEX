import axios from 'axios';

const baseUrl = 'https://dev.krypto.army/referral/api/';

export const referredUsersByUser = async (user_id) => {
    try {
        const response = await axios.get(
            `${baseUrl}users/listReferredUsersByUser/${user_id}`
        );
        if (!response?.data && response.data.status !== 1) {
            return [];
        }
        return response.data.data.referred_users;
    } catch (e) {
        return null;
    }
};
