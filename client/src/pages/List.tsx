import styled from 'styled-components';
import OttBtn from '../components/ui/OttBtn';

const List = () => {
  return (
    <S_Wrapper>
      <S_BtnWrapper>
        <OttBtn />
      </S_BtnWrapper>
    </S_Wrapper>
  );
};

export default List;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  justify-content: center;
`;

const S_BtnWrapper = styled.p`
  width: 100%;
  padding: 130px 0 70px 10px;
`;
