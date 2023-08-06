import styled from 'styled-components';
import GenreBtn from '@/components/@layout/navigators/GenreBtn';
import OttBtn from '@/components/@layout/navigators/OttBtn';
import useMediaQuery from '@/hooks/useMediaQuery';

function ListBtns() {
  const genre = new URLSearchParams(location.search).get('genre');
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <S_Wrapper>
      <S_flexBox>
        {isMobile ? (
          <>
            <div className="flex">
              <OttBtn />
            </div>
            <S_FlexTextBox>
              <h1 className="bar">OTT 검색</h1>
              <h1 className="bar">|</h1>
              <GenreBtn />
            </S_FlexTextBox>
          </>
        ) : (
          <>
            <h1 className="bar">OTT 검색</h1>
            <div className="flex">
              <OttBtn />
            </div>
            <S_FlexTextBox>
              <h1 className="bar">|</h1>
              <GenreBtn />
            </S_FlexTextBox>
          </>
        )}
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
  padding-left: 60px;

  .bar {
    font-size: 20px;
    color: var(--color-white-80);
    margin-right: 15px;
  }

  @media only screen and (max-width: 770px) {
    padding-left: 20px;
  }

  @media only screen and (max-width: 600px) {
    .bar {
      font-size: 16px;
    }
  }
`;

const S_flexBox = styled.div`
  display: flex;
  align-items: center;
  .flex {
    display: flex;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const S_FlexTextBox = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 600px) {
    margin-top: 20px;
  }
`;

const S_genre = styled.p`
  position: absolute;
  top: 100%;
  padding-top: 20px;
  color: var(--color-primary-gold);
  font-size: 18px;
  font-weight: bold;

  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
