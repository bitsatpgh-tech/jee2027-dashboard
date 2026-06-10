import { useState } from "react";

const PHYSICS_CHAPTERS = [
  { name: "Units, Dimensions & Errors", tier: "E" },
  { name: "Kinematics 1D/2D + Projectile", tier: "M" },
  { name: "Laws of Motion + Friction", tier: "M" },
  { name: "Work, Energy & Power", tier: "M" },
  { name: "Centre of Mass + Collisions", tier: "M" },
  { name: "Rotational Mechanics", tier: "X" },
  { name: "Gravitation", tier: "M" },
  { name: "Properties of Solids & Fluids", tier: "M" },
  { name: "Thermodynamics + KTG", tier: "H" },
  { name: "Oscillations (SHM) + Waves", tier: "M" },
  { name: "Electrostatics + Capacitors", tier: "H" },
  { name: "Current Electricity", tier: "M" },
  { name: "Magnetism + Moving Charges", tier: "H" },
  { name: "EMI + AC Circuits", tier: "H" },
  { name: "Ray Optics + Wave Optics", tier: "H" },
  { name: "Modern Physics + Dual Nature", tier: "M" },
  { name: "Electromagnetic Waves", tier: "E" },
  { name: "Electronic Devices", tier: "E" },
  { name: "Experimental Skills", tier: "E" },
  { name: "Forced + Damped Oscillations", tier: "M" },
];

const CHEMISTRY_CHAPTERS = [
  { name: "Mole Concept & Stoichiometry", tier: "M" },
  { name: "Atomic Structure", tier: "M" },
  { name: "Chemical Bonding + MOT", tier: "H" },
  { name: "States of Matter — Gases", tier: "M" },
  { name: "Chemical Thermodynamics", tier: "M" },
  { name: "Solutions & Colligative Properties", tier: "M" },
  { name: "Chemical & Ionic Equilibrium", tier: "H" },
  { name: "Electrochemistry + Redox", tier: "H" },
  { name: "Chemical Kinetics", tier: "M" },
  { name: "Solid State", tier: "M" },
  { name: "Surface Chemistry", tier: "E" },
  { name: "Periodicity + Classification", tier: "E" },
  { name: "Hydrogen", tier: "E" },
  { name: "s-Block Elements", tier: "M" },
  { name: "p-Block Group 13-14", tier: "M" },
  { name: "p-Block Group 15-18", tier: "H" },
  { name: "d-Block & f-Block Elements", tier: "M" },
  { name: "Coordination Compounds", tier: "X" },
  { name: "Metallurgy", tier: "E" },
  { name: "Basic Organic + Mechanisms", tier: "H" },
  { name: "Hydrocarbons", tier: "M" },
  { name: "Haloalkanes + Haloarenes", tier: "M" },
  { name: "Alcohols, Phenols & Ethers", tier: "M" },
  { name: "Aldehydes & Ketones", tier: "H" },
  { name: "Carboxylic Acids + Amines", tier: "M" },
  { name: "Biomolecules", tier: "E" },
  { name: "Polymers", tier: "E" },
  { name: "Environmental Chemistry", tier: "E" },
];

const MATHS_CHAPTERS = [
  { name: "Sets, Relations & Functions", tier: "E" },
  { name: "Trigonometry + Inverse Trig", tier: "M" },
  { name: "Complex Numbers", tier: "H" },
  { name: "Quadratic Equations", tier: "M" },
  { name: "Sequences & Series AP/GP/HP", tier: "M" },
  { name: "Permutations & Combinations", tier: "M" },
  { name: "Binomial Theorem", tier: "M" },
  { name: "Matrices & Determinants", tier: "M" },
  { name: "Straight Lines", tier: "M" },
  { name: "Circles", tier: "H" },
  { name: "Conic Sections (Parabola+Ellipse+Hyp)", tier: "H" },
  { name: "3D Geometry", tier: "H" },
  { name: "Vectors", tier: "H" },
  { name: "Limits & Continuity", tier: "M" },
  { name: "Differentiation", tier: "M" },
  { name: "Application of Derivatives (AOD)", tier: "X" },
  { name: "Indefinite Integration", tier: "X" },
  { name: "Definite Integration", tier: "H" },
  { name: "Differential Equations", tier: "H" },
  { name: "Probability & Statistics", tier: "H" },
];

const TIER_COLORS = {
  E: { bg: "#1a3a2a", text: "#4ade80", label: "Easy" },
  M: { bg: "#1a2e4a", text: "#60a5fa", label: "Medium" },
  H: { bg: "#3a1a2a", text: "#f472b6", label: "Hard" },
  X: { bg: "#2a1a00", text: "#fbbf24", label: "GOAT" },
};

const MOCK_MILESTONES = [
  { score: "120+", rank: "Mid NIT CSE", pct: 40 },
  { score: "150+", rank: "Good NIT CSE", pct: 52 },
  { score: "180+", rank: "Top NIT CSE", pct: 65 },
  { score: "220+", rank: "IIIT-H Level", pct: 76 },
  { score: "250+", rank: "IIT Target", pct: 87 },
  { score: "300+", rank: "Elite IIT Rank", pct: 97 },
];

const RULES = [
  { n: "01", title: "HC Verma BEFORE Disha", body: "Zero base needs theory first. Disha without HCV = confusion." },
  { n: "02", title: "NCERT Before Any Chemistry Problem", body: "40% of JEE Main is pure NCERT lines. Cannot skip." },
  { n: "03", title: "Never Skip Maths > 1 Day", body: "Integration and AOD require daily touch to stay sharp." },
  { n: "04", title: "Error Log Every Single Night", body: "Students who log errors consistently outperform by 30+ marks." },
  { n: "05", title: "3-Hour Mock Analysis Always", body: "The analysis is worth more than the mock. Never skip." },
  { n: "06", title: "Hard Chapters: 3 Full Reads", body: "Rotation, Integration, Coordination — revisit every 7 days." },
  { n: "07", title: "No Phone in Study Blocks", body: "Every phone check costs 20 min of deep work. 12 hrs needs 100% focus." },
  { n: "08", title: "One Planned Rest Half-Day/Week", body: "Burnout = 2 weeks lost. Plan rest deliberately." },
  { n: "09", title: "Morning Formula Drill — 15 Min", body: "15 min × 360 days = 90 hrs of recall = permanent memory." },
  { n: "10", title: "START TODAY — Stop Refining", body: "The plan is complete. Every planning day is a day not studying." },
];

const TOP10 = [
  { rank: 1, chapter: "Rotational Mechanics", sub: "Physics", hrs: 60, note: "Highest Physics weightage • 8–10% of paper" },
  { rank: 2, chapter: "Indefinite Integration", sub: "Maths", hrs: 60, note: "HARDEST in JEE • 3–4 Qs every year" },
  { rank: 3, chapter: "Application of Derivatives", sub: "Maths", hrs: 60, note: "Maxima/minima • Rolle theorem" },
  { rank: 4, chapter: "Electrostatics + Capacitors", sub: "Physics", hrs: 48, note: "Most asked Physics combo" },
  { rank: 5, chapter: "Coordination Compounds", sub: "Chemistry", hrs: 60, note: "Highest Inorganic weightage" },
  { rank: 6, chapter: "EMI + AC Circuits", sub: "Physics", hrs: 48, note: "JEE Advanced favourite • LCR resonance" },
  { rank: 7, chapter: "Aldehydes & Ketones", sub: "Chemistry", hrs: 48, note: "Most asked Organic chapter" },
  { rank: 8, chapter: "Definite Integration", sub: "Maths", hrs: 48, note: "12 properties = shortcut to 3–4 marks" },
  { rank: 9, chapter: "p-Block Group 15–18", sub: "Chemistry", hrs: 48, note: "Most reactions per chapter in JEE Chem" },
  { rank: 10, chapter: "Chemical & Ionic Equilibrium", sub: "Chemistry", hrs: 48, note: "pH + buffer + Kp/Kc every JEE paper" },
];

function CircularProgress({ pct, size = 80, stroke = 7, color = "#f59e0b", label }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e2433" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
          fill="#f1f5f9" fontSize={size * 0.2} fontWeight="700" fontFamily="monospace">
          {pct}%
        </text>
      </svg>
      {label && <span style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>{label}</span>}
    </div>
  );
}

function ChapterRow({ ch, idx, done, onToggle }) {
  const tc = TIER_COLORS[ch.tier];
  return (
    <div onClick={onToggle} style={{
      display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
      borderRadius: 8, cursor: "pointer", marginBottom: 4,
      background: done ? "#0f2a1a" : "#0d1117",
      border: `1px solid ${done ? "#22c55e33" : "#1e2433"}`,
      transition: "all 0.2s",
      opacity: done ? 0.7 : 1,
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: 6,
        border: `2px solid ${done ? "#22c55e" : "#334155"}`,
        background: done ? "#22c55e" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, fontSize: 12, color: "#fff", fontWeight: 800,
      }}>{done ? "✓" : ""}</span>
      <span style={{ fontSize: 13, color: done ? "#64748b" : "#e2e8f0", flex: 1, textDecoration: done ? "line-through" : "none" }}>
        {idx + 1}. {ch.name}
      </span>
      <span style={{
        fontSize: 10, fontWeight: 800, letterSpacing: 1,
        padding: "2px 7px", borderRadius: 4,
        background: tc.bg, color: tc.text,
      }}>{ch.tier === "X" ? "GOAT" : tc.label}</span>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [phyDone, setPhyDone] = useState({});
  const [chemDone, setChemDone] = useState({});
  const [mathDone, setMathDone] = useState({});
  const [streak, setStreak] = useState(0);
  const [hours, setHours] = useState(0);
  const [mocks, setMocks] = useState(0);
  const [mockLog, setMockLog] = useState(Array(15).fill({ p: "", c: "", m: "", total: "", accuracy: "" }));

  const phyPct = Math.round((Object.values(phyDone).filter(Boolean).length / PHYSICS_CHAPTERS.length) * 100);
  const chemPct = Math.round((Object.values(chemDone).filter(Boolean).length / CHEMISTRY_CHAPTERS.length) * 100);
  const mathPct = Math.round((Object.values(mathDone).filter(Boolean).length / MATHS_CHAPTERS.length) * 100);
  const overallPct = Math.round((phyPct + chemPct + mathPct) / 3);

  const TABS = ["dashboard", "chapters", "mocks", "top10", "rules"];
  const TAB_LABELS = { dashboard: "⚡ Dashboard", chapters: "📚 Chapters", mocks: "🎯 Mocks", top10: "🏆 Top 10", rules: "📋 Rules" };

  const subColor = { Physics: "#60a5fa", Chemistry: "#f472b6", Maths: "#a78bfa" };

  return (
    <div style={{
      minHeight: "100vh", background: "#060a12",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      color: "#e2e8f0",
    }}>
      {/* HERO HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a0f1e 100%)",
        borderBottom: "1px solid #1e2433",
        padding: "28px 24px 20px",
        position: "relative", overflow: "hidden",
      }}>
        {/* glow blobs */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #f59e0b22 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -40, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, #6366f122 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#f59e0b", fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>
              THE GOAT COMEBACK • OBC-NCL
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.1 }}>
              SUBBU'S
              <span style={{ color: "#f59e0b" }}> JEE 2027</span>
            </div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4, fontWeight: 500 }}>
              360 Days • 68 Chapters • IIT Hyd / NIT Calicut CSE
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#475569", letterSpacing: 1 }}>DAY</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>
              {Math.min(streak + 1, 360)}
            </div>
            <div style={{ fontSize: 11, color: "#475569" }}>OF 360</div>
          </div>
        </div>

        {/* Target chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {[
            { label: "IIT Hyd CSE/AI", detail: "OBC < 399", color: "#f59e0b" },
            { label: "NIT Calicut CSE", detail: "OBC < 1790", color: "#60a5fa" },
            { label: "NIT Warangal CSE", detail: "OBC < 1248", color: "#a78bfa" },
            { label: "BITS Hyd CSE", detail: "BITSAT 279+", color: "#34d399" },
          ].map(t => (
            <div key={t.label} style={{
              padding: "5px 12px", borderRadius: 20,
              border: `1px solid ${t.color}44`,
              background: `${t.color}11`,
              fontSize: 11, fontWeight: 600,
            }}>
              <span style={{ color: t.color }}>{t.label}</span>
              <span style={{ color: "#475569", marginLeft: 6 }}>{t.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAV TABS */}
      <div style={{
        display: "flex", background: "#0d1117",
        borderBottom: "1px solid #1e2433",
        overflowX: "auto", gap: 0,
      }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "13px 8px", border: "none", cursor: "pointer",
            background: tab === t ? "#0a0f1e" : "transparent",
            color: tab === t ? "#f59e0b" : "#475569",
            fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
            borderBottom: tab === t ? "2px solid #f59e0b" : "2px solid transparent",
            transition: "all 0.2s", whiteSpace: "nowrap",
          }}>{TAB_LABELS[t]}</button>
        ))}
      </div>

      <div style={{ padding: "20px 16px", maxWidth: 800, margin: "0 auto" }}>

        {/* ═══════════ DASHBOARD ═══════════ */}
        {tab === "dashboard" && (
          <div>
            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Study Streak", val: streak, unit: "days", color: "#f59e0b", action: () => setStreak(s => s + 1) },
                { label: "Hours Studied", val: hours, unit: "hrs", color: "#60a5fa", action: () => setHours(h => h + 1) },
                { label: "Mocks Given", val: mocks, unit: "mocks", color: "#a78bfa", action: () => setMocks(m => m + 1) },
              ].map(s => (
                <div key={s.label} onClick={s.action} style={{
                  background: "#0d1117", border: "1px solid #1e2433",
                  borderRadius: 12, padding: "14px 12px", cursor: "pointer",
                  textAlign: "center", transition: "border-color 0.2s",
                  ":hover": { borderColor: s.color },
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: "#475569", marginTop: 2, fontWeight: 600, letterSpacing: 0.5 }}>{s.unit}</div>
                  <div style={{ fontSize: 9, color: "#334155", marginTop: 4 }}>tap to +1</div>
                </div>
              ))}
            </div>

            {/* Progress circles */}
            <div style={{
              background: "#0d1117", border: "1px solid #1e2433",
              borderRadius: 16, padding: "20px 16px", marginBottom: 20,
            }}>
              <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>
                CHAPTER COMPLETION
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
                <CircularProgress pct={overallPct} size={88} color="#f59e0b" label="OVERALL" />
                <CircularProgress pct={phyPct} size={72} color="#60a5fa" label="PHYSICS" />
                <CircularProgress pct={chemPct} size={72} color="#f472b6" label="CHEMISTRY" />
                <CircularProgress pct={mathPct} size={72} color="#a78bfa" label="MATHS" />
              </div>
            </div>

            {/* Phase roadmap */}
            <div style={{
              background: "#0d1117", border: "1px solid #1e2433",
              borderRadius: 16, padding: "20px 16px", marginBottom: 20,
            }}>
              <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>
                3-PHASE ROADMAP
              </div>
              {[
                { phase: "01", name: "FOUNDATION", dates: "Jun 1 – Dec 31, 2026", days: "Day 1–213", desc: "68 chapters • HCV • NCERT • Disha", color: "#60a5fa", active: true },
                { phase: "02", name: "PYQ MASTERY", dates: "Jan 1 – Feb 28, 2027", days: "Day 214–273", desc: "Chapter-wise PYQs • Pattern recognition", color: "#a78bfa", active: false },
                { phase: "03", name: "MOCK PEAK", dates: "Mar 1 – May 27, 2027", days: "Day 274–360", desc: "33 full mocks • 3-hour analysis each", color: "#f59e0b", active: false },
              ].map((p, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14, marginBottom: i < 2 ? 16 : 0, alignItems: "flex-start",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: p.active ? p.color : "#1e2433",
                      border: `2px solid ${p.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 900, color: p.active ? "#000" : p.color,
                      flexShrink: 0,
                    }}>{p.phase}</div>
                    {i < 2 && <div style={{ width: 2, height: 28, background: "#1e2433", marginTop: 4 }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: p.active ? p.color : "#475569" }}>{p.name}</span>
                      {p.active && <span style={{ fontSize: 9, background: `${p.color}22`, color: p.color, padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>ACTIVE</span>}
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{p.dates} • {p.days}</div>
                    <div style={{ fontSize: 11, color: "#334155", marginTop: 2 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rank predictor */}
            <div style={{ background: "#0d1117", border: "1px solid #1e2433", borderRadius: 16, padding: "20px 16px" }}>
              <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, fontWeight: 700, marginBottom: 14 }}>
                JEE MAIN RANK PREDICTOR
              </div>
              {MOCK_MILESTONES.map((m, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{m.score}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{m.rank}</span>
                    <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700 }}>{m.pct}%</span>
                  </div>
                  <div style={{ background: "#1e2433", borderRadius: 4, height: 6 }}>
                    <div style={{
                      width: `${m.pct}%`, height: "100%", borderRadius: 4,
                      background: `linear-gradient(90deg, #f59e0b, #f97316)`,
                      transition: "width 1s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ CHAPTERS ═══════════ */}
        {tab === "chapters" && (
          <div>
            {[
              { label: "⚡ Physics", chapters: PHYSICS_CHAPTERS, done: phyDone, set: setPhyDone, color: "#60a5fa", pct: phyPct },
              { label: "🧪 Chemistry", chapters: CHEMISTRY_CHAPTERS, done: chemDone, set: setChemDone, color: "#f472b6", pct: chemPct },
              { label: "∑ Mathematics", chapters: MATHS_CHAPTERS, done: mathDone, set: setMathDone, color: "#a78bfa", pct: mathPct },
            ].map(sub => (
              <div key={sub.label} style={{
                background: "#0d1117", border: "1px solid #1e2433",
                borderRadius: 16, padding: "18px 14px", marginBottom: 20,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: sub.color }}>{sub.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: sub.color }}>{sub.pct}% done</span>
                </div>
                <div style={{ background: "#1e2433", borderRadius: 4, height: 5, marginBottom: 14 }}>
                  <div style={{ width: `${sub.pct}%`, height: "100%", borderRadius: 4, background: sub.color, transition: "width 0.5s" }} />
                </div>
                {sub.chapters.map((ch, i) => (
                  <ChapterRow key={i} ch={ch} idx={i}
                    done={!!sub.done[i]}
                    onToggle={() => sub.set(d => ({ ...d, [i]: !d[i] }))}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ═══════════ MOCKS ═══════════ */}
        {tab === "mocks" && (
          <div>
            <div style={{
              background: "#0d1117", border: "1px solid #1e2433",
              borderRadius: 16, padding: "18px 14px", marginBottom: 16,
            }}>
              <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, fontWeight: 700, marginBottom: 14 }}>
                MOCK TEST LOG — 33 TOTAL
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 1fr 1fr 1fr", gap: "0 8px", marginBottom: 8 }}>
                {["#", "PHY", "CHEM", "MATH", "TOTAL", "ACC%"].map(h => (
                  <div key={h} style={{ fontSize: 9, color: "#334155", fontWeight: 700, letterSpacing: 1, textAlign: "center", paddingBottom: 6, borderBottom: "1px solid #1e2433" }}>{h}</div>
                ))}
              </div>
              {mockLog.slice(0, 15).map((row, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "28px 1fr 1fr 1fr 1fr 1fr",
                  gap: "0 6px", marginBottom: 6, alignItems: "center",
                }}>
                  <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, textAlign: "center" }}>{i + 1}</div>
                  {["p", "c", "m", "total", "accuracy"].map(k => (
                    <input key={k}
                      value={row[k] || ""}
                      onChange={e => {
                        const updated = [...mockLog];
                        updated[i] = { ...updated[i], [k]: e.target.value };
                        setMockLog(updated);
                      }}
                      placeholder="—"
                      style={{
                        background: "#0a0f1e", border: "1px solid #1e2433",
                        borderRadius: 6, padding: "5px 4px", fontSize: 11,
                        color: "#e2e8f0", textAlign: "center", width: "100%",
                        outline: "none", fontFamily: "monospace",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div style={{ background: "#0d1117", border: "1px solid #1e2433", borderRadius: 16, padding: "18px 14px" }}>
              <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, fontWeight: 700, marginBottom: 14 }}>EXAM MILESTONES</div>
              {[
                { date: "Jan 2027", label: "JEE Main Session 1", color: "#60a5fa" },
                { date: "Apr 2027", label: "JEE Main Session 2", color: "#a78bfa" },
                { date: "Apr 2027", label: "BITSAT", color: "#34d399" },
                { date: "May 2027", label: "JEE Advanced", color: "#f59e0b" },
              ].map((e, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 3 ? 14 : 0, alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: e.color, flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: e.color }}>{e.label}</span>
                    <span style={{ fontSize: 11, color: "#475569", marginLeft: 8 }}>{e.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ TOP 10 ═══════════ */}
        {tab === "top10" && (
          <div>
            <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>
              RANK-DECIDING CHAPTERS
            </div>
            {TOP10.map((t) => (
              <div key={t.rank} style={{
                background: "#0d1117", border: "1px solid #1e2433",
                borderRadius: 12, padding: "14px 16px", marginBottom: 10,
                display: "flex", gap: 14, alignItems: "center",
                borderLeft: `3px solid ${subColor[t.sub]}`,
              }}>
                <div style={{
                  fontSize: 22, fontWeight: 900, color: t.rank <= 3 ? "#f59e0b" : "#334155",
                  minWidth: 36, fontFamily: "monospace", lineHeight: 1,
                }}>{String(t.rank).padStart(2, "0")}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#e2e8f0" }}>{t.chapter}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 3 }}>{t.note}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: subColor[t.sub] }}>{t.sub}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#f59e0b", lineHeight: 1.2 }}>{t.hrs}</div>
                  <div style={{ fontSize: 9, color: "#475569" }}>hrs</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════ RULES ═══════════ */}
        {tab === "rules" && (
          <div>
            <div style={{ fontSize: 11, color: "#475569", letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>
              10 NON-NEGOTIABLE RULES
            </div>
            {RULES.map((r, i) => (
              <div key={i} style={{
                background: "#0d1117", border: "1px solid #1e2433",
                borderRadius: 12, padding: "14px 16px", marginBottom: 10,
                display: "flex", gap: 14,
              }}>
                <div style={{
                  fontSize: 20, fontWeight: 900, color: "#f59e0b",
                  fontFamily: "monospace", minWidth: 30, lineHeight: 1.2,
                }}>{r.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#e2e8f0", marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{r.body}</div>
                </div>
              </div>
            ))}

            {/* Commitment block */}
            <div style={{
              marginTop: 24,
              background: "linear-gradient(135deg, #0f172a, #0a0f1e)",
              border: "1px solid #f59e0b33",
              borderRadius: 16, padding: "24px 20px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 11, color: "#f59e0b", letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>
                COMMITMENT DECLARATION
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.9 }}>
                I will show up every single day,<br />
                regardless of motivation.<br />
                I will trust consistency over intensity.<br />
                I will focus on execution, not perfection.
              </div>
              <div style={{
                marginTop: 20, padding: "12px 20px",
                background: "#f59e0b", borderRadius: 8,
                fontSize: 13, fontWeight: 900, color: "#000", letterSpacing: 1,
              }}>
                SUBRAHMANYESWARA RAO • OBC-NCL • TELANGANA
              </div>
              <div style={{ fontSize: 11, color: "#334155", marginTop: 10 }}>
                Jun 1, 2026 → May 2027 • 360 Days • 68 Chapters • 12 Hrs/Day
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
