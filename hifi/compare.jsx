// Compare — NEAR v0.7 — 3 시군구 N·R·A·E 비교 (가중치판)

const CompareScreen = ({ initialIds, goto }) => {
  const D = window.CARE_DATA;
  const { TOK, PILLAR_COLOR, QUADRANT_COLOR, Pill, Card, Bar, Radar, QuadrantBadge } = window.UI;
  const items = D.items;

  const defaultIds = React.useMemo(() => {
    if (initialIds && initialIds.length === 3) return initialIds;
    if (items.length < 3) return items.map(r => r.code);
    const sorted = [...items].sort((a,b) => b.NEAR_A - a.NEAR_A);
    return [sorted[0].code, sorted[Math.floor(sorted.length/2)].code, sorted[sorted.length-1].code];
  }, []);
  const [selected, setSelected] = React.useState(defaultIds);
  const [searchOpen, setSearchOpen] = React.useState(null);

  const regions = selected.map(id => D.byId(id) || items[0]);

  // Resource axes (R/A/E): higher better → winner = max
  // N axis: higher = burden → winner = min
  const winners = {};
  D.PILLARS.forEach(p => {
    const isN = p === "N";
    let best = isN ? Infinity : -Infinity, idx = 0;
    regions.forEach((r, i) => {
      if (isN ? r[p] < best : r[p] > best) { best = r[p]; idx = i; }
    });
    winners[p] = idx;
  });

  const cardColors = [TOK.yellow, "#A2D6FF", "#FFC2D6"];

  return (
    <div style={{ background: TOK.paper, minHeight: "calc(100vh - 70px)", padding: "32px 56px 80px" }}>
      <Pill bg={TOK.purple} fg="#fff">VERSUS</Pill>
      <h1 style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 80, letterSpacing: -2.5, lineHeight: 0.95, margin: "12px 0 24px" }}>
        나란히 보기
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {regions.map((r, i) => (
          <Card key={i} bg={cardColors[i]} style={{ padding: 22, color: TOK.ink, boxShadow: "5px 5px 0 #1a1a1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Pill bg="rgba(255,255,255,0.7)" fg={TOK.ink}>RANK #{r.rank}</Pill>
              <button onClick={() => setSearchOpen(i)} style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid #1a1a1a", borderRadius: 999, padding: "4px 10px", cursor: "pointer", fontFamily: TOK.body, fontSize: 11, fontWeight: 600, color: TOK.ink }}>변경</button>
            </div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 28, lineHeight: 1.05, marginTop: 14 }}>{r.full}</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 88, lineHeight: 0.9, letterSpacing: -3, marginTop: 8 }}>{r.NEAR_A.toFixed(1)}</div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <Radar dims={{N:r.N,E:r.E,A:r.A,R:r.R}} color={TOK.ink} size={170} />
            </div>
            <div style={{ marginTop: 8 }}>
              <QuadrantBadge quadrant={r.quadrant} label={r.quadrantLabel?.split(" (")[0]} />
            </div>
            <div style={{ fontFamily: TOK.body, fontSize: 12, marginTop: 6, opacity: 0.85 }}>통합돌봄 {r.IC_total}건 · 만명당 {r.IC_per10k}</div>
          </Card>
        ))}
      </div>

      <Card style={{ marginTop: 16, padding: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "150px repeat(3, 1fr)", gap: 0, padding: "12px 18px", background: TOK.ink, color: "#fff", fontFamily: TOK.body, fontSize: 13, fontWeight: 600 }}>
          <div>축</div>
          {regions.map((r, i) => <div key={i}>{r.name}</div>)}
        </div>
        {D.PILLARS.map(p => {
          const isN = p === "N";
          return (
            <div key={p} style={{ display: "grid", gridTemplateColumns: "150px repeat(3, 1fr)", padding: "14px 18px", borderBottom: "1px solid #e8e3d8", alignItems: "center", fontFamily: TOK.body }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                <span style={{ width: 10, height: 10, background: PILLAR_COLOR[p], border: "1.5px solid #1a1a1a", borderRadius: 5 }} />
                {p} · {D.PILLAR_KO[p]}
                {isN && <span style={{ fontSize: 10, color: TOK.muted }}>↓유리</span>}
              </div>
              {regions.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingRight: 14 }}>
                  <div style={{ flex: 1 }}><Bar value={r[p]} color={PILLAR_COLOR[p]} /></div>
                  <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 18, width: 64, textAlign: "right",
                    color: winners[p] === i ? "#FF5A4E" : TOK.ink }}>
                    {r[p]?.toFixed(1)}{winners[p] === i ? "★" : ""}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
        {/* NEAR_A 종합 */}
        <div style={{ display: "grid", gridTemplateColumns: "150px repeat(3, 1fr)", padding: "14px 18px", alignItems: "center", fontFamily: TOK.body, background: "rgba(255,210,63,0.18)" }}>
          <div style={{ fontWeight: 700 }}>NEAR_A 종합</div>
          {regions.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingRight: 14 }}>
              <div style={{ flex: 1 }}><Bar value={r.NEAR_A} color={TOK.ink} /></div>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, width: 64, textAlign: "right" }}>{r.NEAR_A?.toFixed(1)}</div>
            </div>
          ))}
        </div>
      </Card>

      {searchOpen != null && (
        <RegionPicker onClose={() => setSearchOpen(null)} onPick={(id) => {
          const next = [...selected]; next[searchOpen] = id; setSelected(next); setSearchOpen(null);
        }} />
      )}
    </div>
  );
};

const RegionPicker = ({ onClose, onPick }) => {
  const D = window.CARE_DATA;
  const { TOK } = window.UI;
  const [q, setQ] = React.useState("");
  const items = D.items;
  const filtered = q ? items.filter(r => r.full.includes(q) || r.name.includes(q)) : items.slice(0, 60);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: TOK.paper, border: "2px solid #1a1a1a", borderRadius: 16, width: 600, maxHeight: "80vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 20, borderBottom: "1.5px solid #1a1a1a" }}>
          <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 24, marginBottom: 10 }}>지역 선택</div>
          <input autoFocus placeholder="시군구 검색 (예: 강남, 시흥, 상주)" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "2px solid #1a1a1a", borderRadius: 999, fontFamily: TOK.body, fontSize: 15 }} />
        </div>
        <div style={{ overflowY: "auto", padding: 12 }}>
          {filtered.map(r => (
            <div key={r.code} onClick={() => onPick(r.code)} style={{ padding: "10px 14px", cursor: "pointer", borderRadius: 8, fontFamily: TOK.body, fontSize: 15, display: "flex", justifyContent: "space-between" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,210,63,0.3)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <span>{r.full}</span>
              <span style={{ color: TOK.muted, fontSize: 13 }}>{r.NEAR_A?.toFixed(1)} · #{r.rank} · {r.quadrant}</span>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ padding: 20, textAlign: "center", color: TOK.muted, fontFamily: TOK.body }}>결과 없음</div>}
        </div>
      </div>
    </div>
  );
};

window.CompareScreen = CompareScreen;
window.RegionPicker = RegionPicker;
