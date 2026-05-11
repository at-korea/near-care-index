// CARE.INDEX × NEAR v0.7 — Korea Community Care Capacity Index (가중치판)
// 출처: KCCI Phase 2-C / NEAR Care Index (229 시군구 × N·R·A·E + 4사분면)
// 점수: NEAR_A = clip( 0.45*R + 0.30*A + 0.25*E - 0.6*N + 50, 0, 100 )
// 민감도: ±15% 가중치 변동 시 분류 안정성 96.4%

window.CARE_DATA = (function() {
  const PILLARS = ["N", "E", "A", "R"];
  const PILLAR_KO = { N: "욕구", E: "결속", A: "접근", R: "자원" };
  const PILLAR_FULL = {
    N: "Needs · 욕구·필요",
    E: "Engagement · 결속·지역참여",
    A: "Access · 접근·접근성",
    R: "Resources · 자원·공급역량",
  };
  const PILLAR_DESC = {
    N: "누가 얼마나 돌봄이 필요한가 — 고령·독거·장애·1인가구",
    E: "지역사회가 함께 작동하는가 — 신뢰·시민참여·협동조합·지역화폐",
    A: "필요한 사람이 자원에 닿을 수 있는가 — 119·소방·노후주택·디지털",
    R: "어떤 자원이 얼마나 있는가 — 공식 시설+비공식 가족+통합돌봄 본사업",
  };
  const PILLAR_NOTE = {
    N: "↑ 높을수록 돌봄 부담 큼 (composite −0.6N 페널티)",
    E: "↑ 높을수록 사회자본 풍부 (composite 0.25 가중)",
    A: "↑ 높을수록 접근 용이 (composite 0.30 가중)",
    R: "↑ 높을수록 자원 풍부 (R = 0.5×R_KCCI + 0.5×통합돌봄, composite 0.45 가중)",
  };
  // NEAR 공식 색상 팔레트 (pillars.json 기준) — N→E→A→R 순
  const PILLAR_COLOR = {
    N: "#5E60CE", // 보라 — Needs (욕구)
    E: "#C44569", // 자홍 — Engagement (결속)
    A: "#E8801E", // 주황 — Access (접근)
    R: "#06A877", // 초록 — Resources (자원)
  };

  // 4사분면 분류
  const QUADRANTS = {
    I:   { code: "I",   label: "균형돌봄선진형", note: "고욕구·풍부자원", priority: 0,
           policy: "모범사례 발굴, 인근 시군구 지원 거점화", color: "#06A877" },
    II:  { code: "II",  label: "안정자원풍부형", note: "저욕구·풍부자원", priority: 0,
           policy: "현 자원 유지·미래 고령화 대비", color: "#4E8CFF" },
    III: { code: "III", label: "일반저욕구형",   note: "저욕구·자원부족", priority: 0,
           policy: "기본 모니터링·예방적 투자", color: "#9CA3AF" },
    IV:  { code: "IV",  label: "돌봄위기형 ★",   note: "고욕구·자원부족", priority: 2,
           policy: "통합돌봄 본사업 1순위 — 즉시 개입", color: "#FF5A4E" },
  };

  let _state = {
    items: [],
    thresholds: null,
    quadrants: null,
    sido_summary: null,
    indicators: null,
    pillars_meta: null,
    metadata: null,
    top_bottom: null,
    loaded: false,
    onLoad: [],
  };

  async function _load() {
    if (_state.loaded) return _state;
    try {
      const [main, quad, sido, ind, pmeta, thresh, tb, meta] = await Promise.all([
        fetch("data/near/near_v0.7.json").then(r => r.json()),
        fetch("data/near/quadrants.json").then(r => r.json()),
        fetch("data/near/sido_summary.json").then(r => r.json()),
        fetch("data/near/indicators.json").then(r => r.json()),
        fetch("data/near/pillars.json").then(r => r.json()),
        fetch("data/near/thresholds.json").then(r => r.json()),
        fetch("data/near/top_bottom.json").then(r => r.json()),
        fetch("data/near/metadata.json").then(r => r.json()),
      ]);

      _state.items = main.regions.map((row, i) => ({
        id: row.regionCode,
        code: row.regionCode,
        name: row.regionName,
        sido: row.sido,
        full: `${row.sido} ${row.regionName}`,
        type: row.type,
        issuer: row.issuer,
        // 4 pillar scores
        N: round1(row.scores.N),
        R: round1(row.scores.R),
        A: round1(row.scores.A),
        E: round1(row.scores.E),
        resource: round1(row.scores.resource),
        NEAR_A: round1(row.scores.NEAR_A),
        // sub-pillars
        R_KCCI: round1(row.subPillars?.R_KCCI),
        R3_integratedCare: round1(row.subPillars?.R3_integratedCare),
        E3: round1(row.subPillars?.E3),
        E3b_localCurrency: round1(row.subPillars?.E3b_localCurrency),
        // integrated care
        IC_total: row.integratedCare?.totalServices,
        IC_per10k: row.integratedCare?.per10k,
        IC_special: row.integratedCare?.specialPrograms,
        // ranking & quadrant
        rank: row.rank,
        quadrant: row.quadrant,
        quadrantLabel: row.quadrantLabel,
        // dims for radar/compat
        dims: { N: row.scores.N, R: row.scores.R, A: row.scores.A, E: row.scores.E },
        total: row.scores.NEAR_A,
      }));
      _state.thresholds = thresh;
      _state.quadrants = quad;
      _state.sido_summary = sido;
      _state.indicators = ind;
      _state.pillars_meta = pmeta;
      _state.metadata = meta;
      _state.top_bottom = tb;
      _state.loaded = true;
      _state.onLoad.forEach(fn => fn(_state));
    } catch (e) {
      console.error("NEAR data load failed:", e);
    }
    return _state;
  }

  function round1(x) {
    if (x == null || isNaN(x)) return null;
    return Math.round(x * 10) / 10;
  }

  function gradeFor(s) {
    if (s == null) return "?";
    if (s >= 80) return "A+"; if (s >= 70) return "A"; if (s >= 60) return "A-";
    if (s >= 55) return "B+"; if (s >= 50) return "B";  if (s >= 45) return "B-";
    if (s >= 40) return "C+"; if (s >= 35) return "C";  return "D";
  }

  // v0.7 default weights
  const W_DEFAULT = { R: 0.45, A: 0.30, E: 0.25, N: 0.60 };

  // 가중치를 반영한 종합 점수 (v0.7 가중치판)
  // weights: { N, R, A, E } — 각 pillar의 composite 가중치 (정규화 없이 그대로 적용)
  // score = clip( wR*R + wA*A + wE*E - wN*N + 50, 0, 100 )
  function rank(weights = null) {
    const arr = _state.items.slice();
    if (weights) {
      // 사용자 응답으로부터 온 weights는 합=1로 정규화된 4-pillar 분포.
      // v0.7 기본 비율을 유지하기 위해 R/A/E는 0.45/0.30/0.25 합=1 분포에 사용자 편차를 반영하도록 mix,
      // N은 페널티 강도로 변환 (사용자가 N에 높은 가중을 주면 페널티 ↑)
      const sumW = (weights.N || 0) + (weights.R || 0) + (weights.A || 0) + (weights.E || 0);
      const norm = sumW > 0 ? {
        N: (weights.N || 0) / sumW,
        R: (weights.R || 0) / sumW,
        A: (weights.A || 0) / sumW,
        E: (weights.E || 0) / sumW,
      } : { N: 0.25, R: 0.25, A: 0.25, E: 0.25 };
      // R/A/E 비례는 사용자 가중 그대로, 합을 1로 (N 제외 후 재정규화) → 그러나 N은 페널티로 사용
      const posSum = norm.R + norm.A + norm.E || 1;
      const wR = norm.R / posSum;
      const wA = norm.A / posSum;
      const wE = norm.E / posSum;
      // 사용자 N 가중치 → 페널티 강도 (기본 0.6, 사용자 N 비중에 비례하여 0~1.2)
      const wN = Math.min(1.2, norm.N * 2.4);
      for (const r of arr) {
        // resource는 사용자 가중 R/A/E 평균 (positive part)
        const resource = wR * r.R + wA * r.A + wE * r.E;
        // 종합점수: positive(0~100) - N penalty + 50 baseline
        const score = Math.max(0, Math.min(100, resource - wN * r.N + 50));
        r._sortScore = score;
      }
      arr.sort((a, b) => b._sortScore - a._sortScore);
      return arr.map((r, i) => ({ ...r, rank: i + 1, total: r._sortScore }));
    }
    arr.sort((a, b) => b.NEAR_A - a.NEAR_A);
    return arr.map((r, i) => ({ ...r, rank: i + 1, total: r.NEAR_A }));
  }

  // 시도(광역) 평균 — sido_summary.json 기반
  function byProvince() {
    if (_state.sido_summary) {
      return _state.sido_summary.map(s => ({
        province: s.sido,
        sido: s.sido,
        count: s.count,
        N: s.avg_N, R: s.avg_R, A: s.avg_A, E: s.avg_E,
        NEAR_A: s.avg_NEAR_A,
        IC_total: s.avg_IC_total,
        top_region: s.top_region,
        top_rank: s.top_rank,
      }));
    }
    return [];
  }

  // 사분면 분포
  function quadrantDistribution() {
    return ["I", "II", "III", "IV"].map(q => {
      const meta = QUADRANTS[q];
      const inQ = _state.items.filter(r => r.quadrant === q);
      return {
        quadrant: q,
        ...meta,
        count: inQ.length,
        regions: inQ,
        avgNEAR: inQ.length ? +(inQ.reduce((a, b) => a + b.NEAR_A, 0) / inQ.length).toFixed(1) : 0,
      };
    });
  }

  // 진단 8문항 — N·R·A·E 매칭
  const QUESTIONS = [
    { q: "내가 살 동네에서 가장 중요한 것은?", opts: [
      { t: "어르신·취약계층 부담이 잘 관리되는 곳", w: { N: 2 } },
      { t: "이웃끼리 신뢰하고 함께하는 곳", w: { E: 2 } },
      { t: "응급·교통·디지털 접근이 좋은 곳", w: { A: 2 } },
      { t: "병원·복지시설·돌봄 자원이 풍부한 곳", w: { R: 2 } },
    ]},
    { q: "통합돌봄에서 가장 시급한 과제는?", opts: [
      { t: "수요(욕구) 예측·취약계층 발굴", w: { N: 2 } },
      { t: "지역사회 신뢰·민관협력 강화", w: { E: 2 } },
      { t: "이동돌봄·디지털 격차 해소", w: { A: 2 } },
      { t: "공식 시설·인력 확충", w: { R: 2 } },
    ]},
    { q: "한정된 예산이라면 어디에?", opts: [
      { t: "독거노인·고령자 발굴 인프라", w: { N: 2 } },
      { t: "협동조합·지역화폐·자조모임", w: { E: 2 } },
      { t: "119·이동돌봄·노후주택 정비", w: { A: 2 } },
      { t: "시설 신축·종사자 처우", w: { R: 2 } },
    ]},
    { q: "이상적인 돌봄의 모습은?", opts: [
      { t: "취약 어르신을 빠짐없이 챙기는", w: { N: 2 } },
      { t: "이웃·자원봉사가 일상인", w: { E: 2 } },
      { t: "거리 상관없이 접근 가능한", w: { A: 2 } },
      { t: "병원·요양원이 가까운 도심형", w: { R: 2 } },
    ]},
    { q: "성공한 돌봄 정책의 신호는?", opts: [
      { t: "취약자 발굴률 증가", w: { N: 2 } },
      { t: "사회단체 활동·지역화폐 활성화", w: { E: 2 } },
      { t: "평균 이동거리·대기 단축", w: { A: 2 } },
      { t: "시설당 종사자수 개선", w: { R: 2 } },
    ]},
    { q: "통합돌봄 본사업이 뭐라고 생각하세요?", opts: [
      { t: "수요 진단을 정밀하게 하는 일", w: { N: 2 } },
      { t: "민관·지역사회 협력", w: { E: 2 } },
      { t: "재가·이동·방문돌봄 확대", w: { A: 2 } },
      { t: "병원·시설·공공자원 통합", w: { R: 2 } },
    ]},
    { q: "돌봄에서 더 끌리는 것은?", opts: [
      { t: "취약계층을 먼저 발견하는 공감", w: { N: 2 } },
      { t: "관계와 공동체의 힘", w: { E: 2 } },
      { t: "거리·시간을 좁히는 혁신", w: { A: 2 } },
      { t: "안정적인 시설과 인력", w: { R: 2 } },
    ]},
    { q: "당신이 살고 싶은 동네는?", opts: [
      { t: "어르신 부담이 적고 한적한", w: { N: 1 } },
      { t: "이웃과 사회적 신뢰가 단단한", w: { E: 2 } },
      { t: "교통·생활접근성 좋은", w: { A: 2 } },
      { t: "복지·의료가 풍부한", w: { R: 2 } },
    ]},
  ];

  function weightsFromAnswers(answers) {
    const w = { N: 1, E: 1, A: 1, R: 1 };
    answers.forEach((idx, qi) => {
      if (idx == null) return;
      const opt = QUESTIONS[qi].opts[idx];
      Object.entries(opt.w).forEach(([k, v]) => { w[k] = (w[k] || 0) + v; });
    });
    const sum = Object.values(w).reduce((a, b) => a + b, 0);
    Object.keys(w).forEach(k => { w[k] = w[k] / sum; });
    return w;
  }

  // 페르소나: 가중치 최댓값 pillar
  const PERSONA = {
    N: { name: "수요통찰파", desc: "취약 어르신을 먼저 발견하는 돌봄", color: PILLAR_COLOR.N },
    E: { name: "관계회복파", desc: "이웃과 신뢰가 만드는 돌봄",   color: PILLAR_COLOR.E },
    A: { name: "접근혁신파", desc: "거리를 좁히는 모빌리티 돌봄", color: PILLAR_COLOR.A },
    R: { name: "공급탄탄파", desc: "시설과 사람이 든든한 돌봄",   color: PILLAR_COLOR.R },
  };

  function diagnose(answers) {
    const w = weightsFromAnswers(answers);
    const top = Object.entries(w).sort((a, b) => b[1] - a[1])[0][0];
    const persona = PERSONA[top];
    const ranked = rank(w);
    return { weights: w, code: top, persona, top: ranked.slice(0, 5), all: ranked };
  }

  return {
    PILLARS, PILLAR_KO, PILLAR_FULL, PILLAR_DESC, PILLAR_NOTE, PILLAR_COLOR,
    QUADRANTS,
    QUESTIONS, PERSONA,
    // legacy compat
    D: PILLARS, D_KO: PILLAR_KO, D_DESC: PILLAR_DESC,
    PILLAR_LONG: PILLAR_FULL,
    equalW: { N: 0.25, E: 0.25, A: 0.25, R: 0.25 },
    get items() { return _state.items; },
    get thresholds() { return _state.thresholds; },
    get sido_summary() { return _state.sido_summary; },
    get indicators_meta() { return _state.indicators; },
    get pillars_meta() { return _state.pillars_meta; },
    get metadata() { return _state.metadata; },
    get top_bottom() { return _state.top_bottom; },
    get loaded() { return _state.loaded; },
    onLoaded(fn) { if (_state.loaded) fn(_state); else _state.onLoad.push(fn); },
    _load,
    rank, gradeFor, weightsFromAnswers, diagnose,
    byId: (id) => _state.items.find(r => r.id === id || r.code === id),
    byName: (name) => _state.items.find(r => r.name === name || r.full === name),
    byProvince,
    quadrantDistribution,
  };
})();
