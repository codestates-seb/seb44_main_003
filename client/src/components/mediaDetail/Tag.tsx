import styled, { keyframes } from 'styled-components';

function Tag({ genre }: { genre: string[] }) {
  const changeText = (text: string) => {
    if (text === 'Reality TV') {
      return 'Reality';
    }
    if (text === 'Made in Europe') {
      return 'Europe';
    } else {
      return text;
    }
  };

  return (
    <S_Wrapper>
      {genre.map((text) => (
        <S_Tag key={text}>
          <h1 className="gold">{changeText(text)}</h1>
        </S_Tag>
      ))}
    </S_Wrapper>
  );
}

export default Tag;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-200px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;

const S_Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 40px 0 60px;
  animation: ${slideIn} 0.5s ease-out;
`;

const S_Tag = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  width: max-content;
  padding: 0 15px;
  margin: 0 15px 15px 0;
  height: 40px;
  border-radius: 50px;
  border: 2px solid var(--color-bg-100);
  background-color: var(--color-bg-80);

  .gold {
    color: var(--color-primary-gold);
  }

  @media only screen and (max-width: 770px) {
    margin: 5px;
    padding: 0;
  }
`;
