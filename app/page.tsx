'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E5E7EB", overflow: "hidden" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 0", background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: 16,
        }}
      >
        <span style={{ fontSize: "1rem", fontWeight: 600, color: "#111827" }}>{q}</span>
        <span style={{
          width: 32, height: 32, borderRadius: 6, background: "#1565C0", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.3s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <p style={{ paddingBottom: 20, color: "#6B7280", lineHeight: 1.7, margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0, dir = "up" }: { children: React.ReactNode; delay?: number; dir?: "up" | "left" | "right" }) {
  const { ref, visible } = useReveal();
  const transforms: Record<string, string> = { up: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[dir],
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>{children}</div>
  );
}

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", company: "", industry: "", teamSize: "", email: "" });
  const [consultForm, setConsultForm] = useState({ name: "", mobile: "", company: "", website: "", email: "", city: "", requirement: "" });

  const dashboardImages = [
    { src: "/production-dashbord-erp.jpeg", alt: "Production Dashboard" },
    { src: "/inventory-dashbord-erp.png", alt: "Inventory Dashboard" },
    { src: "/production-plan-erp.jpeg", alt: "Production Planning" },
    { src: "/bom-erp.png", alt: "BOM Management" },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (!isAutoplay) return;
    const t = setInterval(() => setCurrentImageIndex(p => (p + 1) % dashboardImages.length), 4000);
    return () => clearInterval(t);
  }, [isAutoplay]);

  const problems = [
    { q: "Production planning managed in Excel?", a: "Multiple spreadsheets causing confusion and version conflicts" },
    { q: "No proper BOM control?", a: "Unable to track material requirements accurately" },
    { q: "Raw material consumption not tracked?", a: "Leading to wastage and increased costs" },
    { q: "No clarity on job card status?", a: "Production delays due to poor tracking" },
    { q: "Stock mismatch between store & production?", a: "Causing overstock or stockout situations" },
    { q: "No finished goods costing visibility?", a: "Unable to price products accurately" },
  ];

  const coreModules = [
    { title: "Sales Order Management", items: ["Convert enquiry to Sales Order", "Order-wise production planning", "Pending order tracking", "Customer-wise order history"] },
    { title: "Bill of Material (BOM)", items: ["Multi-level BOM", "Raw material mapping", "Version control", "Standard quantity management"] },
    { title: "Job Card Management", items: ["Job card creation from SO", "Department-wise process flow", "Stage tracking", "Production status monitoring"] },
    { title: "Production Process Tracking", items: ["WIP tracking", "Stage-wise updates", "Process completion", "Efficiency tracking"] },
    { title: "Raw Material & Consumption Tracking", items: ["Auto material deduction", "Actual vs standard comparison", "Wastage calculation", "Material variance report"] },
    { title: "Inventory Management", items: ["Real-time stock visibility", "Raw material, WIP & FG tracking", "Low stock alerts", "Stock valuation reports"] },
  ];

  const benefits = [
    "Increase Lead Conversion", "Reduce Manual Work", "Track Complete Sales Team", "Control Inventory Better",
    "Improve Production Planning", "Centralize Business Operations", "Increase Owner Visibility", "Improve Team Accountability",
  ];

  const achievements = [
    "100% Production Visibility", "Accurate BOM Control", "Reduced Material Wastage",
    "Real-Time Inventory", "Job Card Accountability", "Improved Profit Margin",
  ];

  const comparisonRows = [
    { cat: "Setup", bad: "Excel + Tally + CRM", good: "Single Integrated Platform" },
    { cat: "Sales Follow-ups", bad: "Manual Follow-ups", good: "Automated CRM" },
    { cat: "Sales Tracking", bad: "No Sales Tracking", good: "GPS & Visit Tracking" },
    { cat: "Inventory", bad: "Separate Inventory Software", good: "Integrated ERP" },
    { cat: "Reporting", bad: "Delayed Reports", good: "Real-Time Dashboard" },
  ];

  const manualVsErp = [
    { feat: "BOM Management", bad: "Multiple files, version conflicts", good: "Single source of truth, auto-updates" },
    { feat: "Production Tracking", bad: "No real-time visibility", good: "Live stage-wise tracking" },
    { feat: "Inventory Control", bad: "Manual entries, errors", good: "Auto deduction, alerts" },
    { feat: "Job Cards", bad: "Paper-based, lost records", good: "Digital, searchable, trackable" },
  ];

  const freeModules = [
    { icon: "📊", title: "Sales CRM", sub: "Enquiry • Quotations • Tasks" },
    { icon: "🎧", title: "Support System", sub: "Tickets • AMC • CMS" },
    { icon: "💰", title: "Accounting", sub: "GST Billing • Ledger • Expenses" },
    { icon: "🔗", title: "Lead Automation", sub: "Website • Facebook • WhatsApp" },
  ];

  const testimonials = [
    { text: '"BizPlus ERP helped us streamline production planning, inventory tracking, and job work management with complete visibility across all our manufacturing operations. The system reduced manual errors and improved coordination between departments."', name: "Anil Deshmukh", role: "Head of Operations – Precision Auto Parts Manufacturing", avatar: "A" },
    { text: '"Earlier, we were managing production and stock on Excel sheets, which caused delays and confusion. After implementing BizPlus ERP, our entire workflow from enquiry to dispatch became faster, more organized, and easier to monitor."', name: "Rakesh Bhandari", role: "Director – Electrical Panel Manufacturing Industry", avatar: "R" },
    { text: '"The BOM, Job Card, and inventory modules are extremely useful for our factory operations. BizPlus ERP helped us improve production efficiency and reduce material wastage significantly."', name: "Vivek Agarwal", role: "Production Manager – Industrial Equipment Manufacturing Unit", avatar: "V" },
  ];

  const faqs = [
    { q: "What is Manufacturing ERP software?", a: "Manufacturing ERP is an integrated software system that manages all core business processes — production, inventory, sales, BOM, job cards, and more — in one unified platform, replacing scattered spreadsheets and manual records." },
    { q: "How does ERP improve production efficiency?", a: "ERP provides real-time visibility into every stage of production. Job cards, work-in-progress tracking, and automated alerts ensure no bottleneck goes unnoticed, cutting downtime and improving throughput significantly." },
    { q: "Can ERP manage inventory and raw materials?", a: "Yes. BizPlusERP tracks raw materials, WIP, and finished goods across all warehouses in real time. Auto material deduction, low-stock alerts, and variance reports eliminate manual counting and guesswork." },
    { q: "Is ERP suitable for small manufacturing companies?", a: "Absolutely. BizPlusERP is designed specifically for Indian SMEs. It's affordable, quick to implement, and scales as your business grows — with no heavy IT infrastructure needed." },
    { q: "Does ERP help with purchase and supplier management?", a: "Yes. The procurement module handles purchase orders, GRN, supplier performance tracking, and payment scheduling — all linked to your inventory and production plan." },
    { q: "Can ERP generate manufacturing reports and analytics?", a: "BizPlusERP includes a powerful reporting engine with real-time dashboards for production, inventory, sales, and finance. Executives get instant visibility without waiting for manual reports." },
  ];

  const inp: React.CSSProperties = { width: "100%", padding: "12px 16px", border: "1px solid #D1D5DB", borderRadius: 8, fontSize: "0.9rem", color: "#111827", outline: "none", background: "#fff", fontFamily: "inherit" };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        input,select,textarea{font-family:inherit}
        input:focus,select:focus,textarea:focus{border-color:#1565C0!important;box-shadow:0 0 0 3px rgba(21,101,192,0.1);outline:none}
        .nl{color:#374151;text-decoration:none;font-size:.9rem;font-weight:500;transition:color .2s}
        .nl:hover{color:#1565C0}
        .pc{background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 4px rgba(0,0,0,.06);border:1px solid #F3F4F6;transition:box-shadow .25s,transform .25s}
        .pc:hover{box-shadow:0 8px 24px rgba(0,0,0,.1);transform:translateY(-3px)}
        .mc{background:#F9FAFB;border-radius:12px;padding:24px;border:1px solid #E5E7EB;transition:box-shadow .25s,transform .25s,background .2s}
        .mc:hover{box-shadow:0 8px 24px rgba(0,0,0,.08);transform:translateY(-3px);background:#fff}
        .bc{background:#fff;border:1.5px solid #E5E7EB;border-radius:12px;padding:18px 20px;display:flex;align-items:center;gap:12px;transition:border-color .2s,box-shadow .2s}
        .bc:hover{border-color:#93C5FD;box-shadow:0 4px 16px rgba(21,101,192,.08)}
        .ac{background:#F0F9FF;border-radius:12px;padding:20px 24px;display:flex;align-items:center;gap:14px;border:1px solid #E0F2FE;transition:transform .2s}
        .ac:hover{transform:translateY(-2px)}
        .fc{background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:32px 24px;text-align:center;transition:box-shadow .25s,transform .25s}
        .fc:hover{box-shadow:0 12px 32px rgba(0,0,0,.08);transform:translateY(-4px)}
        .tc{background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:28px;transition:box-shadow .2s}
        .tc:hover{box-shadow:0 12px 32px rgba(0,0,0,.08)}
        @keyframes spin-slow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes fi-left{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}
        @keyframes fi-right{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}
        .afl{animation:fi-left .7s ease-out both}
        .afr{animation:fi-right .8s .15s ease-out both}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
        @media(max-width:900px){
          .hg{grid-template-columns:1fr!important}
          .t3{grid-template-columns:1fr!important}
          .t2{grid-template-columns:1fr!important}
          .t4{grid-template-columns:1fr 1fr!important}
          .h1t{font-size:2rem!important}
          .sr{grid-template-columns:repeat(3,1fr)!important}
          .fg{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      {/* HEADER */}
      <header style={{
        position: "fixed", top: 0, width: "100%", zIndex: 100,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,.08)" : "none",
        transition: "box-shadow .3s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          <a href="https://bizpluserp.com" style={{ textDecoration: "none", fontSize: "1.4rem", fontWeight: 800 }}>
            <span style={{ color: "#111827" }}>BizPlus</span><span style={{ color: "#1087C7" }}>ERP</span>
          </a>
          <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <a href="#features" className="nl">Features</a>
            <a href="https://bizpluserp.com/offers" className="nl">Offers</a>
            <a href="#faq" className="nl">FAQ</a>
            <a href="tel:+917030323838" style={{ color: "#1565C0", fontWeight: 700, fontSize: ".9rem", textDecoration: "none" }}>+91 70 30 32 3838</a>
          </nav>
          <a href="#consult" style={{ background: "#1087C7", color: "#fff", padding: "10px 22px", borderRadius: 8, fontWeight: 700, fontSize: ".875rem", textDecoration: "none", transition: "background .2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#0d6fa3")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1087C7")}>
            Book Free Consultation
          </a>
        </div>
      </header>

      {/* HERO */}
      <section style={{ 
        paddingTop: 66, 
        minHeight: "92vh", 
        background: "linear-gradient(135deg, rgba(13,27,62,.88) 0%, rgba(26,45,90,.85) 35%, rgba(30,58,110,.82) 70%, rgba(22,34,68,.88) 100%), url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex", 
        alignItems: "center", 
        position: "relative", 
        overflow: "hidden" 
      }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(16,135,199,.25) 0%,transparent 70%)", top: -150, left: -150, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(16,135,199,.18) 0%,transparent 70%)", bottom: -100, right: 250, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px", width: "100%", display: "grid", gridTemplateColumns: "1fr 480px", gap: 56, alignItems: "center" }} className="hg">

          {/* Left copy */}
          <div>
            <div className="afl" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,135,199,.2)", border: "1px solid rgba(16,135,199,.4)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#38BDF8", display: "inline-block" }} />
              <span style={{ fontSize: ".8rem", color: "#7DD3FC", fontWeight: 600, letterSpacing: ".04em" }}>Financial Year Special Implementation</span>
            </div>
            <h1 className="afl d1 h1t" style={{ fontSize: "2.75rem", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-.02em" }}>
              Complete Business Automation Software for Manufacturers, Distributors & Sales-Driven Businesses
            </h1>
            <p className="afl d2" style={{ color: "#94A3B8", fontSize: "1rem", lineHeight: 1.7, marginBottom: 28, maxWidth: 520 }}>
              Complete Manufacturing ERP System for Indian Businesses. Manage Sales Orders, BOM, Job Cards, Production & Inventory in One Structured System.
            </p>
            <div className="afl d3" style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
              {["Real-Time Production Tracking", "Complete Inventory Control", "Starting Affordable Pricing"].map(t => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".9rem" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  <span style={{ color: "#CBD5E1" }}>{t}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="afr" style={{ background: "#F9FAFB", borderRadius: 16, padding: "36px 32px", boxShadow: "0 24px 64px rgba(0,0,0,.3)" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 6 }}>Request Free ERP Trial</h2>
            <p style={{ fontSize: ".83rem", color: "#6B7280", textAlign: "center", marginBottom: 22 }}>Fill in your details and get access to our Manufacturing ERP system</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <input style={inp} placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={inp} placeholder="Mobile Number *" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
              <input style={inp} placeholder="Company Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              <select style={{ ...inp, color: form.industry ? "#111827" : "#9CA3AF" }} value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
                <option value="" disabled>Select Industry</option>
                {["Auto Components", "Metal Fabrication", "Machine Parts", "Electronics", "Pharma", "Food & Beverage", "Other"].map(o => <option key={o}>{o}</option>)}
              </select>
              <select style={{ ...inp, color: form.teamSize ? "#111827" : "#9CA3AF" }} value={form.teamSize} onChange={e => setForm({ ...form, teamSize: e.target.value })}>
                <option value="" disabled>Team Size</option>
                {["1–10", "11–50", "51–200", "200+"].map(o => <option key={o}>{o}</option>)}
              </select>
              <input style={inp} placeholder="Business Email *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <button style={{ background: "#1087C7", color: "#fff", border: "none", borderRadius: 8, padding: "14px", fontWeight: 700, fontSize: ".95rem", cursor: "pointer", width: "100%", transition: "background .2s,transform .15s", marginTop: 4 }}
                onMouseEnter={e => { e.currentTarget.style.background = "#0d6fa3"; e.currentTarget.style.transform = "scale(1.01)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#1087C7"; e.currentTarget.style.transform = "scale(1)"; }}>
                Request Free ERP Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section style={{ padding: "80px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 6 }}>Are You Facing These Manufacturing Problems?</h2></Reveal>
          <Reveal delay={60}><p style={{ textAlign: "center", color: "#6B7280", marginBottom: 48 }}>These problems directly affect profit margins</p></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="t3">
            {problems.map((p, i) => (
              <Reveal key={i} delay={i * 55}>
                <div className="pc">
                  <h3 style={{ fontSize: ".93rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>{p.q}</h3>
                  <p style={{ fontSize: ".875rem", color: "#9CA3AF", lineHeight: 1.6 }}>{p.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CORE MODULES */}
      <section id="features" style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 48 }}>Core ERP Modules</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="t3">
            {coreModules.map((m, i) => (
              <Reveal key={i} delay={i * 55}>
                <div className="mc">
                  <h3 style={{ fontSize: ".93rem", fontWeight: 700, color: "#111827", marginBottom: 14 }}>{m.title}</h3>
                  <ul style={{ paddingLeft: 18 }}>
                    {m.items.map((item, j) => <li key={j} style={{ fontSize: ".875rem", color: "#4B5563", marginBottom: 6, lineHeight: 1.5 }}>{item}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLUE CTA STRIP */}
      <section style={{ background: "linear-gradient(135deg,#1087C7 0%,#0d6fa3 100%)", padding: "56px 24px", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: 10 }}>Ready to Transform Your Manufacturing?</h2>
          <p style={{ color: "rgba(255,255,255,.85)", fontSize: "1rem", marginBottom: 28 }}>Connect with our Manufacturing ERP experts for a personalized consultation</p>
          <a href="#consult" style={{ display: "inline-block", background: "#fff", color: "#1565C0", padding: "13px 36px", borderRadius: 8, fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(0,0,0,.15)", transition: "transform .2s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
            Free Consultation
          </a>
        </Reveal>
      </section>

      {/* DASHBOARD */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 8 }}>Powerful ERP Dashboard</h2>
            <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>Real-time visibility across production, inventory, sales and finance — all in one intelligent control center.</p>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 40px rgba(0,0,0,.12)", border: "1px solid #E5E7EB", position: "relative" }}>
              <button onClick={() => { setCurrentImageIndex(p => (p - 1 + dashboardImages.length) % dashboardImages.length); setIsAutoplay(false); }}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,.9)", border: "1px solid #E5E7EB", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <button onClick={() => { setCurrentImageIndex(p => (p + 1) % dashboardImages.length); setIsAutoplay(false); }}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,.9)", border: "1px solid #E5E7EB", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
              <div style={{ position: "relative", height: 480 }}>
                {dashboardImages.map((img, idx) => (
                  <Image key={idx} src={img.src} alt={img.alt} fill style={{ objectFit: "cover", transition: "opacity .8s ease", opacity: idx === currentImageIndex ? 1 : 0 }} priority={idx === 0} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "16px 0", background: "#F9FAFB" }}>
                {dashboardImages.map((_, i) => (
                  <button key={i} onClick={() => { setCurrentImageIndex(i); setIsAutoplay(false); }}
                    style={{ width: i === currentImageIndex ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === currentImageIndex ? "#1087C7" : "#CBD5E1", cursor: "pointer", transition: "all .3s", padding: 0 }} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* stats strip */}
          <Reveal delay={120}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", borderTop: "1px solid #E5E7EB", marginTop: 0 }} className="sr">
              {[{ v: "85%", l: "Order Fulfillment" }, { v: "₹12.5L", l: "Avg Monthly Sales" }, { v: "₹45.2L", l: "Inventory Managed" }, { v: "23", l: "Modules" }, { v: "₹8.7L", l: "Cost Savings" }, { v: "15", l: "Integrations" }].map((s, i) => (
                <div key={i} style={{ padding: "22px 10px", textAlign: "center", borderRight: i < 5 ? "1px solid #E5E7EB" : "none" }}>
                  <div style={{ fontSize: "1.55rem", fontWeight: 800, color: "#1087C7" }}>{s.v}</div>
                  <div style={{ fontSize: ".73rem", color: "#9CA3AF", marginTop: 4, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ padding: "80px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 6 }}>Business Benefits</h2></Reveal>
          <Reveal delay={60}><p style={{ textAlign: "center", color: "#6B7280", marginBottom: 44 }}>What You Gain with BizPlusERP</p></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }} className="t4">
            {benefits.map((b, i) => (
              <Reveal key={i} delay={i * 45}>
                <div className="bc">
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <span style={{ fontSize: ".875rem", fontWeight: 600, color: "#111827" }}>{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Reveal delay={80}>
              <a href="https://bizpluserp.com/demo" style={{ display: "inline-block", background: "#1087C7", color: "#fff", padding: "13px 36px", borderRadius: 8, fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0d6fa3")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1087C7")}>
                Request Demo
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 6 }}>Why Businesses Choose BizPlusERP</h2></Reveal>
          <Reveal delay={60}><p style={{ textAlign: "center", color: "#6B7280", marginBottom: 36 }}>One Platform Instead of Multiple Software</p></Reveal>
          <Reveal delay={80}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #E5E7EB", boxShadow: "0 4px 16px rgba(0,0,0,.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr", background: "#1087C7", padding: "16px 24px" }}>
                {["Category", "Traditional Setup", "BizPlusERP"].map(h => <span key={h} style={{ color: "#fff", fontWeight: 700, fontSize: ".9rem" }}>{h}</span>)}
              </div>
              {comparisonRows.map((r, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr", padding: "17px 24px", background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: i < comparisonRows.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#111827", fontSize: ".9rem" }}>{r.cat}</span>
                  <span style={{ color: "#EF4444", fontSize: ".875rem", display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 3, height: 16, background: "#EF4444", borderRadius: 2, flexShrink: 0 }} />{r.bad}</span>
                  <span style={{ color: "#16A34A", fontSize: ".875rem", display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 3, height: 16, background: "#16A34A", borderRadius: 2, flexShrink: 0 }} />{r.good}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Reveal delay={80}>
              <a href="https://bizpluserp.com/signup" style={{ display: "inline-block", background: "#1087C7", color: "#fff", padding: "13px 36px", borderRadius: 8, fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0d6fa3")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1087C7")}>
                Get Started Today
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FREE MODULES */}
      <section style={{ padding: "80px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <span style={{ background: "#FFF7ED", border: "1px solid #FED7AA", color: "#C2410C", borderRadius: 100, padding: "5px 14px", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".06em" }}>🏆 LIMITED TIME BUSINESS UPGRADE</span>
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 8 }}>Get 4 Business Modules FREE with BizPlusERP</h2>
            <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 44, maxWidth: 580, margin: "0 auto 44px" }}>Implement ERP before 15th March 2026 and unlock Sales CRM, Support Desk, Accounting & Automated Lead Capture at no additional cost.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="t4">
            {freeModules.map((m, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="fc">
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 16px" }}>{m.icon}</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1087C7", marginBottom: 8 }}>{m.title}</h3>
                  <p style={{ fontSize: ".85rem", color: "#6B7280" }}>{m.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MANUAL VS */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 36 }}>Manual VS BizPlusERP</h2></Reveal>
          <Reveal delay={80}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #E5E7EB", boxShadow: "0 4px 16px rgba(0,0,0,.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr", background: "#1565C0", padding: "16px 24px" }}>
                {["Feature", "Manual Method", "BizPlusERP"].map(h => <span key={h} style={{ color: "#fff", fontWeight: 700, fontSize: ".9rem" }}>{h}</span>)}
              </div>
              {manualVsErp.map((r, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr", padding: "17px 24px", background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: i < manualVsErp.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#111827", fontSize: ".9rem" }}>{r.feat}</span>
                  <span style={{ color: "#EF4444", fontSize: ".875rem" }}>{r.bad}</span>
                  <span style={{ color: "#16A34A", fontSize: ".875rem" }}>{r.good}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACHIEVE */}
      <section style={{ padding: "80px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 36 }}>What You Achieve With BizPlusERP</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="t3">
            {achievements.map((a, i) => (
              <Reveal key={i} delay={i * 55}>
                <div className="ac">
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <span style={{ fontSize: ".925rem", fontWeight: 700, color: "#111827" }}>{a}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 6 }}>What Manufacturing Leaders Say</h2></Reveal>
          <Reveal delay={60}><p style={{ textAlign: "center", color: "#6B7280", marginBottom: 44 }}>Real experiences from businesses that transformed with BizPlusERP</p></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="t3">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="tc">
                  <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: j < 4 ? "#F59E0B" : "#D1D5DB", fontSize: "1rem" }}>★</span>)}
                  </div>
                  <p style={{ fontSize: ".875rem", color: "#374151", lineHeight: 1.7, marginBottom: 22, fontStyle: "italic" }}>{t.text}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1087C7", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: ".9rem", flexShrink: 0 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#111827", fontSize: ".875rem" }}>{t.name}</div>
                      <div style={{ color: "#9CA3AF", fontSize: ".775rem" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 44 }}>Frequently Asked Questions</h2></Reveal>
          <div style={{ background: "#fff", borderRadius: 16, padding: "8px 32px", boxShadow: "0 2px 16px rgba(0,0,0,.06)", border: "1px solid #E5E7EB" }}>
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CONSULT FORM */}
      <section id="consult" style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <Reveal>
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, padding: "48px", boxShadow: "0 4px 32px rgba(0,0,0,.08)" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1565C0", textAlign: "center", marginBottom: 8 }}>Book Your Free ERP Consultation</h2>
              <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 30 }}>Speak with our ERP experts and optimize your manufacturing operations.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }} className="t2">
                <input style={inp} placeholder="Full Name *" value={consultForm.name} onChange={e => setConsultForm({ ...consultForm, name: e.target.value })} />
                <input style={inp} placeholder="Mobile Number *" value={consultForm.mobile} onChange={e => setConsultForm({ ...consultForm, mobile: e.target.value })} />
                <input style={inp} placeholder="Company Name" value={consultForm.company} onChange={e => setConsultForm({ ...consultForm, company: e.target.value })} />
                <input style={inp} placeholder="Company Website" value={consultForm.website} onChange={e => setConsultForm({ ...consultForm, website: e.target.value })} />
                <input style={inp} placeholder="Business Email *" type="email" value={consultForm.email} onChange={e => setConsultForm({ ...consultForm, email: e.target.value })} />
                <input style={inp} placeholder="City" value={consultForm.city} onChange={e => setConsultForm({ ...consultForm, city: e.target.value })} />
              </div>
              <textarea style={{ ...inp, marginTop: 13, minHeight: 100, resize: "vertical" }} placeholder="Briefly describe your ERP requirement (optional)" value={consultForm.requirement} onChange={e => setConsultForm({ ...consultForm, requirement: e.target.value })} />
              <button style={{ width: "100%", marginTop: 14, background: "#1565C0", color: "#fff", border: "none", borderRadius: 8, padding: "15px", fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "background .2s,transform .15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1044a0"; e.currentTarget.style.transform = "scale(1.005)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#1565C0"; e.currentTarget.style.transform = "scale(1)"; }}>
                Schedule Free Consultation
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0D1B3E", color: "#94A3B8", padding: "56px 24px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.2fr", gap: 40, marginBottom: 36 }} className="fg">
            <div>
              <a href="https://bizpluserp.com" style={{ textDecoration: "none", fontSize: "1.3rem", fontWeight: 800, display: "block", marginBottom: 12 }}>
                <span style={{ color: "#fff" }}>BizPlus</span><span style={{ color: "#1087C7" }}>ERP</span>
              </a>
              <p style={{ fontSize: ".875rem", lineHeight: 1.7, marginBottom: 14, maxWidth: 260 }}>Complete Manufacturing ERP Solution for Indian SMEs</p>
              <a href="tel:+917030323838" style={{ display: "block", color: "#CBD5E1", textDecoration: "none", fontSize: ".875rem", marginBottom: 5 }}>+91 70 30 32 3838</a>
              <a href="mailto:info@bizpluserp.com" style={{ color: "#CBD5E1", textDecoration: "none", fontSize: ".875rem" }}>info@bizpluserp.com</a>
            </div>
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, fontSize: ".9rem", marginBottom: 14 }}>Quick Links</h4>
              {[["ERP Modules", "#features"], ["Special Offers", "https://bizpluserp.com/offers"], ["Request Demo", "https://bizpluserp.com/demo"], ["FAQ", "#faq"]].map(([l, h]) => (
                <a key={l} href={h} style={{ display: "block", color: "#94A3B8", textDecoration: "none", fontSize: ".875rem", marginBottom: 9 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, fontSize: ".9rem", marginBottom: 14 }}>Industries</h4>
              {["Auto Components", "Metal Fabrication", "Machine Parts", "Electronics"].map(l => (
                <a key={l} href={`https://bizpluserp.com/industry/${l.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{ display: "block", color: "#94A3B8", textDecoration: "none", fontSize: ".875rem", marginBottom: 9 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, fontSize: ".9rem", marginBottom: 14 }}>Major Cities</h4>
              <p style={{ fontSize: ".875rem", lineHeight: 1.9 }}>
                {["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad"].map((c, i, arr) => (
                  <span key={c}>
                    <a href={`https://bizpluserp.com/erp-${c.toLowerCase()}`} style={{ color: "#94A3B8", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}>{c}</a>
                    {i < arr.length - 1 ? " • " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 18, textAlign: "center", fontSize: ".82rem", color: "#64748B" }}>
            © 2026 BizPlusERP. All rights reserved. | Made in India for Indian Manufacturing
          </div>
        </div>
      </footer>

      {/* WhatsApp */}
      <a href="https://wa.me/917030323838" target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, width: 52, height: 52, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,211,102,.4)", textDecoration: "none", transition: "transform .2s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.533 5.845L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.727.976.994-3.633-.235-.374A9.818 9.818 0 112.182 12 9.818 9.818 0 0112 21.818z" />
        </svg>
      </a>

      {/* Spinning Offer */}
      <a href="https://bizpluserp.com/offers" style={{ position: "fixed", bottom: 88, right: 18, zIndex: 200, textDecoration: "none", width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#EC4899 0%,#F43F5E 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", boxShadow: "0 4px 16px rgba(244,63,94,.4)", position: "relative" }}>
          <svg style={{ position: "absolute", animation: "spin-slow 8s linear infinite" }} width="60" height="60" viewBox="0 0 60 60">
            <path id="cr" d="M 30,30 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0" fill="none" />
            <text fontSize="6.5" fontWeight="700" fill="white" letterSpacing="2.2">
              <textPath href="#cr">SPECIAL OFFER • SPECIAL OFFER • </textPath>
            </text>
          </svg>
          <span style={{ color: "#fff", fontSize: ".68rem", fontWeight: 800, textAlign: "center", lineHeight: 1.3 }}>→<br />OFFER</span>
        </div>
      </a>
    </div>
  );
}