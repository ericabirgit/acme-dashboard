# Projektiraportti: ACME Dashboard

## 1. Projektin nimi
ACME Dashboard

## 2. Projektin kuvaus
Lyhyt kuvaus projektista:
- Tässä kurssiprojektissa rakennettiin yksinkertainen Next.js -pohjainen taloushallinnan demo, joka sisältää julkisen kotisivun, kirjautumissivun ja suojatut hallintasivut.
- Käyttäjät voivat lisätä, muokata ja poistaa laskuja, ja sovellus yhdistää tietokannan tietojen tallennukseen.

## 3. Sovelluksen ominaisuudet
Listaa projektin keskeiset ominaisuudet:
- Julkinen kotisivu
- Kirjautumissivu
- Suojatut dashboard-sivut, jotka vaativat käyttäjän autentikoinnin
- Laskujen lisääminen, muokkaaminen ja poistaminen
- Tietokantaintegraatio (esim. Prisma / SQLite / PostgreSQL)
- Seuraavat Next.js App Router -konventiot ja komponenttijärjestelyt

## 4. Teknologiat ja työkalut
Mainitse käytetyt teknologiat:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS / CSS-moduulit / muu tyylitys
- Prisma ja tietokanta
- Next.js API reitit / server components / client components
- GitHub ja Vercel -deploy

## 5. Toteutus ja arkkitehtuuri
Kuvaa lyhyesti sovelluksen rakenne ja tärkeimmät osat:
- `app/page.tsx` / julkinen etusivu
- `app/login/page.tsx` / kirjautumissivu
- `app/dashboard/page.tsx` / suojattu dashboard
- `app/dashboard/invoices/*` / laskujen CRUD
- `lib/prisma.ts` / tietokantayhteys
- `app/api/...` / backend-logiikka

## 6. Käyttöohjeet
Kuvaa miten projekti käynnistetään paikallisesti:
1. `npm install`
2. `npm run dev`
3. Avaa `http://localhost:3000`

## 7. Julkaistu sovellus
Lisää tässä julkaistun sovelluksen URL:
- Julkaistu sovellus: `https://...`

## 8. Esittelyvideo
Lisää tässä esittelyvideon URL ja lyhyt ohje:
- Esittelyvideo: `https://...`
- Ohje: Tallenna lyhyt demo, jossa esittelet sovelluksen päätoiminnot, kuten kirjautumisen, dashboardin ja laskujen hallinnan.

## 9. GitHub-repositorio
Lisää tässä GitHub-repon URL:
- GitHub: `https://github.com/<käyttäjä>/<repo>`

## 10. Oppimiskokemukset
Kuvaa mitä opit projektin aikana:
- Next.js App Routerin rakenne
- Server- ja Client-komponenttien ero
- Auth-protektointien lisääminen
- Datan käsittely ja CRUD-toiminnot
- Projektin julkaisu ja deployment

## 11. Haasteet ja ratkaisut
Kirjoita lyhyesti kohtaamistasi haasteista ja miten ratkaisit ne:
- Esim. autentikointi, reititys, tietokantayhteydet, komponenttien rakenne

## 12. Jatkokehitys
Listaa mahdollisia parannuksia ja jatkokehitysideoita:
- Käyttäjätilien hallinta ja kirjautuminen oikeilla käyttäjätiedoilla
- Laskujen suodatus ja haku
- Parempi käyttöliittymä ja responsiivisuus
- Deployment Vercelissä ja ympäristömuuttujien käyttö
