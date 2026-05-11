// Govt Console — NEAR v0.7 — 시군구 진단·시뮬레이션·처방 (가중치판)

const GovtScreen = ({ goto }) => {
  const D = window.CARE_DATA;
  const { TOK, PILLAR_COLOR, QUADRANT_COLOR, Pill, Btn, Card, PillarRow, Radar, QuadrantBadge } = window.UI;
  const items = D.items;

  // 기본: 사분면 IV (돌봄위기) 중에서 한 곳
  const defaultRegion = React.useMemo(() => {
    const crisis = items.filter(r => r.quadrant === "IV");
    return crisis.length ? crisis[Math.floor(crisis.length / 2)] : items[0];
  }, [items]);

  const [regionId, setRegionId] = React.useState(defaultRegion?.code || items[0]?.code);
  const [stage, setStage] = React.useState("diagnose");
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [adjust, setAdjust] = React.useState({ N: 0, E: 0, A: 0, R: 0 });

  const region = D.byId(regionId) || items[0];
  if (!region) return <div style={{ padding: 80, fontFamily: TOK.body }}>로딩...</div>;

  const baseDims = { N: region.N, E: region.E, A: region.A, R: region.R };
  const baseScore = region.NEAR_A;
  const baseRank = region.rank;

  // 시뮬: NEAR_A = clip( 0.45*R + 0.30*A + 0.25*E - 0.6*N + 50, 0, 100 )  (v0.7 가중치판)
  const simDims = {};
  D.PILLARS.forEach(p => { simDims[p] = Math.max(0, Math.min(100, baseDims[p] + adjust[p])); });
  // v0.7 가중치판: 0.45R + 0.30A + 0.25E - 0.6N + 50
  const simWeighted = 0.45 * simDims.R + 0.30 * simDims.A + 0.25 * simDims.E;
  const simScore = +Math.max(0, Math.min(100, simWeighted - 0.6 * simDims.N + 50)).toFixed(1);
  const simRank = items.filter(r => r.NEAR_A > simScore && r.code !== region.code).length + 1;

  // 강·약 (E·A·R 중)
  const ear = ["E", "A", "R"].sort((a, b) => baseDims[b] - baseDims[a]);
  const top1 = ear[0], bot1 = ear[2], bot2 = ear[1];

  const RX = {
    N: { tag: "수요 처방", action: "취약 어르신 발굴·예측 시스템", cost: "약 4억원/년", impact: "수요 정밀화", priority: "중" },
    E: { tag: "결속 처방", action: "협동조합·지역화폐·민관협력 강화", cost: "약 6억원/년", impact: "+7점", priority: "중" },
    A: { tag: "접근 처방", action: "이동돌봄·디지털·노후주택 정비", cost: "약 12억원/년", impact: "+8점", priority: "상" },
    R: { tag: "자원 처방", action: "통합돌봄 본사업 확대 + 시설·인력 확충", cost: "약 35억원/3년", impact: "+10점", priority: "상" },
  };
  const rxList = [bot1, bot2].map(p => ({ pillar: p, ...RX[p] }));

  const stageDef = [
    { key: "diagnose", label: "1. 진단", color: PILLAR_COLOR.A },
    { key: "sim", label: "2. 시뮬레이션", color: TOK.yellow },
    { key: "rx", label: "3. 처방", color: PILLAR_COLOR.R },
  ];

  const isCrisis = region.quadrant === "IV";

  return (
    <div style={{ background: TOK.paper, minHeight: "calc(100vh - 70px)", padding: "32px 56px 80px" }}>
      <Pill bg={TOK.ink} fg="#fff">지자체 콘솔</Pill>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 8, marginBottom: 20 }}>
        <h1 style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 72, letterSpacing: -2.5, lineHeight: 0.95, margin: 0 }}>
          우리 동네 처방전
        </h1>
        <div onClick={() => setPickerOpen(true)} style={{ cursor: "pointer", textAlign: "right" }}>
          <div style={{ fontFamily: TOK.body, fontSize: 12, color: TOK.muted }}>분석 대상</div>
          <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 28 }}>{region.full} ▾</div>
          <div style={{ marginTop: 4 }}><QuadrantBadge quadrant={region.quadrant} label={region.quadrantLabel?.split(" (")[0]} /></div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {stageDef.map(s => (
          <button key={s.key} onClick={() => setStage(s.key)} style={{
            flex: 1, padding: "16px 20px",
            background: stage === s.key ? s.color : "#fff",
            color: stage === s.key ? "#fff" : TOK.ink,
            border: "2px solid #1a1a1a", borderRadius: 14,
            fontFamily: TOK.display, fontWeight: 300, fontSize: 22, cursor: "pointer", textAlign: "left",
            boxShadow: stage === s.key ? "4px 4px 0 #1a1a1a" : "2px 2px 0 #1a1a1a",
          }}>{s.label}</button>
        ))}
      </div>

      {stage === "diagnose" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Card bg={isCrisis ? "#FF5A4E" : PILLAR_COLOR.A} style={{ color: "#fff", padding: 24 }}>
            <div style={{ fontFamily: TOK.body, fontSize: 13, opacity: 0.9 }}>NEAR_A · 종합점수</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 132, lineHeight: 0.85, letterSpacing: -4 }}>{baseScore.toFixed(1)}</div>
            <div style={{ display: "flex", gap: 24, marginTop: 12, fontFamily: TOK.body, fontSize: 14, flexWrap: "wrap" }}>
              <div>등급 <b style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{D.gradeFor(baseScore)}</b></div>
              <div>전국 <b style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{baseRank}</b> / {items.length}</div>
              <div>사분면 <b style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{region.quadrant}</b></div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
              <Radar dims={baseDims} color="#fff" size={210} label />
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 14, fontFamily: TOK.body, fontSize: 13, opacity: 0.9 }}>
              <div>통합돌봄 <b>{region.IC_total}</b>건</div>
              <div>만명당 <b>{region.IC_per10k}</b></div>
              <div>특화 <b>{region.IC_special}</b></div>
            </div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card bg={PILLAR_COLOR[top1]} style={{ color: "#fff" }}>
              <div style={{ fontFamily: TOK.body, fontSize: 13, opacity: 0.9 }}>STRENGTH · 강한 자원 축</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 28 }}>{top1} · {D.PILLAR_KO[top1]}</span>
                <span style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 36 }}>{baseDims[top1]?.toFixed(1)}</span>
              </div>
              <div style={{ fontFamily: TOK.body, fontSize: 12, marginTop: 6, opacity: 0.95 }}>{D.PILLAR_DESC[top1]}</div>
            </Card>
            <Card bg="#FFE0DC">
              <div style={{ fontFamily: TOK.body, fontSize: 13 }}>WEAKNESS · 우선 보완 (하위 2)</div>
              {[bot1, bot2].map(p => (
                <div key={p} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                  <span style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{p} · {D.PILLAR_KO[p]}</span>
                  <span style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 28 }}>{baseDims[p]?.toFixed(1)}</span>
                </div>
              ))}
            </Card>
            <Card>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 18, marginBottom: 8 }}>4축 점수</div>
              {D.PILLARS.map(p => <PillarRow key={p} pillar={p} value={baseDims[p]} />)}
            </Card>
            <Card style={{ borderColor: TOK.yellow, background: "rgba(255,210,63,0.15)" }}>
              <div style={{ fontFamily: TOK.body, fontSize: 12, color: TOK.muted }}>사분면 권장 정책</div>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, marginTop: 4 }}>{region.quadrantLabel}</div>
              <div style={{ fontFamily: TOK.body, fontSize: 14, marginTop: 4 }}>{D.QUADRANTS[region.quadrant]?.policy}</div>
            </Card>
          </div>
        </div>
      )}

      {stage === "sim" && (
        <div>
          <Card bg={TOK.yellow} style={{ padding: 22, marginBottom: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: 24, alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: TOK.body, fontSize: 13 }}>현재</div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 80, lineHeight: 0.9 }}>{baseScore.toFixed(1)}</div>
                <div style={{ fontFamily: TOK.body, fontSize: 13 }}>전국 {baseRank}위</div>
              </div>
              <div style={{ textAlign: "center", fontFamily: TOK.display, fontWeight: 300, fontSize: 56, color: TOK.ink }}>→</div>
              <div>
                <div style={{ fontFamily: TOK.body, fontSize: 13 }}>예상 (시뮬)</div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 80, lineHeight: 0.9, color: simScore > baseScore ? "#06A877" : TOK.ink }}>
                  {simScore.toFixed(1)}
                  {simScore !== baseScore && (
                    <span style={{ fontSize: 22, marginLeft: 8 }}>{simScore > baseScore ? "↑" : "↓"}{Math.abs(simScore - baseScore).toFixed(1)}</span>
                  )}
                </div>
                <div style={{ fontFamily: TOK.body, fontSize: 13 }}>전국 {simRank}위 ({simRank < baseRank ? `▲${baseRank - simRank}` : simRank > baseRank ? `▼${simRank - baseRank}` : "—"})</div>
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, marginBottom: 8 }}>NEAR 4축 조정 (-30 ~ +30)</div>
            <div style={{ fontFamily: TOK.body, fontSize: 13, color: TOK.muted, marginBottom: 16 }}>
              N은 욕구 — 양수일수록 부담 증가 (페널티). E/A/R은 자원 — 양수일수록 정책 효과.
            </div>
            {D.PILLARS.map(p => (
              <div key={p} style={{ display: "grid", gridTemplateColumns: "150px 60px 1fr 60px 70px", gap: 12, alignItems: "center", padding: "8px 0", fontFamily: TOK.body }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 10, height: 10, background: PILLAR_COLOR[p], border: "1.5px solid #1a1a1a", borderRadius: 5 }} />
                  <span style={{ fontWeight: 600 }}>{p} · {D.PILLAR_KO[p]}</span>
                </div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 18, color: TOK.muted }}>{baseDims[p]?.toFixed(1)}</div>
                <input type="range" min="-30" max="30" step="1" value={adjust[p]} onChange={(e) => setAdjust({ ...adjust, [p]: +e.target.value })}
                  style={{ width: "100%", accentColor: PILLAR_COLOR[p] }} />
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 18, textAlign: "right", color: adjust[p] > 0 ? "#06A877" : adjust[p] < 0 ? "#FF5A4E" : TOK.muted }}>
                  {adjust[p] > 0 ? "+" : ""}{adjust[p]}
                </div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 18, textAlign: "right" }}>→ {simDims[p]?.toFixed(1)}</div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Btn onClick={() => setAdjust({ N: 0, E: 0, A: 0, R: 0 })}>초기화</Btn>
              <Btn onClick={() => { const a = {...adjust}; [bot1, bot2].forEach(p => a[p] = 12); setAdjust(a); }}>약점 +12 자동</Btn>
              <Btn primary onClick={() => setStage("rx")}>처방 보기 →</Btn>
            </div>
          </Card>
        </div>
      )}

      {stage === "rx" && (
        <div>
          <Card bg={PILLAR_COLOR.R} style={{ color: "#fff", padding: 22, marginBottom: 14 }}>
            <div style={{ fontFamily: TOK.body, fontSize: 13, opacity: 0.9 }}>RECOMMENDED · 추천 처방 패키지</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 36, lineHeight: 1.05, marginTop: 4 }}>
              {region.full} 맞춤 정책 {rxList.length}건
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 14, fontFamily: TOK.body, fontSize: 14, flexWrap: "wrap" }}>
              <div>사분면 <b style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 20 }}>{region.quadrant}</b></div>
              <div>방향 <b style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 18 }}>{D.QUADRANTS[region.quadrant]?.policy}</b></div>
            </div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rxList.map((rx, i) => (
              <Card key={i} style={{ padding: 22, display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 20, alignItems: "center" }}>
                <div style={{ width: 56, height: 56, background: PILLAR_COLOR[rx.pillar], border: "2px solid #1a1a1a", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: TOK.display, fontWeight: 300, fontSize: 28, color: "#fff" }}>{rx.pillar}</div>
                <div>
                  <Pill bg="#fff" style={{ fontSize: 11 }}>{rx.tag} · 우선순위 {rx.priority}</Pill>
                  <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 24, marginTop: 6 }}>{rx.action}</div>
                  <div style={{ fontFamily: TOK.body, fontSize: 13, color: TOK.muted, marginTop: 4 }}>
                    {D.PILLAR_KO[rx.pillar]} {baseDims[rx.pillar]?.toFixed(1)} → 보완 권장
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 18 }}>{rx.cost}</div>
                  <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 32, color: "#06A877", lineHeight: 1 }}>{rx.impact}</div>
                </div>
              </Card>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Btn onClick={() => setStage("sim")}>← 시뮬 다시</Btn>
            <Btn primary>처방전 PDF 출력</Btn>
          </div>
        </div>
      )}

      {pickerOpen && (
        <window.RegionPicker onClose={() => setPickerOpen(false)} onPick={(id) => { setRegionId(id); setPickerOpen(false); }} />
      )}
    </div>
  );
};

window.GovtScreen = GovtScreen;
