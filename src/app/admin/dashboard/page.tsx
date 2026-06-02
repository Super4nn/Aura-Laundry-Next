"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Paket = {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  durasi: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [menu, setMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [paket, setPaket] = useState<Paket[]>([]);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [durasi, setDurasi] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  // Lock body scroll saat sidebar terbuka di mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    getPaket();
    checkSession();
  }, []);

  async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  }

  async function getPaket() {
    const { data, error } = await supabase
      .from("paket_laundry")
      .select("*")
      .order("id");
    if (!error) {
      setPaket(data || []);
    }
  }

  async function tambahPaket() {
    if (!nama || !deskripsi || !harga || !durasi) {
      alert("Lengkapi data terlebih dahulu");
      return;
    }
    const { error } = await supabase
      .from("paket_laundry")
      .insert([{ nama, deskripsi, harga: Number(harga), durasi }]);
    if (!error) {
      setNama("");
      setDeskripsi("");
      setHarga("");
      setDurasi("");
      getPaket();
    }
  }

  async function updatePaket() {
    if (!editId) return;
    const { error } = await supabase
      .from("paket_laundry")
      .update({ nama, deskripsi, harga: Number(harga), durasi })
      .eq("id", editId);
    if (!error) {
      setEditId(null);
      setNama("");
      setDeskripsi("");
      setHarga("");
      setDurasi("");
      getPaket();
    }
  }

  async function hapusPaket(id: number) {
    const yakin = confirm("Yakin ingin menghapus paket ini?");
    if (!yakin) return;
    const { error } = await supabase
      .from("paket_laundry")
      .delete()
      .eq("id", id);
    if (!error) {
      getPaket();
    }
  }

  function editPaket(item: Paket) {
    setEditId(item.id);
    setNama(item.nama);
    setDeskripsi(item.deskripsi);
    setHarga(item.harga.toString());
    setDurasi(item.durasi);
    setMenu("paket");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const pageTitle = menu === "dashboard" ? "Dashboard" : "Paket Laundry";
  const pageDesc =
    menu === "dashboard"
      ? "Selamat datang kembali, Admin"
      : "Kelola semua paket laundry Anda";

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .adm-wrap, .adm-wrap *, .adm-wrap *::before, .adm-wrap *::after {
      box-sizing: border-box !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .adm-wrap a { color: inherit; text-decoration: none; }
    .adm-wrap button { font-family: 'Plus Jakarta Sans', sans-serif; }

    :root {
      --adm-primary:       #2F80ED;
      --adm-primary-light: #6CB4FF;
      --adm-primary-dark:  #1a65c8;
      --adm-bg:            #F4F8FD;
      --adm-card:          #FFFFFF;
      --adm-text:          #1E293B;
      --adm-muted:         #64748B;
      --adm-border:        #E2E8F0;
      --adm-success:       #22C55E;
      --adm-warning:       #F59E0B;
      --adm-danger:        #EF4444;
      --adm-sidebar-w:     280px;
      --adm-topbar-h:      72px;
    }

    html, body {
      height: 100% !important;
    }

    .adm-wrap {
      display: flex !important;
      width: 100% !important;
      min-height: 100vh !important;
      background: var(--adm-bg) !important;
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      color: var(--adm-text) !important;
      position: relative !important;
    }

    /* ── OVERLAY ── */
    .adm-overlay {
      display: none !important;
      position: fixed !important;
      inset: 0 !important;
      background: rgba(0,0,0,.5) !important;
      z-index: 299 !important;
      touch-action: none !important;
    }
    .adm-overlay.show { display: block !important; }

    /* ── SIDEBAR ── */
    .adm-sidebar {
      width: var(--adm-sidebar-w) !important;
      background: linear-gradient(175deg,#1a4fbe 0%,#2F80ED 55%,#5ba3f5 100%) !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      height: 100vh !important;
      height: 100dvh !important;
      display: flex !important;
      flex-direction: column !important;
      z-index: 300 !important;
      transition: transform .3s cubic-bezier(.4,0,.2,1) !important;
      overflow: hidden !important;
    }
    .adm-sidebar::before {
      content: '' !important;
      position: absolute !important;
      top: -70px !important;
      right: -70px !important;
      width: 210px !important;
      height: 210px !important;
      border-radius: 50% !important;
      background: rgba(255,255,255,.06) !important;
      pointer-events: none !important;
    }
    .adm-sidebar::after {
      content: '' !important;
      position: absolute !important;
      bottom: 60px !important;
      left: -80px !important;
      width: 240px !important;
      height: 240px !important;
      border-radius: 50% !important;
      background: rgba(255,255,255,.04) !important;
      pointer-events: none !important;
    }

    .adm-sidebar__head {
      padding: 28px 24px 20px !important;
      display: flex !important;
      align-items: center !important;
      gap: 14px !important;
      flex-shrink: 0 !important;
    }
    .adm-sidebar__logo {
      width: 46px !important;
      height: 46px !important;
      background: rgba(255,255,255,.18) !important;
      border-radius: 14px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 22px !important;
      border: 1px solid rgba(255,255,255,.25) !important;
      flex-shrink: 0 !important;
    }
    .adm-sidebar__brand-name {
      font-size: 15px !important;
      font-weight: 800 !important;
      color: #fff !important;
      letter-spacing: -.3px !important;
      line-height: 1.2 !important;
    }
    .adm-sidebar__brand-sub {
      font-size: 11px !important;
      color: rgba(255,255,255,.55) !important;
      font-weight: 500 !important;
    }
    .adm-sidebar__divider {
      height: 1px !important;
      background: rgba(255,255,255,.12) !important;
      margin: 0 24px 18px !important;
    }
    .adm-sidebar__sec-label {
      font-size: 10px !important;
      font-weight: 700 !important;
      letter-spacing: 2px !important;
      text-transform: uppercase !important;
      color: rgba(255,255,255,.4) !important;
      padding: 0 24px 10px !important;
    }
    .adm-sidebar__nav {
      display: flex !important;
      flex-direction: column !important;
      gap: 4px !important;
      padding: 0 14px !important;
      flex: 1 !important;
    }

    .adm-nav-btn {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      padding: 12px 14px !important;
      border-radius: 14px !important;
      border: none !important;
      background: transparent !important;
      color: rgba(255,255,255,.7) !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all .2s !important;
      text-align: left !important;
      width: 100% !important;
    }
    .adm-nav-btn:hover {
      background: rgba(255,255,255,.12) !important;
      color: #fff !important;
    }
    .adm-nav-btn.active {
      background: rgba(255,255,255,.95) !important;
      color: var(--adm-primary) !important;
      box-shadow: 0 4px 16px rgba(0,0,0,.12) !important;
    }
    .adm-nav-btn__icon {
      width: 34px !important;
      height: 34px !important;
      border-radius: 10px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 16px !important;
      background: rgba(255,255,255,.1) !important;
      flex-shrink: 0 !important;
    }
    .adm-nav-btn.active .adm-nav-btn__icon {
      background: rgba(47,128,237,.1) !important;
    }
    .adm-nav-btn__lbl { flex: 1 !important; }
    .adm-nav-btn__dot {
      width: 6px !important;
      height: 6px !important;
      border-radius: 50% !important;
      background: var(--adm-warning) !important;
      opacity: 0 !important;
    }
    .adm-nav-btn.active .adm-nav-btn__dot { opacity: 1 !important; }

    .adm-sidebar__footer {
      padding: 14px !important;
      flex-shrink: 0 !important;
    }
    .adm-user-card {
      background: rgba(255,255,255,.1) !important;
      border-radius: 14px !important;
      padding: 13px 14px !important;
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      margin-bottom: 10px !important;
      border: 1px solid rgba(255,255,255,.12) !important;
    }
    .adm-user-card__av {
      width: 36px !important;
      height: 36px !important;
      border-radius: 10px !important;
      background: rgba(255,255,255,.25) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 15px !important;
      font-weight: 800 !important;
      color: #fff !important;
      flex-shrink: 0 !important;
    }
    .adm-user-card__name {
      font-size: 13px !important;
      font-weight: 700 !important;
      color: #fff !important;
      line-height: 1.2 !important;
    }
    .adm-user-card__role {
      font-size: 11px !important;
      color: rgba(255,255,255,.5) !important;
    }
    .adm-logout-btn {
      width: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      padding: 12px !important;
      border-radius: 14px !important;
      border: 1px solid rgba(255,255,255,.2) !important;
      background: rgba(255,255,255,.08) !important;
      color: rgba(255,255,255,.85) !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      transition: all .2s !important;
    }
    .adm-logout-btn:hover {
      background: rgba(239,68,68,.25) !important;
      border-color: rgba(239,68,68,.5) !important;
      color: #fff !important;
    }

    /* ── MAIN ── */
    .adm-main {
      margin-left: var(--adm-sidebar-w) !important;
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
      min-height: 100vh !important;
      min-width: 0 !important;
    }

    /* ── TOPBAR ── */
    .adm-topbar {
      height: var(--adm-topbar-h) !important;
      min-height: var(--adm-topbar-h) !important;
      background: var(--adm-card) !important;
      border-bottom: 1px solid var(--adm-border) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 0 32px !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 100 !important;
      gap: 16px !important;
      flex-shrink: 0 !important;
    }
    .adm-topbar__left {
      display: flex !important;
      align-items: center !important;
      gap: 14px !important;
    }
    .adm-hamburger {
      display: none !important;
      width: 38px !important;
      height: 38px !important;
      border: 1px solid var(--adm-border) !important;
      border-radius: 10px !important;
      background: transparent !important;
      cursor: pointer !important;
      align-items: center !important;
      justify-content: center !important;
      flex-direction: column !important;
      gap: 4px !important;
      padding: 0 10px !important;
      flex-shrink: 0 !important;
    }
    .adm-hamburger span {
      display: block !important;
      width: 17px !important;
      height: 1.5px !important;
      background: var(--adm-text) !important;
      border-radius: 2px !important;
    }
    .adm-topbar__ptitle {
      font-size: 19px !important;
      font-weight: 800 !important;
      letter-spacing: -.5px !important;
      color: var(--adm-text) !important;
      line-height: 1.1 !important;
    }
    .adm-topbar__pdesc {
      font-size: 12px !important;
      color: var(--adm-muted) !important;
      font-weight: 500 !important;
      margin-top: 2px !important;
    }
    .adm-topbar__right {
      display: flex !important;
      align-items: center !important;
      flex-shrink: 0 !important;
    }
    .adm-avatar {
      width: 42px !important;
      height: 42px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, var(--adm-primary-light), var(--adm-primary)) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 15px !important;
      font-weight: 800 !important;
      color: #fff !important;
      box-shadow: 0 4px 12px rgba(47,128,237,.3) !important;
      cursor: pointer !important;
    }

    /* ── CONTENT ── */
    .adm-content {
      padding: 28px 32px !important;
      flex: 1 !important;
    }

    /* ── HERO ── */
    .adm-hero {
      background: linear-gradient(130deg,#1a4fbe 0%,#2F80ED 55%,#5ba3f5 100%) !important;
      border-radius: 28px !important;
      padding: 40px 44px !important;
      margin-bottom: 22px !important;
      position: relative !important;
      overflow: hidden !important;
    }
    .adm-hero::before {
      content: '' !important;
      position: absolute !important;
      top: -80px !important;
      right: -60px !important;
      width: 270px !important;
      height: 270px !important;
      border-radius: 50% !important;
      background: rgba(255,255,255,.07) !important;
      pointer-events: none !important;
    }
    .adm-hero::after {
      content: '' !important;
      position: absolute !important;
      bottom: -90px !important;
      right: 110px !important;
      width: 210px !important;
      height: 210px !important;
      border-radius: 50% !important;
      background: rgba(255,255,255,.05) !important;
      pointer-events: none !important;
    }
    .adm-hero__badge {
      display: inline-flex !important;
      align-items: center !important;
      gap: 7px !important;
      background: rgba(255,255,255,.14) !important;
      border: 1px solid rgba(255,255,255,.22) !important;
      color: rgba(255,255,255,.9) !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      letter-spacing: 1.5px !important;
      text-transform: uppercase !important;
      padding: 6px 14px !important;
      border-radius: 100px !important;
      margin-bottom: 16px !important;
    }
    .adm-hero__badge-dot {
      width: 5px !important;
      height: 5px !important;
      border-radius: 50% !important;
      background: #fff !important;
      opacity: .65 !important;
    }
    .adm-hero__title {
      font-size: 30px !important;
      font-weight: 800 !important;
      color: #fff !important;
      letter-spacing: -1px !important;
      line-height: 1.2 !important;
      margin-bottom: 10px !important;
    }
    .adm-hero__desc {
      font-size: 14px !important;
      color: rgba(255,255,255,.65) !important;
      line-height: 1.7 !important;
      max-width: 520px !important;
      margin-bottom: 26px !important;
    }
    .adm-hero__actions {
      display: flex !important;
      gap: 12px !important;
      flex-wrap: wrap !important;
    }
    .adm-btn-white {
      display: inline-flex !important;
      align-items: center !important;
      gap: 8px !important;
      background: #fff !important;
      color: var(--adm-primary) !important;
      border: none !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      padding: 12px 22px !important;
      border-radius: 14px !important;
      cursor: pointer !important;
      transition: all .2s !important;
    }
    .adm-btn-white:hover {
      background: #eef5ff !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 18px rgba(0,0,0,.12) !important;
    }
    .adm-btn-ghost {
      display: inline-flex !important;
      align-items: center !important;
      gap: 8px !important;
      background: rgba(255,255,255,.12) !important;
      border: 1px solid rgba(255,255,255,.22) !important;
      color: #fff !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      padding: 12px 22px !important;
      border-radius: 14px !important;
      cursor: pointer !important;
      transition: all .2s !important;
    }
    .adm-btn-ghost:hover {
      background: rgba(255,255,255,.2) !important;
      transform: translateY(-1px) !important;
    }

    /* ── STAT CARD ── */
    .adm-stats {
      display: grid !important;
      grid-template-columns: repeat(auto-fit,minmax(220px,1fr)) !important;
      gap: 16px !important;
    }
    .adm-stat-card {
      background: var(--adm-card) !important;
      border-radius: 20px !important;
      padding: 24px !important;
      border: 1px solid var(--adm-border) !important;
      box-shadow: 0 1px 4px rgba(0,0,0,.05) !important;
      display: flex !important;
      align-items: center !important;
      gap: 18px !important;
      transition: all .25s !important;
    }
    .adm-stat-card:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 6px 20px rgba(47,128,237,.1) !important;
    }
    .adm-stat-icon {
      width: 54px !important;
      height: 54px !important;
      border-radius: 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 24px !important;
      background: linear-gradient(135deg,#dbeafe,#bfdbfe) !important;
      flex-shrink: 0 !important;
    }
    .adm-stat-lbl {
      font-size: 11px !important;
      font-weight: 700 !important;
      color: var(--adm-muted) !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important;
      margin-bottom: 5px !important;
    }
    .adm-stat-val {
      font-size: 34px !important;
      font-weight: 800 !important;
      color: var(--adm-primary) !important;
      letter-spacing: -2px !important;
      line-height: 1 !important;
    }

    /* ── PANEL ── */
    .adm-panel {
      background: var(--adm-card) !important;
      border-radius: 20px !important;
      border: 1px solid var(--adm-border) !important;
      box-shadow: 0 1px 4px rgba(0,0,0,.05) !important;
      margin-bottom: 20px !important;
      overflow: hidden !important;
    }
    .adm-panel__hd {
      padding: 20px 26px !important;
      border-bottom: 1px solid var(--adm-border) !important;
      display: flex !important;
      align-items: center !important;
      gap: 13px !important;
    }
    .adm-panel__hd-icon {
      width: 38px !important;
      height: 38px !important;
      border-radius: 11px !important;
      background: linear-gradient(135deg,#dbeafe,#bfdbfe) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 17px !important;
      flex-shrink: 0 !important;
    }
    .adm-panel__title {
      font-size: 15px !important;
      font-weight: 800 !important;
      color: var(--adm-text) !important;
      letter-spacing: -.3px !important;
    }
    .adm-panel__sub {
      font-size: 12px !important;
      color: var(--adm-muted) !important;
      margin-top: 1px !important;
    }
    .adm-panel__body { padding: 26px !important; }

    /* ── FORM ── */
    .adm-form-grid {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 14px !important;
      align-items: end !important;
    }
    .adm-form-grid .adm-field-full {
      grid-column: 1 / -1 !important;
    }
    .adm-field {
      display: flex !important;
      flex-direction: column !important;
      gap: 7px !important;
    }
    .adm-lbl {
      font-size: 11px !important;
      font-weight: 700 !important;
      color: var(--adm-muted) !important;
      text-transform: uppercase !important;
      letter-spacing: .8px !important;
    }
    .adm-input {
      height: 50px !important;
      padding: 0 16px !important;
      border: 1.5px solid var(--adm-border) !important;
      border-radius: 14px !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      color: var(--adm-text) !important;
      background: var(--adm-bg) !important;
      outline: none !important;
      transition: all .2s !important;
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      width: 100% !important;
    }
    .adm-textarea {
      height: 90px !important;
      padding: 12px 16px !important;
      border: 1.5px solid var(--adm-border) !important;
      border-radius: 14px !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      color: var(--adm-text) !important;
      background: var(--adm-bg) !important;
      outline: none !important;
      transition: all .2s !important;
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      width: 100% !important;
      resize: none !important;
      line-height: 1.5 !important;
    }
    .adm-input:focus, .adm-textarea:focus {
      border-color: var(--adm-primary) !important;
      background: #fff !important;
      box-shadow: 0 0 0 3px rgba(47,128,237,.1) !important;
    }
    .adm-input::placeholder, .adm-textarea::placeholder {
      color: #b0bec5 !important;
      font-weight: 400 !important;
    }
    .adm-form-actions {
      grid-column: 1 / -1 !important;
      display: flex !important;
      justify-content: flex-end !important;
    }

    .adm-btn-primary {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 7px !important;
      height: 50px !important;
      padding: 0 24px !important;
      background: var(--adm-primary) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 14px !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      transition: all .2s !important;
      white-space: nowrap !important;
    }
    .adm-btn-primary:hover {
      background: var(--adm-primary-dark) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 18px rgba(47,128,237,.35) !important;
    }
    .adm-btn-warning {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 7px !important;
      height: 50px !important;
      padding: 0 24px !important;
      background: var(--adm-warning) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 14px !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      transition: all .2s !important;
      white-space: nowrap !important;
    }
    .adm-btn-warning:hover {
      background: #d97706 !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 18px rgba(245,158,11,.35) !important;
    }

    /* ── TABLE ── */
    .adm-tbl-wrap { overflow-x: auto !important; }
    .adm-tbl {
      width: 100% !important;
      border-collapse: collapse !important;
      font-size: 14px !important;
    }
    .adm-tbl thead tr {
      background: linear-gradient(90deg,#eef4ff,#e4eeff) !important;
    }
    .adm-tbl thead th {
      padding: 13px 20px !important;
      text-align: left !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important;
      color: var(--adm-primary) !important;
      white-space: nowrap !important;
      border-bottom: 2px solid var(--adm-border) !important;
    }
    .adm-tbl tbody tr {
      border-bottom: 1px solid var(--adm-border) !important;
      transition: background .15s !important;
    }
    .adm-tbl tbody tr:last-child { border-bottom: none !important; }
    .adm-tbl tbody tr:hover { background: #f5f9ff !important; }
    .adm-tbl td {
      padding: 15px 20px !important;
      color: var(--adm-text) !important;
      vertical-align: middle !important;
    }
    .adm-tbl td:first-child { font-size: 12px !important; font-weight: 700 !important; color: var(--adm-muted) !important; }
    .adm-cell-name { font-weight: 700 !important; letter-spacing: -.2px !important; }
    .adm-cell-desc {
      font-size: 13px !important;
      color: var(--adm-muted) !important;
      max-width: 260px !important;
      line-height: 1.5 !important;
    }
    .adm-cell-price {
      font-weight: 800 !important;
      color: var(--adm-primary) !important;
      font-size: 15px !important;
      letter-spacing: -.5px !important;
    }
    .adm-badge-dur {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      background: #eef4ff !important;
      color: var(--adm-primary) !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      padding: 5px 12px !important;
      border-radius: 100px !important;
      border: 1px solid #dbeafe !important;
    }
    .adm-row-actions { display: flex !important; gap: 8px !important; }
    .adm-btn-edit {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      padding: 7px 14px !important;
      background: rgba(245,158,11,.08) !important;
      color: var(--adm-warning) !important;
      border: 1px solid rgba(245,158,11,.2) !important;
      border-radius: 10px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      transition: all .2s !important;
    }
    .adm-btn-edit:hover {
      background: var(--adm-warning) !important;
      color: #fff !important;
      border-color: var(--adm-warning) !important;
      transform: translateY(-1px) !important;
    }
    .adm-btn-del {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      padding: 7px 14px !important;
      background: rgba(239,68,68,.07) !important;
      color: var(--adm-danger) !important;
      border: 1px solid rgba(239,68,68,.15) !important;
      border-radius: 10px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      transition: all .2s !important;
    }
    .adm-btn-del:hover {
      background: var(--adm-danger) !important;
      color: #fff !important;
      border-color: var(--adm-danger) !important;
      transform: translateY(-1px) !important;
    }
    .adm-empty {
      text-align: center !important;
      padding: 56px 20px !important;
    }
    .adm-empty__ico { font-size: 44px !important; opacity: .35 !important; margin-bottom: 10px !important; }
    .adm-empty__txt { font-size: 13px !important; color: var(--adm-muted) !important; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      .adm-sidebar {
        transform: translateX(-100%) !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      .adm-sidebar.open {
        transform: translateX(0) !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }
      .adm-main {
        margin-left: 0 !important;
        width: 100% !important;
      }
      .adm-hamburger {
        display: flex !important;
      }
    }

    @media (max-width: 640px) {
      .adm-topbar { padding: 0 16px !important; }
      .adm-content { padding: 16px !important; }
      .adm-hero { padding: 26px 20px !important; }
      .adm-hero__title { font-size: 22px !important; }
      .adm-form-grid { grid-template-columns: 1fr !important; }
      .adm-form-actions { justify-content: stretch !important; }
      .adm-btn-primary, .adm-btn-warning { width: 100% !important; }
      .adm-panel__body { padding: 18px 16px !important; }
      .adm-panel__hd { padding: 16px !important; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="adm-wrap">
        {/* OVERLAY */}
        <div
          className={`adm-overlay${sidebarOpen ? " show" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ── SIDEBAR ── */}
        <aside className={`adm-sidebar${sidebarOpen ? " open" : ""}`}>
          <div className="adm-sidebar__head">
            <div className="adm-sidebar__logo">💧</div>
            <div>
              <div className="adm-sidebar__brand-name">Aura Laundry</div>
              <div className="adm-sidebar__brand-sub">Management System</div>
            </div>
          </div>

          <div className="adm-sidebar__divider" />
          <div className="adm-sidebar__sec-label">Main Menu</div>

          <nav className="adm-sidebar__nav">
            <button
              className={`adm-nav-btn${menu === "dashboard" ? " active" : ""}`}
              onClick={() => { setMenu("dashboard"); setSidebarOpen(false); }}
            >
              <span className="adm-nav-btn__icon">🏠</span>
              <span className="adm-nav-btn__lbl">Dashboard</span>
              <span className="adm-nav-btn__dot" />
            </button>
            <button
              className={`adm-nav-btn${menu === "paket" ? " active" : ""}`}
              onClick={() => { setMenu("paket"); setSidebarOpen(false); }}
            >
              <span className="adm-nav-btn__icon">📦</span>
              <span className="adm-nav-btn__lbl">Paket Laundry</span>
              <span className="adm-nav-btn__dot" />
            </button>
          </nav>

          <div className="adm-sidebar__footer">
            <div className="adm-user-card">
              <div className="adm-user-card__av">A</div>
              <div>
                <div className="adm-user-card__name">Admin</div>
                <div className="adm-user-card__role">Administrator</div>
              </div>
            </div>
            <button className="adm-logout-btn" onClick={logout}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="adm-main">

          {/* TOPBAR */}
          <header className="adm-topbar">
            <div className="adm-topbar__left">
              <button
                className="adm-hamburger"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                <span /><span /><span />
              </button>
              <div>
                <div className="adm-topbar__ptitle">{pageTitle}</div>
                <div className="adm-topbar__pdesc">{pageDesc}</div>
              </div>
            </div>
            <div className="adm-topbar__right">
              <div className="adm-avatar">A</div>
            </div>
          </header>

          {/* CONTENT */}
          <main className="adm-content">

            {/* ── DASHBOARD VIEW ── */}
            {menu === "dashboard" && (
              <>
                <div className="adm-hero">
                  <div className="adm-hero__badge">
                    <span className="adm-hero__badge-dot" />
                    Aura Laundry
                  </div>
                  <div className="adm-hero__title">Selamat Datang, Admin 👋</div>
                  <div className="adm-hero__desc">
                    Kelola layanan laundry dengan mudah melalui dashboard ini.
                    Semua data paket tersedia dalam satu tampilan yang rapi dan efisien.
                  </div>
                  <div className="adm-hero__actions">
                    <button className="adm-btn-white" onClick={() => setMenu("paket")}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      </svg>
                      Kelola Paket
                    </button>
                    <button className="adm-btn-ghost" onClick={() => setMenu("paket")}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Tambah Paket
                    </button>
                  </div>
                </div>

                <div className="adm-stats">
                  <div className="adm-stat-card">
                    <div className="adm-stat-icon">📦</div>
                    <div>
                      <div className="adm-stat-lbl">Total Paket Laundry</div>
                      <div className="adm-stat-val">{paket.length}</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── PAKET VIEW ── */}
            {menu === "paket" && (
              <>
                {/* Form Panel */}
                <div className="adm-panel">
                  <div className="adm-panel__hd">
                    <div className="adm-panel__hd-icon">{editId ? "✏️" : "➕"}</div>
                    <div>
                      <div className="adm-panel__title">
                        {editId ? "Edit Paket" : "Tambah Paket Baru"}
                      </div>
                      <div className="adm-panel__sub">
                        {editId ? "Perbarui informasi paket laundry" : "Isi form untuk menambah paket baru"}
                      </div>
                    </div>
                  </div>
                  <div className="adm-panel__body">
                    <div className="adm-form-grid">

                      {/* Nama Paket */}
                      <div className="adm-field">
                        <label className="adm-lbl">Nama Paket</label>
                        <input
                          className="adm-input"
                          placeholder="cth. Reguler, Express..."
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </div>

                      {/* Harga */}
                      <div className="adm-field">
                        <label className="adm-lbl">Harga (Rp)</label>
                        <input
                          className="adm-input"
                          placeholder="cth. 6000"
                          type="number"
                          value={harga}
                          onChange={(e) => setHarga(e.target.value)}
                        />
                      </div>

                      {/* Deskripsi - full width */}
                      <div className="adm-field adm-field-full">
                        <label className="adm-lbl">Deskripsi</label>
                        <textarea
                          className="adm-textarea"
                          placeholder="Masukkan deskripsi paket..."
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                        />
                      </div>

                      {/* Durasi */}
                      <div className="adm-field">
                        <label className="adm-lbl">Durasi</label>
                        <input
                          className="adm-input"
                          placeholder="cth. 2 Hari Pengerjaan"
                          value={durasi}
                          onChange={(e) => setDurasi(e.target.value)}
                        />
                      </div>

                      {/* Submit */}
                      <div className="adm-form-actions">
                        {editId ? (
                          <button className="adm-btn-warning" onClick={updatePaket}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Update Paket
                          </button>
                        ) : (
                          <button className="adm-btn-primary" onClick={tambahPaket}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            Tambah Paket
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </div>

                {/* Table Panel */}
                <div className="adm-panel">
                  <div className="adm-panel__hd">
                    <div className="adm-panel__hd-icon">📋</div>
                    <div>
                      <div className="adm-panel__title">Daftar Paket Laundry</div>
                      <div className="adm-panel__sub">{paket.length} paket tersedia</div>
                    </div>
                  </div>
                  <div className="adm-tbl-wrap">
                    <table className="adm-tbl">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nama Paket</th>
                          <th>Deskripsi</th>
                          <th>Harga</th>
                          <th>Durasi</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paket.length === 0 ? (
                          <tr>
                            <td colSpan={6}>
                              <div className="adm-empty">
                                <div className="adm-empty__ico">📦</div>
                                <div className="adm-empty__txt">Belum ada paket. Tambahkan paket pertama Anda!</div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          paket.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td><span className="adm-cell-name">{item.nama}</span></td>
                              <td><span className="adm-cell-desc">{item.deskripsi}</span></td>
                              <td><span className="adm-cell-price">Rp {item.harga.toLocaleString("id-ID")}</span></td>
                              <td><span className="adm-badge-dur">⏱ {item.durasi}</span></td>
                              <td>
                                <div className="adm-row-actions">
                                  <button className="adm-btn-edit" onClick={() => editPaket(item)}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                    Edit
                                  </button>
                                  <button className="adm-btn-del" onClick={() => hapusPaket(item.id)}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6"/>
                                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                      <path d="M10 11v6M14 11v6"/>
                                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                    </svg>
                                    Hapus
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}