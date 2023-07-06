import styled from 'styled-components';
import ItemCard from '../ui/ItemCard';

const InfinityScroll = ({ data }: any) => {
  return (
    <S_Item>
      <ItemCard data={data} />
    </S_Item>
  );
};

export default InfinityScroll;

const S_Item = styled.div`
  width: 200px;
  margin: 0 7.5px 50px;
  transition: transform 0.3s ease;
  filter: var(--shadow-l-40);
  cursor: pointer;
  &:hover {
    transform: translateY(-15px);
  }
`;
