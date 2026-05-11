# NEAR Care Index · 한국 지역사회 돌봄역량 지수

> **NEAR (Korea Community Care Capacity Index)** v0.7 — 가중치판
> 전국 **229개 시군구**를 4축(N·E·A·R)으로 진단하고, 4사분면으로 정책 우선순위를 분류합니다.
> 2026년 3월 보건복지부 **통합돌봄 본사업** 21개 시군구 데이터 결합.

[![status](https://img.shields.io/badge/status-prototype-orange)](.) [![version](https://img.shields.io/badge/NEAR-v0.7-blue)](.) [![license](https://img.shields.io/badge/license-MIT-green)](./LICENSE) [![regions](https://img.shields.io/badge/regions-229-lightgrey)](.)

---

## 한눈에 보기

| 분류 | 시군구 수 | 비중 | 평균 NEAR_A | 정책 권장 |
|---|---:|---:|---:|---|
| **I** 균형돌봄선진형 (고욕구·풍부자원) | 26 | 11.4% | 64.3 | 모범사례 발굴, 인근 거점화 |
| **II** 안정자원풍부형 (저욕구·풍부자원) | 89 | 38.9% | 80.1 | 현 자원 유지·미래 고령화 대비 |
| **III** 일반저욕구형 (저욕구·자원부족) | 25 | 10.9% | 67.6 | 기본 모니터링·예방적 투자 |
| **IV** 돌봄위기형 ★ (고욕구·자원부족) | **89** | **38.9%** | **56.8** | **통합돌봄 본사업 1순위** |

- **Top 1 시흥시 (경기)** NEAR_A 92.4 (II)
- **Bottom 1 상주시 (경북)** NEAR_A 42.1 (IV) — 즉시 개입 대상

---

## NEAR 4축 모델

| 축 | 의미 | 주요 지표 | 색상 |
|---|---|---|---|
| **N**eeds 욕구 | 누가 얼마나 돌봄이 필요한가 | 고령·독거·장애·1인가구 (D1~D8) | 🟣 #5E60CE |
| **E**ngagement 결속 | 지역사회가 함께 작동하는가 | 신뢰·시민참여·협동조합·**지역화폐**(E1~E4) | 🟥 #C44569 |
| **A**ccess 접근 | 필요한 사람이 자원에 닿을 수 있는가 | 119·소방·노후주택·디지털 (A1~A6) | 🟠 #E8801E |
| **R**esources 자원 | 어떤 자원이 얼마나 있는가 | 공식 시설+비공식 가족+**통합돌봄** (R1~R5) | 🟢 #06A877 |

**핵심 점수:**
```
NEAR_A = clip( (R + A + E)/3 − 0.5×N + 50, 0, 100 )
```
N(욕구)는 페널티로 차감, R/A/E는 자원·접근·결속의 가산 요인.

**R pillar 구성 (v0.7):**
```
R = 0.5 × R_KCCI  +  0.5 × IC_total_norm   (통합돌봄 본사업 결합, 가중 강화)
```

**Composite 가중치 (v0.7):** NEAR_A = clip( **0.45**·R + **0.30**·A + **0.25**·E − **0.6**·N + 50, 0, 100 )  
**민감도:** 가중치 ±15% 변동 시 분류 안정성 **96.4%**.
```

---

## 프로젝트 구조

```
near-care-index/
├── index.html                    # 메인 hi-fi 프로토타입 (단일 진입점)
├── hifi/                        # React/JSX 컴포넌트
│   ├── home.jsx                 # 홈 — 4사분면 산점도, 통합돌봄 카드
│   ├── detail-rank.jsx          # 시군구 상세 + 순위
│   ├── compare.jsx              # 3개 시군구 N·E·A·R 비교
│   ├── diagnose.jsx             # 진단 퀴즈 (N·E·A·R 매칭)
│   ├── govt.jsx                 # 지자체 콘솔
│   ├── ui.jsx                   # 공통 UI · 디자인 토큰
│   ├── data.js                  # 데이터 로더 (CARE_DATA)
│   └── tweaks-panel.jsx         # 설계 조정 패널
├── data/
│   └── near/
│       ├── near_v0.7.json       # 229 시군구 메인 데이터
│       ├── quadrants.json       # 4사분면 분류
│       ├── sido_summary.json    # 시도별 요약 (17개)
│       ├── indicators.json      # 지표 정의
│       ├── pillars.json         # 4축 메타
│       ├── thresholds.json      # 사분면 분리 임계값
│       ├── top_bottom.json      # Top10 / Bottom10
│       └── metadata.json        # 버전·출처·변경이력
├── docs/
│   ├── NEAR_README.md           # 데이터 사용 안내
│   ├── methodology.md           # 산정 방법론
│   └── data-dictionary.md       # 지표 사전
├── design-canvas.jsx            # 옵션 비교용 캔버스
├── erd.jsx                      # 데이터 ERD
├── wireframes.jsx               # 와이어프레임
└── 통합돌봄 와이어프레임.html
```

---

## 실행 방법

이 프로젝트는 **빌드 도구 없이** 브라우저에서 바로 동작합니다 (React + Babel CDN).

### 방법 1 — 로컬 정적 서버

```bash
# Python
python3 -m http.server 8080

# Node (http-server)
npx http-server . -p 8080
```

브라우저에서 `http://localhost:8080/` 열기.

> ⚠️ `file://` 로 직접 열면 `fetch('data/near/*.json')` 가 CORS 차단됩니다. 반드시 정적 서버로.

### 방법 2 — GitHub Pages

`Settings → Pages → Branch: main, Folder: / (root)` 로 배포 후
`https://<owner>.github.io/near-care-index/`

---

## 주요 화면

| 탭 | 내용 |
|---|---|
| **홈** | 전국 평균 NEAR_A · 4사분면 산점도 · 통합돌봄 본사업 21개 사례 카드 · Top/Bottom |
| **상세·순위** | 시군구 검색 → N·E·A·R 분해 + sub-pillar (R_KCCI · 통합돌봄 · E3 지역화폐) + 전국 순위표 |
| **비교** | 임의 3개 시군구 4축 레이더 + sub-pillar 막대 비교 |
| **진단** | 8문항 → N·E·A·R 가중치 매칭 → 가장 닮은 시군구 추천 |
| **지자체 콘솔** | 사분면별 정책 권장 + 통합돌봄 시뮬레이터 (지표 조정 → NEAR_A 변화) |

---

## 데이터 출처

| 출처 | 사용 지표 |
|---|---|
| **KOSIS** 통계청 | D1~D8, S2·S4·Sx·S6, A1·A2·A4, R3·R4·R5 |
| **국민건강보험공단** | 장기요양 등급자(D6), 장기요양기관(S6) |
| **한국행정연구원** | 사회통합실태조사 (E1·E2 신뢰·시민참여) |
| **행정안전부** | 외국인주민(E4), **지역사랑상품권**(E3b) |
| **NIA** | 디지털정보화수준(A6) |
| **보건복지부** | **통합돌봄 본사업 21개 시군구 (2026.03)** — R3 강화 (v0.7) |

---

## 버전 이력

| 버전 | 변경 내용 |
|---|---|
| v0.6 | DSAR → NEAR 리브랜드, **E pillar 신설** (5지표) |
| v0.6.1 | E3 sub-pillar 분할 (E3a 비영리법인 시군구 + E3b 시도 broadcast) |
| v0.6.2 | E3b 시군구 단위 교체 (지역사랑상품권 발행 시군구) |
| v0.6.3 | R pillar 통합돌봄 결합 (R = 0.6×R_KCCI + 0.4×IC_total) |
| **v0.7** | **가중치판** (R sub 0.5/0.5, Composite 0.45/0.30/0.25, N 페널티 −0.6) · 민감도 96.4% |

---

## 프로토타입 단계 안내

- 화면·계산은 실제 데이터(229 시군구)로 동작하지만, **연구·정책 검토용 프로토타입**입니다.
- 일부 지표는 가용성 한계로 시도 단위 broadcast가 포함되어 있습니다 (자세히는 `docs/methodology.md`).
- 통합돌봄 본사업 결합은 21개 선정 시군구의 사업 규모로 R 점수를 강화합니다 (v0.7에서 R sub-pillar 비중이 0.4 → 0.5로 강화).

---

## 라이선스

MIT License — 데이터 출처 표시(KOSIS, 보건복지부 등)는 별도 유지.

## 문의

at-korea — Korea Care Capacity Index 연구팀
