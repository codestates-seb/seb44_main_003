import styled from 'styled-components';
import Item from '../components/Item';
import Banner from '../components/Banner';

const TV = () => {
  return (
    <S_Wrapper>
      <Banner></Banner>
      <Item></Item>
    </S_Wrapper>
  );
};

export default TV;

const S_Wrapper = styled.div`
  background: var(--color-bg-100);
  height: 100%;
`;