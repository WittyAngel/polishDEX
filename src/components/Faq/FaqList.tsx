import { useTranslation } from "react-i18next";

export const FaqList = () => {
    const { t } = useTranslation();

    const categoryList = [
        {
            name: t('FAQ_ALL_TOPICS'),
            value: 'all'
        },
        {
            name: t('FAQ_GENERAL'),
            value: 'general'
        },
        {
            name: t('FAQ_FEES'),
            value: 'fees'
        },
        {
            name: t('FAQ_CRYPTO'),
            value: 'crypto'
        },
        {
            name: t('FAQ_FIAT'),
            value: 'fiat'
        },
    ];

    const generalList = [
        {
            que: t('GENERAL_QUE1'),
            ans: t('GENERAL_ANS1'),
            id: "G1"
        },
        {
            que: t('GENERAL_QUE2'),
            ans: t('GENERAL_ANS2'),
            id: "G2"
        }, {
            que: t('GENERAL_QUE3'),
            ans: t('GENERAL_ANS3'),
            id: "G3"
        }, {
            que: t('GENERAL_QUE4'),
            ans: t('GENERAL_ANS4'),
            id: "G4"
        }, {
            que: t('GENERAL_QUE5'),
            ans: t('GENERAL_ANS5'),
            id: "G5"
        }, {
            que: t('GENERAL_QUE6'),
            ans: t('GENERAL_ANS6'),
            id: "G6"
        }, {
            que: t('GENERAL_QUE7'),
            ans: t('GENERAL_ANS7'),
            id: "G7"
        }, {
            que: t('GENERAL_QUE8'),
            ans: t('GENERAL_ANS8'),
            id: "G8"
        }, {
            que: t('GENERAL_QUE9'),
            ans: t('GENERAL_ANS9'),
            id: "G9"
        },
        {
            que: t('GENERAL_QUE10'),
            ans: t('GENERAL_ANS10'),
            id: "G10"
        },
        {
            que: t('GENERAL_QUE11'),
            ans: t('GENERAL_ANS11'),
            id: "G11"
        },
        {
            que: t('GENERAL_QUE12'),
            ans: t('GENERAL_ANS12'),
            id: "G12"
        },
        {
            que: t('GENERAL_QUE13'),
            ans: t('GENERAL_ANS13'),
            id: "G13"
        },
        {
            que: t('GENERAL_QUE14'),
            ans: t('GENERAL_ANS14'),
            id: "G14"
        },
        {
            que: t('GENERAL_QUE15'),
            ans: t('GENERAL_ANS15'),
            id: "G15"
        },
        {
            que: t('GENERAL_QUE16'),
            ans: t('GENERAL_ANS16'),
            id: "G16"
        },

        {
            que: t('GENERAL_QUE17'),
            ans: t('GENERAL_ANS17'),
            id: "G17"
        },

        {
            que: t('GENERAL_QUE18'),
            ans: t('GENERAL_ANS18'),
            id: "G18"
        },

        {
            que: t('GENERAL_QUE19'),
            ans: t('GENERAL_ANS19'),
            id: "G19"
        },

        {
            que: t('GENERAL_QUE20'),
            ans: t('GENERAL_ANS20'),
            id: "G20"
        },
        {
            que: t('GENERAL_QUE21'),
            ans: t('GENERAL_ANS21'),
            id: "G21"
        },

        {
            que: t('GENERAL_QUE22'),
            ans: t('GENERAL_ANS22'),
            id: "G22"
        },

        {
            que: t('GENERAL_QUE23'),
            ans: t('GENERAL_ANS23'),
            id: "G23"
        },

    ];

    const feesList = [
        {
            que: t('FEES_QUE1'),
            ans: t('FEES_ANS1'),
            id: "fe1"
        },
        {
            que: t('FEES_QUE2'),
            ans: t('FEES_ANS2'),
            id: "fe2"
        },
        {
            que: t('FEES_QUE3'),
            ans: t('FEES_ANS3'),
            id: "fe3"
        },
        {
            que: t('FEES_QUE4'),
            ans: t('FEES_ANS4'),
            id: "fe4"
        },
        {
            que: t('FEES_QUE5'),
            ans: t('FEES_ANS5'),
            id: "fe5"
        },
        {
            que: t('FEES_QUE6'),
            ans: t('FEES_ANS6'),
            id: "fe6"
        },
        {
            que: t('FEES_QUE7'),
            ans: t('FEES_ANS7'),
            id: "fe7"
        },
        {
            que: t('FEES_QUE8'),
            ans: t('FEES_ANS8'),
            id: "fe8"
        },

    ];

    const cryptoList = [
        {
            que: t('CRYPTO_QUE1'),
            ans: t('CRYPTO_ANS1'),
            id: "c1"
        },

        {
            que: t('CRYPTO_QUE2'),
            ans: t('CRYPTO_ANS2'),
            id: "c2"
        },
        {
            que: t('CRYPTO_QUE3'),
            ans: t('CRYPTO_ANS3'),
            id: "c3"
        },
        {
            que: t('CRYPTO_QUE4'),
            ans: t('CRYPTO_ANS4'),
            id: "c4"
        },
        {
            que: t('CRYPTO_QUE5'),
            ans: t('CRYPTO_ANS5'),
            id: "c5"
        },
        {
            que: t('CRYPTO_QUE6'),
            ans: t('CRYPTO_ANS6'),
            id: "c6"
        },
        {
            que: t('CRYPTO_QUE7'),
            ans: t('CRYPTO_ANS7'),
            id: "c7"
        },
        {
            que: t('CRYPTO_QUE8'),
            ans: t('CRYPTO_ANS8'),
            id: "c8"
        },
        {
            que: t('CRYPTO_QUE9'),
            ans: t('CRYPTO_ANS9'),
            id: "c9"
        },
        {
            que: t('CRYPTO_QUE10'),
            ans: t('CRYPTO_ANS10'),
            id: "c10"
        },
        {
            que: t('CRYPTO_QUE11'),
            ans: t('CRYPTO_ANS11'),
            id: "c11"
        },
        {
            que: t('CRYPTO_QUE12'),
            ans: t('CRYPTO_ANS12'),
            id: "c12"
        },
        {
            que: t('CRYPTO_QUE13'),
            ans: t('CRYPTO_ANS13'),
            id: "c13"
        },
        {
            que: t('CRYPTO_QUE14'),
            ans: t('CRYPTO_ANS14'),
            id: "c14"
        },

    ];

    const fiatList = [
        {
            que: t('FIAT_QUE1'),
            ans: t('FIAT_ANS1'),
            id: "f1"
        },
        {
            que: t('FIAT_QUE2'),
            ans: t('FIAT_ANS2'),
            id: "f2"
        },
        {
            que: t('FIAT_QUE3'),
            ans: t('FIAT_ANS3'),
            id: "f3"
        },
        {
            que: t('FIAT_QUE4'),
            ans: t('FIAT_ANS4'),
            id: "f4"
        },
        {
            que: t('FIAT_QUE5'),
            ans: t('FIAT_ANS5'),
            id: "f5"
        },
        {
            que: t('FIAT_QUE6'),
            ans: t('FIAT_ANS6'),
            id: "f6"
        },
        {
            que: t('FIAT_QUE7'),
            ans: t('FIAT_ANS7'),
            id: "f7"
        },
        {
            que: t('FIAT_QUE8'),
            ans: t('FIAT_ANS8'),
            id: "f8"
        },
        {
            que: t('FIAT_QUE9'),
            ans: t('FIAT_ANS9'),
            id: "f9"
        },
        {
            que: t('FIAT_QUE10'),
            ans: t('FIAT_ANS10'),
            id: "f10"
        },
        {
            que: t('FIAT_QUE11'),
            ans: t('FIAT_ANS11'),
            id: "f11"
        },
        {
            que: t('FIAT_QUE12'),
            ans: t('FIAT_ANS12'),
            id: "f12"
        },
        {
            que: t('FIAT_QUE13'),
            ans: t('FIAT_ANS13'),
            id: "f13"
        },
        {
            que: t('FIAT_QUE14'),
            ans: t('FIAT_ANS14'),
            id: "f14"
        },
        {
            que: t('FIAT_QUE15'),
            ans: t('FIAT_ANS15'),
            id: "f15"
        },
        {
            que: t('FIAT_QUE16'),
            ans: t('FIAT_ANS16'),
            id: "f16"
        },
        {
            que: t('FIAT_QUE17'),
            ans: t('FIAT_ANS17'),
            id: "f17"
        }, {
            que: t('FIAT_QUE18'),
            ans: t('FIAT_ANS18'),
            id: "f18"
        }, {
            que: t('FIAT_QUE19'),
            ans: t('FIAT_ANS19'),
            id: "f19"
        },
    ];

    return {
        categoryList,
        generalList,
        feesList,
        cryptoList,
        fiatList,
    }
}

