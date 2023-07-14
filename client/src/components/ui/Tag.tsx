import styled from 'styled-components';

function Tag({ genre }: { genre: string[] }) {
  return (
    <S_Wrapper>
      {genre.map((text) => (
        <S_Tag key={text}>
          <h1 className="gold">{text}</h1>
        </S_Tag>
      ))}
    </S_Wrapper>
  );
}

export default Tag;

const S_Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 20px 0;

  @media only screen and (max-width: 620px) {
    justify-content: center;
    margin: 15px 0;
  }
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
  background-color: var(--color-bg-100);

  .gold {
    color: var(--color-primary-gold);
  }

  @media only screen and (max-width: 620px) {
    margin: 5px;
    padding: 0;
  }
`;
