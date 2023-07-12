import styled from 'styled-components';
import GenreBtn from './GenreBtn';
import OttBtn from './OttBtn';

const ListBtns = () => {
  return (
    <S_Wrapper>
      <OttBtn />
      <p>|</p>
      <GenreBtn />
    </S_Wrapper>
  );
};

export default ListBtns;

const S_Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;

  p {
    font-size: 20px;
    color: var(--color-white-80);
    margin-right: 15px;
  }
`;
