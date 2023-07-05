import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import { ItemData } from '../types/types';

interface ItemProps {
  data: ItemData;
}

const Item: React.FC<ItemProps> = ({ data }) => {
  return (
    <SwiperSlide>
      <S_Wrapper>
        <ItemImg src={data.mainPoster} alt={`${data.id}`} />
        <ItemTitle>{data.title}</ItemTitle>
      </S_Wrapper>
    </SwiperSlide>
  )
}

export default Item;

const S_Wrapper = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  filter: var(--shadow-l-40);
  cursor: pointer;

  &:hover {
    transform: translateY(-15px);
  }
`;

const ItemImg = styled.img`
  object-fit: cover;
  aspect-ratio: 3/4.2;
  border-radius: 10px;
`

const ItemTitle = styled.p`
  margin-top: 10px;
  color: var(--color-white-80);
  font-size: 18px;
  font-weight: 700;
  filter: var(--shadow-l-25);
`