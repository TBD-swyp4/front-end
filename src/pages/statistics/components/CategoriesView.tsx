import Bird from '@assets/images/bird/satisfactionBird.svg?react';
import styled from 'styled-components';

import { useState } from 'react';

type Category = { id: string; name: string; component: JSX.Element };

type CategoriesViewProps = {
  categories: Category[];
};
const CategoriesView = ({ categories }: CategoriesViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].id);

  const handleClick = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <Container>
      <ButtonContainer>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            onClick={() => handleClick(category.id)}
            $isSelected={category.id === selectedCategory}>
            {category.name}
          </CategoryButton>
        ))}
      </ButtonContainer>
      <ContentContainer>
        <StyleBird />
        {categories.map(
          (category, index) =>
            selectedCategory === category.id && (
              <CategoryContainer key={index}>{category.component}</CategoryContainer>
            ),
        )}
      </ContentContainer>
    </Container>
  );
};

export default CategoriesView;

const CategoryContainer = styled.div`
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  gap: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.white};
  padding: 5px;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  margin: 0 100px;
`;

const CategoryButton = styled.button<{ $isSelected: boolean }>`
  min-width: 80px;
  height: 30px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$isSelected ? props.theme.colors.lightGreen : props.theme.colors.lightGray2};
  color: ${(props) =>
    props.$isSelected ? props.theme.colors.white : props.theme.colors.darkLightGray};
  width: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 40px;
`;

const StyleBird = styled(Bird)`
  position: absolute;
  right: 30px;
  top: -38px;
  z-index: -1;
`;
