import React from "react";
import {
    makeStyles,
    createStyles,
    Theme,
    withStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            width: '100%',
            flexDirection: 'column',
            padding: '0 8em',
            display: 'flex',
        }, container: {
            flex: 1
        },
        li: {
            padding: "5px 0",
            fontSize: "14px"
        },
        link: {
            color: "#fff"
        }
    }),
)

const TermsServices = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.container} style={{ color: "#fff", padding: "40px 0" }}>
                <div className={classes.wrapper}>
                    <div style={{ textAlign: "center" }}>
                        <h3>REGULAMIN PLATFORMY KRYPTO</h3>
                        <h5>(miejsce na logo tutaj appki/Spółki)</h5>
                    </div>
                    <div>
                        <div style={{ textAlign: "center" }} className="ka-head">
                            <h5>§ 1. POSTANOWIENIA OGÓLNE</h5>
                        </div>
                        <div>
                            <ol>
                                <li>
                                    Niniejszy Regulamin określa zasady korzystania z Platformy Krypto https://www.krypto.army/, a także
                                    świadczenia za ich pośrednictwem usług drogą elektroniczną przez Usługodawcę: 2152441 Alberta Inc
                                    siedzibą w Drayton Valley, 1 - 4731 49 street, AB, Canada.
                                </li>
                                <li>Każdy Użytkownik zobowiązany jest, z momentem podjęcia czynności zmierzających do korzystania
                                    z Platformy, do przestrzegania postanowień niniejszego Regulaminu. Treść Regulaminu udostępniana jest
                                    Użytkownikowi podczas rejestracji oraz dostępna jest na stronie https://krypto.army/terms</li>
                                <li>Użytkownik ma obowiązek zapoznać się treścią niniejszego Regulaminu. Akceptacja Regulaminu jest
                                    dobrowolna, jednak stanowi warunek korzystania z Platformy</li>
                                <li>Świadczenie usług droga elektroniczną polega na udostępnieniu platformy internetowej umożliwiającej
                                    zawieranie transakcji wymiany walut tradycyjnych na waluty wirtualne, kojarzenie Użytkowników w celu
                                    zawierania transakcji sprzedaży walut wirtualnych w oparciu o zdecentralizowaną giełdę walut wirtualnych,
                                    przechowywanie walut wirtualnych oraz korzystanie z interfejsu umożliwiającego udostępnienie płynności
                                    farmom walut wirtualnych poprzez protokoły DeFi. </li>
                                <li>Regulamin udostępniony jest w postaci elektronicznej na Platformie podczas rejestracji oraz dostępny jest na
                                    stronie: https://krypto.army/terms w taki sposób, aby Użytkownicy mogli go przechowywać i odtwarzać w toku
                                    zwykłych czynności.</li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h5>§ 2. DEFINICJE</h5>
                        </div>
                        <div>
                            <ol>
                                <li>Usługodawca – 2152441 Alberta Inc siedzibą w Drayton Valley, 1 - 4731 49 street, AB, Canada;</li>
                                <li>Regulamin - niniejszy dokument wraz z załącznikami określającymi zasady i warunki korzystania z Platformy
                                    https://www.krypto.army/;</li>
                                <li>Platforma – usługa dostępna pod witryną https://www.krypto.army/</li>
                                <li>Usługi - usługi świadczone drogą elektroniczną przez Usługodawcę za pośrednictwem Platformy, opisane
                                    w treści niniejszego Regulaminu oraz załączników;</li>
                                <li>Urządzenie - urządzenie elektroniczne pozwalające na przetwarzanie, odbieranie oraz wysyłanie,
                                    w szczególności komputer, laptop, smartfon, tablet, telefon komórkowy;</li>
                                <li>Użytkownik – oznacza podmiot, na którego rzecz zgodnie przepisami prawa mogą być świadczone usługi
                                    drogą elektroniczną lub z którym zawarta może być umowa o świadczenie usług drogą elektroniczną.</li>
                                <li>Konto – przypisany do Użytkownika zbiór zasobów i uprawnień w ramach Platformy, zawierający informacje
                                    niezbędne do jego autoryzacji oraz umożliwiający korzystanie z Usługi;</li>
                                <li>Rejestracja – czynności uwierzytelniające osobę Użytkownika, podejmowane w celu skorzystania z pełnej
                                    funkcjonalności Platformy, w szczególności polegające na założeniu Konta na Platformie; </li>
                                <li>Domena – witryna internetowa za pośrednictwem której świadczone są usługi tj. https://www.krypto.army/;</li>
                                <li>waluty FIAT – waluty fiducjarne, stanowiące prawne środki płatnicze, m.in. EUR, USD, CHF, GBP, CAD,
                                    NOK i inne wspierane przez dostawcę bramki FIAT</li>
                                <li>waluty wirtualne – cyfrowe odwzorowanie wartości, które nie jest: prawnym środkiem płatniczym
                                    emitowanym przez państwowe banki centralne lub inne organy administracji publicznej; międzynarodową
                                    jednostką rozrachunkową ustanawianą przez organizację międzynarodową i akceptowaną przez
                                    poszczególne kraje należące do tej organizacji lub z nią współpracujące; pieniądzem elektronicznym;
                                    instrumentem finansowym; wekslem lub czekiem oraz jest wymienialne w obrocie gospodarczym na prawne
                                    środki płatnicze i akceptowane jako środek wymiany a także może być elektroniczne przechowywane lub
                                    przeniesione albo może być przedmiotem handlu elektronicznego;</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TermsServices;