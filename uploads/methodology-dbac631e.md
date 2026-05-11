# NEAR Care Index — Methodology

## 1. Overview

NEAR Care Index는 한국 시군구 단위 고령자 통합돌봄 역량을 4개 축(N·R·A·E) × 25개 지표로 정량 평가하는 지수입니다.
2026년 3월 통합돌봄 본사업 전국 시행을 앞두고, 시군구별 정책 우선순위를 정량화하기 위해 개발되었습니다.

### Spatial unit
- **시군구** (basic local government, 자치구·자치시·자치군)
- **N = 229개** (한국 표준 자치단체 = 자치구 69 + 자치시 75 + 자치군 82 + 세종 1 + 제주 행정시 2) (KOSIS 기반 매칭 가능 시군구)

### Time
- 2024 데이터 기준 (D1~D5, R1~R10, A1~A5, E1~E5)
- D7·D8: 2025/2030/2040 추계
- IC: 2026.03~04 통합돌봄 사업 (보건복지부 stats.json)

---

## 2. Pillar Definitions

### N — Needs (욕구·필요)
**Question:** 누가 얼마나 돌봄이 필요한가
**Direction:** 클수록 부담↑ (composite에서 **−0.6** 가중, v0.7 강화)
**Indicators:** D1 (65+ 비율), D3 (독거노인), D4 (장애인), Dx (1인가구)

### R — Resources (자원·공급역량)
**Question:** 어떤 돌봄 자원이 (공식+비공식+통합돌봄) 얼마나 있는가
**Direction:** 클수록 좋음 · Composite weight **0.45** (v0.7 최고 가중)
**Sub-pillars (v0.7):**
- **R_KCCI** (50%): 기존 KCCI v0.5 (S+R)/2 평균 — 공식자원(S2·S4·Sx·S6) + 비공식자원(R6·R7·R8·R9·R10)
- **R3_integratedCare** (50%): 보건복지부 통합돌봄 사업 수 (시군구별 stats.json) min-max 정규화

```
R = 0.5 × R_KCCI + 0.5 × R3_integratedCare    (v0.7)
```

### A — Access (접근·접근성)
**Question:** 필요한 사람이 자원에 닿을 수 있는가
**Direction:** 클수록 좋음 · Composite weight **0.30**
**Indicators:** A1 (119), A2 (소방서), A4 (노후주택, 역방향), A6 (디지털)

### E — Engagement (결속·지역참여)
**Question:** 지역사회가 신뢰·참여·민관협력으로 함께 작동하는가
**Direction:** 클수록 좋음 · Composite weight **0.25**
**Indicators:**
- E1 사회적 신뢰 (한국행정연구원 사회통합실태조사 도시/농어촌)
- E2 시민 참여·자치 (사회단체 적극활동율)
- E3 = 0.6×E3a + 0.4×E3b
  - E3a 비영리·협동조합 사업체 비율 (시군구 단위, KOSIS DT_110001_A016)
  - E3b 지역사랑상품권 발행 시군구 (행안부)
- E4 외국인주민 비율 (포용성, 시군구 단위)
- E5 ESG·민관협력 (시도 broadcast)

---

## 3. Score Calculation

### Step 1 — Min-Max Normalization (per indicator)
```
norm = (x − min) / (max − min) × 100
※ Reverse indicators: norm = 100 − norm
```

### Step 2 — Pillar Score
```
N_score = mean(D1_n, D3_n, D4_n, Dx_n)
R_score = 0.5 × R_KCCI_n + 0.5 × R3_integratedCare_n          (v0.7)
A_score = mean(A1_n, A2_n, A4_n, A6_n)
E_score = mean(E1_n, E2_n, E3_n, E4_n, E5_n) [E1·E5 가중치 1.5x]
```

### Step 3 — Composite (NEAR_A v0.7)
```
NEAR_A = clip( 0.45·R + 0.30·A + 0.25·E − 0.6·N + 50, 0, 100 )
```

**Interpretation:** R(자원)에 가장 큰 비중(0.45), 다음 A(0.30), E(0.25). 욕구는 N 페널티 −0.6 강화 (v0.6.3의 −0.5에서 강화). 중간값 50 기준으로 ±50 범위.

**Sensitivity (v0.7)**: 가중치 ±15% 무작위 변동 50회 반복 시 분류 안정성 **96.4%** (DSAR v0.5의 89.2% 대비 +7.2%p). 핵심 ★시군구는 모든 가중치 시나리오에서 일관.

---

## 4. Quadrant Classification (v0.7)

```
N median = 45.27, Resource median = 35.56

         Resource ↑
           |
   II 안정자원 |  I 균형선진
   (저욕구·    |  (고욕구·
    풍부자원)   |   풍부자원)
   ────────┼──────── N 중앙값
   III 일반저욕구|  IV 돌봄위기 ★
   (저욕구·    |  (고욕구·
    자원부족)   |   자원부족)
           |
              N →
```

- **IV (돌봄위기형, n=89)**: 통합돌봄 정책 1순위 — 즉시 개입 필요
- **I (균형선진형, n=26)**: 모범사례·인근지역 거점
- **II (안정자원풍부형, n=89)**: 미래 대비 (인구 고령화 대비 안정 유지)
- **III (일반저욕구형, n=25)**: 모니터링

---

## 5. Limitations

1. **공간 단위 제약**: E1·E2 (사회통합실태조사)는 도시/농어촌 broadcast로 시군구 분산이 작음
2. **시도 broadcast 지표**: A1·A2·R3·A6·R6·E5 등은 시도값을 시군구로 동일 배포
3. **시간 단면**: 일부 지표는 2024 단년 또는 미래 추계, 시계열 변동성 미반영
4. **Proxy 한계**: E3a "비영리·협동조합 사업체"는 KOSIS 카테고리로 종교법인·재단까지 포함하는 광범위 proxy
5. **상대평가**: 점수는 시군구 간 비교용. 절대 수준(예: 충분 vs 부족)은 별도 기준 필요

---

## 6. Versioning

| Version | Change |
|---|---|
| v0.4.1 | 20지표 가중평균 + 6 클러스터 |
| v0.5 | Phase 2-B 신규 6지표 (D6/D7/D8/S6/A6/R6) |
| v0.6 | DSAR → NEAR · E pillar 신설 |
| v0.6.1 | E3 sub-pillar 추가 |
| v0.6.2 | E3b 시군구 단위 교체 |
| v0.6.3 | R pillar 통합돌봄 결합 (R = 0.6/0.4) |
| **v0.7** | **가중치판: R sub 0.5/0.5, Composite 0.45/0.30/0.25, N 페널티 −0.6 · 민감도 ±15% 안정 96.4%** |
