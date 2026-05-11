// Shared UI primitives — NEAR v0.7 (N·R·A·E 가중치판)

const TOK = {
  paper: "var(--paper, #FAF7F0)",
  ink: "#1a1a1a",
  inkSoft: "#3a3a3a",
  muted: "#6b6b6b",
  line: "#e8e3d8",
  card: "#ffffff",
  red: "var(--c-red, #FF5A4E)",
  yellow: "var(--c-yellow, #FFD23F)",
  blue: "var(--c-blue, #4E8CFF)",
  green: "var(--c-green, #5CC97A)",
  pink: "var(--c-pink, #FF8FB1)",
  purple: "var(--c-purple, #B383E8)",
  display: "'Pretendard', 'Gowun Batang', serif",
  body: "'Pretendard', 'Gowun Dodum', system-ui, sans-serif",
  serif: "'IBM Plex Serif', serif",
};

// NEAR pillar colors — N→E→A→R 순서
const PILLAR_COLOR = {
  N: "#5E60CE", // 보라 — Needs (욕구)
  E: "#C44569", // 자홍 — Engagement (결속)
  A: "#E8801E", // 주황 — Access (접근)
  R: "#06A877", // 초록 — Resources (자원)
};

const QUADRANT_COLOR = {
  I:   "#06A877", // 초록 — 균형선진
  II:  "#4E8CFF", // 파랑 — 안정자원
  III: "#9CA3AF", // 회색 — 일반저욕구
  IV:  "#FF5A4E", // 빨강 — 돌봄위기 ★
};

const Pill = ({ children, bg = TOK.card, fg = TOK.ink, style }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: bg, color: fg,
    border: "1.5px solid #1a1a1a",
    borderRadius: 999, padding: "3px 12px",
    fontFamily: TOK.body, fontSize: 13, fontWeight: 600,
    ...style,
  }}>{children}</span>
);

const Btn = ({ children, primary, onClick, style }) => (
  <button onClick={onClick} style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    background: primary ? TOK.ink : TOK.card,
    color: primary ? "#fff" : TOK.ink,
    border: "2px solid #1a1a1a",
    borderRadius: 999, padding: "12px 22px",
    fontFamily: TOK.body, fontSize: 16, fontWeight: 600,
    cursor: "pointer",
    boxShadow: "3px 3px 0 #1a1a1a",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    ...style,
  }} onMouseDown={(e) => { e.currentTarget.style.transform = "translate(2px,2px)"; e.currentTarget.style.boxShadow = "1px 1px 0 #1a1a1a"; }}
     onMouseUp={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "3px 3px 0 #1a1a1a"; }}
     onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "3px 3px 0 #1a1a1a"; }}>
    {children}
  </button>
);

const Card = ({ children, bg, style, padding = 20 }) => (
  <div style={{
    background: bg || TOK.card,
    border: "2px solid #1a1a1a",
    borderRadius: 16,
    padding,
    ...style,
  }}>{children}</div>
);

const Bar = ({ value, color, max = 100 }) => (
  <div style={{ position: "relative", height: 14, background: "#f3efe5", border: "1.5px solid #1a1a1a", borderRadius: 7, overflow: "hidden" }}>
    <div style={{
      width: `${Math.min(100, (value / max) * 100)}%`,
      height: "100%",
      background: color,
      borderRight: value < max ? "1.5px solid #1a1a1a" : "none",
      transition: "width 600ms cubic-bezier(0.2, 0.9, 0.2, 1)",
    }} />
  </div>
);

const PillarRow = ({ pillar, value, label, sub }) => {
  const D = window.CARE_DATA;
  const isN = pillar === "N";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 50px", gap: 12, alignItems: "center", padding: "6px 0", fontFamily: TOK.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 10, height: 10, background: PILLAR_COLOR[pillar], border: "1.5px solid #1a1a1a", borderRadius: 5 }} />
        <span style={{ fontSize: 13, fontWeight: 500 }}>{label || `${pillar} · ${D.PILLAR_KO[pillar]}`}</span>
        {isN && <span style={{ fontSize: 10, color: "#999" }} title="composite에서 -0.5 페널티">↓ 부담</span>}
      </div>
      <Bar value={value || 0} color={PILLAR_COLOR[pillar]} />
      <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 16, textAlign: "right" }}>{Math.round(value || 0)}</div>
    </div>
  );
};

// 4-axis radar — N top, E right, A bottom, R left (N·E·A·R 순)
const Radar = ({ dims, color = TOK.blue, size = 200, label = false }) => {
  const D = window.CARE_DATA;
  const axes = ["N", "E", "A", "R"];
  const cx = size / 2, cy = size / 2, r = size / 2 - 24;
  const pts = axes.map((d, i) => {
    const a = (Math.PI * 2 * i) / 4 - Math.PI / 2;
    const v = (dims[d] || 0) / 100;
    return [cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v];
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.25, 0.5, 0.75, 1].map((g, i) => (
        <polygon key={i}
          points={axes.map((_, j) => {
            const a = (Math.PI * 2 * j) / 4 - Math.PI / 2;
            return `${cx + Math.cos(a) * r * g},${cy + Math.sin(a) * r * g}`;
          }).join(" ")}
          fill="none" stroke="#d8d2c4" strokeWidth="1" />
      ))}
      {axes.map((_, i) => {
        const a = (Math.PI * 2 * i) / 4 - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="#d8d2c4" strokeWidth="1" />;
      })}
      <polygon points={pts.map(p => p.join(",")).join(" ")} fill={color} fillOpacity="0.35" stroke={color} strokeWidth="2.5" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke={color} strokeWidth="2" />
      ))}
      {label && axes.map((d, i) => {
        const a = (Math.PI * 2 * i) / 4 - Math.PI / 2;
        const lx = cx + Math.cos(a) * (r + 16);
        const ly = cy + Math.sin(a) * (r + 16);
        return (
          <text key={d} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            style={{ fontFamily: TOK.display, fontSize: 13, fontWeight: 600, fill: PILLAR_COLOR[d] }}>
            {d} · {D.PILLAR_KO[d]}
          </text>
        );
      })}
    </svg>
  );
};

// 4사분면 산점도 — x: N (욕구), y: Resource (R+A+E)/3
const QuadrantScatter = ({ items, highlight = [], thresholds, size = 360, onPick }) => {
  const D = window.CARE_DATA;
  const padL = 50, padB = 40, padR = 16, padT = 16;
  const W = size, H = size;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  // domain — 점수는 0~100
  const xMax = 100, yMax = 100;
  const xN = thresholds?.N_median ?? 43.4;
  const yR = thresholds?.Resource_median ?? 35.7;
  const X = (v) => padL + (v / xMax) * innerW;
  const Y = (v) => padT + innerH - (v / yMax) * innerH;
  const hi = new Set(highlight);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ background: "#FAF7F0", border: "2px solid #1a1a1a", borderRadius: 12 }}>
      {/* quadrant fills */}
      <rect x={padL} y={padT} width={X(xN) - padL} height={Y(yR) - padT} fill="#4E8CFF" fillOpacity="0.06" />
      <rect x={X(xN)} y={padT} width={padL + innerW - X(xN)} height={Y(yR) - padT} fill="#06A877" fillOpacity="0.06" />
      <rect x={padL} y={Y(yR)} width={X(xN) - padL} height={padT + innerH - Y(yR)} fill="#9CA3AF" fillOpacity="0.06" />
      <rect x={X(xN)} y={Y(yR)} width={padL + innerW - X(xN)} height={padT + innerH - Y(yR)} fill="#FF5A4E" fillOpacity="0.10" />

      {/* axes */}
      <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1={padL} y1={padT} x2={padL} y2={padT + innerH} stroke="#1a1a1a" strokeWidth="1.5" />

      {/* median lines */}
      <line x1={X(xN)} y1={padT} x2={X(xN)} y2={padT + innerH} stroke="#1a1a1a" strokeDasharray="4 3" strokeWidth="1" />
      <line x1={padL} y1={Y(yR)} x2={padL + innerW} y2={Y(yR)} stroke="#1a1a1a" strokeDasharray="4 3" strokeWidth="1" />

      {/* quadrant labels */}
      <text x={(padL + X(xN)) / 2} y={padT + 18} textAnchor="middle" style={{ fontFamily: TOK.body, fontSize: 11, fill: "#4E8CFF", fontWeight: 700 }}>II 안정자원</text>
      <text x={(X(xN) + padL + innerW) / 2} y={padT + 18} textAnchor="middle" style={{ fontFamily: TOK.body, fontSize: 11, fill: "#06A877", fontWeight: 700 }}>I 균형선진</text>
      <text x={(padL + X(xN)) / 2} y={padT + innerH - 8} textAnchor="middle" style={{ fontFamily: TOK.body, fontSize: 11, fill: "#9CA3AF", fontWeight: 700 }}>III 일반저욕구</text>
      <text x={(X(xN) + padL + innerW) / 2} y={padT + innerH - 8} textAnchor="middle" style={{ fontFamily: TOK.body, fontSize: 11, fill: "#FF5A4E", fontWeight: 700 }}>IV 돌봄위기 ★</text>

      {/* axis labels */}
      <text x={padL + innerW / 2} y={H - 10} textAnchor="middle" style={{ fontFamily: TOK.body, fontSize: 12, fontWeight: 600 }}>N · 욕구 →</text>
      <text x={14} y={padT + innerH / 2} textAnchor="middle" transform={`rotate(-90, 14, ${padT + innerH / 2})`} style={{ fontFamily: TOK.body, fontSize: 12, fontWeight: 600 }}>↑ Resource (R·A·E 평균)</text>

      {/* points */}
      {items.map((r) => {
        const isHi = hi.has(r.id);
        const c = QUADRANT_COLOR[r.quadrant] || "#999";
        return (
          <g key={r.id} style={{ cursor: onPick ? "pointer" : "default" }} onClick={() => onPick && onPick(r)}>
            <circle cx={X(r.N)} cy={Y(r.resource)} r={isHi ? 6 : 2.5}
              fill={c} fillOpacity={isHi ? 1 : 0.5}
              stroke={isHi ? "#1a1a1a" : "none"} strokeWidth={isHi ? 1.5 : 0} />
            {isHi && (
              <text x={X(r.N) + 9} y={Y(r.resource) + 4} style={{ fontFamily: TOK.body, fontSize: 11, fontWeight: 700 }}>{r.name}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const QuadrantBadge = ({ quadrant, label, style }) => {
  const c = QUADRANT_COLOR[quadrant] || "#999";
  const isCrisis = quadrant === "IV";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: isCrisis ? c : "#fff",
      color: isCrisis ? "#fff" : "#1a1a1a",
      border: `2px solid ${c}`,
      borderRadius: 8, padding: "3px 10px",
      fontFamily: TOK.body, fontSize: 12, fontWeight: 700,
      ...style,
    }}>
      <span style={{ fontFamily: TOK.display, fontSize: 14, opacity: 0.9 }}>{quadrant}</span>
      {label && <span>{label}</span>}
    </span>
  );
};

const Topbar = ({ goto, current, hasDiagnosis }) => {
  const meta = window.CARE_DATA?.metadata;
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 32px", borderBottom: "2px solid #1a1a1a",
      background: TOK.paper, position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={() => goto("home")}>
        <div style={{
          width: 36, height: 36, background: TOK.yellow,
          border: "2px solid #1a1a1a", borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: TOK.display, fontWeight: 300, fontSize: 18,
        }}>C</div>
        <span style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 20, letterSpacing: -0.5 }}>CARE.INDEX</span>
        <span style={{ fontFamily: TOK.body, fontSize: 11, color: TOK.muted, padding: "2px 8px", background: "#fff", border: "1.5px solid #1a1a1a", borderRadius: 999 }}>
          NEAR {meta?.version || "v0.7"} · 229 시군구
        </span>
      </div>
      <nav style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {[
          ["home", "홈"],
          ["diagnose", "진단"],
          ["ranking", "순위"],
          ["compare", "비교"],
          ["govt", "지자체"],
        ].map(([k, label]) => (
          <button key={k} onClick={() => goto(k)} style={{
            padding: "8px 14px", border: "none", background: current === k ? TOK.ink : "transparent",
            color: current === k ? "#fff" : TOK.ink,
            fontFamily: TOK.body, fontSize: 14, fontWeight: 600, cursor: "pointer",
            borderRadius: 999,
          }}>{label}</button>
        ))}
        {hasDiagnosis && <Pill bg="#06A877" fg="#fff" style={{ marginLeft: 8 }}>진단 완료 ✓</Pill>}
      </nav>
    </div>
  );
};

window.UI = {
  TOK, PILLAR_COLOR, QUADRANT_COLOR,
  DIM_COLOR: PILLAR_COLOR, // legacy compat
  Pill, Btn, Card, Bar, PillarRow, DimRow: PillarRow,
  Radar, QuadrantScatter, QuadrantBadge, Topbar,
};
