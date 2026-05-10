# ACME Dashboard

Tämä on ACME Dashboard -projekti, joka on rakennettu Next.js:llä ja TypeScriptillä.

## Komennot

Asenna riippuvuudet:

```bash
npm install
```

Käynnistä kehityspalvelin:

```bash
npm run dev
```

Avaa selainosoitteessa:

```bash
http://localhost:3000
```

Rakenna tuotantoversio:

```bash
npm run build
```

Käynnistä tuotantoversio:

```bash
npm start
```

Suorita lint-tarkistus:

```bash
npm run lint
```

## Testaa toimiiko sovellus

1. Avaa terminaali projektin juuresta (`acme-dashboard`-kansio).
2. Suorita `npm install`.
3. Käynnistä kehityspalvelin komennolla `npm run dev`.
4. Avaa selain ja mene osoitteeseen `http://localhost:3000`.
5. Jos sivu avautuu ja näyttää dashboardin, sovellus toimii peruskehitysympäristössä.

## Projektin rakenne

- `app/` – Next.js-sovellus, sivut ja API-reitit.
- `components/` – uudelleenkäytettäviä React-komponentteja.
- `lib/` – yhteiset apufunktiot ja tietokantayhteydet.
- `prisma/` – Prisma-skeema ja tietokannan siemen.
- `public/` – staattiset tiedostot.

## Tietokanta ja siementiedot

Tässä projektissa käytetään Prisma ORM:ää ja PostgreSQL:ää. Jos haluat ajaa siementiedot, käytä:

```bash
npx prisma db push
npx prisma db seed
```

## Huomioitavaa

- Käytössä on Next.js `16.2.5`.
- Riippuvuudet löytyvät `package.json`-tiedostosta.
- Jos projektilla on oma tietokantakonfiguraatio, varmista että ympäristömuuttujat ovat oikein ennen käynnistystä.
