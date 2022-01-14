# bund.wtf Website (tools)

## Requirements

* Node.js 14+ or later

## Setup

Create an [.env file](./.env) in the same folder as that file, and use the following skeleton:

```env
MONGO_URI=
MONGO_DB=

TWITTER_API_KEY=
TWITTER_API_KEY_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=
```

Then run the following commands from the same folder:

```bash
npm install
```

## Scripts

### Fetch news

```bash
npm run news:fetch https://netzpolitik.org/2021/anlasslose-massenueberwachung-bundesjustizminister-buschmann-will-quick-freeze-statt-vorratsdatenspeicherung/
```

Supported sites are: 

* [Heise Medien](https://heise.de/)
* [netzpolitik.org](https://netzpolitik.org/)
* [SPIEGEL Online](https://spiegel.de/)
* [Tagesschau](https://tagesschau.de/)
* [ZDF](https://zdf.de/)

### Fetch news

To fetch news from a list of URLs, simply create a simple [news.txt file](./news.txt):

```
https://netzpolitik.org/2022/booster-nachweis-covpasscheck-app-nutzlos-bei-einigen-corona-regeln/
https://www.zdf.de/nachrichten/wirtschaft/elektronische-krankschreibung-100.html
https://www.spiegel.de/netzwelt/apps/luca-app-ermittler-griffen-unrechtmaessig-auf-daten-zu-a-d4148cf4-c63f-4ad2-b39d-5f20adc00591
https://www.heise.de/news/c-t-deckt-auf-Sicherheitsluecke-in-elektronischer-Patientenakte-6304671.html

```

Then execute

```bash
npm run news:fetch
```

### Post news

Create (or update) a [news.json file](./news.json) in the same folder as that file, and use the following skeleton:

```json
[
  {
    "title": "Wenn die CDU ihren Wahlkampf digitalisiert…",
    "time": "2021-05-11T22:00:00.000Z",
    "link": "https://lilithwittmann.medium.com/wenn-die-cdu-ihren-wahlkampf-digitalisiert-a3e9a0398b4d",
    "image": {
      "url": "https://cdn.netzpolitik.org/wp-upload/2020/07/polizei-berlin-platz-luftbruecke-1536x864.jpg"
    },
    "author": {
      "name": "Lilith Wittmann",
      "avatar": "https://miro.medium.com/fit/c/262/262/1*VdJtHPFtMwJ-9m5dpxpAJg.jpeg",
      "twitter": "LilithWittmann"
    }
  }
]
```

Then run the following commands from the same folder:

```bash
npm run news:publish
```
