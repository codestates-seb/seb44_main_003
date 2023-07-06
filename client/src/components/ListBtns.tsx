import styled from 'styled-components';
import GenreBtn from './ui/GenreBtn';
import OttBtn from './ui/OttBtn';

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

  p {
    font-size: 20px;
    color: var(--color-white-80);
    margin-right: 15px;
  }
`;
