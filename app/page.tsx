import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <section className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">ACME Dashboard</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Yksinkertainen taloushallinnan demojärjestelmä</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Tämä sovellus näyttää, miten Next.js App Routerilla rakennetaan julkinen etusivu, kirjautuminen ja suojattu dashboard-laskujen hallintaan.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Kirjaudu sisään
              </Link>
              <Link
                href="/dashboard/invoices"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
              >
                Katso laskut
              </Link>
            </div>
          </section>

          <section className="rounded-[1.5rem] bg-slate-950 p-8 text-slate-50 shadow-xl">
            <h2 className="text-2xl font-semibold">Ominaisuudet</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
              <li>Julkinen kotisivu ja kirjautumissivu</li>
              <li>Suojattu dashboard, joka vaatii käyttäjän kirjautumisen</li>
              <li>Laskujen lisääminen, muokkaaminen ja poistaminen</li>
              <li>Tietokantaintegraatio Prisma + PostgreSQL</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
