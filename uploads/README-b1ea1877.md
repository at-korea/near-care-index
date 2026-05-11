# NEAR Care Index — Korea Community Care Capacity Index

> **N · E · A · R** — Needs · Engagement · Access · Resources
> "가까운 돌봄, 가능한 돌봄"

시군구 단위 (basic local government) 한국 통합돌봄 역량 평가 지수.
4개 축(N·R·A·E) × 25개 지표로 229개 시군구의 고령자 돌봄 역량을 정량화합니다.

**Current version: v0.6.3** (2026-05-04)

---

## What's inside

```
near-care-index/
├── README.md                ← 이 파일
├── LICENSE                  ← MIT
├── data/
│   ├── near_v0.6.3.json     ← 메인 데이터 (229 시군구 × N/R/A/E + IC + 순위)
│   ├── near_v0.6.3.csv      ← CSV 형태 (대체)
│   ├── metadata.json        ← 버전·출처·changelog
│   ├── pillars.json         ← 4축 정의 + 색상 팔레트
│   ├── indicators.json      ← 27개 지표 사전
│   ├── quadrants.json       ← 사분면 분포 + 시군구 명단
│   ├── sido_summary.json    ← 시도별 평균
│   ├── thresholds.json      ← 중앙값·분위수 (시각화용)
│   └── top_bottom.json      ← Top10·Bottom10 + 우선유형
└── docs/
    ├── methodology.md       ← NEAR 4축 정의서
    └── data-dictionary.md   ← 데이터 사전
```

---

## Pillar Structure

| Pillar | Korean | Question | Color |
|---|---|---|---|
| **N** Needs | 욕구·필요 | 누가 얼마나 돌봄이 필요한가 | `#5E60CE` |
| **R** Resources | 자원·공급역량 | 어떤 돌봄 자원이 얼마나 있는가 | `#06A877` |
| **A** Access | 접근·접근성 | 자원에 닿을 수 있는가 | `#E8801E` |
| **E** Engagement | 결속·지역참여 | 함께 작동하는가 | `#C44569` |

**Composite formula**
```
NEAR_A = clip( (R + A + E)/3 − 0.5·N + 50, 0, 100 )
```

---

## Quick Start

### Fetch in HTML/JS (Claude Design, vanilla browser)

```javascript
// Main data
const res = await fetch('./data/near_v0.6.3.json');
const data = await res.json();

console.log(data.regions[0]);
// {
//   regionCode: '11090',
//   regionName: '강북구',
//   sido: '서울',
//   scores: { N: 39.5, R: 20.3, A: 69.8, E: 46.1, NEAR_A: 75.7 },
//   rank: 59,
//   quadrant: 'II',
//   ...
// }
```

### Pre-aggregated quadrant counts

```javascript
const q = await (await fetch('./data/quadrants.json')).json();
console.log(q.quadrants.IV.count);   // 88 (돌봄위기형)
console.log(q.thresholds.N_median);  // 43.4
```

### 시도별 평균 (시도 라벨링·색상)

```javascript
const sido = await (await fetch('./data/sido_summary.json')).json();
sido.forEach(s => console.log(`${s.sido}: ${s.avg_NEAR_A}`));
```

---

## Data Schema

### `near_v0.6.3.json` (main file)

```json
{
  "version": "v0.6.3",
  "generatedAt": "2026-05-04",
  "count": 216,
  "thresholds": { "N_median": 43.4, "Resource_median": 35.7 },
  "regions": [
    {
      "regionCode": "11090",
      "regionName": "강북구",
      "sido": "서울",
      "type": "구",
      "issuer": true,
      "scores": {
        "N": 39.48, "R": 20.31, "A": 69.80, "E": 46.13,
        "resource": 45.41, "NEAR_A": 75.67
      },
      "subPillars": {
        "R_KCCI": 23.93, "R3_integratedCare": 21.43,
        "E3": 13.0, "E3b_localCurrency": 84.5
      },
      "integratedCare": {
        "totalServices": 38, "per10k": 1.36, "specialPrograms": 4
      },
      "rank": 59,
      "quadrant": "II",
      "quadrantLabel": "안정자원풍부형 (저욕구·풍부자원)"
    },
    ...
  ]
}
```

---

## Quadrant Distribution (v0.6.3)

| Quadrant | Label | Count | Avg NEAR_A | Policy |
|---|---|---|---|---|
| **I** | 균형돌봄선진형 | 20 | — | 모범사례·거점 |
| **II** | 안정자원풍부형 | 88 | — | 미래 대비 |
| **III** | 일반저욕구형 | 20 | — | 모니터링 |
| **IV ★** | **돌봄위기형** | **88** | — | **즉시 개입 1순위** |

---

## Sources

- **KOSIS** — Statistics Korea (시군구 인구·고령·복지·사업체)
- **NHIS** — 국민건강보험공단 (장기요양 등급자·기관)
- **MOHW** — 보건복지부 (통합돌봄 사업 stats.json, v0.6.3)
- **MOIS** — 행정안전부 (외국인주민, 지역사랑상품권)
- **KIPA** — 한국행정연구원 (사회통합실태조사)
- **NIA** — 한국지능정보사회진흥원 (디지털정보격차실태조사)

---

## Versioning

| Version | Change | Date |
|---|---|---|
| v0.4.1 듀얼 | 20지표 가중평균 + 6 클러스터 분류 | 2026-05 |
| v0.5 | Phase 2-B 신규 6지표 (D6/D7/D8/S6/A6/R6) | 2026-05-02 |
| v0.6 | DSAR → NEAR rebrand · E pillar 신설 | 2026-05-04 |
| v0.6.1 | E3 sub-pillar 추가 (E3a 비영리법인 + E3b 시도 broadcast) | 2026-05-04 |
| v0.6.2 | E3b 시군구 단위 교체 (지역사랑상품권 발행 시군구) | 2026-05-04 |
| **v0.6.3** | **R pillar 통합돌봄 결합 (R = 0.6×R_KCCI + 0.4×IC_total)** | **2026-05-04** |

---

## License

MIT License — see [LICENSE](LICENSE).

데이터를 자유롭게 사용·수정·배포 가능. 단 출처(KOSIS, MOHW 등 원본 출처)는 명시 권장.

---

## Citation

```
KCCI Phase 2-C Team (2026). NEAR Care Index v0.6.3:
Korea Community Care Capacity Index for 229 Sigungu.
https://github.com/<your-org>/near-care-index
```
