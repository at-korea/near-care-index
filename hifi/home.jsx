// Home — NEAR v0.7 (N·R·A·E + 4사분면 + 통합돌봄, 가중치판)
const HomeScreen = ({ goto }) => {
  const D = window.CARE_DATA;
  const { TOK, PILLAR_COLOR, QUADRANT_COLOR, Pill, Btn, Card, QuadrantScatter, QuadrantBadge } = window.UI;
  const items = D.items;

  if (!items || items.length === 0) {
    return <div style={{ padding: 80, fontFamily: TOK.body, textAlign: "center" }}>데이터를 불러오는 중...</div>;
  }

  const ranked = D.rank();
  const top3 = ranked.slice(0, 3);
  const meta = D.metadata;

  // 평균 (N·E·A·R 순)
  const avgPillar = { N: 0, E: 0, A: 0, R: 0 };
  items.forEach(r => { avgPillar.N += r.N; avgPillar.E += r.E; avgPillar.A += r.A; avgPillar.R += r.R; });
  Object.keys(avgPillar).forEach(k => { avgPillar[k] = +(avgPillar[k] / items.length).toFixed(1); });
  const avgNEAR = +(items.reduce((a, b) => a + b.NEAR_A, 0) / items.length).toFixed(1);

  // 사분면 분포
  const quad = D.quadrantDistribution();
  const crisisCount = quad.find(q => q.quadrant === "IV")?.count || 0;
  const leaderCount = quad.find(q => q.quadrant === "I")?.count || 0;

  // 통합돌봄 합계
  const ICTotal = items.reduce((a, b) => a + (b.IC_total || 0), 0);
  const ICAvg = +(ICTotal / items.length).toFixed(1);

  return (
    <div style={{ background: TOK.paper, minHeight: "calc(100vh - 70px)", paddingBottom: 80 }}>
      {/* HERO */}
      <section style={{ padding: "64px 56px 32px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "center" }}>
        <div>
          <Pill bg={TOK.yellow}>NEAR Care Index {meta?.version || "v0.7"} · 229 시군구 · 가중치판 (R 0.45 · A 0.30 · E 0.25 · N −0.6)</Pill>
          <h1 style={{
            fontFamily: TOK.display, fontWeight: 300, fontSize: 132, lineHeight: 0.88, letterSpacing: -5,
            margin: "20px 0 24px", color: TOK.ink,
          }}>
            가까운 돌봄,<br/>
            <span style={{ background: TOK.yellow, padding: "0 14px", display: "inline-block", border: "3px solid #1a1a1a", transform: "rotate(-1deg)" }}>가능한 돌봄</span>.
          </h1>
          <p style={{ fontFamily: TOK.body, fontSize: 19, lineHeight: 1.55, maxWidth: 580, color: TOK.inkSoft, marginBottom: 32 }}>
            <b style={{ color: PILLAR_COLOR.N }}>N</b>eeds 욕구 · <b style={{ color: PILLAR_COLOR.E }}>E</b>ngagement 결속 · <b style={{ color: PILLAR_COLOR.A }}>A</b>ccess 접근 · <b style={{ color: PILLAR_COLOR.R }}>R</b>esources 자원.<br/>
            전국 229개 시군구를 4축으로 진단하고, 4사분면으로 정책 우선순위를 분류합니다.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Btn primary onClick={() => goto("diagnose")}>진단 시작하기 →</Btn>
            <Btn onClick={() => goto("ranking")}>전국 순위 보기</Btn>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Card bg={TOK.yellow} style={{ padding: 24, transform: "rotate(2deg)", boxShadow: "6px 6px 0 #1a1a1a" }}>
            <div style={{ fontFamily: TOK.body, fontSize: 13, fontWeight: 600 }}>전국 평균 NEAR_A</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 110, lineHeight: 0.9, letterSpacing: -3, margin: "8px 0" }}>{avgNEAR}</div>
            <div style={{ fontFamily: TOK.body, fontSize: 14 }}>등급 <b>{D.gradeFor(avgNEAR)}</b> · 229개 시군구 평균</div>
          </Card>
          <Card style={{ position: "absolute", bottom: -24, right: -16, padding: 16, transform: "rotate(-3deg)", boxShadow: "4px 4px 0 #1a1a1a" }}>
            <div style={{ fontFamily: TOK.body, fontSize: 12, color: TOK.muted }}>1위</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{top3[0].full}</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 28, color: PILLAR_COLOR.R }}>{top3[0].NEAR_A.toFixed(1)}</div>
          </Card>
        </div>
      </section>

      {/* 4 PILLAR CARDS */}
      <section style={{ padding: "32px 56px" }}>
        <h2 style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 40, letterSpacing: -1, margin: "0 0 6px" }}>네 개의 돌봄 축.</h2>
        <p style={{ fontFamily: TOK.body, fontSize: 14, color: TOK.muted, margin: "0 0 20px" }}>NEAR_A = (E + A + R) / 3 − 0.5 × N + 50</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {D.PILLARS.map((p) => (
            <Card key={p} bg={PILLAR_COLOR[p]} padding={20} style={{ color: "#fff" }}>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 64, lineHeight: 1, opacity: 0.95 }}>{p}</div>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 24, lineHeight: 1.1, marginTop: 4 }}>{D.PILLAR_FULL[p].split(" · ")[1] || D.PILLAR_KO[p]}</div>
              <div style={{ fontFamily: TOK.body, fontSize: 12, marginTop: 10, lineHeight: 1.5, opacity: 0.95 }}>{D.PILLAR_DESC[p]}</div>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 36, marginTop: 14 }}>{avgPillar[p]}<span style={{ fontSize: 14, opacity: 0.7 }}>/100</span></div>
              <div style={{ fontFamily: TOK.body, fontSize: 11, marginTop: 4, opacity: 0.85 }}>{D.PILLAR_NOTE[p]}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4사분면 시각화 + 분포 */}
      <section style={{ padding: "32px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20, alignItems: "stretch" }}>
          <Card style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 26 }}>4사분면 분포</div>
              <div style={{ fontFamily: TOK.body, fontSize: 12, color: TOK.muted }}>x: 욕구 · y: 자원 평균 / 중앙값 기준</div>
            </div>
            <QuadrantScatter
              items={items}
              highlight={top3.map(r => r.id)}
              thresholds={D.thresholds ? { N_median: D.thresholds.N.median, Resource_median: D.thresholds.Resource.median } : null}
              size={420}
            />
          </Card>
          <div style={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 14 }}>
            <Card bg={TOK.ink} style={{ color: "#fff", padding: 24 }}>
              <div style={{ fontFamily: TOK.body, fontSize: 13, opacity: 0.7 }}>★ 정책 1순위</div>
              <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 36, letterSpacing: -1, lineHeight: 1.05, marginTop: 4 }}>
                돌봄위기형 (IV)
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 12 }}>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 72, color: QUADRANT_COLOR.IV, lineHeight: 1 }}>{crisisCount}</div>
                <div style={{ fontFamily: TOK.body, fontSize: 14, opacity: 0.85 }}>개 시군구 · 즉시 개입</div>
              </div>
              <div style={{ fontFamily: TOK.body, fontSize: 12, opacity: 0.7, marginTop: 8 }}>고욕구 + 자원부족 → 통합돌봄 본사업 1순위</div>
            </Card>
            <Card style={{ padding: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {quad.map((q) => (
                  <div key={q.quadrant} style={{
                    border: `2px solid ${q.color}`, borderRadius: 10, padding: "10px 12px",
                    background: q.quadrant === "IV" ? "rgba(255,90,78,0.06)" : "#fff",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, color: q.color }}>{q.quadrant}</span>
                      <span style={{ fontFamily: TOK.body, fontSize: 11, color: TOK.muted }}>{q.note}</span>
                    </div>
                    <div style={{ fontFamily: TOK.body, fontSize: 13, fontWeight: 600, marginTop: 2 }}>{q.label}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                      <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 26 }}>{q.count}</div>
                      <div style={{ fontFamily: TOK.body, fontSize: 11, color: TOK.muted }}>NEAR_A {q.avgNEAR}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 통합돌봄 + TOP3 */}
      <section style={{ padding: "32px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
          <Card bg={PILLAR_COLOR.R} style={{ color: "#fff", padding: 28 }}>
            <div style={{ fontFamily: TOK.body, fontSize: 13, opacity: 0.85 }}>2026.03 통합돌봄 본사업</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 32, letterSpacing: -0.5, lineHeight: 1.1, marginTop: 4 }}>
              전국 시군구별<br/>실제 사업 수 결합.
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 22, alignItems: "baseline" }}>
              <div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 56, lineHeight: 1 }}>{ICTotal.toLocaleString()}</div>
                <div style={{ fontFamily: TOK.body, fontSize: 12, opacity: 0.85 }}>전국 사업 건수</div>
              </div>
              <div>
                <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 36, lineHeight: 1 }}>{ICAvg}</div>
                <div style={{ fontFamily: TOK.body, fontSize: 12, opacity: 0.85 }}>시군구 평균</div>
              </div>
            </div>
            <div style={{ fontFamily: TOK.body, fontSize: 12, opacity: 0.85, marginTop: 14, lineHeight: 1.5 }}>
              R pillar = 0.6 × 기존 KCCI + 0.4 × 통합돌봄. 보건복지부 stats.json 기반.
            </div>
          </Card>
          <Card style={{ padding: 24 }}>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, marginBottom: 12 }}>NEAR_A TOP 3</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {top3.map((r, i) => (
                <div key={r.code} onClick={() => goto("detail", { id: r.code })} style={{
                  display: "grid", gridTemplateColumns: "40px 1fr auto auto", gap: 12, alignItems: "center",
                  padding: "10px 14px", border: "1.5px solid #1a1a1a", borderRadius: 12, cursor: "pointer",
                  background: i === 0 ? "rgba(255,210,63,0.18)" : "transparent",
                }}>
                  <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 32, color: i === 0 ? PILLAR_COLOR.A : TOK.muted }}>{r.rank}</div>
                  <div>
                    <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 20, lineHeight: 1.05 }}>{r.full}</div>
                    <div style={{ fontFamily: TOK.body, fontSize: 11, color: TOK.muted, marginTop: 2 }}>통합돌봄 {r.IC_total}건 · 만명당 {r.IC_per10k}</div>
                  </div>
                  <QuadrantBadge quadrant={r.quadrant} />
                  <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 24 }}>{r.NEAR_A.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "32px 56px" }}>
        <Card style={{ padding: 36, display: "flex", justifyContent: "space-between", alignItems: "center", background: PILLAR_COLOR.E, color: "#fff" }}>
          <div>
            <div style={{ fontFamily: TOK.body, fontSize: 14, opacity: 0.9 }}>나에게 맞는 동네는?</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 44, letterSpacing: -1, lineHeight: 1.1, marginTop: 4 }}>
              8문항으로 끝.<br/>나만의 NEAR 매칭.
            </div>
          </div>
          <Btn primary style={{ background: TOK.yellow, color: TOK.ink, fontSize: 18, padding: "16px 28px" }} onClick={() => goto("diagnose")}>
            진단 시작 →
          </Btn>
        </Card>
      </section>

      {/* ACADEMIC FOOTNOTE — 학술 고지 + 데이터 출처 */}
      <section style={{ padding: "48px 56px 24px", borderTop: "1px solid #e5e5e5", marginTop: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48 }}>
          {/* 좌 — 학술적 성격 안내 */}
          <div>
            <div style={{ fontFamily: TOK.body, fontSize: 11, fontWeight: 600, color: TOK.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
              About this index
            </div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 26, letterSpacing: -0.5, lineHeight: 1.2, color: TOK.ink, marginBottom: 14 }}>
              학술 연구 목적의 시범 지표입니다.
            </div>
            <p style={{ fontFamily: TOK.body, fontSize: 13, lineHeight: 1.65, color: TOK.inkSoft, margin: 0 }}>
              NEAR Care Index(v0.7 가중치판)는 공공 기초통계를 활용해 시군구 단위 돌봄역량을
              탐색적으로 시각화한 <b>연구·정책 검토용 프로토타입</b>입니다.
              개별 시군구의 실제 정책 성과나 행정 평가를 의미하지 않으며,
              산정 결과는 지표 가용성·결합 가중치에 따라 달라질 수 있습니다.
              인용·재사용 시 본 페이지의 버전(v0.7)과 산정일(2026.05)을 함께 표기해 주세요.
            </p>
          </div>

          {/* 우 — 데이터 출처 표 */}
          <div>
            <div style={{ fontFamily: TOK.body, fontSize: 11, fontWeight: 600, color: TOK.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
              Data sources · 데이터 출처
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", rowGap: 8, columnGap: 16, fontFamily: TOK.body, fontSize: 12.5, lineHeight: 1.55, color: TOK.inkSoft, borderTop: "1px solid #e5e5e5", paddingTop: 10 }}>
              <div style={{ fontWeight: 600, color: TOK.ink }}>KOSIS 통계청</div>
              <div>인구·고령·독거(D1~D8), 시설·재정·요양(S2·S4·Sx·S6), 119·소방·노후주택(A1·A2·A4), 지방재정·자활(R3·R4·R5)</div>

              <div style={{ fontWeight: 600, color: TOK.ink, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>국민건강보험공단</div>
              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>장기요양 등급자(D6), 장기요양기관 수(S6)</div>

              <div style={{ fontWeight: 600, color: TOK.ink, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>한국행정연구원</div>
              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>사회통합실태조사 — 신뢰·시민참여(E1·E2)</div>

              <div style={{ fontWeight: 600, color: TOK.ink, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>행정안전부</div>
              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>외국인주민 현황(E4), 지역사랑상품권 발행 시군구(E3b)</div>

              <div style={{ fontWeight: 600, color: TOK.ink, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>한국지능정보사회진흥원 (NIA)</div>
              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>디지털정보화수준(A6)</div>

              <div style={{ fontWeight: 600, color: TOK.ink, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>보건복지부</div>
              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>의료·요양 통합돌봄 본사업 시군구별 사업 현황(2026.03 기준) — R pillar 강화 (v0.7: R_KCCI 0.5 + 통합돌봄 0.5)</div>
            </div>

            <div style={{ fontFamily: TOK.body, fontSize: 11.5, lineHeight: 1.6, color: TOK.muted, marginTop: 14, paddingTop: 12, borderTop: "1px solid #e5e5e5" }}>
              모든 자료는 각 기관의 공개 통계포털 또는 정보공개 청구를 통해 수집되었으며,
              시군구 단위 결합·표준화·합성은 본 연구팀에서 수행하였습니다.
              산정 방법론과 지표 코드북은 <code style={{ background: "#f5f5f5", padding: "1px 6px", borderRadius: 4 }}>docs/methodology.md</code> · <code style={{ background: "#f5f5f5", padding: "1px 6px", borderRadius: 4 }}>docs/data-dictionary.md</code> 참조.
            </div>
          </div>
        </div>

        {/* 하단 — 버전·인용 정보 */}
        <div style={{ marginTop: 32, paddingTop: 16, borderTop: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: TOK.body, fontSize: 11, color: TOK.muted, letterSpacing: 0.3 }}>
            NEAR Care Index <b>{meta?.version || "v0.7"}</b> · 산정일 {meta?.generatedAt || "2026-05-04"} · 229 시군구 · MIT License
          </div>
          <div style={{ fontFamily: TOK.body, fontSize: 11, color: TOK.muted, fontStyle: "italic" }}>
            Suggested citation: at-korea (2026). <i>NEAR Care Index v0.7 (Weighted)</i>. Korea Community Care Capacity Research.
          </div>
        </div>
      </section>
    </div>
  );
};

window.HomeScreen = HomeScreen;
