import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetFilterdData } from '../../../api/api';
import useIsLoggedIn from '../../../hooks/useIsLoggedIn';
import styled from 'styled-components';
import RecommendBtn from '../../ui/RecommendBtn';
import CloseBtn from '../../ui/CloseBtn';
import { Question } from '../../../types/types'
import Id from '../../../assets/recommendimage/님께.png';
import recommendImg from '../../../assets/recommendimage/추천드려요.png';
import btnSignup from '../../../assets/recommendimage/회원가입.png';
import btnRecommend from '../../../assets/recommendimage/추천작품.png';
import { useRecoilValue } from 'recoil';
import { recommendedContentsState } from '../../../recoil/atoms/Atoms';

const QuestionResult: React.FC<Question> = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  console.log(isLoggedIn)

  const recommendedContents = useRecoilValue(recommendedContentsState);

  console.log(`/medias/${recommendedContents.category}?size=6&genre=${recommendedContents.interests.join(',')}&ott=${recommendedContents.memberOtts.join(',')}`)

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ['recommendedContents'],
    queryFn: () => GetFilterdData(
      `/medias/${recommendedContents.category}?size=6&genre=${recommendedContents.interests.join(',')}&ott=${recommendedContents.memberOtts.join(',')}`
    )
  });

  if (isLoading) {
    return (
      <>
        로딩중
      </>
    );
  }

  if (error instanceof Error) return 'An error has occurred: ' + error.message;

  if (isSuccess) {
    const randomNumber = Math.floor(Math.random() * data.content.length);
    const randomItem = data.content[randomNumber];
    if (data && data.content.length > 0) {
      return (
        <S_Wrapper isOpen={isOpen}>
          <S_ModalBox>
            <CloseBtn onClick={closeModal}/>
            <S_Result src={Id}></S_Result>
            <S_ResultTitleBox>
              <S_ResultTitle key={randomItem.id}>{randomItem.title}</S_ResultTitle>
              <S_Result src={recommendImg}></S_Result>
            </S_ResultTitleBox>
            <S_SelectionBox>
              <S_RecommendPoster src={randomItem.mainPoster}></S_RecommendPoster>
              <S_RecommendBox>
                <S_Text>{`추천 컨텐츠가 마음에 드셨나요? \n조잉 멤버가 되면 \n더 많은 맞춤 컨텐츠를 추천해드립니다!`}</S_Text>
                <S_BtnsBox>
                  <RecommendBtn 
                    bgColor={'#F7CD40'}
                    bgShadow={'#C17932'}
                    btnText={btnSignup}
                    onClick={() => {
                      if (!isLoggedIn) {
                        navigate('/signup');
                      }
                      closeModal();
                    }}
                  />
                  <RecommendBtn 
                    bgColor={'#F7CD40'}
                    bgShadow={'#C17932'}
                    btnText={btnRecommend}
                    onClick={() => {
                      navigate(`/content/${randomItem.id}`)
                      closeModal();
                    }}
                  />
                </S_BtnsBox>
              </S_RecommendBox>
            </S_SelectionBox>
            <S_ModalBackground/>
          </S_ModalBox>
        </S_Wrapper>
      )
    } else {
      return (
        <S_Wrapper isOpen={isOpen}>
          <S_ModalBox>
            <CloseBtn onClick={closeModal}/>
            <S_Result src={Id}></S_Result>
            <S_ResultTitleBox>
            </S_ResultTitleBox>
            <S_SelectionBox>
              <S_RecommendBox>
                <S_Text>{`추천하는 컨텐츠가 없습니다`}</S_Text>
                <S_BtnsBox>
                  <RecommendBtn 
                    bgColor={'#F7CD40'}
                    bgShadow={'#C17932'}
                    btnText={btnSignup}
                  />
                  <RecommendBtn 
                    bgColor={'#F7CD40'}
                    bgShadow={'#C17932'}
                    btnText={btnRecommend}
                  />
                </S_BtnsBox>
              </S_RecommendBox>
            </S_SelectionBox>
            <S_ModalBackground/>
          </S_ModalBox>
        </S_Wrapper>
      )
    }
  }
}

export default QuestionResult

const S_Wrapper = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const S_ModalBackground = styled.div`
  position: absolute;
  width: 840px;
  height: 700px;
  background: #212121;
  border-radius: 240px;
  filter: blur(50px);
  z-index: -1;
`

const S_ModalBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 840px;
  height: 700px;
`
const S_Result = styled.img`
`

const S_ResultTitleBox = styled.div`
  display: flex;
  align-items: center;
`

const S_ResultTitle = styled.p`
  font-family: 'cookieRun';
  font-size: 60px;
  font-weight: 700;
  color: #F7CD40;
  text-shadow: 
    0 0 0px #212121, 0 0 0px #212121, 0 0 0px #212121, 0 0 0px #212121, 
    5px 0 0px #212121, 5px 5px 0px #212121, 5px -5px 0px #212121,
    -5px 0 0px #212121, -5px 5px 0px #212121, -5px -5px 0px #212121;
`

const S_SelectionBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 40px;
  background: var(--color-white-100);
  border: 5px solid var(--color-bg-100);
  border-radius: 15px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.40);
  font-family: 'inter';
`

const S_RecommendBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const S_RecommendPoster = styled.img`
  width: 220px;
  height: 300px;
  background: var(--color-white-100);
  object-fit: cover;
  aspect-ratio: 3/4.2;
  border: 3px solid var(--color-bg-100);
  filter: var(--shadow-modal-m-b);
  border-radius: 10px;
  margin-right: 20px;
`

const S_Text = styled.p`
  margin-bottom: 30px;
  font-family: 'cookieRun';
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  white-space: pre;
  color: var(--color-bg-100);
`;

const S_BtnsBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
`