import styled from 'styled-components';
import GenreBtn from './GenreBtn';
import OttBtn from './OttBtn';
import useMediaQuery from '../../hooks/useMediaQuery';

function ListBtns() {
  //const [isMobile, setIsMobile] = useState(window.innerWidth <= 540);
  const genre = new URLSearchParams(location.search).get('genre');
  const isMobile = useMediaQuery('(max-width: 540px)');

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

  @media only screen and (max-width: 540px) {
    padding-left: 20px;
  }
`;

const S_flexBox = styled.div`
  display: flex;
  align-items: center;
  .flex {
    display: flex;
  }

  @media only screen and (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const S_FlexTextBox = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 540px) {
    margin-top: 10px;
  }
`;

const S_genre = styled.h1`
  position: absolute;
  top: 100%;
  padding-top: 20px;
  color: var(--color-primary-gold);
`;
