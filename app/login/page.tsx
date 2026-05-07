export default function LoginPage() {
  return (
    <div>
      <h1>Kirjaudu sisään</h1>
      <form>
        <input type="email" placeholder="Sähköposti" />
        <input type="password" placeholder="Salasana" />
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );
}
