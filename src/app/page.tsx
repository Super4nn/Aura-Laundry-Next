"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AuraLaundryPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pricing, setPricing] = useState<any[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const getPricing = async () => {
      const { data, error } = await supabase
        .from("paket_laundry")
        .select("*")
        .order("harga", { ascending: true });

      if (!error && data) {
        setPricing(data);
      }
    };

    getPricing();
  }, []);

  const WA_NUMBER = "6281249367277";
  const WA_URL = `https://wa.me/${WA_NUMBER}`;
  const WA_ORDER = `https://wa.me/${WA_NUMBER}?text=Halo%20Aura%20Laundry%2C%20saya%20ingin%20order%20laundry.`;
  const WA_PROMO = `https://wa.me/${WA_NUMBER}?text=Halo%20Aura%20Laundry%2C%20saya%20ingin%20klaim%20promo%2010x%20cuci%20gratis%201x!`;

  const services = [
    { num: "01", title: "Laundry Biasa", desc: "Cuci lipat bersih dengan hasil yang wangi dan rapi untuk kebutuhan harian." },
    { num: "02", title: "Express", desc: "Selesai dalam hitungan jam untuk kebutuhan mendesak dan jadwal padat." },
    { num: "03", title: "Setrika", desc: "Hanya setrika untuk pakaian yang licin, rapi, dan siap dipakai." },
    { num: "04", title: "Cuci Kering", desc: "Perawatan khusus dry cleaning untuk bahan sensitif dan pakaian premium." },
    { num: "05", title: "Cuci Basah", desc: "Hanya cuci dan peras, cocok untuk yang ingin proses pengeringan sendiri." },
    { num: "06", title: "Kilat", desc: "Layanan super cepat untuk Anda yang memiliki jadwal sangat padat." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fff; color: #0f172a; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }
        ul { list-style: none; }
        img { max-width: 100%; display: block; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }

        /* NAV */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: #fff;
          border-bottom: 1px solid #f1f5f9;
        }

        .nav.scrolled {
          box-shadow: 0 2px 20px rgba(0,0,0,.06);
        }

        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 60px;
          height: 86px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 60px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 20px;
          font-weight: 800;
          color: #2563eb;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: #2563eb;
          color: #ffd43b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 800;
        }

        .nav-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 55px;
        }

        .nav-links a {
          font-size: 16px;
          font-weight: 500;
          color: #64748b;
          transition: .2s;
        }

        .nav-links a:hover {
          color: #2563eb;
        }

        .btn-order {
          background: #2563eb;
          color: #fff;
          height: 56px;
          padding: 0 34px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 700;
          white-space: nowrap;
        }

        .btn-order:hover {
          background: #1d4ed8;
        }

        .burger {
          display: none;
        }

        @media (max-width: 900px) {
          .nav-inner {
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
          }

          .nav-links,
          .btn-order {
            display: none;
          }

          .burger {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .burger span {
            width: 24px;
            height: 2px;
            background: #334155;
          }
        }

        /* MOBILE MENU */
        .mobile-menu {
          display: none; position: fixed; top: 68px; left: 0; right: 0; bottom: 0;
          background: #fff; z-index: 99; flex-direction: column; padding: 32px 24px; gap: 8px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { font-size: 20px; font-weight: 600; color: #0f172a; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .mobile-menu .btn-order { margin-top: 16px; justify-content: center; }

        /* HERO */
        .hero {
          min-height: 100vh;
          padding-top: 68px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: linear-gradient(
            135deg,
            #fafcff 0%,
            #f5f8fd 35%,
            #7695bd 70%,
            #9fb7e1 100%
          );
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          top: -250px;
          left: -250px;
          border-radius: 50%;
          background: rgba(96, 165, 250, 0.18);
        }

        .hero::after {
          content: "";
          position: absolute;
          width: 700px;
          height: 700px;
          bottom: -400px;
          right: -350px;
          border-radius: 50%;
          background: rgba(191, 219, 254, 0.25);
          z-index: 0;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; border-radius: 9999px; padding: 8px 18px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: #475569;
          margin-bottom: 28px;
        }
        .hero-badge::before {
          content: ''; width: 8px; height: 8px; border-radius: 50%;
          background: #f5b800; flex-shrink: 0;
        }
        .hero h1 { font-size: clamp(52px, 6vw, 76px); font-weight: 800; line-height: 1.05; margin-bottom: 24px; }
        .hero h1 .line-blue { color: #2563eb; display: block; }
        .hero h1 .line-yellow { color: #f5b800; display: block; }
        .hero-desc { font-size: 17px; color: #475569; line-height: 1.7; margin-bottom: 36px; max-width: 440px; }
        .btn-wa {
          display: inline-flex; align-items: center; gap: 10px;
          background: #2563eb; color: #fff; border-radius: 9999px;
          padding: 16px 32px; font-size: 16px; font-weight: 700;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .btn-wa:hover { background: #1d4ed8; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.35); }

        .hero-img-wrap {
          position: relative;
          z-index: 5;
          background: #fff;
          padding: 12px;
          border-radius: 36px;
          box-shadow: 0 20px 60px rgba(0,0,0,.12);
        }

        .hero-img {
          position: relative;
          z-index: 5;
          width: 100%;
          aspect-ratio: 4/3.5;
          object-fit: cover;
          border-radius: 24px;
          background: #fff;
          box-shadow: none;
        }

        /* SERVICES */
        .services {
          padding: 96px 0;
          background: linear-gradient(
            135deg,
            #edf3fb 0%,
            #72a3e0 100%
          );
        }

        .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
        .section-header { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: end; margin-bottom: 56px; }
        .section-tag {
          color: #2563eb;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 3px;
          margin-bottom: 14px;
        }
        .section-header h2 {
          font-size: clamp(38px, 4vw, 56px);
          line-height: 1.15;
          font-weight: 800;
          color: #2563eb;
          background: none;
          -webkit-text-fill-color: unset;
        }
        .section-header p { font-size: 16px; color: #64748b; line-height: 1.7; align-self: end; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

        .service-card {
          background: rgba(253, 253, 253, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid #f9f9f9c4;
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: 0 10px 30px #9dbcff14;
          position: relative;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #a3bdf5, #60a5fa);
          border-radius: 16px 16px 0 0;
        }
        .service-card:hover { box-shadow: 0 8px 32px rgba(37,99,235,0.10); transform: translateY(-4px); }
        .service-num {
          display: inline-flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 10px;
          background: #dbeafe; color: #2563eb; font-size: 13px; font-weight: 700;
          margin-bottom: 20px;
        }
        .service-card h3 { font-size: 19px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
        .service-card p { font-size: 14px; color: #64748b; line-height: 1.65; }

        /* PRICING */
        .pricing {
          position: relative;
          overflow: hidden;
          padding: 120px 0;
          background: linear-gradient(
            135deg,
            #f8fbff 0%,
            #c2cfdf 20%,
            #b0c5e0f5 100%
          );
        }

        .pricing::before {
          content: "";
          position: absolute;
          top: -250px;
          left: -250px;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.08);
        }

        .pricing::after {
          content: "";
          position: absolute;
          bottom: -250px;
          right: -250px;
          width: 650px;
          height: 650px;
          border-radius: 50%;
          background: rgba(96, 165, 250, 0.12);
        }

        .pricing .section-inner {
          position: relative;
          z-index: 2;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* CARD */
        .price-card {
          position: relative;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 30px;
          border: 1px solid rgba(255,255,255,.8);
          box-shadow:
            0 20px 40px rgba(37,99,235,.08),
            0 4px 12px rgba(0,0,0,.04);
          transition: .3s ease;
        }

        .price-card:hover {
          transform: translateY(-8px);
          box-shadow:
            0 30px 60px rgba(37,99,235,.15),
            0 8px 20px rgba(0,0,0,.08);
        }

        /* HIGHLIGHT */
        .price-card.highlight {
          background: linear-gradient(
            135deg,
            #2563eb,
            #1d4ed8
          );
          border: none;
          transform: scale(1.03);
        }

        .price-card.highlight:hover {
          transform: scale(1.03) translateY(-8px);
          box-shadow: 0 30px 60px rgba(37,99,235,.35);
        }

        /* BADGE */
        .price-badge {
          position: absolute;
          top: 18px;
          right: 18px;
          background: #facc15;
          color: #0f172a;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .08em;
          padding: 6px 14px;
          border-radius: 999px;
        }

        /* TEXT */
        .price-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .12em;
          color: #64748b;
          margin-bottom: 16px;
        }

        .price-card.highlight .price-label {
          color: rgba(255,255,255,.7);
        }

        .price-amount {
          font-size: clamp(34px, 4vw, 42px);
          font-weight: 800;
          color: #2563eb;
          margin-bottom: 6px;
        }

        .price-card.highlight .price-amount {
          color: #ffffff;
        }

        .price-unit {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 24px;
        }

        .price-card.highlight .price-unit {
          color: rgba(255,255,255,.75);
        }

        .price-divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin-bottom: 20px;
        }

        .price-card.highlight .price-divider {
          border-color: rgba(255,255,255,.15);
        }

        .price-duration {
          min-height: 24px;
          font-size: 14px;
          color: #475569;
          margin-bottom: 12px;
        }

        .price-card.highlight .price-duration {
          color: rgba(255,255,255,.8);
        }

        .price-desc {
          margin-bottom: 24px;
          color: #64748b;
          line-height: 1.6;
          font-size: 14px;
          min-height: 44px;
        }

        .price-card.highlight .price-desc {
          color: rgba(255,255,255,.85);
        }

        /* BUTTON */
        .btn-pesan {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          border-radius: 999px;
          border: 2px solid #dbeafe;
          background: white;
          color: #2563eb;
          font-size: 15px;
          font-weight: 700;
          transition: .3s;
        }

        .btn-pesan:hover {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .price-card.highlight .btn-pesan {
          background: white;
          color: #2563eb;
          border-color: white;
        }

        .price-card.highlight .btn-pesan:hover {
          background: #f8fafc;
        }

        /* PROMO */
        .promo { background: #0051ffc9; padding: 72px 0; }
        .promo-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between; gap: 40px;
        }
        .promo-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.15); border-radius: 9999px;
          padding: 7px 16px; font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.9); margin-bottom: 22px;
        }
        .promo-badge::before { content: '•'; color: #f5b800; }
        .promo h2 { font-size: clamp(36px, 4vw, 52px); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 18px; }
        .promo h2 span { color: #f5b800; }
        .promo p { font-size: 15px; color: rgba(255,255,255,0.75); max-width: 400px; line-height: 1.7; }
        .btn-klaim {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 10px;
          background: #22c55e; color: #fff; border-radius: 9999px;
          padding: 16px 32px; font-size: 16px; font-weight: 700;
          transition: background 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .btn-klaim:hover { background: #16a34a; transform: translateY(-2px); }

        /* CONTACT */
        .contact { padding: 96px 0; background: #70a9e749; }
        .contact-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
        }
        .contact-item {
          display: flex; align-items: flex-start; gap: 18px;
          padding: 24px 0; border-bottom: 1px solid #000000;
        }
        .contact-item:last-child { border-bottom: none; }
        .contact-icon {
          width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 20px;
        }
        .ci-green { background: #dcfce7; }
        .ci-yellow { background: #fef9c3; }
        .ci-blue { background: #dbeafe; }
        .contact-item-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 6px; }
        .contact-item-value { font-size: 15px; font-weight: 600; color: #0f172a; line-height: 1.5; }
        .contact-item-sub { font-size: 14px; color: #64748b; margin-top: 2px; }
        .contact-cta {
          background: #2563eb; border-radius: 24px;
          padding: 40px 36px; color: #fff;
        }
        .contact-cta h3 { font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .contact-cta h3 span { color: #f5b800; }
        .contact-cta p { font-size: 14px; color: rgba(255,255,255,0.75); margin: 14px 0 28px; line-height: 1.65; }
        .btn-chat {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          background: #22c55e; color: #fff; border-radius: 9999px;
          padding: 16px; font-size: 16px; font-weight: 700;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-chat:hover { background: #16a34a; transform: translateY(-1px); }

        /* FOOTER */
        .footer {
          border-top: 1px solid #000000;
          padding: 28px 0; background: rgb(206, 226, 239);
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .footer-copy { font-size: 13px; color: #000000; }

        /* RESPONSIVE */
        @media (max-width: 992px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 900px) {
          .nav-links, .nav .btn-order { display: none; }
          .burger { display: flex; }
          .hero-inner { grid-template-columns: 1fr; padding: 40px 20px 60px; }
          .hero-img-wrap { order: -1; }
          .section-header { grid-template-columns: 1fr; gap: 16px; }
          .services-grid { grid-template-columns: 1fr 1fr; }
          .price-card.highlight { transform: none; }
          .price-card.highlight:hover { transform: translateY(-8px); }
          .promo-inner { flex-direction: column; align-items: flex-start; }
          .contact-inner { grid-template-columns: 1fr; gap: 40px; }
          .footer-inner { flex-direction: column; gap: 12px; text-align: center; }
          .section-inner { padding: 0 20px; }
        }

        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr; }
          .price-card.highlight { transform: none; }
          .price-card.highlight:hover { transform: translateY(-8px); }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#home" className="logo">
            <div className="logo-icon">AL</div>
            <span>Aura Laundry</span>
          </a>

          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#layanan">Layanan</a></li>
            <li><a href="#harga">Harga</a></li>
            <li><a href="#promo">Promo</a></li>
            <li><a href="#kontak">Kontak</a></li>
          </ul>

          <a
            href={WA_ORDER}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-order"
          >
            💬 Order Sekarang
          </a>

          <button
            className="burger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["Home", "Layanan", "Harga", "Promo", "Kontak"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <a
          href={WA_ORDER}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-order"
        >
          💬 Order Sekarang
        </a>
      </div>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">LAYANAN LAUNDRY PROFESIONAL</div>
            <h1>
              <span className="line-blue">Bersih.</span>
              <span className="line-blue">Rapi.</span>
              <span className="line-yellow">Tepat Waktu.</span>
            </h1>
            <p className="hero-desc">
              Solusi perawatan pakaian untuk Anda yang menghargai kualitas dan ketepatan waktu. Kami hadir setiap hari untuk kebutuhan Anda.
            </p>
            <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn-wa">
              Pesan via WhatsApp →
            </a>
          </div>
          <div className="hero-img-wrap">
            <img
              src="/Aura-laundry.png"
              alt="Aura Laundry"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="layanan">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <p className="section-tag">LAYANAN KAMI</p>
              <h2>Yang Kami<br />Kerjakan</h2>
            </div>
            <p>Pilihan layanan lengkap untuk semua jenis kebutuhan perawatan pakaian Anda.</p>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.num}>
                <div className="service-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="harga">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <p className="section-tag">DAFTAR HARGA</p>
              <h2>Transparan,<br />Tanpa Kejutan</h2>
            </div>
            <p>Harga terjangkau dengan kualitas yang tidak pernah kami kompromikan.</p>
          </div>
          <div className="pricing-grid">
            {pricing.map((item) => (
              <div
                key={item.id}
                className={`price-card${item.is_populer ? " highlight" : ""}`}
              >
                {item.is_populer && (
                  <div className="price-badge">POPULER</div>
                )}

                <div className="price-label">
                  {item.nama}
                </div>

                <div className="price-amount">
                  Rp {item.harga.toLocaleString("id-ID")}
                </div>

                <div className="price-unit">
                  per kilogram
                </div>

                <hr className="price-divider" />

                <div className="price-duration">
                  {item.durasi}
                </div>

                {item.deskripsi && (
                  <p className="price-desc">
                    {item.deskripsi}
                  </p>
                )}

                <a
                  href={WA_ORDER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pesan"
                >
                  Pesan Sekarang
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className="promo" id="promo">
        <div className="promo-inner">
          <div>
            <div className="promo-badge">PROMO TERBATAS</div>
            <h2>
              10× Cuci,<br />
              Gratis <span>1× Cuci</span>
            </h2>
            <p>Nikmati promo spesial Aura Laundry. Berlaku untuk seluruh pelanggan dan dapat langsung diklaim melalui WhatsApp kami.</p>
          </div>
          <a href={WA_PROMO} target="_blank" rel="noopener noreferrer" className="btn-klaim">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .15 5.35.15 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.29-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.56 0 11.91-5.35 11.91-11.91 0-3.18-1.24-6.17-3.46-8.43z" />
            </svg>
            Klaim Promo
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="kontak">
        <div className="contact-inner">
          <div>
            <p className="section-tag">HUBUNGI KAMI</p>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, marginBottom: 36 }}>
              Ada yang Bisa<br />Kami Bantu?
            </h2>
            <div className="contact-item">
              <div className="contact-icon ci-green">📱</div>
              <div>
                <p className="contact-item-label">WHATSAPP</p>
                <p className="contact-item-value">0812-4936-7277</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon ci-yellow">📍</div>
              <div>
                <p className="contact-item-label">ALAMAT</p>
                <p className="contact-item-value">Jl. Atletik Perumahan<br />Tasikmadu Regency No. A3</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon ci-blue">🕐</div>
              <div>
                <p className="contact-item-label">JAM OPERASIONAL</p>
                <p className="contact-item-value">Setiap Hari</p>
                <p className="contact-item-sub">07.00 – 21.00 WIB</p>
              </div>
            </div>
          </div>
          <div className="contact-cta">
            <h3>Siap Melayani<br /><span>Hari Ini?</span></h3>
            <p>Hubungi kami sekarang dan dapatkan layanan laundry terbaik untuk Anda. Respon cepat dijamin.</p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-chat">
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <a href="#" className="logo">
            <div className="logo-icon">AL</div>
            Aura Laundry
          </a>
          <p className="footer-copy">© 2026 Aura Laundry. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}