// api 공통 구조 정의
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
