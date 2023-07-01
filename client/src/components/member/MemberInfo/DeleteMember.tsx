import { styled } from 'styled-components';

function DeleteMember() {
  return (
    <S_Wrapper>
      <button type="button">회원 탈퇴</button>
    </S_Wrapper>
  );
}

export default DeleteMember;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  > button {
    width: 140px;
    height: 36px;
    border-radius: 5px;
    border: 1px solid #fff;
  }
`;
