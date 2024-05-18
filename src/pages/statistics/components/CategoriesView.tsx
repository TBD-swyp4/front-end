import { useState } from 'react';
import styled from 'styled-components';

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
        {categories.map((category) => selectedCategory === category.id && category.component)}
      </ContentContainer>
    </Container>
  );
};

export default CategoriesView;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: relative;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  border-radius: 6px;
  background-color: #ffffff;
  padding: 5px;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
`;

const CategoryButton = styled.button<{ $isSelected: boolean }>`
  min-width: 80px;
  height: 30px;
  border-radius: 6px;
  background-color: ${(props) => (props.$isSelected ? '#47cfb0' : '#E3E3E3')};
  color: ${(props) => (props.$isSelected ? '#ffffff' : '#9F9F9F')};
  width: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
`;
