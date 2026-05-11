// Detail + Ranking — NEAR v0.7 (N·R·A·E + 4사분면 + 통합돌봄 sub-pillar, 가중치판)

const DetailScreen = ({ regionId, goto }) => {
  const D = window.CARE_DATA;
  const { TOK, PILLAR_COLOR, QUADRANT_COLOR, Pill, Btn, Card, PillarRow, Radar, Bar, QuadrantBadge } = window.UI;
  const region = D.byId(regionId) || D.items[0];
  if (!region) return <div style={{ padding: 80, fontFamily: TOK.body }}>로딩...</div>;

  const score = region.NEAR_A;
  const grade = D.gradeFor(score);
  const dims = { N: region.N, E: region.E, A: region.A, R: region.R };

  // E·A·R 중에서 강/약 (자원 축들 — 높을수록 좋음)
  const ear = ["E", "A", "R"].sort((a, b) => dims[b] - dims[a]);
  const top1 = ear[0];
  const bot1 = ear[2];

  // 같은 사분면 이웃
  const neighbors = D.items.filter(r => r.quadrant === region.quadrant && r.code !== region.code)
    .sort((a, b) => Math.abs(a.NEAR_A - region.NEAR_A) - Math.abs(b.NEAR_A - region.NEAR_A))
    .slice(0, 3);
  const allCount = D.items.length;

  const qColor = QUADRANT_COLOR[region.quadrant];
  const isCrisis = region.quadrant === "IV";
  const policy = D.QUADRANTS[region.quadrant]?.policy || "";

  return (
    <div style={{ background: TOK.paper, minHeight: "calc(100vh - 70px)", padding: "32px 56px 80px" }}>
      <button onClick={() => goto("home")} style={{ background: "none", border: "none", fontFamily: TOK.body, fontSize: 14, color: TOK.muted, cursor: "pointer", marginBottom: 16 }}>← 돌아가기</button>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32 }}>
        <Card bg={TOK.yellow} style={{ padding: 32, boxShadow: "6px 6px 0 #1a1a1a" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <QuadrantBadge quadrant={region.quadrant} label={region.quadrantLabel?.split(" (")[0]} />
            <Pill>{region.sido}</Pill>
            <Pill bg="#fff">{region.type}</Pill>
            {region.issuer && <Pill bg={PILLAR_COLOR.E} fg="#fff">지역화폐</Pill>}
          </div>
          <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 64, lineHeight: 0.95, letterSpacing: -2 }}>{region.name}</div>
          <div style={{ fontFamily: TOK.body, fontSize: 13, color: TOK.muted, marginTop: 4 }}>{region.full} · 코드 {region.code}</div>
          <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 180, lineHeight: 0.85, letterSpacing: -8, marginTop: 16 }}>{score.toFixed(1)}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 8 }}>
            <span style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 48 }}>{grade}</span>
            <span style={{ fontFamily: TOK.body, fontSize: 16 }}>전국 {region.rank} / {allCount}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
            <Radar dims={dims} color="#1a1a1a" size={240} label />
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, marginBottom: 10 }}>N·E·A·R 4축 점수</div>
            {D.PILLARS.map(p => <PillarRow key={p} pillar={p} value={dims[p]} />)}
            <div style={{ marginTop: 12, padding: "10px 12px", background: "#FAF7F0", border: "1.5px solid #1a1a1a", borderRadius: 10, fontFamily: TOK.body, fontSize: 13, lineHeight: 1.55 }}>
              <div>Resource (E·A·R 평균): <b>{region.resource?.toFixed(1)}</b></div>
              <div>NEAR_A = ({region.resource?.toFixed(1)}) − 0.5×{region.N.toFixed(1)} + 50 = <b>{region.NEAR_A.toFixed(1)}</b></div>
            </div>
          </Card>

          <Card style={{ padding: 18 }}>
            <div style={{ fontFamily: TOK.body, fontSize: 12, color: TOK.muted, marginBottom: 8 }}>SUB-PILLAR · 세부 분해</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontFamily: TOK.body, fontSize: 13 }}>
              <div style={{ padding: "8px 10px", border: `1.5px solid ${PILLAR_COLOR.R}`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: TOK.muted }}>R_KCCI (60%)</div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{region.R_KCCI ?? "—"}</div>
                <div style={{ fontSize: 10, color: TOK.muted }}>공식+비공식 자원</div>
              </div>
              <div style={{ padding: "8px 10px", border: `1.5px solid ${PILLAR_COLOR.R}`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: TOK.muted }}>통합돌봄 (40%)</div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{region.R3_integratedCare ?? "—"}</div>
                <div style={{ fontSize: 10, color: TOK.muted }}>{region.IC_total}건 · 만명당 {region.IC_per10k}</div>
              </div>
              <div style={{ padding: "8px 10px", border: `1.5px solid ${PILLAR_COLOR.E}`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: TOK.muted }}>E3 (협동조합·지역화폐)</div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{region.E3 ?? "—"}</div>
              </div>
              <div style={{ padding: "8px 10px", border: `1.5px solid ${PILLAR_COLOR.E}`, borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: TOK.muted }}>지역사랑상품권</div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{region.E3b_localCurrency ?? "—"}</div>
                <div style={{ fontSize: 10, color: TOK.muted }}>{region.issuer ? "발행 ●" : "미발행"}</div>
              </div>
            </div>
          </Card>

          <Card bg={PILLAR_COLOR[top1]} style={{ color: "#fff" }}>
            <div style={{ fontFamily: TOK.body, fontSize: 13, opacity: 0.9 }}>STRENGTH · 가장 강한 자원 축</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 32, lineHeight: 1.1, marginTop: 4 }}>
              {top1} · {D.PILLAR_KO[top1]} <span style={{ fontSize: 22, opacity: 0.85 }}>{dims[top1]?.toFixed(1)}점</span>
            </div>
            <div style={{ fontFamily: TOK.body, fontSize: 13, marginTop: 6, opacity: 0.95 }}>{D.PILLAR_DESC[top1]}</div>
          </Card>

          <Card bg="#FFE0DC">
            <div style={{ fontFamily: TOK.body, fontSize: 13 }}>WEAKNESS · 가장 약한 자원 축</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 32, lineHeight: 1.1, marginTop: 4 }}>
              {bot1} · {D.PILLAR_KO[bot1]} <span style={{ fontSize: 22 }}>{dims[bot1]?.toFixed(1)}점</span>
            </div>
            <div style={{ fontFamily: TOK.body, fontSize: 13, marginTop: 6 }}>{D.PILLAR_DESC[bot1]} → 보완 영역</div>
          </Card>

          <Card bg={isCrisis ? qColor : "#fff"} style={{ borderColor: qColor, color: isCrisis ? "#fff" : "inherit" }}>
            <div style={{ fontFamily: TOK.body, fontSize: 12, opacity: isCrisis ? 0.8 : 0.6 }}>POLICY · 권장 정책 방향</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, marginTop: 4, lineHeight: 1.3 }}>{policy}</div>
          </Card>

          {neighbors.length > 0 && (
            <Card>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 18, marginBottom: 10 }}>같은 사분면 ({region.quadrant})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {neighbors.map(n => (
                  <div key={n.code} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, alignItems: "center", padding: "8px 10px", border: "1.5px solid #1a1a1a", borderRadius: 10, cursor: "pointer", fontFamily: TOK.body }}
                    onClick={() => goto("detail", { id: n.code })}>
                    <span style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 17 }}>{n.full}</span>
                    <span style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 17 }}>{n.NEAR_A.toFixed(1)}</span>
                    <Pill style={{ fontSize: 11 }}>#{n.rank}</Pill>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const RankingScreen = ({ goto }) => {
  const D = window.CARE_DATA;
  const { TOK, PILLAR_COLOR, QUADRANT_COLOR, Pill, Card, Bar, QuadrantBadge } = window.UI;
  const items = D.rank();
  const [provFilter, setProvFilter] = React.useState("");
  const [quadFilter, setQuadFilter] = React.useState("");

  const provinces = [...new Set(items.map(r => r.sido))].sort();
  const quads = ["I", "II", "III", "IV"];

  const filtered = items.filter(r =>
    (!provFilter || r.sido === provFilter) &&
    (!quadFilter || r.quadrant === quadFilter)
  );

  const gradeColor = (g) => g.startsWith("A") ? PILLAR_COLOR.R : g.startsWith("B") ? TOK.yellow : g.startsWith("C") ? "#fff" : "#FF8FB1";

  return (
    <div style={{ background: TOK.paper, minHeight: "calc(100vh - 70px)", padding: "48px 56px 80px" }}>
      <Pill bg={TOK.ink} fg="#fff">RANKING</Pill>
      <h1 style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 80, letterSpacing: -2.5, lineHeight: 0.95, margin: "12px 0 24px" }}>
        전국 시군구 순위 ({filtered.length})
      </h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center", fontFamily: TOK.body, fontSize: 14 }}>
        <span>광역</span>
        <select value={provFilter} onChange={e => setProvFilter(e.target.value)} style={{ padding: "6px 12px", border: "2px solid #1a1a1a", borderRadius: 999, fontFamily: TOK.body, fontSize: 14 }}>
          <option value="">전체</option>
          {provinces.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <span>사분면</span>
        <select value={quadFilter} onChange={e => setQuadFilter(e.target.value)} style={{ padding: "6px 12px", border: "2px solid #1a1a1a", borderRadius: 999, fontFamily: TOK.body, fontSize: 14 }}>
          <option value="">전체</option>
          {quads.map(q => <option key={q} value={q}>{q} · {D.QUADRANTS[q].label}</option>)}
        </select>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1.4fr 90px 80px 1.6fr 130px", gap: 12, padding: "12px 18px", background: TOK.ink, color: "#fff", fontFamily: TOK.body, fontSize: 13, fontWeight: 600 }}>
          <div>순위</div>
          <div>지역</div>
          <div style={{ textAlign: "right" }}>NEAR_A</div>
          <div style={{ textAlign: "center" }}>등급</div>
          <div>N·R·A·E</div>
          <div>사분면</div>
        </div>
        <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {filtered.map(r => (
            <div key={r.code} onClick={() => goto("detail", { id: r.code })} style={{
              display: "grid", gridTemplateColumns: "60px 1.4fr 90px 80px 1.6fr 130px", gap: 12,
              padding: "12px 18px", borderBottom: "1px solid #e8e3d8",
              cursor: "pointer", alignItems: "center",
              background: r.rank <= 3 ? "rgba(255,210,63,0.18)" : r.quadrant === "IV" ? "rgba(255,90,78,0.04)" : "transparent",
              fontFamily: TOK.body,
            }}>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, color: r.rank <= 3 ? PILLAR_COLOR.A : TOK.muted }}>{r.rank}</div>
              <div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 18 }}>{r.full}</div>
                <div style={{ fontSize: 10, color: TOK.muted }}>{r.type} · 통합돌봄 {r.IC_total}건</div>
              </div>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, textAlign: "right" }}>{r.NEAR_A.toFixed(1)}</div>
              <div style={{ textAlign: "center" }}>
                <Pill bg={gradeColor(D.gradeFor(r.NEAR_A))} fg={D.gradeFor(r.NEAR_A).startsWith("A") ? "#fff" : TOK.ink} style={{ fontSize: 12 }}>{D.gradeFor(r.NEAR_A)}</Pill>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {D.PILLARS.map(p => (
                  <div key={p} style={{ flex: 1 }} title={`${p} ${r[p]?.toFixed(1)}`}>
                    <Bar value={r[p]} color={PILLAR_COLOR[p]} />
                  </div>
                ))}
              </div>
              <div>
                <QuadrantBadge quadrant={r.quadrant} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ marginTop: 16, display: "flex", gap: 14, fontFamily: TOK.body, fontSize: 13, flexWrap: "wrap" }}>
        {D.PILLARS.map(p => (
          <div key={p} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 14, height: 14, background: PILLAR_COLOR[p], border: "1.5px solid #1a1a1a", borderRadius: 4 }} />
            {p} · {D.PILLAR_KO[p]}
          </div>
        ))}
      </div>
    </div>
  );
};

window.DetailScreen = DetailScreen;
window.RankingScreen = RankingScreen;
