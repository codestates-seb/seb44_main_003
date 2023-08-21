import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import CommentList from '@/components/member/memberContents/CommentList';
import ContentsList from '@/components/member/memberContents/ContentsList';

const contentsLists = [
  { id: 1, text: '찜한 컨텐츠', searchParam: 'bookmarks' },
  { id: 2, text: '추천한 컨텐츠', searchParam: 'recommend' },
  { id: 3, text: '작성한 후기', searchParam: 'reviews' },
];

function MemberContents() {
  const [searchParam] = useSearchParams();
  const path = searchParam.get('content') || 'bookmarks';
  const navigate = useNavigate();
  const handleSelected = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    navigate(`/member?content=${target.id}`);
  };
  return (
    <S_Wrapper>
      <ul>
        {contentsLists.map((list) => (
          <S_list
            id={list.searchParam}
            key={list.id}
            onClick={handleSelected}
            $isSelected={path === list.searchParam}
          >
            {list.text}
          </S_list>
        ))}
      </ul>
      <div>
        {path === 'reviews' ? <CommentList /> : <ContentsList path={path} />}
      </div>
    </S_Wrapper>
  );
}

export default MemberContents;

const S_Wrapper = styled.div`
  margin-top: 100px;
  color: var(--color-white-60);
  > ul {
    display: flex;
    justify-content: space-around;
    width: 500px;
    @media only screen and (max-width: 480px) {
      width: 100vw;
    }
  }
  > div {
    border-top: 1px solid var(--color-white-60);
    min-height: 100px;
    display: flex;
    justify-content: center;
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
