export type ExpenseForm = {
  content: string; // 소비 내용 (원래 물건)
  amount: number; // 금액 (절약 또는 지출한)
  date: string; // 소비 날짜, 시간 (저장 시간 아님) -> 추가 필요 필드
  event: string; // 사건
  thought: string; // 생각
  emotion: string; // 감정
  satisfaction: number; // 만족도
  reason: string; // 만족 이유
  improvements: string; // 개선점
  registerType: string; // 지출 또는 소비 타입s
};
