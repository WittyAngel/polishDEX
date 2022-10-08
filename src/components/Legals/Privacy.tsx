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

const PrivacyPolicy = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.container} style={{color: "#fff", padding: "40px 0"}}>
                <div className={classes.wrapper}>
                    <div style={{textAlign: "center"}}>
                        <h3>POLITYKA PRYWATNOŚCI PLATOFRMY KRYPTO</h3>
                        <h5>(miejsce na logo tutaj appki/Spółki)</h5>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 1. POSTANOWIENIA OGÓLNEI DEFINICJE</h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>Administratorem danych osobowych, zbieranych za pośrednictwem Platformy Krypto jest 2152441 Alberta
                                    Inc siedzibą w Drayton Valley, 1 - 4731 49 street, AB, Canada. .</li>
                                <li className={classes.li}>Kontakt z Administratorem jest możliwy za pomocą poczty e-mail: <a className={classes.link} href="mailto:">contact@krypto.army</a> oraz kanału
                                    kontaktowego dostępnego na Platformie Telegram <a className={classes.link} href="https://t.me/KryptoArmyOfficia">https://t.me/KryptoArmyOfficia</a></li>
                                <li className={classes.li}>Definicje:
                                    <ul>
                                        <li className={classes.li}><strong>Cookies </strong> - oznacza dane informatyczne, w szczególności niewielkie pliki tekstowe, zapisywane
                                            i przechowywane na urządzeniach, za pośrednictwem których Użytkownik korzysta z Platformy;
                                        </li>
                                        <li className={classes.li}>Dane osobowe - informacje o zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej.
                                            Możliwa do zidentyfikowania osoba fizyczna to osoba, którą można bezpośrednio lub pośrednio
                                            zidentyfikować, a w szczególności na podstawie identyfikatora takiego jak imię i nazwisko, numer
                                            identyfikacyjny, dane o lokalizacji, identyfikator internetowy lub jedną bądź kilka szczególnych czynników
                                            określających fizyczną, fizjologiczną, genetyczną, psychiczną, ekonomiczną, kulturową lub społeczną
                                            tożsamość osoby fizycznej; </li>
                                        <li className={classes.li}>Profilowanie - oznacza dowolną formę zautomatyzowanego przetwarzania danych osobowych, które
                                            polega na wykorzystaniu danych osobowych do oceny niektórych czynników osobowych osoby fizycznej,
                                            w szczególności do analizy lub prognozy aspektów dotyczących efektów pracy tej osoby fizycznej, jej
                                            sytuacji ekonomicznej, zdrowia, osobistych preferencji, zainteresowań, wiarygodności, zachowania,
                                            lokalizacji lub przemieszczania się;</li>
                                        <li className={classes.li}>Przetwarzanie - oznacza operację lub zestaw operacji wykonywanych na danych osobowych lub
                                            zestawach danych osobowych w sposób zautomatyzowany lub niezautomatyzowany, taką jak zbieranie,
                                            utrwalanie, organizowanie, porządkowanie, przechowywanie, adaptowanie lub modyfikowanie,
                                            pobieranie, przeglądanie, wykorzystywanie, ujawnianie poprzez przesłanie, rozpowszechnianie lub
                                            innego rodzaju udostępnianie, dopasowywanie lub łączenie, ograniczanie, usuwanie lub niszczenie; </li>
                                        <li className={classes.li}>Platforma - usługa dostępna pod witryną <a className={classes.link} href="https://krypto.army">www.krypto.army</a>
                                        </li>
                                        <li className={classes.li}>Urządzenie - urządzenie elektroniczne pozwalające na przetwarzanie, odbieranie oraz wysyłanie danych
                                            takie jak komputer, laptop, smartfon, tablet, telefon komórkowy, za pomocą którego Użytkownik zyskuje
                                            dostęp do Platformy;
                                        </li>
                                        <li className={classes.li}>Użytkownik - oznacza podmiot, na którego rzecz zgodnie przepisami prawa mogą być świadczone
                                            usługi drogą elektroniczną lub z którym zawarta może być Umowa o świadczenie usług drogą
                                            elektroniczną</li>
                                        <li className={classes.li}>Regulamin - oznacza dokument określający zasady i warunki korzystania z Platformy, dostępny pod
                                            adresem <a className={classes.link} href="https://krypto.army/terms">https://krypto.army/terms</a>
                                        </li>
                                        <li className={classes.li}>Usługi - usługi świadczone drogą elektroniczną przez Usługodawcę za pośrednictwem Platformy, w
                                            szczególności opisane w § 4. ww. Regulaminu;</li><li className={classes.li}> Adres portfela - ciąg znaków prowadzonego w formie elektronicznej zbioru danych identyfikacyjnych,
                                                zapewniających możliwość korzystania z walut wirtualnych, w szczególności ich przechowywanie oraz
                                                przesyłanie na inne adresy portfeli;
                                        </li>
                                        <li className={classes.li}>Dostawcy - podmioty zewnętrzne, które dostarczają usługi wyszczególnione w Regulaminie,
                                            w szczególności polegające na usłudze portfela walut wirtualnych, giełdy walut wirtualnych, giełdy walut
                                            wirtualnych oraz dostarczania płynności protokołom zarabiającym. </li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 2. PODSTAWA PRAWNA I CELE PRZETWARZANIA DANYCH UŻYTKOWNIKA </h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>Dane osobowe zbierane przez Administratora są przetwarzane zgodnie z przepisami Rozporządzenia
                                    Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób
                                    fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich
                                    danych oraz uchylenia dyrektywy 95/46/WE (dalej jako „RODO”), ustawy z dnia 10 maja 2018 r. o ochronie
                                    danych osobowych (Dz. U. z 2019 poz. 1781) oraz ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą
                                    elektroniczną (Dz. U. z 2020 r., poz. 344).</li>
                                <li className={classes.li}>Administrator przetwarza dane osobowe, podane lub udostępnione przez Użytkownika
                                    w związku z korzystaniem z Platofrmy, w celach:
                                    <ul>
                                        <li className={classes.li}>zawarcia i wykonania umowy o świadczenie usług drogą elektroniczną oraz zapewnienia funkcjonalności
                                            Platformy (zakres danych: adresy IP, adres portfela walut wirtualnych, adres e-mail oraz inne niezbędne
                                            dane o Urządzeniu, z którego korzysta Użytkownik – na podstawie art. 6 ust. 1 lit. b RODO, tj. z uwagi na okoliczność, iż przetwarzanie jest niezbędne do wykonania umowy, której stroną jest osoba, której dane
                                            dotyczą</li>
                                        <li className={classes.li}>informowania Użytkowników o kwestiach związanych z funkcjonowaniem Platformy (zakres danych:
                                            adres e-mail, dane Urządzenia, z którego korzysta Użytkownik) – na podstawie art. 6 ust. 1 lit. b oraz f
                                            RODO, tj. z uwagi na okoliczność, iż przetwarzanie jest niezbędne do wykonania umowy, której stroną
                                            jest osoba, której dane dotyczą, jak również realizacji służy celów wynikających z prawnie uzasadnionych
                                            interesów realizowanych przez Administratora lub przez stronę trzecią, </li>
                                        <li className={classes.li}>dochodzenia roszczeń oraz ochrony praw (zakres danych: wszelkie dane uzyskane od Użytkownika
                                            niezbędne do udowodnienia istnienia roszczenia bądź obrony praw) – na podstawie art. 6 ust. 1 lit. f
                                            RODO, tj. z uwagi na okoliczność, iż przetwarzanie jest niezbędne do celów wynikających z prawnie
                                            uzasadnionych interesów realizowanych przez Administratora lub przez stronę trzecią, </li>
                                        <li className={classes.li}>wypełnienia obowiązków prawnych ciążących na Administratorze w związku z prowadzeniem
                                            działalności gospodarczej (zakres danych: wszelkie dane uzyskane od Użytkownika) – na podstawie art.
                                            6 ust. 1 lit. c RODO, tj. z uwagi na okoliczność, iż przetwarzanie jest niezbędne do wypełnienia
                                            obowiązku prawnego ciążącego na Administratorze, </li>
                                        <li className={classes.li}>prowadzenia własnych działań marketingowych i promocyjnych (zakres danych: wszelkie dane uzyskane
                                            od Użytkownika) – na podstawie art. 6 ust. 1 lit. f RODO,</li>
                                        <li className={classes.li}>prowadzenia działań marketingowych i promocyjnych na podstawie odrębnie udzielonej zgody (art. 6 ust.
                                            1 lit. a RODO),</li>
                                        <li className={classes.li}>przesyłania informacji handlowych drogą elektroniczną zgodnie z art. 10 ust. 2 ustawy
                                            o świadczeniu usług drogą elektroniczną z dnia 18 lipca 2002 r. (Dz. U. z 2017 r., poz. 1219 ze zm.), w
                                            tym przesyłanie powiadomień (zakres danych: wszelkie dane uzyskane od Użytkownika) – na podstawie
                                            odrębnie udzielonej zgody (art. 6 ust. 1 lit. a RODO).
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 3. DANE ZBIERANE PRZEZ ADMINISTRATORA PLATFORMY</h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>Administrator Platformy zbiera lub może zbierać następujące dane osobowe za pośrednictwem Platformy lub
                                    bezpośredniego kontaktu ze strony Użytkownika:
                                    <ul>
                                        <li className={classes.li}>dane identyfikacyjne i kontaktowe (adres e-mail, numer telefonu),</li>
                                        <li className={classes.li}>dane portfela,</li>
                                        <li className={classes.li}>dane dotyczące urządzenia, z którego korzysta Użytkownik (m.in. adres IP, typ urządzenia, marka
                                            urządzenia, model urządzenia, nazwa urządzenia, język urządzenia),
                                        </li>
                                        <li className={classes.li}>dane dotyczące używania przez Użytkownika oprogramowania VPN lub Urządzenia posiadającego
                                            zmodyfikowany system operacyjny (m.in. Emulator lub Root),</li>
                                        <li className={classes.li}>inne dane dobrowolnie przekazane przez Użytkownika w trakcie kontaktu z Administratorem, w tym
                                            również dane dotyczące jego Urządzenia, dane korespondencyjne oraz inne dane niewymienione
                                            powyżej.</li>
                                    </ul>
                                </li>
                                <li className={classes.li}>Przeglądanie zawartości Platformy nie wymaga podawania danych osobowych innych niż pozyskiwane
                                    automatycznie informacje o parametrach połączenia. </li>
                                <li className={classes.li}>W ramach pełnej funkcjonalności Platformy, Administrator zbiera następujące dane osobowe:
                                    <ul>
                                        <li className={classes.li}>adres e-mail,</li>
                                        <li className={classes.li}>adres portfela,</li>
                                        <li className={classes.li}>adresy IP,</li>
                                        <li className={classes.li}>inne niezbędne dane o Urządzeniu, z którego korzysta Użytkownik.</li>
                                    </ul>
                                </li>
                                <li className={classes.li}>Administrator zastrzega, że w ramach korzystania z usług Platformy, Dostawcy mogą także przetwarzać
                                    dane osobowe Użytkownika, w oparciu o własne polityki prywatności. </li>
                            </ol>
                        </div>
                    </div>

                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 4. PROFILOWANIE GROMADZONYCH DANYCH</h5>
                        </div>
                        <div>
                            <p>Administrator oświadcza, że nie wykorzystuje profilowania do przetwarzanych danych osobowych. Zastrzega
                                jednak, że Dostawcy mogą przetwarzać i profilować gromadzone dane osobowe. </p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h5>§ 5. CZAS PRZETWARZANIA DANYCH OSOBOWYCH</h5>
                        </div>
                        <div>
                            <ol>Dane osobowe będą przetwarzane przez okres:
                                <ul>
                                    <li className={classes.li}>niezbędny do realizacji umowy o świadczenie usług drogą elektroniczną określonych w Regulaminie,
                                        zawartej za pośrednictwem Aplikacji, w tym także po jej wykonaniu z uwagi na możliwość skorzystania
                                        przez strony z przysługujących im praw wynikających z umowy, a także ze względu na ewentualne
                                        dochodzenie należności – do chwili upływu terminu przedawnienia roszczeń;</li>
                                    <li className={classes.li}>do czasu cofnięcia wyrażonej zgody bądź złożenia sprzeciwu wobec przetwarzania danych –
                                        w przypadkach przetwarzania danych osobowych Użytkownika na podstawie odrębnej zgody; </li>
                                    <li className={classes.li}>Administrator przechowuje dane osobowe Użytkowników również w przypadku, gdy jest to konieczne do
                                        wypełnienia ciążących na nim zobowiązań prawnych, rozwiązania sporów, wyegzekwowania zobowiązań
                                        Użytkownika, utrzymywania bezpieczeństwa, zapobiegania oszustwom i nadużyciom.</li>
                                </ul>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 6. UPRAWNIENIA UŻYTKOWNIKA</h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>Administrator zapewnia Użytkownikom realizację uprawnień, o których mowa w ust. 2 poniżej. W celu
                                    realizacji uprawnień, należy wysłać odpowiednie żądanie (odpowiednią prośbę) pocztą elektroniczną na
                                    adres: <a className={classes.link} href="mailtp:support@krypto.army">support@krypto.army</a></li>
                                <li className={classes.li}>Użytkownik ma prawo do:
                                    <ul>
                                        <li className={classes.li}>dostępu do treści danych – zgodnie z art. 15 RODO,</li>
                                        <li className={classes.li}>sprostowania/zaktualizowania danych – zgodnie z art. 16 RODO, </li>
                                        <li className={classes.li}>usunięcia danych – zgodnie z art. 17 RODO</li>
                                        <li className={classes.li}>ograniczenia przetwarzania danych – zgodnie z art. 18 RODO, </li>
                                        <li className={classes.li}>przenoszenia danych – zgodnie z art. 20 RODO, </li>
                                        <li className={classes.li}>wniesienia sprzeciwu wobec przetwarzania danych – zgodnie z art. 21 RODO</li>
                                        <li className={classes.li}>cofnięcia wyrażonej zgody w dowolnym momencie, przy czym cofnięcie zgody pozostaje bez wpływu na
                                            zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem –
                                            zgodnie z art. 7 ust. 3 RODO, </li>
                                        <li className={classes.li}>wniesienia skargi do organu nadzoru, tj. Prezesa Urzędu Ochrony Danych Osobowych – zgodnie z art.
                                            77 RODO. </li>
                                    </ul>
                                </li>
                                <li className={classes.li}>Administrator rozpatruje zgłoszone żądania bez zbędnej zwłoki, nie później jednak niż w ciągu miesiąca od
                                    chwili ich otrzymania. Jeżeli jednak – z uwagi na skomplikowany charakter żądania lub liczbę żądań –
                                    Administrator nie będzie mógł rozpatrzyć żądania Użytkownika we wskazanym terminie, to poinformuje
                                    Użytkownika o zamierzonym przedłużeniu terminu i wskaże termin rozpatrzenia zgłoszenia, nie dłuższy
                                    jednak niż 2 miesiące.</li>
                                <li className={classes.li}>Administrator informuje o sprostowaniu lub usunięciu danych osobowych lub ograniczeniu przetwarzania,
                                    których dokonał zgodnie z żądaniem Użytkownika każdego odbiorcę, któremu ujawniono dane osobowe,
                                    chyba że okaże się to niemożliwe lub będzie wymagać niewspółmiernie dużego wysiłku.</li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 7. KONIECZNOŚĆ PRZEKAZANIA DANYCH</h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>Podanie danych osobowych za pośrednictwem Platformy jest dobrowolne, jednak konieczne jeżeli
                                    Użytkownik chce korzystać z pełnej funkcjonalności Platformy.</li>
                                <li className={classes.li}>W przypadku, gdy podanie danych osobowych następuje w celu zawarcia umowy z Administratorem, stanowi
                                    ono warunek jej zawarcia. Podanie danych osobowych w tej sytuacji jest dobrowolne, jednak konsekwencją
                                    niepodania tych danych będzie brak możliwości zawarcia umowy z Administratorem</li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 8. UDOSTĘPNIENIE INFORMACJI</h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>W celu realizacji umowy Administrator może udostępniać zebrane od Użytkowników dane do podmiotów
                                    obejmujących: pracowników, współpracowników, podmioty świadczące na jego rzecz usługi prawne oraz
                                    obsługę IT oraz Dostawców. Ponadto, Administrator udostępnia zebrane dane osobowe podmiotowi, z
                                    którym zawarł umowę o powierzeniu przetwarzania danych osobowych. </li>
                                <li className={classes.li}>W takich przypadkach ilość przekazywanych danych ograniczona jest do niezbędnego minimum. Ponadto,
                                    podane przez Użytkowników informacje mogą zostać udostępnione właściwym organom władzy publicznej,
                                    z ograniczeniem do sytuacji w której wymagają tego obowiązujące przepisy prawa.</li>
                                <li className={classes.li}>Odbiorcom niewskazanym powyżej przetwarzane dane osobowe nie są udostępniane na zewnątrz w formie,
                                    która pozwalałby na jakąkolwiek identyfikację Użytkowników, chyba że Użytkownik wyraził zgodę na
                                    konkretne udostępnienie danych</li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 9. ŚRODKI TECHNICZNE</h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>Administrator dokłada wszelkich starań, aby zabezpieczyć dane Użytkowników i ochronić je przed działaniem
                                    osób trzecich, a także wykonuje nadzór nad bezpieczeństwem danych przez cały okres ich posiadania
                                    w sposób zapewniający ochronę przed dostępem osób nieuprawnionych, uszkodzeniem, zniekształceniem,
                                    zniszczeniem lub utratą danych.
                                </li>
                                <li className={classes.li}>Administrator stosuje niezbędne zabezpieczenia serwerów, połączeń i Serwisu. Podjęte przez Administratora
                                    działania mogą okazać się jednak niewystarczające, jeżeli Użytkownicy nie zachowają zasad
                                    bezpieczeństwa</li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 10. PRZEKAZYWANIE DANYCH OSOBOWYCH POZA EUROPEJSKI OBSZAR GOPODARCZY (EOG)</h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>Dane osobowe Użytkowników nie są przekazywane do państw spoza EOG. Administrator korzysta
                                    z serwerów do przechowywania danych ulokowanych w państwach należących do EOG.</li>
                                <li className={classes.li}>Administrator zastrzega, że Dostawcy mogą przetwarzać i przekazywać dane osobowe poza Europejski
                                    Obszar Gospodarczy. </li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 11. PODMIOTY PRZETWARZAJĄCE DANE W IMIENIU ADMINISTRATORA</h5>
                        </div>
                        <div>
                            <p>Dane osobowe Użytkowników mogą być powierzane do przetwarzania w imieniu Administratora portalom
                                obsługującym kampanię marketingową Administratora. Każdy podmiot przetwarzający zobowiązany jest do
                                dbałości o bezpieczeństwo przetwarzania oraz przestrzegania zasad przetwarzania Państwa danych osobowych
                                w stopniu identycznym do Administratora. </p>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 12. COOKIES</h5>
                        </div>
                        <div>
                            <p>Administrator nie gromadzi cookies związanych z Urządzeniem Użytkownika. Zastrzega jednak, że Dostawcy
                                mogą gromadzić cookies w oparciu o oddzielnie udzieloną zgodę Użytkownika. </p>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 13. ZMIANA POLITYKI PRYWATNOŚCI I COOKIES</h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>Administratorowi przysługuje prawo do zmiany niniejszego dokumentu, o czym Użytkownik zostanie
                                    powiadomiony w sposób umożliwiający zapoznanie się ze zmianami zanim wejdą one
                                    w życie, np. poprzez zamieszczenie odpowiednich informacji na Platformie, a w przypadku istotnych zmian
                                    także poprzez wysłanie powiadomienia na wskazany przez Użytkownika adres e-mail. </li>
                                <li className={classes.li}>W przypadku zastrzeżeń Użytkownika do wprowadzonych zmian może on zażądać usunięcia danych
                                    osobowych na Platformie. Dalsze korzystanie z Platformy po publikacji lub wysłaniu powiadomienia o
                                    zmianach niniejszego dokumentu uważane jest za wyrażenie zgody na gromadzenie, wykorzystywanie i
                                    udostępnianie danych osobowych Użytkownika według zaktualizowanej treści dokumentu. </li>
                                <li className={classes.li}>Niniejszy dokument nie ogranicza jakichkolwiek uprawnień przysługujących Użytkownikowi zgodnie
                                    z powszechnie obowiązującymi przepisami prawa. </li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: "center"}} className="ka-head">
                            <h5>§ 14. POSTANOWIENIA DODATKOWE</h5>
                        </div>
                        <div>
                            <ol>
                                <li className={classes.li}>Administrator w wykonaniu zobowiązań Dostawców, może dodawać do niniejszej Polityki Prywatności
                                    dodatkowe oświadczenia, co nie będzie stanowiło zmiany jej treści.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
