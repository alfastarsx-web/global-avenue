import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <span className="kicker">404</span>
        <h1 className="sec-title">Sahifa topilmadi / Страница не найдена</h1>
        <p className="sec-sub">
          Siz qidirgan sahifa mavjud emas yoki manzili o‘zgargan. · Запрошенная страница не
          существует или её адрес изменился.
        </p>
        <div className="btn-row" style={{ marginTop: 24 }}>
          <Link href="/uz" className="btn btn--accent">
            Bosh sahifaga
          </Link>
          <Link href="/ru" className="btn btn--ghost">
            На главную
          </Link>
        </div>
      </div>
    </section>
  );
}
