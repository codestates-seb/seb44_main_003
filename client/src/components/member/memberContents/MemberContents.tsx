import { useState } from 'react';
import { styled } from 'styled-components';

const contentsLists = ['찜한 컨텐츠', '추천한 컨텐츠', '작성한 후기'];

function MemberContents() {
  const [selectedList, setSelectedList] = useState(contentsLists[0]);
  const handleSelected = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    setSelectedList(target.id);
  };
  return (
    <S_Wrapper>
      <ul>
        {contentsLists.map((list) => (
          <S_list
            id={list}
            onClick={handleSelected}
            $isSelected={selectedList === list}
          >
            {list}
          </S_list>
        ))}
      </ul>
      <div></div>
    </S_Wrapper>
  );
}

export default MemberContents;

const S_Wrapper = styled.div`
  margin: 30px 50px 0 30px;
  color: var(--color-white-60);
  > ul {
    display: flex;
    justify-content: space-around;
    width: 500px;
  }

  > div {
    border-top: 1px solid var(--color-white-60);
    min-height: 100px;
  }
`;

const S_list = styled.li<{ $isSelected: boolean }>`
  transform: translate(0, 1px);
  cursor: pointer;
  padding: 0 3px;
  color: ${(props) => (props.$isSelected ? ' #FF0' : undefined)};
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: ${(props) =>
    props.$isSelected ? '5px solid #FF0' : undefined};
`;
