import styled from 'styled-components';
import { ItemData } from '../../types/types';

interface ItemProps {
  item: ItemData;
}

const ItemCard: React.FC<ItemProps> = ({ item }) => {
  return (
    <>
      <S_ItemImg src={item.mainPoster} alt={`${item.id}`} />
      <S_ItemTitle>{item.title}</S_ItemTitle>
    </>
  );
};

export default ItemCard;

const S_ItemImg = styled.img`
  object-fit: cover;
  aspect-ratio: 3/4.2;
  border-radius: 10px;
`;

const S_ItemTitle = styled.p`
  margin-top: 10px;
  color: var(--color-white-80);
  font-size: 18px;
  font-weight: 700;
  filter: var(--shadow-l-25);
`;
