import styled from 'styled-components';

const MainPage = () => {
  return (
    <>
      <MainContainer>메인페이지</MainContainer>
    </>
  );
};

export default MainPage;

const MainContainer = styled.div`
  color: ${(props) => props.theme.fontColor};
`;
