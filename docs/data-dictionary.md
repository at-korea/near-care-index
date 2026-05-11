# NEAR Care Index — Data Dictionary

## File: `near_v0.7.json`

Top-level structure:

| Field | Type | Description |
|---|---|---|
| `version` | string | "v0.7" |
| `generatedAt` | string | YYYY-MM-DD |
| `count` | int | 시군구 수 (216) |
| `thresholds.N_median` | float | N pillar 중앙값 (사분면 분할용) |
| `thresholds.Resource_median` | float | Resource 중앙값 |
| `regions` | array | 시군구 레코드 |

### `regions[].` (per-sigungu)

| Field | Type | Description |
|---|---|---|
| `regionCode` | string (5-digit) | 통계청 행정구역 코드 (e.g., "11090" = 서울 강북구) |
| `regionName` | string | 시군구명 (e.g., "강북구") |
| `sido` | string | 시도명 (e.g., "서울") |
| `type` | enum | "구" / "시" / "군" |
| `issuer` | bool | 지역사랑상품권 발행 시군구 여부 |
| `scores.N` | float [0-100] | Needs (욕구) pillar score |
| `scores.R` | float [0-100] | Resources (자원) pillar score (통합돌봄 결합) |
| `scores.A` | float [0-100] | Access (접근) pillar score |
| `scores.E` | float [0-100] | Engagement (결속) pillar score |
| `scores.resource` | float [0-100] | (R + A + E) / 3 |
| `scores.NEAR_A` | float [0-100] | 종합점수 = clip(resource - 0.5N + 50, 0, 100) |
| `subPillars.R_KCCI` | float | 기존 KCCI v0.5 (S+R)/2 |
| `subPillars.R3_integratedCare` | float | 통합돌봄 사업 수 정규화값 |
| `subPillars.E3` | float | E3 = 0.6×E3a + 0.4×E3b |
| `subPillars.E3b_localCurrency` | float | 지역사랑상품권 발행여부·발행액 정규화값 |
| `integratedCare.totalServices` | int | 통합돌봄 사업 총 건수 |
| `integratedCare.per10k` | float | 인구 만명당 사업 수 |
| `integratedCare.specialPrograms` | int | 지역특화 프로그램 수 |
| `rank` | int | NEAR_A 기준 순위 (1=최우수, 216=최열위) |
| `quadrant` | enum | "I" / "II" / "III" / "IV" |
| `quadrantLabel` | string | 한국어 사분면 라벨 |

---

## File: `quadrants.json`

```json
{
  "thresholds": { "N_median": 43.4, "Resource_median": 35.7 },
  "quadrants": {
    "I":   { "label": "균형돌봄선진형 (고욕구·풍부자원)", "count": 20, "regions": [...] },
    "II":  { "label": "안정자원풍부형 (저욕구·풍부자원)", "count": 88, "regions": [...] },
    "III": { "label": "일반저욕구형 (저욕구·자원부족)",   "count": 20, "regions": [...] },
    "IV":  { "label": "돌봄위기형 ★ (고욕구·자원부족)",  "count": 88, "regions": [...] }
  }
}
```

---

## File: `sido_summary.json`

Array of 17 시도, sorted by `avg_NEAR_A` desc.

| Field | Description |
|---|---|
| `sido` | 시도명 |
| `count` | 시군구 수 |
| `avg_N` / `avg_R` / `avg_A` / `avg_E` / `avg_NEAR_A` | 시도 평균 점수 |
| `top_region` / `top_rank` | 시도 내 1위 시군구 |
| `avg_IC_total` | 시도 평균 통합돌봄 사업 수 |

---

## File: `pillars.json`

Each pillar has:
- `code`, `name`, `koreanName`, `color` (hex)
- `question`, `direction`
- `subPillars` (R, E only)
- `indicators` (list of indicator codes)

---

## File: `indicators.json`

Array of 27 indicators. Each:

| Field | Description |
|---|---|
| `code` | 지표 코드 (e.g., "D1", "S6", "E3a") |
| `pillar` | "N" / "R" / "A" / "E" |
| `sub` | sub-pillar (formal·informal·integratedCare·localEconomy) |
| `name` | 한국어 지표명 |
| `unit` | 단위 (%, 명, 점, etc.) |
| `source` | 출처 기관 |
| `tableId` | KOSIS 표 ID 또는 식별자 |
| `direction` | "forward" / "reverse" |
| `isNew` | Phase 2-B/2-C 신규 지표 여부 |

---

## File: `thresholds.json`

각 pillar/composite의 분포 통계 (시각화에서 축 범위·도수분포 그릴 때 사용):

```json
{
  "N":        { "min": 3.9, "q1": 31.2, "median": 43.4, "q3": 56.0, "max": 90.5, "mean": 43.4, "std": 17.1 },
  "Resource": { "min": ..., ... },
  ...
}
```

---

## File: `top_bottom.json`

```json
{
  "top10":       [ { "rank": 1, "regionName": "시흥시", "NEAR_A": 96.7, ... }, ... ],
  "bottom10":    [ ... ],
  "priority_IV": [ ... ]   // 사분면 IV 88개 시군구 (NEAR_A 오름차순)
}
```

---

## Coding Conventions

- 모든 JSON은 UTF-8 인코딩
- region_code는 5자리 0-padded 문자열 ("11090" 형태)
- 점수는 소수점 2자리 (round)
- 사분면은 로마숫자 ("I", "II", "III", "IV")
- camelCase for JSON keys, snake_case for CSV columns
