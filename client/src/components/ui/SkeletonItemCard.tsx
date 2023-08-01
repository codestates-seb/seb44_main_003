import styled from 'styled-components';

const SkeletonItemCard = () => {
  return (
    <>
      <S_ItemBox>
        <S_ItemImage />
        <S_ItemTitle />
      </S_ItemBox>
    </>
  );
};

export default SkeletonItemCard;

const S_ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const S_ItemImage = styled.div`
  padding-top: calc(4.2 / 3 * 100%);
  aspect-ratio: 3/4.2;
  border-radius: 10px;
  background-color: var(--color-dropdown);
`;

const S_ItemTitle = styled.div`
  margin-top: 10px;
  height: 18px;
  border-radius: 5px;
  background-color: var(--color-dropdown);
`;
