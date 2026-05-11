// Diagnose + Result — NEAR v0.7 (N·R·A·E persona matching, 가중치판)

const DiagnoseScreen = ({ onComplete, goto }) => {
  const D = window.CARE_DATA;
  const { TOK, Pill, Btn } = window.UI;
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState(Array(D.QUESTIONS.length).fill(null));
  const total = D.QUESTIONS.length;
  const q = D.QUESTIONS[step];

  const pick = (idx) => {
    const next = [...answers]; next[step] = idx; setAnswers(next);
    setTimeout(() => {
      if (step + 1 < total) setStep(step + 1);
      else onComplete(next);
    }, 240);
  };

  // 옵션 색상 — N·E·A·R 순 (보라·자홍·주황·초록)
  const optColors = ["#5E60CE", "#C44569", "#E8801E", "#06A877"];

  return (
    <div style={{ background: TOK.paper, minHeight: "calc(100vh - 70px)", padding: "48px 56px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Pill bg={TOK.yellow}>STEP {step + 1} / {total}</Pill>
        <button onClick={() => goto("home")} style={{ background: "none", border: "none", color: TOK.muted, cursor: "pointer", fontFamily: TOK.body, fontSize: 14 }}>그만두기</button>
      </div>
      <div style={{ display: "flex", gap: 4, margin: "16px 0 48px" }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 8,
            background: i < step ? "#06A877" : i === step ? TOK.yellow : "#fff",
            border: "1.5px solid #1a1a1a", borderRadius: 4,
            transition: "background 300ms",
          }} />
        ))}
      </div>

      <div style={{ fontFamily: TOK.body, fontSize: 16, color: TOK.muted, marginBottom: 8 }}>Q{step + 1}.</div>
      <h2 style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 72, letterSpacing: -2, lineHeight: 0.95, margin: "0 0 40px", maxWidth: 880 }}>
        {q.q}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {q.opts.map((opt, i) => (
          <button key={i} onClick={() => pick(i)} style={{
            display: "flex", alignItems: "center", gap: 18,
            background: answers[step] === i ? optColors[i] : "#fff",
            color: answers[step] === i ? "#fff" : TOK.ink,
            border: "2px solid #1a1a1a", borderRadius: 16,
            padding: "20px 24px", textAlign: "left", cursor: "pointer",
            fontFamily: TOK.body,
            transition: "all 0.15s ease",
            boxShadow: "3px 3px 0 #1a1a1a",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = optColors[i]; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { if (answers[step] !== i) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = TOK.ink; } }}>
            <div style={{
              width: 48, height: 48, flexShrink: 0,
              background: "rgba(255,255,255,0.7)", border: "2px solid #1a1a1a", borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: TOK.display, fontWeight: 300, fontSize: 22, color: TOK.ink,
            }}>{["N", "E", "A", "R"][i]}</div>
            <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22, lineHeight: 1.2 }}>{opt.t}</div>
          </button>
        ))}
      </div>

      {step > 0 && (
        <div style={{ marginTop: 32 }}>
          <Btn onClick={() => setStep(step - 1)}>← 이전 문항</Btn>
        </div>
      )}
    </div>
  );
};

const ResultScreen = ({ result, goto }) => {
  const D = window.CARE_DATA;
  const { TOK, Pill, Btn, Card, Radar, PILLAR_COLOR, QuadrantBadge } = window.UI;
  const persona = result.persona;
  const code = result.code;

  // Weights as 0-100 dims for radar
  const weightDims = {};
  D.PILLARS.forEach(p => { weightDims[p] = Math.round(result.weights[p] * 400); });

  return (
    <div style={{ background: TOK.paper, minHeight: "calc(100vh - 70px)", padding: "48px 56px 80px" }}>
      <Pill bg="#06A877" fg="#fff">진단 결과</Pill>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, marginTop: 16 }}>
        <Card bg={persona.color} style={{ padding: 32, color: "#fff", boxShadow: "6px 6px 0 #1a1a1a", transform: "rotate(-1.5deg)" }}>
          <div style={{ fontFamily: TOK.body, fontSize: 14, opacity: 0.9 }}>당신의 돌봄 성향 (NEAR {code} 우세)</div>
          <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 88, lineHeight: 0.9, letterSpacing: -3, marginTop: 8 }}>
            {persona.name}
          </div>
          <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 56, letterSpacing: 8, marginTop: 16, padding: "8px 16px", background: "rgba(255,255,255,0.25)", borderRadius: 12, display: "inline-block" }}>{code}</div>
          <p style={{ fontFamily: TOK.body, fontSize: 16, lineHeight: 1.6, marginTop: 16 }}>{persona.desc}</p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Radar dims={weightDims} color="#fff" size={200} label />
          </div>
          <div style={{ fontFamily: TOK.body, fontSize: 12, textAlign: "center", marginTop: 4, opacity: 0.85 }}>나의 N·R·A·E 가중치</div>
        </Card>

        <div>
          <h3 style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 40, letterSpacing: -1, marginTop: 0, marginBottom: 4 }}>나와 가장 잘 맞는<br/>시군구 TOP 5</h3>
          <p style={{ fontFamily: TOK.body, fontSize: 14, color: TOK.muted, marginBottom: 16 }}>
            점수 = N·R·A·E × 나의 가중치. 매칭률은 상위권 상대 백분위.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {result.top.map((r, i) => {
              const minTotal = result.all[result.all.length - 1].total;
              const maxTotal = result.all[0].total;
              const matchPct = Math.round(((r.total - minTotal) / (maxTotal - minTotal || 1)) * 30 + 70);
              const colors = ["#5E60CE", "#C44569", "#E8801E", "#06A877", TOK.yellow];
              const fgs = ["#fff", "#fff", "#fff", "#fff", TOK.ink];
              return (
                <Card key={r.id} bg={colors[i]} style={{ padding: 16, cursor: "pointer", display: "grid", gridTemplateColumns: "48px 1fr 100px 100px", gap: 16, alignItems: "center", color: fgs[i] }}
                  onClick={() => goto("detail", { id: r.id })}>
                  <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 36 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 24, lineHeight: 1.05 }}>{r.full}</div>
                    <div style={{ fontFamily: TOK.body, fontSize: 12, opacity: 0.85, marginTop: 2 }}>{r.quadrantLabel?.split(" (")[0]}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 32, lineHeight: 1 }}>{matchPct}<span style={{ fontSize: 14 }}>%</span></div>
                    <div style={{ fontFamily: TOK.body, fontSize: 11, opacity: 0.85 }}>매칭률</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: TOK.display, fontWeight: 300, fontSize: 22 }}>{r.total.toFixed(1)}</div>
                    <Pill bg="rgba(255,255,255,0.6)" fg={TOK.ink} style={{ fontSize: 11, padding: "1px 8px" }}>{D.gradeFor(r.NEAR_A)}</Pill>
                  </div>
                </Card>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Btn onClick={() => goto("diagnose")}>다시 진단</Btn>
            <Btn primary onClick={() => goto("ranking")}>전체 순위 보기 →</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

window.DiagnoseScreen = DiagnoseScreen;
window.ResultScreen = ResultScreen;
