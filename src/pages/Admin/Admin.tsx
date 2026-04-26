import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, ResponsiveContainer
} from "recharts"

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */

type Car = {
  id: string
  brand: string
  model: string
  price_per_day: number
  image_url: string
}

type Booking = {
  id: string
  name: string
  phone: string
  car: string
  pickup_date: string
  return_date: string
  total_price: number
  status: "pending" | "accepted" | "cancelled"
  payment_method: "cash" | "transfer" | "later"
  payment_status: "pending" | "paid"
}

type Expense = {
  id: string
  title: string
  amount: number
  created_at: string
}

type Role = "admin" | "manager" | "staff"

type Page =
  | "dashboard"
  | "fleet"
  | "bookings"
  | "clients"
  | "payments"
  | "expenses"
  | "analytics"
  | "insights"

/* ─────────────────────────────────────────
   THEME
───────────────────────────────────────── */

const DARK = {
  bg: "#0f1620",
  sidebar: "#0d1117",
  card: "#131c2e",
  cardHover: "#161f35",
  border: "#1e2d47",
  borderLight: "#111926",
  text: "#e2e8f0",
  textSub: "#7a8aaa",
  textMuted: "#3d4a63",
  gold: "#d4a843",
  goldDim: "#a07428",
  topbar: "#0d1117",
  input: "#0d1420",
  inputBorder: "#1e2d47",
}

const LIGHT = {
  bg: "#f4f6fb",
  sidebar: "#ffffff",
  card: "#ffffff",
  cardHover: "#f0f4ff",
  border: "#e2e8f0",
  borderLight: "#edf2f7",
  text: "#1a202c",
  textSub: "#4a5568",
  textMuted: "#a0aec0",
  gold: "#b07d10",
  goldDim: "#d4a843",
  topbar: "#ffffff",
  input: "#f7fafc",
  inputBorder: "#cbd5e0",
}

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */

function formatMoney(value: number | null | undefined): string {
  return (value ?? 0).toLocaleString()
}

function today(): string {
  return new Date().toLocaleDateString("fr-MA", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  })
}

function isOverdue(b: Booking): boolean {
  return b.status === "accepted" && new Date(b.return_date) < new Date()
}

function daysBetween(a: string, b: string): number {
  return Math.max(1, Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / 86400000
  ))
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */

export default function Admin() {
  const navigate = useNavigate()

  /* ── State ── */
  const [role, setRole]               = useState<Role | null>(null)
  const [loadingRole, setLoadingRole] = useState(true)
  const [cars, setCars]               = useState<Car[]>([])
  const [bookings, setBookings]       = useState<Booking[]>([])
  const [expenses, setExpenses]       = useState<Expense[]>([])
  const [page, setPage]               = useState<Page>("dashboard")
  const [dark, setDark]               = useState(localStorage.getItem("dark") === "true")

  /* Fleet form */
  const [brand, setBrand]     = useState("")
  const [model, setModel]     = useState("")
  const [price, setPrice]     = useState("")
  const [imageUrl, setImageUrl] = useState("")

  /* Expense form */
  const [expenseTitle, setExpenseTitle]   = useState("")
  const [expenseAmount, setExpenseAmount] = useState("")

  /* Search */
  const [clientSearch, setClientSearch]   = useState("")
  const [bookingSearch, setBookingSearch] = useState("")

  /* Notification toast */
  const [toast, setToast] = useState<string | null>(null)

  const T = dark ? DARK : LIGHT

  /* ── Init ── */
  useEffect(() => {
    init()
    const bSub = supabase.channel("bookings-ch")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, fetchBookings)
      .subscribe()
    const eSub = supabase.channel("expenses-ch")
      .on("postgres_changes", { event: "*", schema: "public", table: "expenses" }, fetchExpenses)
      .subscribe()
    const cSub = supabase.channel("cars-ch")
      .on("postgres_changes", { event: "*", schema: "public", table: "cars" }, fetchCars)
      .subscribe()
    return () => {
      supabase.removeChannel(bSub)
      supabase.removeChannel(eSub)
      supabase.removeChannel(cSub)
    }
  }, [])

  useEffect(() => { localStorage.setItem("dark", String(dark)) }, [dark])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  async function init() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return navigate("/login")
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    if (!data) return navigate("/")
    setRole(data.role as Role)
    setLoadingRole(false)
    fetchCars(); fetchBookings(); fetchExpenses()
  }

  async function fetchCars()     { const { data } = await supabase.from("cars").select("*");     if (data) setCars(data) }
  async function fetchBookings() { const { data } = await supabase.from("bookings").select("*"); if (data) setBookings(data) }
  async function fetchExpenses() { const { data } = await supabase.from("expenses").select("*"); if (data) setExpenses(data) }

  /* ── Permissions ── */
  const canEdit = role === "admin" || role === "manager"

  /* ── Actions ── */
  async function updateStatus(id: string, status: Booking["status"]) {
    if (!canEdit) return
    await supabase.from("bookings").update({ status }).eq("id", id)
    showToast(`Réservation ${status === "accepted" ? "acceptée" : "annulée"}`)
  }

  async function deleteBooking(id: string) {
    if (!canEdit) return
    await supabase.from("bookings").delete().eq("id", id)
    showToast("Réservation supprimée")
  }

  async function deleteCar(id: string) {
    if (!canEdit) return
    await supabase.from("cars").delete().eq("id", id)
    showToast("Véhicule supprimé")
  }

  async function updatePayment(id: string) {
    if (!canEdit) return
    await supabase.from("bookings").update({ payment_status: "paid" }).eq("id", id)
    showToast("Paiement enregistré ✓")
  }

  async function deleteExpense(id: string) {
    if (!canEdit) return
    await supabase.from("expenses").delete().eq("id", id)
    showToast("Dépense supprimée")
  }

  async function addExpense(e: React.FormEvent) {
    e.preventDefault()
    if (!canEdit || !expenseTitle || !expenseAmount) return
    await supabase.from("expenses").insert([{ title: expenseTitle, amount: Number(expenseAmount) }])
    setExpenseTitle(""); setExpenseAmount("")
    showToast("Dépense ajoutée")
  }

  async function addCar(e: React.FormEvent) {
    e.preventDefault()
    if (!canEdit || !brand || !model || !price) return
    await supabase.from("cars").insert([{ brand, model, price_per_day: Number(price), image_url: imageUrl }])
    setBrand(""); setModel(""); setPrice(""); setImageUrl("")
    showToast("Véhicule ajouté ✓")
  }

  function showToast(msg: string) { setToast(msg) }

  /* ── Analytics ── */
  const stats = useMemo(() => {
    const paidBookings    = bookings.filter(b => b.payment_status === "paid")
    const revenue         = paidBookings.reduce((s, b) => s + b.total_price, 0)
    const expensesTotal   = expenses.reduce((s, e) => s + e.amount, 0)
    const total           = bookings.length
    const accepted        = bookings.filter(b => b.status === "accepted").length
    const cancelled       = bookings.filter(b => b.status === "cancelled").length
    const pending         = bookings.filter(b => b.status === "pending").length
    const overdueList     = bookings.filter(isOverdue)
    const unpaidList      = bookings.filter(b => b.payment_status === "pending" && b.status === "accepted")
    return {
      revenue, expensesTotal,
      profit:           revenue - expensesTotal,
      conversion:       total ? (accepted / total) * 100 : 0,
      cancellationRate: total ? (cancelled / total) * 100 : 0,
      accepted, cancelled, pending, total,
      overdueCount:     overdueList.length,
      unpaidCount:      unpaidList.length,
      unpaidAmount:     unpaidList.reduce((s, b) => s + b.total_price, 0),
      overdueList,      unpaidList,
    }
  }, [bookings, expenses])

  const revenueChart = useMemo(() => {
    const map: Record<string, number> = {}
    bookings.forEach(b => {
      if (b.payment_status !== "paid") return
      const mo = b.pickup_date?.slice(0, 7) ?? "?"
      map[mo] = (map[mo] || 0) + b.total_price
    })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
      .map(([date, revenue]) => ({ date, revenue }))
  }, [bookings])

  const bookingChart = useMemo(() => {
    const map: Record<string, number> = {}
    bookings.forEach(b => {
      const mo = b.pickup_date?.slice(0, 7) ?? "?"
      map[mo] = (map[mo] || 0) + 1
    })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }))
  }, [bookings])

  const insights = useMemo(() => {
    const m: { icon: string; color: string; text: string }[] = []
    if (stats.conversion < 30)         m.push({ icon: "⚠️", color: "#d4a843", text: `Taux de conversion bas (${stats.conversion.toFixed(0)}%) — Vérifiez les offres.` })
    if (stats.cancellationRate > 20)   m.push({ icon: "⚠️", color: "#d4a843", text: `Taux d'annulation élevé (${stats.cancellationRate.toFixed(0)}%) — Relancez les clients.` })
    if (stats.profit < 0)              m.push({ icon: "❌", color: "#f87171", text: `Marge négative — Revenu ${stats.revenue} MAD < Dépenses ${stats.expensesTotal} MAD.` })
    if (stats.revenue > 20000)         m.push({ icon: "🚀", color: "#22c55e", text: "Revenus solides — Pensez à agrandir la flotte." })
    if (stats.overdueCount > 0)        m.push({ icon: "🕒", color: "#f87171", text: `${stats.overdueCount} retour(s) en retard — Contactez les clients immédiatement.` })
    if (stats.unpaidCount > 0)         m.push({ icon: "💳", color: "#d4a843", text: `${stats.unpaidCount} paiement(s) en attente (${stats.unpaidAmount} MAD).` })
    if (m.length === 0)                m.push({ icon: "✅", color: "#22c55e", text: "Activité stable — Aucune alerte critique." })
    return m
  }, [stats])

  const clients = useMemo(() => {
    const map: Record<string, { name: string; phone: string; totalSpent: number; totalBookings: number; lastBooking: string }> = {}
    bookings.forEach(b => {
      if (!map[b.phone]) map[b.phone] = { name: b.name, phone: b.phone, totalSpent: 0, totalBookings: 0, lastBooking: b.pickup_date }
      map[b.phone].totalBookings++
      if (b.payment_status === "paid") map[b.phone].totalSpent += b.total_price
      if (b.pickup_date > map[b.phone].lastBooking) map[b.phone].lastBooking = b.pickup_date
    })
    return Object.values(map).sort((a, b) => b.totalSpent - a.totalSpent)
  }, [bookings])

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.phone.includes(clientSearch)
  )

  const filteredBookings = bookings.filter(b =>
    b.name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.car.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.phone.includes(bookingSearch)
  )

  /* ── Alerts for sidebar badges ── */
  const alertCount = stats.overdueCount + stats.unpaidCount + (stats.pending)

  /* ── Loading ── */
  if (loadingRole) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: DARK.bg, color: DARK.gold, fontFamily: "system-ui, sans-serif", fontSize: 16 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>FC</div>
        <div style={{ color: DARK.textSub }}>Chargement du tableau de bord…</div>
      </div>
    </div>
  )

  /* ── Styles ── */
  const S = makeStyles(T)

  /* ─── NAV ITEMS ─── */
  const navItems: { id: Page; label: string; icon: string; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard",    icon: "▦"  },
    { id: "bookings",  label: "Réservations", icon: "📅", badge: stats.pending + stats.overdueCount },
    { id: "fleet",     label: "Flotte",       icon: "🚗" },
    { id: "clients",   label: "Clients",      icon: "👥" },
    { id: "payments",  label: "Paiements",    icon: "💳", badge: stats.unpaidCount },
    { id: "expenses",  label: "Dépenses",     icon: "💸" },
    { id: "analytics", label: "Analytiques",  icon: "📊" },
    { id: "insights",  label: "Insights IA",  icon: "🧠" },
  ]

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", background: T.bg, color: T.text, overflow: "hidden" }}>

      {/* ── SIDEBAR ── */}
      <aside style={S.sidebar}>
        {/* Logo */}
        <div style={S.logoBox}>
          <div style={S.logoIcon}>FC</div>
          <div>
            <div style={S.logoName}>FORNAX CAR</div>
            <div style={S.logoSub}>Témara, Maroc</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          <div style={S.navSection}>Vue d'ensemble</div>
          {navItems.slice(0, 1).map(n => <NavItem key={n.id} n={n} active={page === n.id} onClick={() => setPage(n.id)} T={T} />)}

          <div style={S.navSection}>Opérations</div>
          {navItems.slice(1, 5).map(n => <NavItem key={n.id} n={n} active={page === n.id} onClick={() => setPage(n.id)} T={T} />)}

          <div style={S.navSection}>Finance & IA</div>
          {navItems.slice(5).map(n => <NavItem key={n.id} n={n} active={page === n.id} onClick={() => setPage(n.id)} T={T} />)}
        </nav>

        {/* Role badge */}
        <div style={S.userBox}>
          <div style={S.userAvatar}>{role?.slice(0, 2).toUpperCase()}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: T.text }}>{role === "admin" ? "Super Admin" : role === "manager" ? "Manager" : "Agent"}</div>
            <div style={{ fontSize: 10, color: T.textMuted }}>Connecté</div>
          </div>
          <button
            onClick={() => setDark(!dark)}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: T.textSub }}
            title="Changer le thème"
          >{dark ? "☀️" : "🌙"}</button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <div style={S.topbar}>
          <div style={{ fontWeight: 700, fontSize: 17, color: T.gold, letterSpacing: 0.3 }}>
            {navItems.find(n => n.id === page)?.icon} {navItems.find(n => n.id === page)?.label}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 11, color: T.textMuted }}>{today()}</span>
            {alertCount > 0 && (
              <div style={{ background: "#c0392b", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>
                {alertCount} alerte{alertCount > 1 ? "s" : ""}
              </div>
            )}
            {canEdit && (
              <button onClick={() => setPage("bookings")} style={S.topBtn}>
                + Réservation
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>

          {/* ── DASHBOARD ── */}
          {page === "dashboard" && (
            <div>
              {/* KPI row 1 */}
              <div style={S.kpiGrid}>
                <KPICard label="Revenus Encaissés" value={`${stats.revenue.toLocaleString()} MAD`} sub={`Dépenses : ${stats.expensesTotal.toLocaleString()} MAD`} accent="#3b82f6" T={T} />
                <KPICard label="Bénéfice Net" value={`${stats.profit.toLocaleString()} MAD`} sub={stats.profit >= 0 ? "En positif ↑" : "En déficit ↓"} accent={stats.profit >= 0 ? "#22c55e" : "#f87171"} T={T} />
                <KPICard label="Taux Conversion" value={`${stats.conversion.toFixed(1)}%`} sub={`${stats.accepted} acceptées / ${stats.total}`} accent={T.gold} T={T} />
                <KPICard label="Annulations" value={`${stats.cancellationRate.toFixed(1)}%`} sub={`${stats.cancelled} annulées`} accent={stats.cancellationRate > 20 ? "#f87171" : T.textMuted} T={T} />
              </div>
              {/* KPI row 2 */}
              <div style={S.kpiGrid}>
                <KPICard label="Flotte Totale" value={`${cars.length} véhicules`} sub={`${stats.accepted} en location`} accent="#a78bfa" T={T} />
                <KPICard label="En Attente" value={`${stats.pending}`} sub="Demandes à traiter" accent={T.gold} T={T} />
                <KPICard label="Retours en Retard" value={`${stats.overdueCount}`} sub={stats.overdueCount > 0 ? "Action requise" : "Aucun retard"} accent={stats.overdueCount > 0 ? "#f87171" : "#22c55e"} T={T} />
                <KPICard label="Factures Impayées" value={`${stats.unpaidAmount.toLocaleString()} MAD`} sub={`${stats.unpaidCount} dossiers`} accent={stats.unpaidCount > 0 ? "#d4a843" : "#22c55e"} T={T} />
              </div>

              {/* Alerts + Recent */}
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 14, marginTop: 4 }}>
                {/* Recent bookings */}
                <div style={S.card}>
                  <div style={S.cardTitle}>Réservations Récentes</div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Client", "Véhicule", "Retour", "Prix", "Statut"].map(h => (
                          <th key={h} style={S.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(-6).reverse().map(b => (
                        <tr key={b.id} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                          <td style={S.td}>{b.name}</td>
                          <td style={S.td}>{b.car}</td>
                          <td style={S.td}>{b.return_date}</td>
                          <td style={{ ...S.td, color: "#22c55e", fontWeight: 600 }}>{formatMoney(b.total_price)} MAD</td>
                          <td style={S.td}><StatusBadge status={b.status} overdue={isOverdue(b)} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Alerts */}
                <div style={S.card}>
                  <div style={S.cardTitle}>Alertes Actives</div>
                  {stats.overdueList.map(b => (
                    <AlertRow key={b.id} dot="#f87171" text={<><strong style={{ color: T.text }}>{b.name}</strong> — Retard {b.car}</>} T={T} />
                  ))}
                  {stats.unpaidList.map(b => (
                    <AlertRow key={b.id} dot="#d4a843" text={<><strong style={{ color: T.text }}>{b.total_price} MAD</strong> impayé — {b.name}</>} T={T} />
                  ))}
                  {bookings.filter(b => b.status === "pending").slice(0, 3).map(b => (
                    <AlertRow key={b.id} dot="#3b82f6" text={<>Demande en attente — <strong style={{ color: T.text }}>{b.name}</strong></>} T={T} />
                  ))}
                  {alertCount === 0 && <div style={{ fontSize: 12, color: T.textMuted, marginTop: 8 }}>✅ Aucune alerte critique</div>}
                </div>
              </div>
            </div>
          )}

          {/* ── FLEET ── */}
          {page === "fleet" && (
            <div>
              <div style={S.kpiGrid}>
                <KPICard label="Total" value={`${cars.length}`} sub="Véhicules enregistrés" accent="#3b82f6" T={T} />
                <KPICard label="En Location" value={`${stats.accepted}`} sub="Actuellement loués" accent={T.gold} T={T} />
                <KPICard label="Disponibles" value={`${Math.max(0, cars.length - stats.accepted)}`} sub="Prêts à louer" accent="#22c55e" T={T} />
              </div>

              {canEdit && (
                <div style={{ ...S.card, marginBottom: 14 }}>
                  <div style={S.cardTitle}>Ajouter un Véhicule</div>
                  <form onSubmit={addCar} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input placeholder="Marque" value={brand}    onChange={e => setBrand(e.target.value)}    style={S.input} required />
                    <input placeholder="Modèle" value={model}    onChange={e => setModel(e.target.value)}    style={S.input} required />
                    <input placeholder="Prix/jour (MAD)" value={price} onChange={e => setPrice(e.target.value)} style={S.input} type="number" required />
                    <input placeholder="URL Image" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={{ ...S.input, flex: "1 1 200px" }} />
                    <button type="submit" style={S.primaryBtn}>+ Ajouter</button>
                  </form>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {cars.map(c => (
                  <div key={c.id} style={S.card}>
                    {c.image_url && (
                      <img src={c.image_url} alt={`${c.brand} ${c.model}`}
                        style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 6, marginBottom: 10 }}
                        onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                      />
                    )}
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.gold }}>{c.brand} {c.model}</div>
                    <div style={{ fontSize: 12, color: T.textSub, marginTop: 4 }}>{c.price_per_day} MAD / jour</div>
                    <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                      <StatusBadge status="accepted" T={T} overdue={false} />
                      {canEdit && (
                        <button onClick={() => deleteCar(c.id)} style={S.dangerBtn}>Supprimer</button>
                      )}
                    </div>
                  </div>
                ))}
                {cars.length === 0 && <div style={{ color: T.textMuted, fontSize: 13 }}>Aucun véhicule enregistré.</div>}
              </div>
            </div>
          )}

          {/* ── BOOKINGS ── */}
          {page === "bookings" && (
            <div>
              <div style={S.kpiGrid}>
                <KPICard label="Total" value={`${stats.total}`} sub="Réservations" accent="#3b82f6" T={T} />
                <KPICard label="Acceptées" value={`${stats.accepted}`} sub="En cours" accent="#22c55e" T={T} />
                <KPICard label="En Attente" value={`${stats.pending}`} sub="À traiter" accent={T.gold} T={T} />
                <KPICard label="Annulées" value={`${stats.cancelled}`} sub="Ce mois" accent="#f87171" T={T} />
              </div>

              <div style={{ ...S.card }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={S.cardTitle}>Toutes les Réservations</div>
                  <input
                    placeholder="Rechercher client, voiture…"
                    value={bookingSearch}
                    onChange={e => setBookingSearch(e.target.value)}
                    style={{ ...S.input, width: 220 }}
                  />
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Client", "Tél.", "Véhicule", "Départ", "Retour", "Durée", "Prix", "Paiement", "Statut", ...(canEdit ? ["Actions"] : [])].map(h => (
                        <th key={h} style={S.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map(b => {
                      const days = daysBetween(b.pickup_date, b.return_date)
                      const overdue = isOverdue(b)
                      return (
                        <tr key={b.id} style={{ borderBottom: `1px solid ${T.borderLight}`, background: overdue ? (dark ? "#1a0a0a" : "#fff5f5") : "transparent" }}>
                          <td style={S.td}><span style={{ fontWeight: 500, color: T.text }}>{b.name}</span></td>
                          <td style={{ ...S.td, color: T.textSub }}>{b.phone}</td>
                          <td style={S.td}>{b.car}</td>
                          <td style={S.td}>{b.pickup_date}</td>
                          <td style={S.td}>{b.return_date}</td>
                          <td style={{ ...S.td, color: T.textSub }}>{days}j</td>
                          <td style={{ ...S.td, color: "#22c55e", fontWeight: 600 }}>{formatMoney(b.total_price)} MAD</td>
                          <td style={S.td}>
                            <span style={{
                              fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20,
                              background: b.payment_status === "paid" ? (dark ? "#0d2a1a" : "#f0fdf4") : (dark ? "#1c1500" : "#fffbeb"),
                              color: b.payment_status === "paid" ? "#22c55e" : "#d4a843",
                              border: `1px solid ${b.payment_status === "paid" ? "#166534" : "#713f12"}`
                            }}>
                              {b.payment_status === "paid" ? "Payé" : b.payment_method === "cash" ? "Espèces" : b.payment_method === "transfer" ? "Virement" : "À régler"}
                            </span>
                          </td>
                          <td style={S.td}><StatusBadge status={b.status} overdue={overdue} /></td>
                          {canEdit && (
                            <td style={S.td}>
                              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                {b.status === "pending" && (
                                  <button onClick={() => updateStatus(b.id, "accepted")} style={S.successBtn}>✓ Accepter</button>
                                )}
                                {b.status !== "cancelled" && (
                                  <button onClick={() => updateStatus(b.id, "cancelled")} style={S.warnBtn}>Annuler</button>
                                )}
                                {b.payment_status !== "paid" && (
                                  <button onClick={() => updatePayment(b.id)} style={S.infoBtn}>Payé</button>
                                )}
                                <button onClick={() => deleteBooking(b.id)} style={S.dangerBtn}>✕</button>
                              </div>
                            </td>
                          )}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {filteredBookings.length === 0 && (
                  <div style={{ textAlign: "center", padding: 24, color: T.textMuted, fontSize: 13 }}>Aucune réservation trouvée.</div>
                )}
              </div>
            </div>
          )}

          {/* ── CLIENTS ── */}
          {page === "clients" && (
            <div>
              <div style={S.kpiGrid}>
                <KPICard label="Total Clients" value={`${clients.length}`} sub="Uniques" accent="#3b82f6" T={T} />
                <KPICard label="Clients VIP" value={`${clients.filter(c => c.totalSpent > 5000).length}`} sub="> 5 000 MAD dépensés" accent={T.gold} T={T} />
                <KPICard label="Revenu Moyen" value={`${clients.length ? Math.round(stats.revenue / clients.length).toLocaleString() : 0} MAD`} sub="Par client" accent="#22c55e" T={T} />
              </div>

              <div style={{ ...S.card }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={S.cardTitle}>Registre Clients</div>
                  <input
                    placeholder="Rechercher nom, tél…"
                    value={clientSearch}
                    onChange={e => setClientSearch(e.target.value)}
                    style={{ ...S.input, width: 220 }}
                  />
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Client", "Téléphone", "Réservations", "Total Dépensé", "Dernière Location", "Tier"].map(h => (
                        <th key={h} style={S.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((c) => {
                      const tier = c.totalSpent > 5000 ? "Gold" : c.totalSpent > 2000 ? "Silver" : "Bronze"
                      const tierColor = tier === "Gold" ? "#d4a843" : tier === "Silver" ? "#94a3b8" : "#b45309"
                      const tierBg   = tier === "Gold" ? (dark ? "#1c1500" : "#fffbeb") : tier === "Silver" ? (dark ? "#151515" : "#f8fafc") : (dark ? "#1a1005" : "#fff7ed")
                      return (
                        <tr key={c.phone} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                          <td style={S.td}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 28, height: 28, borderRadius: "50%", background: dark ? "#1a2540" : "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#3b82f6", flexShrink: 0 }}>
                                {c.name.slice(0, 2).toUpperCase()}
                              </div>
                              <span style={{ fontWeight: 500, color: T.text }}>{c.name}</span>
                            </div>
                          </td>
                          <td style={{ ...S.td, color: T.textSub }}>{c.phone}</td>
                          <td style={S.td}>{c.totalBookings}</td>
                          <td style={{ ...S.td, color: "#22c55e", fontWeight: 600 }}>{c.totalSpent.toLocaleString()} MAD</td>
                          <td style={{ ...S.td, color: T.textSub }}>{c.lastBooking}</td>
                          <td style={S.td}>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: tierBg, color: tierColor, border: `1px solid ${tierColor}40` }}>
                              {tier}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {filteredClients.length === 0 && (
                  <div style={{ textAlign: "center", padding: 24, color: T.textMuted, fontSize: 13 }}>Aucun client trouvé.</div>
                )}
              </div>
            </div>
          )}

          {/* ── PAYMENTS ── */}
          {page === "payments" && (
            <div>
              <div style={S.kpiGrid}>
                <KPICard label="Total Encaissé" value={`${stats.revenue.toLocaleString()} MAD`} sub="Paiements reçus" accent="#22c55e" T={T} />
                <KPICard label="En Attente" value={`${stats.unpaidAmount.toLocaleString()} MAD`} sub={`${stats.unpaidCount} factures`} accent={T.gold} T={T} />
                <KPICard label="Dépenses" value={`${stats.expensesTotal.toLocaleString()} MAD`} sub="Total charges" accent="#f87171" T={T} />
                <KPICard label="Bénéfice Net" value={`${stats.profit.toLocaleString()} MAD`} sub={stats.profit >= 0 ? "✓ Positif" : "⚠ Déficit"} accent={stats.profit >= 0 ? "#22c55e" : "#f87171"} T={T} />
              </div>

              <div style={S.card}>
                <div style={S.cardTitle}>Transactions par Réservation</div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Client", "Véhicule", "Méthode", "Montant", "Statut Paiement", "Statut Résa", ...(canEdit ? ["Action"] : [])].map(h => (
                        <th key={h} style={S.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                        <td style={S.td}><span style={{ fontWeight: 500, color: T.text }}>{b.name}</span></td>
                        <td style={S.td}>{b.car}</td>
                        <td style={S.td}>
                          <span style={{ fontSize: 10, color: T.textSub, background: T.input, padding: "2px 7px", borderRadius: 4, border: `1px solid ${T.border}` }}>
                            {b.payment_method === "cash" ? "💵 Espèces" : b.payment_method === "transfer" ? "🏦 Virement" : "⏳ À régler"}
                          </span>
                        </td>
                        <td style={{ ...S.td, color: b.payment_status === "paid" ? "#22c55e" : T.gold, fontWeight: 600 }}>
                          {formatMoney(b.total_price)} MAD
                        </td>
                        <td style={S.td}>
                          <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                            background: b.payment_status === "paid" ? (dark ? "#0d2a1a" : "#f0fdf4") : (dark ? "#1c1500" : "#fffbeb"),
                            color: b.payment_status === "paid" ? "#22c55e" : "#d4a843",
                            border: `1px solid ${b.payment_status === "paid" ? "#166534" : "#713f12"}`
                          }}>
                            {b.payment_status === "paid" ? "✓ Payé" : "En attente"}
                          </span>
                        </td>
                        <td style={S.td}><StatusBadge status={b.status} overdue={isOverdue(b)} /></td>
                        {canEdit && (
                          <td style={S.td}>
                            {b.payment_status !== "paid" ? (
                              <button onClick={() => updatePayment(b.id)} style={S.successBtn}>Marquer payé</button>
                            ) : (
                              <span style={{ fontSize: 10, color: T.textMuted }}>—</span>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── EXPENSES ── */}
          {page === "expenses" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 14 }}>
                <KPICard label="Total Dépenses" value={`${stats.expensesTotal.toLocaleString()} MAD`} sub={`${expenses.length} entrées`} accent="#f87171" T={T} />
                <KPICard label="Bénéfice Net" value={`${stats.profit.toLocaleString()} MAD`} sub="Revenus − Dépenses" accent={stats.profit >= 0 ? "#22c55e" : "#f87171"} T={T} />
              </div>

              {canEdit && (
                <div style={{ ...S.card, marginBottom: 14 }}>
                  <div style={S.cardTitle}>Ajouter une Dépense</div>
                  <form onSubmit={addExpense} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input placeholder="Description (ex: Vidange W-2233)" value={expenseTitle} onChange={e => setExpenseTitle(e.target.value)} style={{ ...S.input, flex: "1 1 200px" }} required />
                    <input placeholder="Montant (MAD)" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} type="number" style={S.input} required />
                    <button type="submit" style={S.primaryBtn}>+ Ajouter</button>
                  </form>
                </div>
              )}

              <div style={S.card}>
                <div style={S.cardTitle}>Registre des Dépenses</div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Description", "Montant", "Date", ...(canEdit ? ["Action"] : [])].map(h => (
                        <th key={h} style={S.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map(e => (
                      <tr key={e.id} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                        <td style={{ ...S.td, color: T.text, fontWeight: 500 }}>{e.title}</td>
                        <td style={{ ...S.td, color: "#f87171", fontWeight: 600 }}>{Number(e.amount).toLocaleString()} MAD</td>
                        <td style={{ ...S.td, color: T.textSub }}>{new Date(e.created_at).toLocaleDateString("fr-MA")}</td>
                        {canEdit && (
                          <td style={S.td}>
                            <button onClick={() => deleteExpense(e.id)} style={S.dangerBtn}>✕</button>
                          </td>
                        )}
                      </tr>
                    ))}
                    {expenses.length === 0 && (
                      <tr><td colSpan={4} style={{ textAlign: "center", padding: 24, color: T.textMuted, fontSize: 13 }}>Aucune dépense enregistrée.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {page === "analytics" && (
            <div>
              <div style={S.kpiGrid}>
                <KPICard label="Total Réservations" value={`${stats.total}`} sub="Toutes périodes" accent="#3b82f6" T={T} />
                <KPICard label="Revenus Totaux" value={`${stats.revenue.toLocaleString()} MAD`} sub="Paiements reçus" accent={T.gold} T={T} />
                <KPICard label="Conversion" value={`${stats.conversion.toFixed(1)}%`} sub="Dem. → Acceptées" accent="#22c55e" T={T} />
                <KPICard label="Annulation" value={`${stats.cancellationRate.toFixed(1)}%`} sub="Taux moyen" accent="#f87171" T={T} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={S.card}>
                  <div style={S.cardTitle}>Revenus Mensuels (MAD)</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={revenueChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: T.textMuted }} />
                      <YAxis tick={{ fontSize: 10, fill: T.textMuted }} />
                      <Tooltip
    contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 12 }}
    formatter={(v: any) => [`${Number(v).toLocaleString()} MAD`, "Revenu"]}
  />
                      <Line type="monotone" dataKey="revenue" stroke={T.gold} strokeWidth={2} dot={{ fill: T.gold, r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div style={S.card}>
                  <div style={S.cardTitle}>Réservations par Mois</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={bookingChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: T.textMuted }} />
                      <YAxis tick={{ fontSize: 10, fill: T.textMuted }} allowDecimals={false} />
                      <Tooltip
    contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 12 }}
    formatter={(v: any) => [v, "Réservations"]}
  />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary table */}
              <div style={{ ...S.card, marginTop: 14 }}>
                <div style={S.cardTitle}>Résumé Financier</div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {[
                      { label: "Revenus encaissés",   value: `${stats.revenue.toLocaleString()} MAD`,         color: "#22c55e" },
                      { label: "Total dépenses",       value: `− ${stats.expensesTotal.toLocaleString()} MAD`, color: "#f87171" },
                      { label: "Bénéfice net",         value: `${stats.profit.toLocaleString()} MAD`,          color: stats.profit >= 0 ? "#22c55e" : "#f87171" },
                      { label: "Taux de conversion",   value: `${stats.conversion.toFixed(1)}%`,               color: T.text },
                      { label: "Taux d'annulation",    value: `${stats.cancellationRate.toFixed(1)}%`,         color: T.text },
                      { label: "Véhicules en flotte",  value: `${cars.length}`,                                color: T.text },
                      { label: "Clients uniques",      value: `${clients.length}`,                             color: T.text },
                    ].map(row => (
                      <tr key={row.label} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                        <td style={{ ...S.td, color: T.textSub }}>{row.label}</td>
                        <td style={{ ...S.td, textAlign: "right", fontWeight: 600, color: row.color }}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── INSIGHTS ── */}
          {page === "insights" && (
            <div>
              <div style={{ ...S.card, borderLeft: `3px solid ${T.gold}`, marginBottom: 14 }}>
                <div style={S.cardTitle}>🧠 Recommandations IA</div>
                <p style={{ fontSize: 12, color: T.textSub, margin: "4px 0 0" }}>
                  Analyse en temps réel basée sur vos données de réservation, paiement et flotte.
                </p>
              </div>

              {insights.map((ins, i) => (
                <div key={i} style={{
                  ...S.card,
                  display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 10,
                  borderLeft: `3px solid ${ins.color}`,
                }}>
                  <div style={{ fontSize: 22, marginTop: 2 }}>{ins.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, color: T.text, fontWeight: 500, lineHeight: 1.5 }}>{ins.text}</div>
                  </div>
                </div>
              ))}

              {/* Stat summary */}
              <div style={{ ...S.card, marginTop: 10 }}>
                <div style={S.cardTitle}>Métriques Clés</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 10 }}>
                  {[
                    { label: "Revenus",     value: `${stats.revenue.toLocaleString()} MAD`, color: "#22c55e" },
                    { label: "Profit",      value: `${stats.profit.toLocaleString()} MAD`,  color: stats.profit >= 0 ? "#22c55e" : "#f87171" },
                    { label: "Conversion",  value: `${stats.conversion.toFixed(1)}%`,        color: T.gold },
                    { label: "Annulation",  value: `${stats.cancellationRate.toFixed(1)}%`,  color: "#f87171" },
                    { label: "En retard",   value: `${stats.overdueCount}`,                  color: stats.overdueCount > 0 ? "#f87171" : "#22c55e" },
                    { label: "Impayés",     value: `${stats.unpaidCount}`,                   color: stats.unpaidCount > 0 ? "#d4a843" : "#22c55e" },
                  ].map(m => (
                    <div key={m.label} style={{ background: T.input, borderRadius: 8, padding: "10px 12px", border: `1px solid ${T.border}` }}>
                      <div style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: m.color }}>{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          background: dark ? "#131c2e" : "#1a202c",
          color: "#22c55e", border: "1px solid #22c55e",
          padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          animation: "fadein 0.2s ease"
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

function NavItem({ n, active, onClick, T }: {
  n: { id: string; label: string; icon: string; badge?: number }
  active: boolean; onClick: () => void; T: typeof DARK
}) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left",
      padding: "7px 10px", borderRadius: 7, cursor: "pointer", border: "none",
      background: active ? (T === DARK ? "#1a2540" : "#eff6ff") : "transparent",
      color: active ? T.gold : T.textSub,
      fontSize: 12, fontWeight: active ? 500 : 400,
      transition: "all 0.15s", marginBottom: 1,
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <span style={{ fontSize: 13 }}>{n.icon}</span>
      {n.label}
      {!!n.badge && n.badge > 0 && (
        <span style={{ marginLeft: "auto", background: "#c0392b", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 10 }}>
          {n.badge}
        </span>
      )}
    </button>
  )
}

function KPICard({ label, value, sub, accent, T }: {
  label: string; value: string; sub: string; accent: string; T: typeof DARK
}) {
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.border}`,
      borderTop: `2px solid ${accent}`, borderRadius: 10, padding: "13px 14px",
    }}>
      <div style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: T.text, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, color: T.textMuted, marginTop: 5 }}>{sub}</div>
    </div>
  )
}

function StatusBadge({ status, overdue }: { status: Booking["status"] | "available"; overdue: boolean; T?: typeof DARK }) {
  if (overdue) return (
    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: "#1a0a0a", color: "#f87171", border: "1px solid #7f1d1d" }}>
      En retard
    </span>
  )
  const map: Record<string, { bg: string; color: string; border: string; label: string }> = {
    accepted:  { bg: "#0d2a1a", color: "#22c55e",  border: "#166534",  label: "Actif" },
    pending:   { bg: "#1c1500", color: "#d4a843",  border: "#713f12",  label: "En attente" },
    cancelled: { bg: "#1e0f0f", color: "#f87171",  border: "#7f1d1d",  label: "Annulé" },
    available: { bg: "#0d2a1a", color: "#22c55e",  border: "#166534",  label: "Disponible" },
  }
  const s = map[status] ?? map.pending
  return (
    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {s.label}
    </span>
  )
}

function AlertRow({ dot, text, T }: { dot: string; text: React.ReactNode; T: typeof DARK }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${T.borderLight}` }}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: dot, flexShrink: 0 }} />
      <div style={{ fontSize: 11, color: T.textSub, flex: 1 }}>{text}</div>
    </div>
  )
}

/* ─────────────────────────────────────────
   STYLES FACTORY
───────────────────────────────────────── */

function makeStyles(T: typeof DARK) {
  return {
    sidebar: {
      width: 210, minWidth: 210,
      background: T.sidebar, borderRight: `1px solid ${T.border}`,
      display: "flex", flexDirection: "column" as const, padding: 0,
    },
    logoBox: {
      padding: "16px 14px 12px", borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", gap: 9,
    },
    logoIcon: {
      width: 32, height: 32, borderRadius: 7,
      background: "linear-gradient(135deg,#d4a843,#a07428)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0,
    },
    logoName: { fontSize: 13, fontWeight: 700, color: T.gold, letterSpacing: 0.5 },
    logoSub:  { fontSize: 9, color: T.textMuted, letterSpacing: "0.8px", textTransform: "uppercase" as const, marginTop: 1 },
    navSection: {
      fontSize: 9, color: T.textMuted, letterSpacing: "1px",
      textTransform: "uppercase" as const, padding: "10px 10px 4px", fontWeight: 600,
    },
    userBox: {
      padding: "11px 12px", borderTop: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", gap: 9,
    },
    userAvatar: {
      width: 30, height: 30, borderRadius: "50%",
      background: T === DARK ? "#1a2a40" : "#e8f0fe",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: 700, color: "#3b82f6", flexShrink: 0,
    },
    topbar: {
      padding: "11px 20px", background: T.topbar,
      borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
    },
    topBtn: {
      padding: "5px 14px", borderRadius: 7, border: `1px solid ${T.gold}`,
      background: "transparent", color: T.gold, fontSize: 11, cursor: "pointer",
      fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 500,
    },
    card: {
      background: T.card, border: `1px solid ${T.border}`,
      borderRadius: 10, padding: "14px 16px", marginBottom: 0,
    },
    cardTitle: {
      fontSize: 11, color: T.textSub, textTransform: "uppercase" as const,
      letterSpacing: "0.8px", fontWeight: 600, marginBottom: 12,
    },
    kpiGrid: {
      display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 12,
    },
    th: {
      fontSize: 9, color: T.textMuted, textTransform: "uppercase" as const,
      letterSpacing: "0.7px", padding: "5px 8px", textAlign: "left" as const,
      borderBottom: `1px solid ${T.border}`, fontWeight: 600,
    },
    td: {
      padding: "7px 8px", fontSize: 11, color: T.textSub,
    },
    input: {
      background: T.input, border: `1px solid ${T.inputBorder}`,
      borderRadius: 7, padding: "7px 11px", fontSize: 12, color: T.text,
      fontFamily: "'DM Sans', system-ui, sans-serif", outline: "none",
      minWidth: 120,
    },
    primaryBtn: {
      background: T.gold, border: "none", borderRadius: 7,
      padding: "8px 16px", color: "#1a1200", fontSize: 12, fontWeight: 700,
      cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif",
    },
    successBtn: {
      background: "transparent", border: "1px solid #166534", borderRadius: 5,
      padding: "3px 9px", color: "#22c55e", fontSize: 10, cursor: "pointer",
      fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600,
    },
    warnBtn: {
      background: "transparent", border: "1px solid #713f12", borderRadius: 5,
      padding: "3px 9px", color: "#d4a843", fontSize: 10, cursor: "pointer",
      fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600,
    },
    infoBtn: {
      background: "transparent", border: "1px solid #1e3a5f", borderRadius: 5,
      padding: "3px 9px", color: "#60a5fa", fontSize: 10, cursor: "pointer",
      fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600,
    },
    dangerBtn: {
      background: "transparent", border: "1px solid #7f1d1d", borderRadius: 5,
      padding: "3px 9px", color: "#f87171", fontSize: 10, cursor: "pointer",
      fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600,
    },
  }
}