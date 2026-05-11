// Wireframes for 통합돌봄 비교 사이트
// Sketchy / hand-drawn vibe + bold typography + colorful accents

const SK = {
  // shared sketchy styles
  border: "2px solid #1a1a1a",
  borderDashed: "2px dashed #1a1a1a",
  borderThick: "3px solid #1a1a1a",
  bg: "var(--paper, #FAF7F0)",
  ink: "#1a1a1a",
  muted: "#6b6b6b",
  font: "'Caveat', 'Gowun Dodum', cursive",
  fontBody: "'Gowun Dodum', 'Caveat', sans-serif",
  fontDisplay: "'Archivo Black', 'Black Han Sans', sans-serif",
};

// Wobble border helper — tiny irregular border-radius + slight rotation feel
const wobble = (extra = {}) => ({
  border: SK.border,
  borderRadius: "14px 18px 12px 20px / 16px 12px 20px 14px",
  ...extra,
});

// Color tokens come from CSS vars set by tweaks panel
const C = {
  red: "var(--c-red, #FF5A4E)",
  yellow: "var(--c-yellow, #FFD23F)",
  blue: "var(--c-blue, #4E8CFF)",
  green: "var(--c-green, #5CC97A)",
  pink: "var(--c-pink, #FF8FB1)",
  purple: "var(--c-purple, #B383E8)",
};

// Tiny scribble underline svg
const Scribble = ({ color = "currentColor", w = 120, h = 10 }) => (
  <svg width={w} height={h} viewBox="0 0 120 10" style={{ display: "block" }}>
    <path d="M2 6 Q 20 1, 40 5 T 80 5 T 118 4" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const Tag = ({ children, bg = C.yellow }) => (
  <span style={{
    display: "inline-block",
    background: bg,
    border: SK.border,
    borderRadius: "999px",
    padding: "2px 12px",
    fontFamily: SK.font,
    fontSize: 14,
    fontWeight: 600,
  }}>{children}</span>
);

const Box = ({ children, style, dashed, bg }) => (
  <div style={{
    border: dashed ? SK.borderDashed : SK.border,
    borderRadius: "10px 14px 8px 16px / 12px 8px 16px 10px",
    background: bg || "transparent",
    padding: 12,
    fontFamily: SK.fontBody,
    ...style,
  }}>{children}</div>
);

// Placeholder block (striped)
const Stripes = ({ h = 80, label, bg = "transparent" }) => (
  <div style={{
    height: h,
    background: `repeating-linear-gradient(45deg, ${bg === "transparent" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.3)"} 0 6px, transparent 6px 12px), ${bg}`,
    border: SK.borderDashed,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: SK.muted,
    fontFamily: SK.font,
    fontSize: 14,
  }}>{label}</div>
);

// Scribble bar chart bar
const Bar = ({ pct, color, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: SK.fontBody, fontSize: 13 }}>
    <div style={{ width: 90, color: SK.ink }}>{label}</div>
    <div style={{ flex: 1, height: 18, border: SK.border, borderRadius: 4, background: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRight: SK.border }} />
    </div>
    <div style={{ width: 36, textAlign: "right", fontFamily: SK.font, fontWeight: 600 }}>{value}</div>
  </div>
);

// =============================================================
// SCREEN 1: HOME / LANDING — 4 variants
// =============================================================

const Home_BigType = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 48, fontFamily: SK.fontBody, color: SK.ink, position: "relative", overflow: "hidden" }}>
    {/* nav */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 22, letterSpacing: -0.5 }}>CARE.INDEX</div>
      <div style={{ display: "flex", gap: 18, fontFamily: SK.font, fontSize: 18 }}>
        <span>전국순위</span><span>비교하기</span><span>방법론</span><span style={{ background: C.yellow, padding: "4px 12px", border: SK.border, borderRadius: 999 }}>내 지역</span>
      </div>
    </div>

    {/* big type hero */}
    <div style={{ marginTop: 40 }}>
      <div style={{ fontFamily: SK.font, fontSize: 26, color: SK.muted }}>우리 동네 통합돌봄, 몇 점일까?</div>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 168, lineHeight: 0.9, letterSpacing: -4, marginTop: 8 }}>
        돌봄을<br />
        <span style={{ background: C.yellow, padding: "0 12px", border: SK.borderThick, display: "inline-block", transform: "rotate(-1deg)" }}>점수</span>로.
      </div>
      <div style={{ marginTop: 24, fontFamily: SK.fontBody, fontSize: 17, maxWidth: 540, lineHeight: 1.5 }}>
        전국 17개 광역, 229개 시군구의 통합돌봄 수준을<br />6개 차원으로 비교해봐요.
      </div>
    </div>

    {/* search */}
    <div style={{ position: "absolute", right: 48, bottom: 48, width: 380 }}>
      <Box style={{ padding: 18, background: "#fff" }}>
        <div style={{ fontFamily: SK.font, fontSize: 18, marginBottom: 10 }}>지역 검색 →</div>
        <div style={{ height: 44, border: SK.border, borderRadius: 8, padding: "10px 14px", color: SK.muted, background: "#fafafa" }}>예) 서울특별시 노원구</div>
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          <Tag bg={C.pink}>#서울</Tag><Tag bg={C.blue}>#부산</Tag><Tag bg={C.green}>#대구</Tag><Tag bg={C.purple}>#경기</Tag>
        </div>
      </Box>
    </div>

    {/* corner doodle */}
    <div style={{ position: "absolute", top: 80, right: 60, fontFamily: SK.font, fontSize: 16, color: SK.muted, transform: "rotate(8deg)" }}>
      ↘ 6개 차원<br />· 재정<br />· 인프라<br />· 접근성<br />· 다양성<br />· 만족도<br />· 대응력
    </div>
  </div>
);

const Home_Dashboard = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
      <div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 36, letterSpacing: -1 }}>CARE.INDEX <span style={{ fontSize: 14, fontFamily: SK.font, color: SK.muted }}>v.0.1 / 더미데이터</span></div>
        <div style={{ fontFamily: SK.font, fontSize: 18, color: SK.muted }}>오늘의 통합돌봄 한눈에</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Tag bg={C.yellow}>2026.04 기준</Tag>
        <Tag bg="#fff">전국</Tag>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 14, marginTop: 16 }}>
      {/* Big number */}
      <Box style={{ background: C.yellow, padding: 20 }}>
        <div style={{ fontFamily: SK.font, fontSize: 17 }}>전국 평균 점수</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 120, lineHeight: 1, letterSpacing: -3 }}>62.4</div>
        <div style={{ fontFamily: SK.font, fontSize: 18 }}>등급 <b>C+</b> · 전년대비 ▲ 2.1</div>
      </Box>
      <Box style={{ background: "#fff" }}>
        <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted }}>1위</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 38, lineHeight: 1.1 }}>세종특별<br />자치시</div>
        <div style={{ marginTop: 8, fontFamily: SK.font, fontSize: 22 }}>81.7 <Tag bg={C.green}>A</Tag></div>
      </Box>
      <Box style={{ background: "#fff" }}>
        <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted }}>가장 큰 격차</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 38, lineHeight: 1.1 }}>접근성<br />Δ 41.2</div>
        <div style={{ marginTop: 8, fontFamily: SK.font, fontSize: 14, color: SK.muted }}>도시 vs 농산어촌</div>
      </Box>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
      <Box style={{ background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontFamily: SK.font, fontSize: 18 }}>시도별 순위 (TOP 8)</div>
          <span style={{ fontFamily: SK.font, fontSize: 14, color: SK.muted }}>전체보기 →</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[["세종", 81.7, C.green], ["서울", 76.3, C.green], ["제주", 71.0, C.blue], ["광주", 68.5, C.blue], ["부산", 65.2, C.yellow], ["대전", 64.8, C.yellow], ["전북", 60.1, C.yellow], ["충남", 58.4, C.pink]].map(([n, v, c], i) => (
            <Bar key={i} label={`${i + 1}. ${n}`} value={v} pct={v} color={c} />
          ))}
        </div>
      </Box>
      <Box style={{ background: "#fff" }}>
        <div style={{ fontFamily: SK.font, fontSize: 18, marginBottom: 10 }}>차원별 평균</div>
        <Stripes h={220} label="[ 6축 레이더 차트 ]" bg={C.pink} />
      </Box>
    </div>

    <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
      <Box style={{ flex: 1, background: C.blue, color: "#fff", textAlign: "center", padding: 16, fontFamily: SK.font, fontSize: 22 }}>→ 내 지역 점수 보기</Box>
      <Box style={{ flex: 1, background: "#fff", textAlign: "center", padding: 16, fontFamily: SK.font, fontSize: 22 }}>→ 지역 비교하기</Box>
      <Box style={{ flex: 1, background: "#fff", textAlign: "center", padding: 16, fontFamily: SK.font, fontSize: 22 }}>→ 방법론 알아보기</Box>
    </div>
  </div>
);

const Home_Map = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink, position: "relative" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 24 }}>CARE.INDEX</div>
      <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted }}>지도를 클릭해 점수 보기 →</div>
    </div>

    <div style={{ fontFamily: SK.fontDisplay, fontSize: 64, letterSpacing: -1.5, lineHeight: 1, marginBottom: 16 }}>
      어느 동네가<br />가장 잘 돌볼까?
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginTop: 16 }}>
      <Box style={{ background: "#fff", padding: 20, height: 480, position: "relative" }}>
        <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted, marginBottom: 10 }}>대한민국 17개 광역</div>
        <Stripes h={420} label="[ 한국 지도 SVG · 점수별로 색상 채워짐 ]" bg={C.yellow} />
        <div style={{ position: "absolute", bottom: 20, left: 20, display: "flex", gap: 8, alignItems: "center", fontFamily: SK.font, fontSize: 13 }}>
          <span>낮음</span>
          <div style={{ width: 200, height: 12, background: `linear-gradient(to right, ${C.pink}, ${C.yellow}, ${C.green})`, border: SK.border, borderRadius: 6 }} />
          <span>높음</span>
        </div>
      </Box>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Box style={{ background: C.yellow, padding: 16 }}>
          <div style={{ fontFamily: SK.font, fontSize: 16 }}>HOVER ▼ 서울특별시</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 1 }}>76.3</div>
          <div style={{ fontFamily: SK.font, fontSize: 18 }}>등급 <b>B+</b> · 전국 2위</div>
          <div style={{ marginTop: 10, fontFamily: SK.fontBody, fontSize: 13 }}>↗ 25개 자치구 펼치기</div>
        </Box>
        <Box style={{ background: "#fff" }}>
          <div style={{ fontFamily: SK.font, fontSize: 16, marginBottom: 8 }}>차원별</div>
          <Bar label="재정" value={72} pct={72} color={C.blue} />
          <Bar label="인프라" value={81} pct={81} color={C.green} />
          <Bar label="접근성" value={88} pct={88} color={C.green} />
          <Bar label="다양성" value={74} pct={74} color={C.blue} />
          <Bar label="만족도" value={68} pct={68} color={C.yellow} />
          <Bar label="대응력" value={75} pct={75} color={C.blue} />
        </Box>
      </div>
    </div>
  </div>
);

const Home_QuizStart = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 48, fontFamily: SK.fontBody, color: SK.ink, position: "relative", overflow: "hidden" }}>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 22, letterSpacing: -0.5, marginBottom: 80 }}>CARE.INDEX</div>

    <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "center" }}>
      <div>
        <div style={{ fontFamily: SK.font, fontSize: 24, color: SK.muted, marginBottom: 8 }}>STEP 0 / 6</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 96, lineHeight: 0.95, letterSpacing: -3 }}>
          돌봄에서<br />
          뭐가 제일<br />
          <span style={{ background: C.pink, padding: "0 14px", border: SK.borderThick, display: "inline-block", transform: "rotate(-2deg)" }}>중요</span>해요?
        </div>
        <div style={{ marginTop: 32, fontFamily: SK.fontBody, fontSize: 17, maxWidth: 480, lineHeight: 1.6 }}>
          여섯 가지 차원에 가중치를 매겨서<br />
          <b>나만의 통합돌봄 점수표</b>로 전국 지역을 다시 줄세워볼 수 있어요.
        </div>
        <div style={{ marginTop: 36, display: "flex", gap: 12 }}>
          <Box style={{ background: C.green, padding: "14px 28px", fontFamily: SK.font, fontSize: 22, color: "#fff" }}>시작하기 →</Box>
          <Box style={{ background: "#fff", padding: "14px 28px", fontFamily: SK.font, fontSize: 22 }}>그냥 둘러볼래요</Box>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          ["💰", "재정 투입", C.yellow],
          ["🏥", "인프라", C.green],
          ["🚶", "접근성", C.blue],
          ["🎨", "서비스 다양성", C.pink],
          ["⭐", "이용자 만족도", C.purple],
          ["📈", "고령화 대응력", C.red],
        ].map(([ico, name, col], i) => (
          <Box key={i} style={{ background: col, padding: 14, display: "flex", alignItems: "center", gap: 14, transform: `rotate(${[-1, 1, -0.5, 0.8, -1.2, 0.5][i]}deg)` }}>
            <div style={{ fontSize: 28 }}>{ico}</div>
            <div style={{ fontFamily: SK.font, fontSize: 22, fontWeight: 600 }}>{name}</div>
            <div style={{ marginLeft: "auto", fontFamily: SK.font, fontSize: 14 }}>중요도 ▢▢▢▢▢</div>
          </Box>
        ))}
      </div>
    </div>
  </div>
);

// =============================================================
// SCREEN 2: REGION DETAIL (klaci-ish result page) — 4 variants
// =============================================================

const Detail_BigScore = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 40, fontFamily: SK.fontBody, color: SK.ink, position: "relative" }}>
    <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted, marginBottom: 4 }}>← 전체로 돌아가기</div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <div>
        <div style={{ fontFamily: SK.font, fontSize: 22 }}>서울특별시</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 84, lineHeight: 0.95, letterSpacing: -2 }}>노원구</div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <Tag bg={C.yellow}>인구 51만</Tag>
        <Tag bg={C.pink}>고령화 18.2%</Tag>
        <Tag bg="#fff">SHARE</Tag>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24, marginTop: 28 }}>
      <Box style={{ background: C.yellow, padding: 28, position: "relative" }}>
        <div style={{ fontFamily: SK.font, fontSize: 20 }}>당신의 동네는</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 200, lineHeight: 0.85, letterSpacing: -6, margin: "12px 0" }}>
          73.8
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontFamily: SK.fontDisplay, fontSize: 56 }}>B+</span>
          <span style={{ fontFamily: SK.font, fontSize: 22 }}>전국 18위 / 229</span>
        </div>
        <Scribble color={SK.ink} w={240} h={14} />
        <div style={{ marginTop: 14, fontFamily: SK.font, fontSize: 18, lineHeight: 1.4 }}>
          "재정은 평균인데 <b>인프라</b>가 단단해요.<br />접근성도 좋은 편."
        </div>
      </Box>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Box style={{ background: "#fff" }}>
          <div style={{ fontFamily: SK.font, fontSize: 18, marginBottom: 8 }}>여섯 차원 점수</div>
          <Bar label="재정" value={64} pct={64} color={C.yellow} />
          <Bar label="인프라" value={88} pct={88} color={C.green} />
          <Bar label="접근성" value={81} pct={81} color={C.green} />
          <Bar label="다양성" value={70} pct={70} color={C.blue} />
          <Bar label="만족도" value={75} pct={75} color={C.blue} />
          <Bar label="대응력" value={64} pct={64} color={C.yellow} />
        </Box>
        <Box style={{ background: C.blue, color: "#fff" }}>
          <div style={{ fontFamily: SK.font, fontSize: 16 }}>강점 TOP</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 28, lineHeight: 1.1 }}>인프라 · 접근성</div>
          <div style={{ fontFamily: SK.font, fontSize: 14, marginTop: 4 }}>주간보호센터 인구당 1.4배, 전국평균 대비 +28%</div>
        </Box>
      </div>
    </div>

    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
      <Box style={{ flex: 1, background: "#fff", padding: 12, fontFamily: SK.font, fontSize: 16 }}>+ 옆 동네와 비교</Box>
      <Box style={{ flex: 1, background: "#fff", padding: 12, fontFamily: SK.font, fontSize: 16 }}>+ 작년과 비교</Box>
      <Box style={{ flex: 1, background: "#fff", padding: 12, fontFamily: SK.font, fontSize: 16 }}>+ 원본 데이터 다운로드</Box>
    </div>
  </div>
);

const Detail_TypeCard = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 40, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted, marginBottom: 16 }}>← 결과 카드</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 32 }}>
      {/* type card */}
      <Box style={{ background: C.pink, padding: 24, transform: "rotate(-1.5deg)", border: SK.borderThick }}>
        <div style={{ fontFamily: SK.font, fontSize: 18, marginBottom: 4 }}>CARE TYPE</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 96, lineHeight: 0.9, letterSpacing: -3 }}>
          탄탄한<br />이웃집
        </div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 38, marginTop: 12 }}>= S F H R</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 14, fontFamily: SK.font, fontSize: 16 }}>
          <div><b>S</b>trong infra · 인프라 강함</div>
          <div><b>F</b>air budget · 재정 보통</div>
          <div><b>H</b>igh access · 접근성 높음</div>
          <div><b>R</b>esponsive · 대응력 보통</div>
        </div>
        <Stripes h={120} label="[ 동네 일러스트 자리 ]" bg="rgba(255,255,255,0.3)" />
      </Box>

      <div>
        <div style={{ fontFamily: SK.font, fontSize: 18, color: SK.muted }}>서울 노원구의 통합돌봄 유형</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 64, lineHeight: 1, letterSpacing: -1.5, marginTop: 4 }}>
          73.8점 / B+
        </div>

        <div style={{ marginTop: 24, fontFamily: SK.fontBody, fontSize: 16, lineHeight: 1.6 }}>
          노원구는 노인복지관·주간보호 등 <b>물리적 인프라가 충분</b>하고,
          대중교통 접근성도 좋아요. 다만 <b>재정 투입</b>은 서울 평균보다 살짝 낮고,
          서비스 다양성이 다음 과제예요.
        </div>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Box style={{ background: C.green, color: "#fff", padding: 14 }}>
            <div style={{ fontFamily: SK.font, fontSize: 14 }}>이런 동네와 비슷해요</div>
            <div style={{ fontFamily: SK.fontDisplay, fontSize: 22, lineHeight: 1.1 }}>도봉구 · 강북구 · 부산 동래구</div>
          </Box>
          <Box style={{ background: C.yellow, padding: 14 }}>
            <div style={{ fontFamily: SK.font, fontSize: 14 }}>한 단계 위로 가려면</div>
            <div style={{ fontFamily: SK.fontDisplay, fontSize: 22, lineHeight: 1.1 }}>다양성 +12점</div>
          </Box>
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
          <Tag bg={C.blue}>이미지 저장</Tag>
          <Tag bg={C.purple}>링크 복사</Tag>
          <Tag bg="#fff">PDF</Tag>
        </div>
      </div>
    </div>
  </div>
);

const Detail_Story = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 0, fontFamily: SK.fontBody, color: SK.ink, overflow: "hidden", position: "relative" }}>
    {/* scrollytelling preview — three stacked sections visible */}
    <div style={{ display: "grid", gridTemplateRows: "200px 200px 360px", height: "100%" }}>
      <div style={{ background: C.yellow, borderBottom: SK.border, padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: SK.font, fontSize: 16 }}>SCROLL ↓ 1/4</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 72, lineHeight: 1, letterSpacing: -2 }}>노원구의 어르신은</div>
        </div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 96, letterSpacing: -3 }}>93,420명</div>
      </div>
      <div style={{ background: C.pink, borderBottom: SK.border, padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: SK.font, fontSize: 16 }}>SCROLL ↓ 2/4</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 72, lineHeight: 1, letterSpacing: -2 }}>그 중 돌봄 받는 분은</div>
        </div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 96, letterSpacing: -3 }}>14.7%</div>
      </div>
      <div style={{ background: SK.bg, padding: "28px 48px" }}>
        <div style={{ fontFamily: SK.font, fontSize: 16 }}>SCROLL ↓ 3/4</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 1, letterSpacing: -1.5, marginBottom: 12 }}>그래서 종합점수는</div>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 200, letterSpacing: -6, lineHeight: 0.85 }}>73.8</div>
          <div style={{ paddingBottom: 24 }}>
            <Bar label="재정" value={64} pct={64} color={C.yellow} />
            <Bar label="인프라" value={88} pct={88} color={C.green} />
            <Bar label="접근성" value={81} pct={81} color={C.green} />
            <Bar label="다양성" value={70} pct={70} color={C.blue} />
            <Bar label="만족도" value={75} pct={75} color={C.blue} />
            <Bar label="대응력" value={64} pct={64} color={C.yellow} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Detail_Receipt = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 24 }}>
    {/* receipt */}
    <Box style={{ background: "#fff", padding: 24, fontFamily: "ui-monospace, monospace", fontSize: 13, lineHeight: 1.6, border: SK.borderThick }}>
      <div style={{ textAlign: "center", fontFamily: SK.fontDisplay, fontSize: 22, letterSpacing: -0.5 }}>CARE INDEX RECEIPT</div>
      <div style={{ textAlign: "center", borderBottom: "1px dashed #000", paddingBottom: 8, marginBottom: 8 }}>2026 · 서울 노원구</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>재정 투입</span><span>64.0</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>인프라</span><span>88.0</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>접근성</span><span>81.0</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>다양성</span><span>70.0</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>만족도</span><span>75.0</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span>고령화 대응력</span><span>64.0</span></div>
      <div style={{ borderTop: "1px dashed #000", marginTop: 8, paddingTop: 8, fontFamily: SK.fontDisplay, fontSize: 18, display: "flex", justifyContent: "space-between" }}>
        <span>TOTAL</span><span>73.8 / B+</span>
      </div>
      <div style={{ marginTop: 16, textAlign: "center", fontSize: 11 }}>· · · · · · · · · · · · · · · · ·<br />감사합니다 · 데이터 기준 2026.04</div>
      <div style={{ textAlign: "center", marginTop: 12, fontSize: 11 }}>||||| |||| | ||||| ||| ||||</div>
    </Box>

    <div>
      <div style={{ fontFamily: SK.font, fontSize: 22, color: SK.muted }}>이번 달 돌봄 영수증</div>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 80, lineHeight: 0.95, letterSpacing: -2 }}>
        노원구는<br />73.8점이에요.
      </div>
      <div style={{ marginTop: 20, fontFamily: SK.fontBody, fontSize: 16, lineHeight: 1.6, maxWidth: 460 }}>
        영수증을 살펴보면 <b>인프라(88)</b>가 가장 비싼 항목,
        <b>재정(64)</b>과 <b>대응력(64)</b>이 가장 저렴한 항목이에요.
        균형을 맞추려면 어디에 더 써야 할까요?
      </div>
      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
        <Box style={{ background: C.green, color: "#fff", padding: 14, fontFamily: SK.font, fontSize: 18 }}>★ 잘하는 것: 주간보호센터 21곳, 인구당 전국 5위</Box>
        <Box style={{ background: C.yellow, padding: 14, fontFamily: SK.font, fontSize: 18 }}>! 부족한 것: 1인당 예산 12.4만원, 서울평균 -18%</Box>
        <Box style={{ background: C.pink, padding: 14, fontFamily: SK.font, fontSize: 18 }}>↗ 다음 달 목표: 다양성 +5점</Box>
      </div>
    </div>
  </div>
);

// =============================================================
// SCREEN 3: COMPARE — 4 variants
// =============================================================

const Compare_SideBySide = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, letterSpacing: -1.5, lineHeight: 1 }}>나란히 보기</div>
      <Tag bg={C.yellow}>+ 지역 추가</Tag>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
      {[
        ["서울 노원구", 73.8, "B+", C.yellow, [64, 88, 81, 70, 75, 64]],
        ["부산 해운대구", 68.2, "B", C.pink, [70, 75, 65, 72, 68, 59]],
        ["전남 순천시", 81.1, "A", C.green, [82, 78, 70, 88, 85, 84]],
      ].map(([name, score, grade, col, dims], i) => (
        <Box key={i} style={{ background: col, padding: 16, color: i === 0 ? SK.ink : i === 1 ? SK.ink : "#fff", border: SK.borderThick }}>
          <div style={{ fontFamily: SK.font, fontSize: 14 }}>지역 #{i + 1}</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 28, lineHeight: 1.1 }}>{name}</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 96, lineHeight: 0.9, marginTop: 10 }}>{score}</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 36 }}>{grade}</div>
          <div style={{ marginTop: 12, padding: 10, background: "rgba(255,255,255,0.5)", borderRadius: 6 }}>
            {["재정", "인프라", "접근성", "다양성", "만족도", "대응력"].map((d, j) => (
              <div key={j} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: SK.fontBody, padding: "1px 0" }}>
                <span>{d}</span>
                <span style={{ fontFamily: SK.font, fontWeight: 600 }}>{dims[j]}</span>
              </div>
            ))}
          </div>
        </Box>
      ))}
    </div>

    <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
      <Box style={{ background: "#fff" }}>
        <div style={{ fontFamily: SK.font, fontSize: 18, marginBottom: 8 }}>차원별 비교</div>
        <Stripes h={180} label="[ 묶음 막대 차트 · 6차원 × 3지역 ]" bg={C.blue} />
      </Box>
      <Box style={{ background: "#fff" }}>
        <div style={{ fontFamily: SK.font, fontSize: 18, marginBottom: 8 }}>한 줄 요약</div>
        <div style={{ fontFamily: SK.fontBody, fontSize: 14, lineHeight: 1.6 }}>
          순천시가 종합 1위, 특히 <b>다양성(+18)</b>이 압도적.
          노원구는 <b>인프라(88)</b> 강자.
          해운대구는 모든 차원이 평균 ±7 안쪽으로 균형형.
        </div>
      </Box>
    </div>
  </div>
);

const Compare_VS = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 40, fontFamily: SK.fontBody, color: SK.ink, position: "relative" }}>
    <div style={{ fontFamily: SK.font, fontSize: 18, color: SK.muted, textAlign: "center" }}>HEAD TO HEAD</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginTop: 24 }}>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: SK.font, fontSize: 18 }}>서울특별시</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 1 }}>노원구</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 140, color: C.blue, lineHeight: 0.9, letterSpacing: -4 }}>73.8</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 36 }}>B+</div>
      </div>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 96, padding: "0 24px", color: C.red, transform: "rotate(-3deg)" }}>VS</div>
      <div>
        <div style={{ fontFamily: SK.font, fontSize: 18 }}>전라남도</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 1 }}>순천시</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 140, color: C.green, lineHeight: 0.9, letterSpacing: -4 }}>81.1</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 36 }}>A</div>
      </div>
    </div>

    <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: 8 }}>
      {[
        ["재정", 64, 82, "→"],
        ["인프라", 88, 78, "←"],
        ["접근성", 81, 70, "←"],
        ["다양성", 70, 88, "→"],
        ["만족도", 75, 85, "→"],
        ["대응력", 64, 84, "→"],
      ].map(([d, a, b, w], i) => (
        <Box key={i} style={{ background: w === "←" ? C.blue : C.green, color: "#fff", padding: 10, textAlign: "center" }}>
          <div style={{ fontFamily: SK.font, fontSize: 14 }}>{d}</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 28, marginTop: 4 }}>{a} {w} {b}</div>
        </Box>
      ))}
    </div>

    <div style={{ marginTop: 24, fontFamily: SK.fontDisplay, fontSize: 32, textAlign: "center", letterSpacing: -1 }}>
      6개 차원 중 5개에서 <span style={{ background: C.green, color: "#fff", padding: "0 12px" }}>순천시 우세</span>
    </div>
  </div>
);

const Compare_Table = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 48, letterSpacing: -1, marginBottom: 16 }}>지역 비교표</div>
    <Box style={{ background: "#fff", padding: 0, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: SK.fontBody, fontSize: 14 }}>
        <thead>
          <tr style={{ background: C.yellow, fontFamily: SK.font, fontSize: 16 }}>
            <th style={{ padding: 10, textAlign: "left", borderBottom: SK.border }}>지역</th>
            <th style={{ padding: 10, borderBottom: SK.border }}>종합</th>
            <th style={{ padding: 10, borderBottom: SK.border }}>등급</th>
            <th style={{ padding: 10, borderBottom: SK.border }}>재정</th>
            <th style={{ padding: 10, borderBottom: SK.border }}>인프라</th>
            <th style={{ padding: 10, borderBottom: SK.border }}>접근성</th>
            <th style={{ padding: 10, borderBottom: SK.border }}>다양성</th>
            <th style={{ padding: 10, borderBottom: SK.border }}>만족도</th>
            <th style={{ padding: 10, borderBottom: SK.border }}>대응력</th>
            <th style={{ padding: 10, borderBottom: SK.border }}></th>
          </tr>
        </thead>
        <tbody>
          {[
            ["전남 순천시", 81.1, "A", 82, 78, 70, 88, 85, 84, true],
            ["서울 노원구", 73.8, "B+", 64, 88, 81, 70, 75, 64, true],
            ["부산 해운대구", 68.2, "B", 70, 75, 65, 72, 68, 59, true],
            ["경기 수원시", 72.4, "B", 78, 80, 76, 64, 70, 66, false],
            ["대구 수성구", 69.0, "B", 72, 71, 74, 68, 65, 64, false],
            ["충남 천안시", 64.5, "C+", 60, 65, 70, 62, 68, 62, false],
            ["강원 춘천시", 58.9, "C", 55, 62, 58, 60, 60, 58, false],
          ].map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee", background: r[9] ? "rgba(255,210,63,0.1)" : "transparent" }}>
              <td style={{ padding: 10, fontFamily: SK.font, fontSize: 16 }}>{r[9] ? "★ " : "  "}{r[0]}</td>
              <td style={{ padding: 10, textAlign: "center", fontFamily: SK.fontDisplay, fontSize: 18 }}>{r[1]}</td>
              <td style={{ padding: 10, textAlign: "center" }}><Tag bg={r[2].startsWith("A") ? C.green : r[2].startsWith("B") ? C.yellow : C.pink}>{r[2]}</Tag></td>
              {r.slice(3, 9).map((v, j) => (
                <td key={j} style={{ padding: 10, textAlign: "center" }}>
                  <span style={{ display: "inline-block", padding: "2px 6px", background: v >= 80 ? C.green : v >= 70 ? C.yellow : v >= 60 ? "#fff" : C.pink, border: "1px solid #1a1a1a", borderRadius: 4, fontFamily: SK.font, fontSize: 13 }}>{v}</span>
                </td>
              ))}
              <td style={{ padding: 10, textAlign: "center", fontFamily: SK.font, color: SK.muted }}>{r[9] ? "−" : "+"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
    <div style={{ marginTop: 12, display: "flex", gap: 8, fontFamily: SK.font, fontSize: 14 }}>
      <Tag bg={C.green}>≥ 80</Tag>
      <Tag bg={C.yellow}>≥ 70</Tag>
      <Tag bg="#fff">≥ 60</Tag>
      <Tag bg={C.pink}>&lt; 60</Tag>
      <span style={{ marginLeft: "auto", color: SK.muted }}>★ 비교 대상에 추가됨 · 클릭으로 토글</span>
    </div>
  </div>
);

const Compare_Radar = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 48, letterSpacing: -1, marginBottom: 4 }}>모양으로 비교</div>
    <div style={{ fontFamily: SK.font, fontSize: 18, color: SK.muted, marginBottom: 16 }}>지역마다 어떤 모양으로 돌봄을 만들었나?</div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
      {[
        ["순천시", C.green, "균형 8각형"],
        ["노원구", C.blue, "인프라 뾰족"],
        ["해운대구", C.pink, "재정 치우침"],
      ].map(([name, col, shape], i) => (
        <Box key={i} style={{ background: "#fff", padding: 16, textAlign: "center" }}>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 28, lineHeight: 1.1 }}>{name}</div>
          <div style={{ fontFamily: SK.font, fontSize: 14, color: SK.muted, marginBottom: 10 }}>{shape}</div>
          <Stripes h={220} label={`[ 6축 레이더 / ${name} ]`} bg={col} />
        </Box>
      ))}
    </div>

    <Box style={{ background: "#fff", marginTop: 14, padding: 16 }}>
      <div style={{ fontFamily: SK.font, fontSize: 18, marginBottom: 10 }}>겹쳐 보기</div>
      <Stripes h={240} label="[ 3개 레이더 오버레이 — 색상별 외곽선 ]" bg={C.purple} />
    </Box>
  </div>
);

// =============================================================
// SCREEN 4: NATIONAL RANKING — 4 variants
// =============================================================

const Rank_BigList = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink, display: "grid", gridTemplateColumns: "auto 1fr", gap: 24 }}>
    <div>
      <div style={{ fontFamily: SK.font, fontSize: 18, color: SK.muted }}>전국 229개 시군구</div>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 64, letterSpacing: -1.5, lineHeight: 1 }}>2026<br />돌봄<br />순위</div>
      <Scribble color={C.red} w={200} h={14} />
      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 6 }}>
        <Tag bg={C.yellow}>전체 229</Tag>
        <Tag bg={C.green}>광역시 단위</Tag>
        <Tag bg="#fff">시군구 단위</Tag>
      </div>
      <div style={{ marginTop: 24, fontFamily: SK.font, fontSize: 14 }}>
        SORT BY<br />
        ▢ 종합점수<br />
        ▢ 재정<br />
        ▢ 인프라<br />
        ▢ 접근성<br />
        ▢ 인구당
      </div>
    </div>

    <Box style={{ background: "#fff", padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {[
          [1, "전남 순천시", 81.1, "A", C.green],
          [2, "세종시", 80.4, "A", C.green],
          [3, "서울 강남구", 78.9, "A-", C.green],
          [4, "제주 서귀포시", 77.2, "B+", C.yellow],
          [5, "경기 성남시", 76.5, "B+", C.yellow],
          [18, "서울 노원구", 73.8, "B+", C.yellow],
          [42, "부산 해운대구", 68.2, "B", C.yellow],
          [188, "경북 영양군", 49.1, "D+", C.pink],
          [229, "전남 신안군", 41.0, "D", C.red],
        ].map(([rank, name, score, grade, col], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto auto", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #eee", gap: 14 }}>
            <div style={{ fontFamily: SK.fontDisplay, fontSize: 28, color: rank <= 3 ? C.red : SK.muted }}>{rank}</div>
            <div style={{ fontFamily: SK.fontDisplay, fontSize: 28, letterSpacing: -0.5 }}>{name}</div>
            <div style={{ fontFamily: SK.fontDisplay, fontSize: 36, letterSpacing: -1 }}>{score}</div>
            <Tag bg={col}>{grade}</Tag>
          </div>
        ))}
      </div>
    </Box>
  </div>
);

const Rank_Tiers = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 48, letterSpacing: -1, marginBottom: 4 }}>티어로 보기</div>
    <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted, marginBottom: 16 }}>점수 구간별로 묶어서 한눈에</div>

    {[
      ["A · 우수", "80점 이상 · 12개 지역", C.green, ["순천", "세종", "강남", "서귀포", "성남", "수원", "부산진", "광주북", "전주", "춘천", "제주", "용인"]],
      ["B · 양호", "70~79점 · 58개 지역", C.yellow, ["노원", "강서", "송파", "동래", "수성", "유성", "...58"]],
      ["C · 보통", "60~69점 · 96개 지역", C.blue, ["천안", "원주", "포항", "...96"]],
      ["D · 취약", "60점 미만 · 63개 지역", C.pink, ["영양", "신안", "고흥", "...63"]],
    ].map(([tier, sub, col, regions], i) => (
      <Box key={i} style={{ background: col, padding: 16, marginBottom: 10, color: i < 2 ? SK.ink : i === 2 ? "#fff" : SK.ink, border: SK.borderThick }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 36, letterSpacing: -1 }}>{tier}</div>
          <div style={{ fontFamily: SK.font, fontSize: 16 }}>{sub}</div>
          <div style={{ marginLeft: "auto", fontFamily: SK.font, fontSize: 14 }}>전체보기 →</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {regions.map((r, j) => (
            <span key={j} style={{ background: "rgba(255,255,255,0.6)", padding: "3px 10px", border: SK.border, borderRadius: 999, fontFamily: SK.font, fontSize: 14 }}>{r}</span>
          ))}
        </div>
      </Box>
    ))}
  </div>
);

const Rank_BeeSwarm = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 48, letterSpacing: -1 }}>분포로 보기</div>
    <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted, marginBottom: 16 }}>점 하나 = 시군구 1개 · 색상 = 광역</div>

    <Box style={{ background: "#fff", padding: 24, height: 460, position: "relative" }}>
      <Stripes h={400} label="[ 비스웜 차트 — x: 종합점수 0-100 / 색: 17개 광역 ]" bg={C.yellow} />
      <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, display: "flex", justifyContent: "space-between", fontFamily: SK.font, fontSize: 13, color: SK.muted }}>
        <span>0</span><span>20</span><span>40</span><span>60</span><span>80</span><span>100</span>
      </div>
    </Box>

    <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
      {["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"].map((s, i) => (
        <span key={i} style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: SK.font, fontSize: 14,
          padding: "3px 10px", background: "#fff", border: SK.border, borderRadius: 999
        }}>
          <span style={{ width: 10, height: 10, borderRadius: 5, background: [C.red, C.yellow, C.blue, C.green, C.pink, C.purple][i % 6], border: "1px solid #1a1a1a" }} />
          {s}
        </span>
      ))}
    </div>
  </div>
);

const Rank_MapHeat = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 48, letterSpacing: -1 }}>지도로 줄세우기</div>
      <div style={{ display: "flex", gap: 6 }}>
        <Tag bg={C.yellow}>종합</Tag><Tag bg="#fff">재정</Tag><Tag bg="#fff">인프라</Tag><Tag bg="#fff">접근성</Tag>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>
      <Box style={{ background: "#fff", padding: 16, height: 580 }}>
        <Stripes h={540} label="[ 광역 지도 + 시군구 카토그램 / 점수 컬러 ]" bg={C.green} />
      </Box>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Box style={{ background: C.yellow }}>
          <div style={{ fontFamily: SK.font, fontSize: 14 }}>가장 높은 광역</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 32, lineHeight: 1.05 }}>세종 80.4</div>
        </Box>
        <Box style={{ background: C.pink }}>
          <div style={{ fontFamily: SK.font, fontSize: 14 }}>가장 낮은 광역</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 32, lineHeight: 1.05 }}>경북 54.7</div>
        </Box>
        <Box style={{ background: "#fff" }}>
          <div style={{ fontFamily: SK.font, fontSize: 14, marginBottom: 6 }}>광역 평균 TOP 5</div>
          {[["세종", 80.4], ["서울", 76.3], ["제주", 71.0], ["광주", 68.5], ["부산", 65.2]].map(([n, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px dashed #ddd", fontFamily: SK.font, fontSize: 16 }}>
              <span>{i + 1}. {n}</span><b>{v}</b>
            </div>
          ))}
        </Box>
        <Box style={{ background: "#fff" }}>
          <div style={{ fontFamily: SK.font, fontSize: 14, marginBottom: 6 }}>스토리</div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            수도권·세종·제주 라인이 강세,
            경북·강원 내륙은 <b>접근성</b>에서 큰 점수 손실.
            도농 격차는 <b>Δ 24.7점</b>.
          </div>
        </Box>
      </div>
    </div>
  </div>
);

// =============================================================
// SCREEN 5: MATCHING — 내 돌봄성향 진단 + 시군구 추천 — 4 variants
// =============================================================

// A. 진단 질문 화면 (퀴즈 스타일)
const Match_Quiz = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 48, fontFamily: SK.fontBody, color: SK.ink, position: "relative" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 22 }}>CARE.MATCH</div>
      <div style={{ fontFamily: SK.font, fontSize: 18, color: SK.muted }}>3 / 8</div>
    </div>

    {/* progress */}
    <div style={{ display: "flex", gap: 4, marginBottom: 48 }}>
      {[1, 1, 1, 0, 0, 0, 0, 0].map((on, i) => (
        <div key={i} style={{ flex: 1, height: 10, background: on ? C.yellow : "#fff", border: SK.border, borderRadius: 6 }} />
      ))}
    </div>

    <div style={{ fontFamily: SK.font, fontSize: 22, color: SK.muted, marginBottom: 12 }}>Q3.</div>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 80, lineHeight: 0.95, letterSpacing: -2.5, marginBottom: 48 }}>
      돌봄에서<br />
      <span style={{ background: C.pink, padding: "0 14px", border: SK.borderThick, transform: "rotate(-1deg)", display: "inline-block" }}>가장 중요</span>한 건?
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {[
        ["A", "집 가까이에서\n받을 수 있는 거", C.blue, "접근성"],
        ["B", "다양한 종류의\n프로그램이 있는 거", C.green, "다양성"],
        ["C", "충분한 예산이\n투입되는 거", C.yellow, "재정"],
        ["D", "시설과 종사자가\n많이 있는 거", C.purple, "인프라"],
      ].map(([k, t, col, dim], i) => (
        <Box key={i} style={{ background: "#fff", padding: 18, display: "flex", gap: 16, alignItems: "center", cursor: "pointer", transform: `rotate(${[-0.3, 0.4, -0.5, 0.2][i]}deg)` }}>
          <div style={{ width: 56, height: 56, background: col, border: SK.borderThick, borderRadius: "16px 12px 18px 14px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SK.fontDisplay, fontSize: 28, color: "#fff", flexShrink: 0 }}>{k}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SK.fontBody, fontSize: 20, lineHeight: 1.3, whiteSpace: "pre-line" }}>{t}</div>
            <div style={{ fontFamily: SK.font, fontSize: 13, color: SK.muted, marginTop: 4 }}>+ {dim}</div>
          </div>
        </Box>
      ))}
    </div>

    <div style={{ position: "absolute", bottom: 32, left: 48, right: 48, display: "flex", justifyContent: "space-between", fontFamily: SK.font, fontSize: 16 }}>
      <span style={{ color: SK.muted }}>← 이전</span>
      <span style={{ color: SK.muted }}>건너뛰기</span>
    </div>
  </div>
);

// B. 결과 화면 — klaci 스타일 4글자 성향 + 추천 지역
const Match_Result = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24 }}>
      {/* 성향 카드 */}
      <Box style={{ background: C.yellow, padding: 28, border: SK.borderThick, transform: "rotate(-1deg)" }}>
        <div style={{ fontFamily: SK.font, fontSize: 18 }}>당신의 돌봄 성향</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 92, lineHeight: 0.9, letterSpacing: -3, marginTop: 8 }}>
          가까운<br />이웃파
        </div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 64, marginTop: 16, letterSpacing: 4 }}>A H D F</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14, fontFamily: SK.font, fontSize: 16 }}>
          <div><b>A</b>ccess · 접근성 1순위</div>
          <div><b>H</b>uman · 사람과 관계 중시</div>
          <div><b>D</b>iverse · 다양성 선호</div>
          <div><b>F</b>amily · 가족과 가까이</div>
        </div>
        <Stripes h={80} label="[ 일러스트 자리 ]" bg="rgba(255,255,255,0.4)" />
      </Box>

      {/* 추천 시군구 */}
      <div>
        <div style={{ fontFamily: SK.font, fontSize: 20, color: SK.muted }}>당신과 가장 잘 맞는 시군구</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 40, lineHeight: 1, letterSpacing: -1, marginBottom: 16 }}>TOP 5 매칭</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            [1, "전남 순천시", 96, C.green, "다양성·만족도 모두 강함"],
            [2, "서울 노원구", 93, C.yellow, "접근성 ★ · 가족 근접"],
            [3, "제주 서귀포시", 89, C.blue, "지역 친화 · 다양한 프로그램"],
            [4, "대구 수성구", 85, C.pink, "접근성 우수"],
            [5, "경기 성남시", 82, "#fff", "균형 잡힌 인프라"],
          ].map(([rank, name, score, col, note], i) => (
            <Box key={i} style={{ background: col, padding: 12, display: "grid", gridTemplateColumns: "44px 1fr 80px", alignItems: "center", gap: 12 }}>
              <div style={{ fontFamily: SK.fontDisplay, fontSize: 32, color: rank === 1 ? C.red : SK.ink }}>{rank}</div>
              <div>
                <div style={{ fontFamily: SK.fontDisplay, fontSize: 22, lineHeight: 1.1 }}>{name}</div>
                <div style={{ fontFamily: SK.font, fontSize: 13, color: rank === 5 ? SK.muted : SK.ink, marginTop: 2 }}>{note}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: SK.fontDisplay, fontSize: 28, lineHeight: 1 }}>{score}<span style={{ fontSize: 16 }}>%</span></div>
                <div style={{ fontFamily: SK.font, fontSize: 11, color: SK.muted }}>매칭률</div>
              </div>
            </Box>
          ))}
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
          <Tag bg={C.blue}>결과 공유</Tag>
          <Tag bg={C.purple}>이미지 저장</Tag>
          <Tag bg="#fff">다시 진단</Tag>
        </div>
      </div>
    </div>
  </div>
);

// C. 슬라이더 매칭 (즉시 반영) — 가중치를 직접 조정
const Match_Sliders = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 1, letterSpacing: -1.5, marginBottom: 4 }}>내 돌봄 우선순위는?</div>
    <div style={{ fontFamily: SK.font, fontSize: 17, color: SK.muted, marginBottom: 20 }}>슬라이더를 움직이면 추천이 실시간으로 바뀌어요</div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {/* 슬라이더들 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          ["재정 투입", 60, C.yellow],
          ["인프라", 50, C.green],
          ["접근성", 90, C.blue],
          ["다양성", 70, C.pink],
          ["만족도", 80, C.purple],
          ["대응력", 40, C.red],
        ].map(([name, val, col], i) => (
          <Box key={i} style={{ background: "#fff", padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: SK.fontDisplay, fontSize: 22 }}>{name}</span>
              <span style={{ fontFamily: SK.fontDisplay, fontSize: 22, color: col }}>{val}%</span>
            </div>
            <div style={{ position: "relative", height: 22, background: "#f5f5f5", border: SK.border, borderRadius: 11 }}>
              <div style={{ width: `${val}%`, height: "100%", background: col, borderRadius: "10px 0 0 10px", borderRight: SK.border }} />
              <div style={{ position: "absolute", left: `calc(${val}% - 14px)`, top: -4, width: 28, height: 28, background: "#fff", border: SK.borderThick, borderRadius: "50%" }} />
            </div>
          </Box>
        ))}
      </div>

      {/* 라이브 결과 */}
      <div>
        <div style={{ fontFamily: SK.font, fontSize: 14, color: SK.muted, marginBottom: 4 }}>실시간 매칭</div>
        <Box style={{ background: C.green, color: "#fff", padding: 20, marginBottom: 12, border: SK.borderThick }}>
          <div style={{ fontFamily: SK.font, fontSize: 16 }}>1위 매칭</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 0.95, letterSpacing: -1.5 }}>전남 순천시</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 80, lineHeight: 0.9, marginTop: 8 }}>96<span style={{ fontSize: 32 }}>%</span></div>
          <div style={{ fontFamily: SK.font, fontSize: 14, marginTop: 8 }}>접근성·다양성·만족도 모두 상위 10%</div>
        </Box>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            [2, "서울 노원구", 93],
            [3, "제주 서귀포시", 89],
            [4, "대구 수성구", 85],
            [5, "경기 성남시", 82],
            [6, "부산 동래구", 79],
          ].map(([r, n, v], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "30px 1fr auto", alignItems: "center", padding: "8px 12px", background: "#fff", border: SK.border, borderRadius: 8, fontFamily: SK.font, fontSize: 16 }}>
              <span style={{ color: SK.muted }}>{r}</span>
              <span style={{ fontFamily: SK.fontDisplay, fontSize: 18 }}>{n}</span>
              <span style={{ fontFamily: SK.fontDisplay, fontSize: 18 }}>{v}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// D. 카드 스와이프 — 두 옵션 중 하나 고르기 반복 (Tinder 스타일)
const Match_Swipe = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink, position: "relative" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 22 }}>CARE.MATCH</div>
      <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted }}>둘 중 더 끌리는 쪽으로 →</div>
    </div>

    <div style={{ fontFamily: SK.font, fontSize: 18, color: SK.muted, textAlign: "center", marginTop: 8 }}>5 / 12 라운드</div>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 44, textAlign: "center", letterSpacing: -1, marginBottom: 24 }}>이런 동네라면?</div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 20 }}>
      <Box style={{ background: C.blue, color: "#fff", padding: 24, border: SK.borderThick, transform: "rotate(-2deg)", minHeight: 360 }}>
        <div style={{ fontFamily: SK.font, fontSize: 16, opacity: 0.9 }}>OPTION A</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 0.95, letterSpacing: -1.5, marginTop: 8 }}>
          작지만<br />가까운
        </div>
        <Stripes h={120} label="[ 골목길 일러스트 ]" bg="rgba(255,255,255,0.3)" />
        <div style={{ fontFamily: SK.fontBody, fontSize: 15, lineHeight: 1.5, marginTop: 12 }}>
          작은 시설 5분 거리 ·<br />
          종사자 적음 · 익숙한 얼굴
        </div>
      </Box>

      <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, color: C.red, transform: "rotate(-3deg)" }}>VS</div>

      <Box style={{ background: C.green, color: "#fff", padding: 24, border: SK.borderThick, transform: "rotate(1.5deg)", minHeight: 360 }}>
        <div style={{ fontFamily: SK.font, fontSize: 16, opacity: 0.9 }}>OPTION B</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 0.95, letterSpacing: -1.5, marginTop: 8 }}>
          크지만<br />멀리 있는
        </div>
        <Stripes h={120} label="[ 큰 건물 일러스트 ]" bg="rgba(255,255,255,0.3)" />
        <div style={{ fontFamily: SK.fontBody, fontSize: 15, lineHeight: 1.5, marginTop: 12 }}>
          종합복지관 30분 거리 ·<br />
          프로그램 다양 · 새로운 사람
        </div>
      </Box>
    </div>

    <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 24 }}>
      <Box style={{ background: "#fff", padding: "10px 22px", fontFamily: SK.font, fontSize: 16 }}>← 이전</Box>
      <Box style={{ background: "#fff", padding: "10px 22px", fontFamily: SK.font, fontSize: 16 }}>비슷해요</Box>
      <Box style={{ background: "#fff", padding: "10px 22px", fontFamily: SK.font, fontSize: 16 }}>건너뛰기</Box>
    </div>
  </div>
);

// =============================================================
// SCREEN 6: AUTH / LOGIN — 3 user types — 4 variants
// =============================================================

const Auth_RoleSelect = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 48, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 22, marginBottom: 40 }}>CARE.INDEX</div>
    <div style={{ fontFamily: SK.font, fontSize: 22, color: SK.muted }}>당신은 어느 쪽인가요?</div>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 80, lineHeight: 0.95, letterSpacing: -2, marginBottom: 40 }}>
      먼저 <span style={{ background: C.yellow, padding: "0 12px", border: SK.borderThick }}>역할</span>을 골라주세요.
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
      {[
        ["시민", "내 동네 점수 확인,\n나에게 맞는 지역 찾기", C.blue, "👤", ["내 지역 점수", "성향 매칭", "북마크"]],
        ["지자체 담당자", "우리 시군구의\n강·약점 진단 + 컨설팅", C.green, "🏛️", ["인증 가입", "약점 분석", "정책 시뮬레이션"]],
        ["돌봄 공급자", "사회기관 · 사회연대경제\n· 돌봄기업 활동 공간", C.pink, "🤝", ["기관 등록", "수요 매칭", "협력 제안"]],
      ].map(([role, desc, col, ico, perks], i) => (
        <Box key={i} style={{ background: col, color: i === 0 || i === 2 ? SK.ink : "#fff", padding: 22, border: SK.borderThick, transform: `rotate(${[-1, 0.5, -0.5][i]}deg)`, minHeight: 380 }}>
          <div style={{ fontSize: 56 }}>{ico}</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 38, lineHeight: 1, marginTop: 8 }}>{role}</div>
          <div style={{ fontFamily: SK.fontBody, fontSize: 14, marginTop: 8, lineHeight: 1.5, whiteSpace: "pre-line" }}>{desc}</div>
          <div style={{ borderTop: "1.5px dashed currentColor", margin: "16px 0", opacity: 0.4 }} />
          <div style={{ fontFamily: SK.font, fontSize: 14, opacity: 0.85 }}>주요 기능</div>
          {perks.map((p, j) => (
            <div key={j} style={{ fontFamily: SK.fontBody, fontSize: 14, marginTop: 4 }}>· {p}</div>
          ))}
          <div style={{ marginTop: 16, padding: "8px 14px", background: "rgba(255,255,255,0.7)", border: SK.border, borderRadius: 8, textAlign: "center", fontFamily: SK.font, fontSize: 16, color: SK.ink }}>이 역할로 시작 →</div>
        </Box>
      ))}
    </div>

    <div style={{ marginTop: 24, fontFamily: SK.font, fontSize: 14, color: SK.muted, textAlign: "center" }}>
      이미 계정이 있나요? <span style={{ borderBottom: "1.5px solid #1a1a1a", color: SK.ink }}>로그인</span>
    </div>
  </div>
);

const Auth_Login = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 0, fontFamily: SK.fontBody, color: SK.ink, display: "grid", gridTemplateColumns: "1fr 1.2fr" }}>
    {/* left panel: brand */}
    <div style={{ background: C.yellow, padding: 48, position: "relative", borderRight: SK.borderThick }}>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 22, marginBottom: 60 }}>CARE.INDEX</div>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 80, lineHeight: 0.9, letterSpacing: -2 }}>
        다시<br />돌아오신 걸<br />환영해요.
      </div>
      <Scribble color={SK.ink} w={240} h={14} />
      <div style={{ position: "absolute", bottom: 32, left: 48, right: 48, fontFamily: SK.font, fontSize: 14, color: SK.muted }}>
        통합돌봄 데이터를 함께 만들어가는 사람들 —<br />
        시민 12,403명 · 지자체 178곳 · 공급기관 412곳
      </div>
    </div>

    {/* right panel: form */}
    <div style={{ padding: 56, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontFamily: SK.fontDisplay, fontSize: 44, letterSpacing: -1, marginBottom: 4 }}>로그인</div>
      <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted, marginBottom: 28 }}>역할에 맞는 방법으로 들어와주세요</div>

      {/* role tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        <Tag bg={C.blue}>시민</Tag>
        <Tag bg="#fff">지자체 (인증)</Tag>
        <Tag bg="#fff">공급자 (인증)</Tag>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Box style={{ background: "#fff", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, background: "#FEE500", border: SK.border, borderRadius: 6 }} />
          <span style={{ fontFamily: SK.font, fontSize: 18 }}>카카오로 시작하기</span>
        </Box>
        <Box style={{ background: "#fff", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, background: "#03C75A", border: SK.border, borderRadius: 6 }} />
          <span style={{ fontFamily: SK.font, fontSize: 18 }}>네이버로 시작하기</span>
        </Box>
        <Box style={{ background: "#fff", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, background: "#1a1a1a", border: SK.border, borderRadius: 6 }} />
          <span style={{ fontFamily: SK.font, fontSize: 18 }}>정부24 (지자체용)</span>
        </Box>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0", color: SK.muted, fontFamily: SK.font, fontSize: 14 }}>
        <div style={{ flex: 1, height: 1, background: "#ccc" }} />
        또는 이메일로
        <div style={{ flex: 1, height: 1, background: "#ccc" }} />
      </div>

      <Box style={{ background: "#fafafa", padding: "12px 14px", marginBottom: 8, fontFamily: SK.fontBody, color: SK.muted }}>이메일 주소</Box>
      <Box style={{ background: "#fafafa", padding: "12px 14px", marginBottom: 16, fontFamily: SK.fontBody, color: SK.muted }}>비밀번호</Box>
      <Box style={{ background: C.green, color: "#fff", padding: "14px 16px", textAlign: "center", fontFamily: SK.font, fontSize: 20, border: SK.borderThick }}>로그인 →</Box>
    </div>
  </div>
);

// =============================================================
// SCREEN 7: GOV CONSULTING — 지자체 컨설팅 — 4 variants
// =============================================================

const Gov_Diagnosis = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    {/* header bar */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, padding: "8px 14px", background: "#fff", border: SK.border, borderRadius: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: SK.fontDisplay, fontSize: 18 }}>🏛️ 지자체 콘솔</span>
        <Tag bg={C.green}>인증됨</Tag>
        <span style={{ fontFamily: SK.font, fontSize: 14, color: SK.muted }}>전라남도 순천시 · 김담당</span>
      </div>
      <span style={{ fontFamily: SK.font, fontSize: 14, color: SK.muted }}>대시보드 / 진단 / 시뮬레이션 / 보고서</span>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }}>
      {/* 강점 */}
      <Box style={{ background: C.green, color: "#fff", padding: 20, border: SK.borderThick }}>
        <div style={{ fontFamily: SK.font, fontSize: 16 }}>STRENGTH · 우리 시 강점</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 1, letterSpacing: -1.5, marginTop: 4 }}>다양성 88점</div>
        <div style={{ fontFamily: SK.font, fontSize: 14, marginTop: 8 }}>전국 4위 · 광역평균 +21점 · 작년 대비 ▲ 6.2</div>
        <div style={{ marginTop: 14, padding: 12, background: "rgba(255,255,255,0.2)", borderRadius: 8 }}>
          <div style={{ fontFamily: SK.font, fontSize: 14 }}>📌 강점 핵심 지표</div>
          <div style={{ fontFamily: SK.fontBody, fontSize: 14, marginTop: 4, lineHeight: 1.6 }}>
            · 운영중인 돌봄 프로그램 종류: 47종 (전국 평균 28종)<br />
            · 협력 사회기관 수: 32곳<br />
            · 신규 사회연대경제 단체: 11곳 (지난 1년)
          </div>
        </div>
      </Box>

      {/* 약점 */}
      <Box style={{ background: C.pink, padding: 20, border: SK.borderThick }}>
        <div style={{ fontFamily: SK.font, fontSize: 16 }}>WEAKNESS · 우리 시 약점</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 1, letterSpacing: -1.5, marginTop: 4 }}>접근성 70점</div>
        <div style={{ fontFamily: SK.font, fontSize: 14, marginTop: 8 }}>전국 121위 · 도서산간 격차 큼</div>
        <div style={{ marginTop: 14, padding: 12, background: "rgba(255,255,255,0.5)", borderRadius: 8 }}>
          <div style={{ fontFamily: SK.font, fontSize: 14 }}>📌 약점 원인 (분석)</div>
          <div style={{ fontFamily: SK.fontBody, fontSize: 14, marginTop: 4, lineHeight: 1.6 }}>
            · 농산어촌 평균 거리 12.4km (전국 8.2km)<br />
            · 이동수단 부족: 돌봄택시 운영 일수 ↓<br />
            · 대기시간 평균 18일 (목표 7일)
          </div>
        </div>
      </Box>
    </div>

    {/* AI 컨설팅 */}
    <Box style={{ background: "#fff", marginTop: 14, padding: 20, border: SK.borderThick }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <Tag bg={C.purple}>🤖 AI 컨설팅</Tag>
        <span style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted }}>비슷한 규모의 지자체 사례 기반</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          ["1순위", "이동돌봄 차량 +3대", "예상 효과 접근성 +8점", C.yellow],
          ["2순위", "면 단위 거점센터 신설", "예상 효과 접근성 +12점", C.blue],
          ["3순위", "민간 돌봄택시 협약 확대", "예상 효과 대기시간 -5일", C.green],
        ].map(([rank, action, effect, col], i) => (
          <Box key={i} style={{ background: col, color: i === 1 ? "#fff" : SK.ink, padding: 14, border: SK.border }}>
            <div style={{ fontFamily: SK.font, fontSize: 13 }}>{rank}</div>
            <div style={{ fontFamily: SK.fontDisplay, fontSize: 22, lineHeight: 1.1, marginTop: 4 }}>{action}</div>
            <div style={{ fontFamily: SK.font, fontSize: 13, marginTop: 6 }}>{effect}</div>
          </Box>
        ))}
      </div>
    </Box>
  </div>
);

const Gov_Simulator = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
      <div>
        <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted }}>POLICY SIMULATOR</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 48, letterSpacing: -1, lineHeight: 1 }}>예산을 늘리면 점수가 얼마나 오를까?</div>
      </div>
      <Tag bg={C.green}>전남 순천시</Tag>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 18, marginTop: 18 }}>
      {/* 입력 */}
      <Box style={{ background: "#fff", padding: 18 }}>
        <div style={{ fontFamily: SK.font, fontSize: 18, marginBottom: 12 }}>가상 시나리오</div>

        {[
          ["연간 돌봄 예산", "+ 35억", "₩125억 → ₩160억", C.yellow],
          ["주간보호센터", "+ 4곳", "21곳 → 25곳", C.green],
          ["이동돌봄 차량", "+ 3대", "12대 → 15대", C.blue],
          ["요양보호사 채용", "+ 28명", "412명 → 440명", C.pink],
        ].map(([label, delta, range, col], i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: SK.font, fontSize: 16, marginBottom: 4 }}>
              <span>{label}</span>
              <span style={{ color: col, fontFamily: SK.fontDisplay, fontSize: 18 }}>{delta}</span>
            </div>
            <div style={{ position: "relative", height: 20, background: "#f5f5f5", border: SK.border, borderRadius: 10 }}>
              <div style={{ width: `${[60, 70, 50, 65][i]}%`, height: "100%", background: col, borderRadius: "8px 0 0 8px", borderRight: SK.border }} />
            </div>
            <div style={{ fontFamily: SK.font, fontSize: 12, color: SK.muted, marginTop: 2 }}>{range}</div>
          </div>
        ))}
      </Box>

      {/* 결과 */}
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <Box style={{ background: "#fff", padding: 16 }}>
            <div style={{ fontFamily: SK.font, fontSize: 14, color: SK.muted }}>현재</div>
            <div style={{ fontFamily: SK.fontDisplay, fontSize: 64, lineHeight: 0.95 }}>81.1</div>
            <div style={{ fontFamily: SK.font, fontSize: 16 }}>등급 A · 전국 1위</div>
          </Box>
          <Box style={{ background: C.green, color: "#fff", padding: 16, border: SK.borderThick }}>
            <div style={{ fontFamily: SK.font, fontSize: 14, opacity: 0.9 }}>예측 ↗</div>
            <div style={{ fontFamily: SK.fontDisplay, fontSize: 64, lineHeight: 0.95 }}>87.4</div>
            <div style={{ fontFamily: SK.font, fontSize: 16 }}>+ 6.3점 · 신뢰구간 ±1.8</div>
          </Box>
        </div>

        <Box style={{ background: "#fff", padding: 16, marginBottom: 12 }}>
          <div style={{ fontFamily: SK.font, fontSize: 16, marginBottom: 8 }}>차원별 변화 예측</div>
          {[
            ["접근성", 70, 84, C.blue],
            ["인프라", 78, 86, C.green],
            ["다양성", 88, 90, C.pink],
            ["대응력", 84, 88, C.yellow],
          ].map(([d, before, after, col], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 1fr auto", gap: 10, alignItems: "center", marginBottom: 6, fontFamily: SK.fontBody, fontSize: 13 }}>
              <span>{d}</span>
              <div style={{ position: "relative", height: 14, background: "#f5f5f5", border: SK.border, borderRadius: 4 }}>
                <div style={{ position: "absolute", left: 0, width: `${before}%`, height: "100%", background: "#ddd" }} />
                <div style={{ position: "absolute", left: `${before}%`, width: `${after - before}%`, height: "100%", background: col }} />
              </div>
              <span style={{ fontFamily: SK.font, fontWeight: 600 }}>{before}→{after}</span>
            </div>
          ))}
        </Box>

        <Box style={{ background: C.yellow, padding: 14 }}>
          <div style={{ fontFamily: SK.font, fontSize: 14 }}>비용 효율</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 22, lineHeight: 1.1 }}>1점 상승당 5.6억원</div>
          <div style={{ fontFamily: SK.font, fontSize: 12, marginTop: 4 }}>광역 평균 7.2억원 대비 우수</div>
        </Box>
      </div>
    </div>
  </div>
);

// =============================================================
// SCREEN 8: PROVIDER HUB — 돌봄 공급자 (사회기관/사회연대경제/돌봄기업) — 4 variants
// =============================================================

const Provider_Hub = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "8px 14px", background: "#fff", border: SK.border, borderRadius: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: SK.fontDisplay, fontSize: 18 }}>🤝 공급자 허브</span>
        <Tag bg={C.pink}>(주)이웃돌봄협동조합</Tag>
        <span style={{ fontFamily: SK.font, fontSize: 14, color: SK.muted }}>사회연대경제 · 인증완료</span>
      </div>
      <span style={{ fontFamily: SK.font, fontSize: 14, color: SK.muted }}>활동 / 매칭 / 협력 / 데이터기여</span>
    </div>

    <div style={{ fontFamily: SK.font, fontSize: 18, color: SK.muted, marginBottom: 4 }}>오늘 우리 기관은</div>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 0.95, letterSpacing: -1.5, marginBottom: 18 }}>
      4개 시군구에서 돌봄을 만들고 있어요.
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
      {[
        ["활동 지역", "4", "시군구", C.yellow],
        ["수요 매칭", "23", "건 / 이번 달", C.blue],
        ["협력 제안", "7", "건 진행 중", C.green],
        ["데이터 기여", "412", "포인트", C.pink],
      ].map(([label, n, sub, col], i) => (
        <Box key={i} style={{ background: col, color: i === 2 ? "#fff" : SK.ink, padding: 14 }}>
          <div style={{ fontFamily: SK.font, fontSize: 14 }}>{label}</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 56, lineHeight: 0.95 }}>{n}</div>
          <div style={{ fontFamily: SK.font, fontSize: 13 }}>{sub}</div>
        </Box>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 12, marginTop: 12 }}>
      {/* 수요 매칭 */}
      <Box style={{ background: "#fff", padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: SK.fontDisplay, fontSize: 22 }}>새로운 수요 매칭</span>
          <Tag bg={C.yellow}>3건 신규</Tag>
        </div>
        {[
          ["전남 순천시", "주간보호 프로그램 다양화", "긴급도 ●●○", C.green],
          ["전남 광양시", "치매 안심마을 조성 협력", "긴급도 ●○○", C.blue],
          ["경남 하동군", "이동돌봄 차량 운영 위탁", "긴급도 ●●●", C.red],
        ].map(([region, need, urg, col], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 10, alignItems: "center", padding: "10px 4px", borderBottom: i < 2 ? "1px dashed #ddd" : "none" }}>
            <div style={{ width: 8, height: 8, background: col, borderRadius: 4, border: "1px solid #1a1a1a" }} />
            <div>
              <div style={{ fontFamily: SK.fontDisplay, fontSize: 18 }}>{region}</div>
              <div style={{ fontFamily: SK.fontBody, fontSize: 14, color: SK.muted }}>{need}</div>
            </div>
            <span style={{ fontFamily: SK.font, fontSize: 13 }}>{urg}</span>
            <Tag bg="#fff">제안하기</Tag>
          </div>
        ))}
      </Box>

      {/* 우리가 만든 변화 */}
      <Box style={{ background: C.purple, color: "#fff", padding: 16, border: SK.borderThick }}>
        <div style={{ fontFamily: SK.font, fontSize: 14 }}>우리가 기여한 점수</div>
        <div style={{ fontFamily: SK.fontDisplay, fontSize: 40, lineHeight: 1, marginTop: 4 }}>+ 4.2점</div>
        <div style={{ fontFamily: SK.font, fontSize: 13, marginTop: 4 }}>활동 지역 평균 다양성 점수 기여</div>
        <div style={{ borderTop: "1.5px dashed rgba(255,255,255,0.5)", margin: "12px 0" }} />
        <div style={{ fontFamily: SK.fontBody, fontSize: 13, lineHeight: 1.6 }}>
          · 순천시 다양성 +6.1<br />
          · 광양시 만족도 +3.4<br />
          · 하동군 접근성 +2.8<br />
          · 곡성군 대응력 +4.5
        </div>
        <div style={{ marginTop: 12, fontFamily: SK.font, fontSize: 13 }}>임팩트 리포트 받기 →</div>
      </Box>
    </div>
  </div>
);

const Provider_Map = () => (
  <div style={{ width: 1200, height: 760, background: SK.bg, padding: 32, fontFamily: SK.fontBody, color: SK.ink }}>
    <div style={{ fontFamily: SK.fontDisplay, fontSize: 48, letterSpacing: -1, marginBottom: 4 }}>돌봄을 만드는 사람들</div>
    <div style={{ fontFamily: SK.font, fontSize: 16, color: SK.muted, marginBottom: 16 }}>전국 사회기관 · 사회연대경제 · 돌봄기업 지도</div>

    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Box style={{ background: "#fff", padding: 12 }}>
          <div style={{ fontFamily: SK.font, fontSize: 14, marginBottom: 6 }}>유형 필터</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: SK.fontBody, fontSize: 14 }}>
            <label><input type="checkbox" defaultChecked /> 사회복지기관 (218)</label>
            <label><input type="checkbox" defaultChecked /> 사회연대경제 (94)</label>
            <label><input type="checkbox" defaultChecked /> 돌봄기업 (172)</label>
            <label><input type="checkbox" /> 자원봉사단체 (61)</label>
            <label><input type="checkbox" /> 마을공동체 (38)</label>
          </div>
        </Box>
        <Box style={{ background: "#fff", padding: 12 }}>
          <div style={{ fontFamily: SK.font, fontSize: 14, marginBottom: 6 }}>활동 유형</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {["주간보호", "방문돌봄", "치매", "장애", "이동", "식사", "주거"].map((t, i) => (
              <Tag key={i} bg={i < 3 ? C.yellow : "#fff"}>{t}</Tag>
            ))}
          </div>
        </Box>
        <Box style={{ background: C.green, color: "#fff" }}>
          <div style={{ fontFamily: SK.font, fontSize: 14 }}>총 표시</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 32, lineHeight: 1 }}>484곳</div>
          <div style={{ fontFamily: SK.font, fontSize: 12 }}>17개 광역 / 142개 시군구</div>
        </Box>
      </div>

      <Box style={{ background: "#fff", padding: 16, height: 580, position: "relative" }}>
        <Stripes h={520} label="[ 한국 지도 + 점 클러스터 / 색=유형 ]" bg={C.pink} />
        <Box style={{ position: "absolute", top: 28, right: 28, background: "#fff", padding: 10, width: 220, border: SK.borderThick, transform: "rotate(-1deg)" }}>
          <div style={{ fontFamily: SK.font, fontSize: 12, color: SK.muted }}>HOVER</div>
          <div style={{ fontFamily: SK.fontDisplay, fontSize: 18, lineHeight: 1.1 }}>이웃돌봄 협동조합</div>
          <div style={{ fontFamily: SK.font, fontSize: 12, color: SK.muted, marginTop: 2 }}>사회연대경제 · 순천</div>
          <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
            <Tag bg={C.yellow}>주간보호</Tag>
            <Tag bg={C.blue}>이동</Tag>
          </div>
        </Box>
      </Box>
    </div>
  </div>
);

// =============================================================
// PALETTES (Tweaks)
// =============================================================

const PALETTES = {
  klaci: { paper: "#FAF7F0", red: "#FF5A4E", yellow: "#FFD23F", blue: "#4E8CFF", green: "#5CC97A", pink: "#FF8FB1", purple: "#B383E8" },
  pastel: { paper: "#FFF8F2", red: "#F4A8A0", yellow: "#FFE7A0", blue: "#A8C8F4", green: "#A8E0B5", pink: "#F4C2D4", purple: "#D4B8E8" },
  riso: { paper: "#F5F0E8", red: "#FF4F3E", yellow: "#FFB000", blue: "#0066CC", green: "#00A651", pink: "#FF6B9D", purple: "#7E3F98" },
  mono: { paper: "#F4F4F0", red: "#1a1a1a", yellow: "#1a1a1a", blue: "#1a1a1a", green: "#1a1a1a", pink: "#666", purple: "#999" },
  govt: { paper: "#F5F7FA", red: "#C8453E", yellow: "#E0A841", blue: "#2D5BA8", green: "#3F8C5C", pink: "#A85C7E", purple: "#5E4B8C" },
};

window.WIREFRAMES = {
  Home_BigType, Home_Dashboard, Home_Map, Home_QuizStart,
  Detail_BigScore, Detail_TypeCard, Detail_Story, Detail_Receipt,
  Compare_SideBySide, Compare_VS, Compare_Table, Compare_Radar,
  Rank_BigList, Rank_Tiers, Rank_BeeSwarm, Rank_MapHeat,
  Match_Quiz, Match_Result, Match_Sliders, Match_Swipe,
  Auth_RoleSelect, Auth_Login,
  Gov_Diagnosis, Gov_Simulator,
  Provider_Hub, Provider_Map,
  PALETTES,
};
