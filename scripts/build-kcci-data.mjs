// CSV -> JSON pipeline
// 1) Nemotron (시군구 베이스) load
// 2) KOSIS CSV의 시군구별 latest year 값을 name 기반으로 조인
// 3) D/S/A/R 4축 정규화 → KCCI_N, KCCI_A 계산
// 4) 16유형 분류
// 출력: hifi/kcci-data.json

// run via run_script tool — this file is a reference / spec.
// Actual exec happens inline via run_script.
