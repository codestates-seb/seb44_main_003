import styled from 'styled-components';
import GenreBtn from './GenreBtn';
import OttBtn from './OttBtn';

function ListBtns() {
  const genre = new URLSearchParams(location.search).get('genre');
  return (
    <S_Wrapper>
      <S_flexBox>
        <div className="flex">
          <OttBtn />
        </div>
        <S_FlexTextBox>
          <p className="bar">OTT 검색</p>
          <p className="bar">|</p>
          <GenreBtn />
        </S_FlexTextBox>
      </S_flexBox>
      <S_genre>{genre}</S_genre>
    </S_Wrapper>
  );
}

export default ListBtns;

const S_Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 20px;

  .bar {
    font-size: 20px;
    color: var(--color-white-80);
    margin-right: 15px;
  }
`;

const S_flexBox = styled.div`
  display: flex;
  align-items: center;
  .flex {
    display: flex;
  }

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const S_FlexTextBox = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 500px) {
    margin-top: 10px;
  }
`;

const S_genre = styled.h1`
  position: absolute;
  top: 100%;
  padding-top: 20px;
  color: var(--color-primary-gold);
`;
