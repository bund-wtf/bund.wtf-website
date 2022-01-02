/*******************************************************************************
  The MIT License (MIT)

  Copyright (c) 2021-present Marcel Joachim Kloubert

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*******************************************************************************/

// import styles from '../styles/Home.module.scss';
import { Container } from '@mui/material';
import type { NextPage } from 'next';

import contact from '../contact.json';

const DatenschutzPage: NextPage = () => {
  return (
    <Container maxWidth="sm">
      <h1 style={{ textAlign: 'center' }}>Datenschutzerklärung</h1>

      <h3>Grundlegendes</h3>
      <p>Diese Datenschutzerklärung soll die Nutzer dieser Website über die Art, den Umfang und den Zweck der Erhebung und Verwendung personenbezogener Daten durch den Websitebetreiber</p>
      <pre>{contact.name}<br />{contact.street}<br />{contact.zip_code} {contact.city}<br />{contact.country}</pre>
      <p>informieren.</p>
      <p>Ich, der Websitebetreiber, nehme Ihren Datenschutz sehr ernst und behandele Ihre
        personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Vorschriften. Da
        durch neue Technologien und die ständige Weiterentwicklung dieser Website Änderungen
        an dieser Datenschutzerklärung vorgenommen werden können, empfehle ich Ihnen sich die
        Datenschutzerklärung in regelmäßigen Abständen wieder durchzulesen.</p>
      <p>Definitionen der verwendeten Begriffe (z.B. <em>personenbezogene Daten</em> oder <em>Verarbeitung</em>)
        finden Sie in Art. 4 DSGVO.</p>

      <h3>Zugriffsdaten</h3>
      <p>Ich, der Websitebetreiber bzw. Seitenprovider, erhebe aufgrund meines berechtigten
        Interesses (s. Art. 6 Abs. 1 lit. f. DSGVO) Daten über Zugriffe auf die Website und speichere
        diese als sog. <em>Logfiles</em> auf dem Server der Website ab. Folgende Daten werden hierbei
        protokolliert:</p>
      <ul>
        <li>Datum + Uhrzeit zum Zeitpunkt des Zugriffs</li>
        <li>Menge der gesendeten Daten in Byte</li>
        <li>Besuchte Seite innerhalb dieser Website</li>
        <li>Verweis bzw. Quelle, von welchem Sie auf diese Seiten gelangt sind</li>
        <li>Verwendete Browser-Applikation</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Ihre IP-Adresse</li></ul>

      <p>Die <em>Logfiles</em> werden für maximal eine Woche (7 Tage) gespeichert und anschließend unwiderruflich gelöscht. Die Daten werden nur aus Sicherheitsgründen gespeichert, um bspw. Missbrauchsfälle aufklären
        zu können. Müssen Daten zur Beweissicherung aufgehoben werden, sind sie solange von der
        Löschung ausgenommen bis der Vorfall und die zugrundeliegenden Angelegenheiten endgültig geklärt sind.</p>

      <h3>Cookies</h3>
      <p>Diese Website verwendet Cookies zur Verwaltung der Sitzung(en) eines oder mehrerer Benutzerkonten.</p>
      <p>Bei Cookies handelt es sich um kleine Dateien, welche auf Ihrem
        Endgerät gespeichert werden. Ihr Browser greift auf diese Dateien zu.</p>
      <p>Diese Cookies dienen dazu, erweiterte Funktionen anzubieten, die allerdings erst nach einem eindeutigen Hinweis und der Zustimmung des Benutzers aktiviert werden und jederzeit wieder deaktiviert werden können.</p>
      <p>Die Daten dieser Cookies werden ausschließlich innerhalb dieses Servers verwendet und nicht weitergegeben, sofern nicht anders angegeben. Bspw. setzt das Banner am unteren Bildschirmrand ein Cookie, um zu bestimmen, ob Sie bereits auf &quot;Verstanden&quot; geklickt hatten oder nicht.</p>
      <p>Gängige Browser-Programme bieten die Möglichkeit, Cookies nicht zuzulassen. WICHTIG: Es ist
        nicht gewährleistet, dass Sie auf alle Funktionen dieser Website ohne Einschränkungen
        zugreifen können, wenn Sie entsprechende Einstellungen anpassen.</p>

      <h3>Kontaktdaten</h3>
      <p>Sofern Sie mit mir als Websitebetreiber durch die angebotenen Kontaktmöglichkeiten
        Verbindung aufnehmen, werden Ihre Angaben gespeichert, damit auf diese zur Bearbeitung und
        Beantwortung Ihrer Anfrage zurückgegriffen werden kann. Ohne Ihre Einwilligung werden
        diese Daten nicht an Dritte weitergegeben und spätestens nach 30 Tagen gelöscht, sofern dies gesetzlich möglich ist und keine Beweissicherung, wie bei Zugriffsdaten, erfolgt.</p>

      <h3>Kommentare, Beiträge und API-Zugriffe</h3>
      <p>Hinterlassen Sie auf dieser Website einen Beitrag, einen Kommentar oder greifen auf eine Programmierschnittstelle (API) zu, wird Ihre IP-Adresse
        gespeichert. Dies erfolgt aufgrund meines berechtigten Interesses im Sinne des Art. 6 Abs.
        1 lit. f. DSGVO und dient der Sicherheit von mir als Websitebetreiber: Denn sollte Ihr
        Kommentar / Beitrag / Zugriff gegen geltendes Recht verstoßen, kann ich dafür belangt werden, weshalb
        ich ein Interesse an der Identität der jeweilgen Person(en) habe.</p>
      <p>Die Dauer der Speicherung richtet sich an den gesetzlichen Vorgaben.</p>

      <h3>Google Analytics</h3>
      <p>Ich nutze kein Google Analytics oder Ähnliches auf diesen Seiten.</p>
    </Container >
  );
};

export default DatenschutzPage;
