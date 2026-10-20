// 서로 다른 장치·단위를 섞어 판정하지 않습니다. 서버의 저장 상태와 별도인 화면 기준입니다.
export function distanceStatus(rows, threshold) {
  if (!Number.isFinite(threshold) || threshold <= 0) return '기준을 양수로 입력하세요';
  if (!rows.length) return '거리 기록 없음';
  if (new Set(rows.map(r => r.device_id)).size !== 1 || rows.some(r => r.kind !== 'distance_cm'))
    return '한 장치의 distance_cm을 선택하세요';
  const latest = rows.reduce((a,b) => a.occurred_at >= b.occurred_at ? a : b);
  if (latest.value === null) return '마지막 측정 실패';
  return latest.value < threshold ? '마지막 측정: 접근 주의' : '마지막 측정: 기준 이상';
}
