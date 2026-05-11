// ERD — 통합돌봄 데이터 모델
// Sketchy hand-drawn vibe to match wireframes

const ESK = {
  border: "2px solid #1a1a1a",
  borderThick: "3px solid #1a1a1a",
  borderDashed: "2px dashed #1a1a1a",
  ink: "#1a1a1a",
  muted: "#6b6b6b",
  font: "'Caveat', 'Gowun Dodum', cursive",
  fontBody: "'Gowun Dodum', sans-serif",
  fontDisplay: "'Archivo Black', 'Black Han Sans', sans-serif",
  fontMono: "ui-monospace, 'Menlo', monospace",
};

const EC = {
  red: "var(--c-red, #FF5A4E)",
  yellow: "var(--c-yellow, #FFD23F)",
  blue: "var(--c-blue, #4E8CFF)",
  green: "var(--c-green, #5CC97A)",
  pink: "var(--c-pink, #FF8FB1)",
  purple: "var(--c-purple, #B383E8)",
  paper: "var(--paper, #FAF7F0)",
};

// Entity card — like a hand-drawn DB table
const Entity = ({ name, color, fields, x, y, w = 220, note }) => (
  <div style={{
    position: "absolute", left: x, top: y, width: w,
    background: "#fff",
    border: ESK.borderThick,
    borderRadius: "10px 14px 8px 16px / 12px 8px 16px 10px",
    fontFamily: ESK.fontMono,
    fontSize: 12,
    boxShadow: "3px 4px 0 rgba(0,0,0,0.08)",
  }}>
    <div style={{
      background: color, padding: "8px 12px",
      borderBottom: ESK.border,
      fontFamily: ESK.fontDisplay, fontSize: 16,
      letterSpacing: -0.3,
      borderRadius: "8px 12px 0 0 / 10px 6px 0 0",
      color: color === EC.yellow || color === "#fff" ? ESK.ink : "#fff",
    }}>{name}</div>
    <div style={{ padding: "8px 12px" }}>
      {fields.map((f, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between",
          padding: "3px 0", borderBottom: i < fields.length - 1 ? "1px dashed #ddd" : "none",
          color: f[2] === "pk" ? EC.red : f[2] === "fk" ? EC.blue : ESK.ink,
          fontWeight: f[2] === "pk" ? 600 : 400,
        }}>
          <span>{f[2] === "pk" ? "🔑 " : f[2] === "fk" ? "↗ " : "  "}{f[0]}</span>
          <span style={{ color: ESK.muted, fontSize: 11 }}>{f[1]}</span>
        </div>
      ))}
    </div>
    {note && (
      <div style={{
        padding: "6px 12px", borderTop: ESK.borderDashed,
        fontFamily: ESK.font, fontSize: 13, color: ESK.muted,
        background: "rgba(0,0,0,0.03)",
        borderRadius: "0 0 8px 16px / 0 0 16px 10px",
      }}>{note}</div>
    )}
  </div>
);

// Hand-drawn arrow between two points (with slight wobble)
const Arrow = ({ x1, y1, x2, y2, label, color = "#1a1a1a", curve = 0, labelBg = "#fff" }) => {
  const mx = (x1 + x2) / 2 + curve;
  const my = (y1 + y2) / 2 - Math.abs(curve) * 0.3;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
      <defs>
        <marker id={`ah-${color.replace(/[^a-z0-9]/gi, "")}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
        </marker>
      </defs>
      <path
        d={`M ${x1} ${y1} Q ${mx} ${my}, ${x2} ${y2}`}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        markerEnd={`url(#ah-${color.replace(/[^a-z0-9]/gi, "")})`}
      />
      {label && (
        <foreignObject x={mx - 50} y={my - 14} width="100" height="24">
          <div style={{
            fontFamily: ESK.font, fontSize: 13, textAlign: "center",
            background: labelBg, border: "1.5px solid #1a1a1a", borderRadius: 4,
            padding: "1px 6px", display: "inline-block", color: ESK.ink,
          }}>{label}</div>
        </foreignObject>
      )}
    </svg>
  );
};

const Title = ({ children, color = EC.yellow, sub }) => (
  <div style={{ position: "absolute", top: 24, left: 32 }}>
    <div style={{ fontFamily: ESK.font, fontSize: 18, color: ESK.muted }}>ENTITY-RELATIONSHIP DIAGRAM</div>
    <div style={{
      fontFamily: ESK.fontDisplay, fontSize: 44, lineHeight: 0.95,
      letterSpacing: -1.2,
      display: "inline-block",
    }}>
      {children}
    </div>
    {sub && <div style={{ fontFamily: ESK.font, fontSize: 18, color: ESK.muted, marginTop: 4 }}>{sub}</div>}
  </div>
);

const Legend = ({ x = 980, y = 24 }) => (
  <div style={{
    position: "absolute", left: x, top: y,
    background: "#fff", border: ESK.border, borderRadius: 8, padding: 10,
    fontFamily: ESK.fontMono, fontSize: 11, lineHeight: 1.6,
  }}>
    <div style={{ fontFamily: ESK.fontDisplay, fontSize: 12, marginBottom: 4 }}>LEGEND</div>
    <div><span style={{ color: EC.red }}>🔑</span> primary key</div>
    <div><span style={{ color: EC.blue }}>↗</span> foreign key</div>
    <div>—— 1 : N</div>
    <div>·····  N : N (junction)</div>
  </div>
);

// =============================================================
// VIEW 1: OVERVIEW — All entities, color-coded by domain
// =============================================================

const ERD_Overview = () => (
  <div style={{
    width: 1600, height: 1000, background: EC.paper, position: "relative",
    fontFamily: ESK.fontBody, color: ESK.ink, overflow: "hidden",
  }}>
    <Title sub="전체 엔티티 — 6개 도메인 색상 구분">통합돌봄 데이터 모델</Title>
    <Legend x={1380} />

    {/* domain background bands */}
    <div style={{ position: "absolute", left: 24, top: 130, width: 1550, height: 850 }}>
      {/* faint domain labels */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 360, height: 410, background: "rgba(78,140,255,0.06)", border: ESK.borderDashed, borderRadius: 12 }}>
        <div style={{ fontFamily: ESK.font, fontSize: 14, color: EC.blue, padding: 6 }}>① 지역 · 행정구역</div>
      </div>
      <div style={{ position: "absolute", left: 380, top: 0, width: 580, height: 410, background: "rgba(92,201,122,0.06)", border: ESK.borderDashed, borderRadius: 12 }}>
        <div style={{ fontFamily: ESK.font, fontSize: 14, color: EC.green, padding: 6 }}>② 점수 · 6차원 측정</div>
      </div>
      <div style={{ position: "absolute", left: 980, top: 0, width: 540, height: 410, background: "rgba(255,143,177,0.08)", border: ESK.borderDashed, borderRadius: 12 }}>
        <div style={{ fontFamily: ESK.font, fontSize: 14, color: EC.pink, padding: 6 }}>③ 공급자 · 시설</div>
      </div>
      <div style={{ position: "absolute", left: 0, top: 430, width: 500, height: 400, background: "rgba(179,131,232,0.08)", border: ESK.borderDashed, borderRadius: 12 }}>
        <div style={{ fontFamily: ESK.font, fontSize: 14, color: EC.purple, padding: 6 }}>④ 사용자 · 인증</div>
      </div>
      <div style={{ position: "absolute", left: 520, top: 430, width: 480, height: 400, background: "rgba(255,210,63,0.10)", border: ESK.borderDashed, borderRadius: 12 }}>
        <div style={{ fontFamily: ESK.font, fontSize: 14, color: "#a07e1a", padding: 6 }}>⑤ 매칭 · 진단</div>
      </div>
      <div style={{ position: "absolute", left: 1020, top: 430, width: 500, height: 400, background: "rgba(255,90,78,0.06)", border: ESK.borderDashed, borderRadius: 12 }}>
        <div style={{ fontFamily: ESK.font, fontSize: 14, color: EC.red, padding: 6 }}>⑥ 컨설팅 · 시뮬레이션</div>
      </div>
    </div>

    {/* ===== 1. REGION ===== */}
    <Entity x={50} y={170} w={300} color={EC.blue} name="region" note="17 광역 + 229 시군구"
      fields={[
        ["region_id", "uuid", "pk"],
        ["code", "char(10)"],
        ["level", "enum(시도,시군구)"],
        ["name_ko", "text"],
        ["parent_id", "uuid", "fk→region"],
        ["population", "int"],
        ["aging_rate", "decimal"],
        ["fiscal_independence", "decimal"],
        ["geom", "geometry"],
      ]}
    />

    {/* ===== 2. SCORES ===== */}
    <Entity x={410} y={170} w={260} color={EC.green} name="score_snapshot" note="시점별 종합점수"
      fields={[
        ["snapshot_id", "uuid", "pk"],
        ["region_id", "uuid", "fk→region"],
        ["period", "yyyymm"],
        ["total", "decimal"],
        ["grade", "enum(A,B,C,D)"],
        ["national_rank", "int"],
        ["computed_at", "ts"],
      ]}
    />
    <Entity x={700} y={170} w={240} color={EC.green} name="dimension_score" note="6차원 × 지역 × 시점"
      fields={[
        ["id", "uuid", "pk"],
        ["snapshot_id", "uuid", "fk"],
        ["dimension", "enum(6)"],
        ["raw_value", "decimal"],
        ["normalized", "decimal"],
        ["weight", "decimal"],
      ]}
    />
    <Entity x={410} y={420} w={260} color={EC.green} name="raw_indicator" note="원시 지표 — 차원 산출 입력"
      fields={[
        ["id", "uuid", "pk"],
        ["region_id", "uuid", "fk"],
        ["indicator_code", "text"],
        ["period", "yyyymm"],
        ["value", "decimal"],
        ["source", "text"],
      ]}
    />

    {/* ===== 3. PROVIDERS ===== */}
    <Entity x={1010} y={170} w={260} color={EC.pink} name="provider" note="기관·사회연대경제·기업"
      fields={[
        ["provider_id", "uuid", "pk"],
        ["legal_name", "text"],
        ["type", "enum(복지기관,사회연대,기업,자원봉사)"],
        ["biz_no", "char(10)"],
        ["region_id", "uuid", "fk"],
        ["verified", "bool"],
        ["established_at", "date"],
      ]}
    />
    <Entity x={1300} y={170} w={210} color={EC.pink} name="facility" note="실제 운영 시설(주간보호 등)"
      fields={[
        ["facility_id", "uuid", "pk"],
        ["provider_id", "uuid", "fk"],
        ["region_id", "uuid", "fk"],
        ["category", "enum"],
        ["capacity", "int"],
        ["staff_count", "int"],
        ["lat", "decimal"],
        ["lng", "decimal"],
      ]}
    />
    <Entity x={1010} y={350} w={250} color={EC.pink} name="service_program"
      fields={[
        ["program_id", "uuid", "pk"],
        ["provider_id", "uuid", "fk"],
        ["category", "enum(주간보호, 방문, 치매,...)"],
        ["target_group", "text"],
        ["price_model", "text"],
      ]}
    />

    {/* ===== 4. USERS ===== */}
    <Entity x={50} y={600} w={220} color={EC.purple} name="user_account"
      fields={[
        ["user_id", "uuid", "pk"],
        ["role", "enum(citizen,gov,provider)"],
        ["email", "text"],
        ["auth_provider", "enum(kakao,naver,gov24,email)"],
        ["created_at", "ts"],
      ]}
    />
    <Entity x={290} y={600} w={200} color={EC.purple} name="user_role_link" note="N:N 권한"
      fields={[
        ["id", "uuid", "pk"],
        ["user_id", "uuid", "fk"],
        ["region_id", "uuid", "fk?"],
        ["provider_id", "uuid", "fk?"],
        ["scope", "enum(read,edit,admin)"],
      ]}
    />

    {/* ===== 5. MATCHING ===== */}
    <Entity x={550} y={600} w={220} color={EC.yellow} name="diagnosis"
      fields={[
        ["diagnosis_id", "uuid", "pk"],
        ["user_id", "uuid", "fk"],
        ["weights", "json(6dim)"],
        ["type_code", "char(4)"],
        ["created_at", "ts"],
      ]}
    />
    <Entity x={790} y={600} w={200} color={EC.yellow} name="match_result"
      fields={[
        ["id", "uuid", "pk"],
        ["diagnosis_id", "uuid", "fk"],
        ["region_id", "uuid", "fk"],
        ["match_pct", "decimal"],
        ["rank", "int"],
      ]}
    />

    {/* ===== 6. CONSULTING ===== */}
    <Entity x={1050} y={600} w={220} color={EC.red} name="simulation"
      fields={[
        ["sim_id", "uuid", "pk"],
        ["region_id", "uuid", "fk"],
        ["created_by", "uuid", "fk→user"],
        ["scenario", "json"],
        ["predicted_score", "decimal"],
        ["confidence", "decimal"],
      ]}
    />
    <Entity x={1290} y={600} w={220} color={EC.red} name="recommendation" note="AI 처방"
      fields={[
        ["rec_id", "uuid", "pk"],
        ["region_id", "uuid", "fk"],
        ["weakness_dim", "enum"],
        ["action", "text"],
        ["est_score_lift", "decimal"],
        ["est_cost_krw", "bigint"],
      ]}
    />
    <Entity x={1050} y={800} w={220} color={EC.red} name="demand_signal" note="지자체 → 공급자"
      fields={[
        ["id", "uuid", "pk"],
        ["region_id", "uuid", "fk"],
        ["category", "enum"],
        ["urgency", "enum(low,med,high)"],
        ["status", "enum"],
      ]}
    />

    {/* ===== arrows — region as hub ===== */}
    <Arrow x1={350} y1={250} x2={410} y2={210} label="1:N" color={EC.blue} />
    <Arrow x1={350} y1={460} x2={410} y2={460} label="1:N" color={EC.blue} />
    <Arrow x1={350} y1={300} x2={1010} y2={250} label="1:N" curve={-60} color={EC.blue} />
    <Arrow x1={350} y1={320} x2={1300} y2={250} label="1:N" curve={-100} color={EC.blue} labelBg="#fff" />

    {/* score chain */}
    <Arrow x1={670} y1={250} x2={700} y2={250} label="1:6" color={EC.green} />
    <Arrow x1={540} y1={350} x2={540} y2={420} label="rolls up" color={EC.green} />

    {/* provider chain */}
    <Arrow x1={1140} y1={310} x2={1290} y2={210} label="1:N" color={EC.pink} curve={30} />
    <Arrow x1={1140} y1={310} x2={1135} y2={350} label="1:N" color={EC.pink} />

    {/* user → diagnosis / match */}
    <Arrow x1={270} y1={680} x2={550} y2={680} label="1:N" color={EC.purple} />
    <Arrow x1={770} y1={680} x2={790} y2={680} label="1:N" color={EC.yellow} />
    <Arrow x1={890} y1={700} x2={350} y2={300} label="추천" color={EC.yellow} curve={150} />

    {/* user → simulation */}
    <Arrow x1={270} y1={650} x2={1050} y2={650} label="created_by" color={EC.purple} curve={-200} labelBg={EC.paper} />

    {/* simulation → region */}
    <Arrow x1={1050} y1={650} x2={350} y2={300} label="region" color={EC.red} curve={-300} labelBg={EC.paper} />

    {/* recommendation → demand signal */}
    <Arrow x1={1400} y1={780} x2={1270} y2={840} label="generates" color={EC.red} />

    {/* demand signal → provider */}
    <Arrow x1={1160} y1={800} x2={1140} y2={310} label="알림" color={EC.red} curve={250} labelBg={EC.paper} />

    {/* footer key */}
    <div style={{
      position: "absolute", bottom: 16, left: 32, right: 32,
      fontFamily: ESK.font, fontSize: 14, color: ESK.muted,
      display: "flex", justifyContent: "space-between",
    }}>
      <span>★ region 이 모든 도메인의 허브 — 모든 점수·시설·공급자·시뮬은 region_id 로 묶임</span>
      <span>v0.1 · 2026.04</span>
    </div>
  </div>
);

// =============================================================
// VIEW 2: SCORE COMPUTATION FLOW — How a score is built
// =============================================================

const ERD_ScoreFlow = () => (
  <div style={{
    width: 1600, height: 1000, background: EC.paper, position: "relative",
    fontFamily: ESK.fontBody, color: ESK.ink, overflow: "hidden",
  }}>
    <Title sub="원시 지표 → 차원 점수 → 종합점수 흐름">점수가 만들어지는 길</Title>

    {/* 4 stages: source → raw_indicator → dimension_score → score_snapshot */}
    <div style={{ position: "absolute", left: 32, top: 140, right: 32, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
      {[
        ["1. SOURCE", "외부 데이터 소스", EC.blue, "공공데이터포털\n· KOSIS\n· 보건복지부\n· 지방재정365\n· 카카오/네이버 API\n· 자체 설문"],
        ["2. INGEST", "raw_indicator 적재", EC.yellow, "indicator_code\nregion_id, period\nvalue, source\n→ 원본 보존"],
        ["3. NORMALIZE", "dimension_score 산출", EC.green, "min-max 또는 z-score\n· 인구·면적 보정\n· 차원별 가중치\n· 0-100 스케일"],
        ["4. AGGREGATE", "score_snapshot 종합", EC.red, "Σ(차원 × 가중치)\n→ total\n→ grade A/B/C/D\n→ national_rank"],
      ].map(([step, name, col, body], i) => (
        <div key={i} style={{
          background: col, color: col === EC.yellow ? ESK.ink : "#fff",
          border: ESK.borderThick, borderRadius: "12px 16px 10px 18px / 14px 10px 18px 12px",
          padding: 16, minHeight: 200,
          transform: `rotate(${[-1, 0.5, -0.5, 0.8][i]}deg)`,
        }}>
          <div style={{ fontFamily: ESK.font, fontSize: 16, opacity: 0.85 }}>{step}</div>
          <div style={{ fontFamily: ESK.fontDisplay, fontSize: 26, lineHeight: 1.05, marginTop: 4 }}>{name}</div>
          <div style={{ fontFamily: ESK.fontMono, fontSize: 12, marginTop: 12, lineHeight: 1.7, whiteSpace: "pre-line" }}>{body}</div>
        </div>
      ))}
    </div>

    {/* big arrows between */}
    <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", justifyContent: "space-around", pointerEvents: "none" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ fontFamily: ESK.fontDisplay, fontSize: 60, color: ESK.ink, transform: "translateX(160px) rotate(-3deg)" }}>→</div>
      ))}
    </div>

    {/* Concrete example */}
    <div style={{ position: "absolute", left: 32, top: 410, right: 32 }}>
      <div style={{ fontFamily: ESK.font, fontSize: 18, color: ESK.muted, marginBottom: 6 }}>구체 예시 — '접근성' 차원</div>
      <div style={{ fontFamily: ESK.fontDisplay, fontSize: 32, letterSpacing: -0.8, marginBottom: 14 }}>
        시군구 평균 시설까지 거리 → 접근성 점수
      </div>
    </div>

    {/* Example flow */}
    <Entity x={50} y={520} w={260} color="#fff" name="raw_indicator (3 rows)" note="소스 그대로"
      fields={[
        ["서울 노원 / 평균거리", "0.8 km", ""],
        ["전남 신안 / 평균거리", "12.4 km", ""],
        ["전남 신안 / 대기일수", "21 일", ""],
        ["...", "...", ""],
      ]}
    />
    <Entity x={450} y={520} w={260} color={EC.yellow} name="정규화 함수" note="피지표별 다른 변환"
      fields={[
        ["거리: 1 / (1 + log(km))", "→ 0~1", ""],
        ["대기: 1 - (days / 30)", "→ 0~1", ""],
        ["0-100 스케일 환산", "× 100", ""],
        ["인구 가중 평균", "weighted", ""],
      ]}
    />
    <Entity x={850} y={520} w={260} color={EC.green} name="dimension_score" note="차원별 1행 / 시점·지역"
      fields={[
        ["서울 노원 · 접근성 · 2026-04", "81.2", ""],
        ["전남 신안 · 접근성 · 2026-04", "38.6", ""],
        ["weight (사용자/지역)", "0.20", ""],
      ]}
    />
    <Entity x={1250} y={520} w={280} color={EC.red} name="score_snapshot" note="6 dim × weight 합계"
      fields={[
        ["region · period", "노원·2026-04", ""],
        ["total", "73.8", ""],
        ["grade", "B+", ""],
        ["national_rank", "18 / 229", ""],
      ]}
    />

    {/* Arrows along the example */}
    <Arrow x1={310} y1={580} x2={450} y2={580} label="apply" color={EC.yellow} />
    <Arrow x1={710} y1={580} x2={850} y2={580} label="store" color={EC.green} />
    <Arrow x1={1110} y1={580} x2={1250} y2={580} label="aggregate" color={EC.red} />

    {/* Custom weights branch */}
    <div style={{ position: "absolute", left: 32, top: 760, right: 32 }}>
      <div style={{ fontFamily: ESK.font, fontSize: 18, color: ESK.muted }}>분기 — 사용자 가중치(diagnosis)가 들어오면</div>
      <div style={{ fontFamily: ESK.fontDisplay, fontSize: 28, letterSpacing: -0.5, marginBottom: 14 }}>
        같은 dimension_score → 다른 total. 매칭률 산출에 활용.
      </div>
    </div>

    <Entity x={450} y={840} w={300} color={EC.purple} name="diagnosis.weights"
      fields={[
        ["finance", "0.10", ""],
        ["infrastructure", "0.15", ""],
        ["accessibility", "0.30", ""],
        ["diversity", "0.20", ""],
        ["satisfaction", "0.15", ""],
        ["responsiveness", "0.10", ""],
      ]}
    />
    <Entity x={850} y={840} w={260} color={EC.yellow} name="match_result"
      fields={[
        ["region_id", "uuid", "fk"],
        ["match_pct", "0~100", ""],
        ["rank (개인 기준)", "int", ""],
      ]}
    />
    <Arrow x1={750} y1={900} x2={850} y2={900} label="1 진단당 N개" color={EC.purple} />
    <Arrow x1={970} y1={580} x2={970} y2={840} label="dimension_score · weight" color={EC.purple} curve={-60} />
  </div>
);

// =============================================================
// VIEW 3: STAKEHOLDER → TABLE map
// =============================================================

const ERD_Stakeholder = () => (
  <div style={{
    width: 1600, height: 1000, background: EC.paper, position: "relative",
    fontFamily: ESK.fontBody, color: ESK.ink, overflow: "hidden",
  }}>
    <Title sub="누가 어떤 테이블을 읽고/쓰나 — 권한 매트릭스 + 핵심 흐름">이해당사자별 데이터 접근</Title>

    {/* Three stakeholder cards on top */}
    <div style={{ position: "absolute", top: 150, left: 32, right: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
      {[
        {
          role: "시민",
          ico: "👤",
          col: EC.blue,
          read: ["region", "score_snapshot", "dimension_score", "facility", "provider"],
          write: ["user_account", "diagnosis", "match_result(派생)", "bookmark"],
        },
        {
          role: "지자체 담당자",
          ico: "🏛️",
          col: EC.green,
          read: ["region(자기지역)", "raw_indicator", "score_snapshot(전체)", "demand_signal", "유사지자체"],
          write: ["raw_indicator(검증)", "simulation", "demand_signal", "report"],
        },
        {
          role: "돌봄 공급자",
          ico: "🤝",
          col: EC.pink,
          read: ["region", "demand_signal", "score_snapshot", "다른 provider"],
          write: ["provider(자기)", "facility", "service_program", "proposal"],
        },
      ].map((s, i) => (
        <div key={i} style={{
          background: s.col, color: s.col === EC.pink || s.col === EC.yellow ? ESK.ink : "#fff",
          border: ESK.borderThick, borderRadius: "12px 16px 10px 18px / 14px 10px 18px 12px",
          padding: 18, transform: `rotate(${[-0.8, 0.4, -0.5][i]}deg)`,
        }}>
          <div style={{ fontSize: 36 }}>{s.ico}</div>
          <div style={{ fontFamily: ESK.fontDisplay, fontSize: 30, lineHeight: 1, marginTop: 4 }}>{s.role}</div>
          <div style={{ marginTop: 12, padding: 10, background: "rgba(255,255,255,0.4)", borderRadius: 8 }}>
            <div style={{ fontFamily: ESK.font, fontSize: 14, color: ESK.ink }}>📖 READ</div>
            <div style={{ fontFamily: ESK.fontMono, fontSize: 11, marginTop: 4, color: ESK.ink, lineHeight: 1.6 }}>
              {s.read.map((r, j) => <div key={j}>· {r}</div>)}
            </div>
          </div>
          <div style={{ marginTop: 8, padding: 10, background: "rgba(255,255,255,0.7)", borderRadius: 8 }}>
            <div style={{ fontFamily: ESK.font, fontSize: 14, color: ESK.ink }}>✏️ WRITE</div>
            <div style={{ fontFamily: ESK.fontMono, fontSize: 11, marginTop: 4, color: ESK.ink, lineHeight: 1.6 }}>
              {s.write.map((w, j) => <div key={j}>· {w}</div>)}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Cross-stakeholder flows */}
    <div style={{ position: "absolute", top: 620, left: 32 }}>
      <div style={{ fontFamily: ESK.font, fontSize: 18, color: ESK.muted, marginBottom: 6 }}>도메인을 가로지르는 핵심 흐름</div>
      <div style={{ fontFamily: ESK.fontDisplay, fontSize: 32, letterSpacing: -0.8 }}>3가지 황금 경로</div>
    </div>

    <div style={{ position: "absolute", top: 730, left: 32, right: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
      {[
        {
          title: "① 시민 추천 흐름",
          color: EC.blue,
          steps: ["user → diagnosis 작성", "weights × dimension_score 계산", "→ match_result N개 생성", "→ region 카드 추천"],
        },
        {
          title: "② 지자체 처방 흐름",
          color: EC.green,
          steps: ["raw_indicator 적재 (정기)", "→ score_snapshot 산출", "약점 차원 → recommendation", "→ demand_signal 발행"],
        },
        {
          title: "③ 공급자 매칭 흐름",
          color: EC.pink,
          steps: ["demand_signal 알림", "→ provider 가 proposal", "→ 협력 체결 (외부)", "→ facility/program 갱신"],
        },
      ].map((flow, i) => (
        <div key={i} style={{
          background: "#fff", border: ESK.borderThick,
          borderLeft: `8px solid ${flow.color}`,
          borderRadius: "10px 14px 8px 16px / 12px 8px 16px 10px",
          padding: 14,
        }}>
          <div style={{ fontFamily: ESK.fontDisplay, fontSize: 22, lineHeight: 1.1 }}>{flow.title}</div>
          <div style={{ marginTop: 10 }}>
            {flow.steps.map((s, j) => (
              <div key={j} style={{ fontFamily: ESK.fontMono, fontSize: 12, padding: "4px 0", borderBottom: j < flow.steps.length - 1 ? "1px dashed #ddd" : "none" }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

window.ERD = { ERD_Overview, ERD_ScoreFlow, ERD_Stakeholder };
