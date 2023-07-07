import styled from 'styled-components';

const Tag = ({ genre }: { genre: string[] }) => {
  return (
    <S_Wrapper>
      {genre.map((text) => (
        <S_Tag>
          <h1>{text}</h1>
        </S_Tag>
      ))}
    </S_Wrapper>
  );
};

export default Tag;

const S_Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 30px 0 45px 0;
`;

const S_Tag = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  width: max-content;
  padding: 0 15px;
  margin-right: 15px;
  height: 40px;
  border-radius: 50px;
  background-color: var(--color-bg-100);

  h1 {
    color: var(--color-primary-gold);
  }
`;
