// husky에서 commit-msg로 commitlint를 걸어놨기에, commit을 린팅할 컨벤션을 설정
// @commitlint/config-conventional 기준을 사용한다.
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
