import { useState } from 'react';
import { styled } from 'styled-components';
import ContentsList from './ContentsList';
import { useNavigate } from 'react-router-dom';

const contentsLists = [
  { id: 1, text: '찜한 컨텐츠', searchParam: 'bookmark' },
  { id: 2, text: '추천한 컨텐츠', searchParam: 'recommend' },
  { id: 3, text: '작성한 후기', searchParam: 'review' },
];

function MemberContents() {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState('찜한 컨텐츠');
  const findSearchParam = (id: string) => {
    const selectedItem = contentsLists.find((el) => el.text === id);
    return selectedItem?.searchParam;
  };
  const handleSelected = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    setSelectedList(target.id);
    navigate(`/member?content=${findSearchParam(target.id)}`);
  };
  return (
    <S_Wrapper>
      <ul>
        {contentsLists.map((list) => (
          <S_list
            id={list.text}
            key={list.id}
            onClick={handleSelected}
            $isSelected={selectedList === list.text}
          >
            {list.text}
          </S_list>
        ))}
      </ul>
      <div>
        <ContentsList />
      </div>
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
  padding-bottom: 10px;
  border-bottom: ${(props) =>
    props.$isSelected ? '5px solid #FF0' : undefined};
`;
