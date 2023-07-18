import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetFilterdData, GetUser } from '../../../api/api';
import useIsLoggedIn from '../../../hooks/useIsLoggedIn';
import styled, { keyframes } from 'styled-components';
import RecommendBtn from '../../ui/RecommendBtn';
import CloseBtn from '../../ui/CloseBtn';
import { Question } from '../../../types/types';
import nicknameText from '../../../assets/recommendimage/nicknameText.webp';
import recommendText from '../../../assets/recommendimage/recommendText.webp';
import noContent from '../../../assets/recommendimage/noContentText.webp';
import btnSignup from '../../../assets/recommendimage/signupBtnText.webp';
import btnRecommend from '../../../assets/recommendimage/recommendBtnText.webp';
import btnAgain from '../../../assets/recommendimage/againBtnText.webp';
import loadmore from '../../../assets/exception/loadmore.svg';
import beesad from '../../../assets/recommendimage/beesad.svg';
import { useRecoilValue } from 'recoil';
import { recommendedContentsState } from '../../../recoil/atoms/Atoms';

const QuestionResult: React.FC<Question> = ({ closeModal, onReset }) => {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  const recommendedContents = useRecoilValue(recommendedContentsState);

  const {
    isLoading: filteredLoading,
    error: filteredError,
    data: filterData,
    isSuccess: filterSuccess,
  } = useQuery({
    queryKey: ['recommendedFilter', recommendedContents],
    queryFn: () =>
      GetFilterdData(
        `/medias/${
          recommendedContents.category
        }?size=6&genre=${recommendedContents.interests.join(
          ','
        )}&ott=${recommendedContents.memberOtts.join(',')}`
      ),
  });

  const {
    data: userData,
    error: userError,
    isSuccess: userSuccess,
  } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: isLoggedIn,
  });

  if (filteredLoading) {
    return (
      <S_LoadMore>
        <p className="loadmore">Loading . . .</p>
        <img src={loadmore} alt="loadmore" />
      </S_LoadMore>
    );
  }

  if (filteredError instanceof Error)
    return 'An error has occurred: ' + filteredError.message;

  if (userError instanceof Error)
    return 'An error has occurred: ' + userError.message;

  if (filterSuccess) {
    const randomNumber = Math.floor(Math.random() * filterData.content.length);
    const randomItem = filterData.content[randomNumber];
    if (filterData && filterData.content.length > 0) {
      return (
        <S_Wrapper
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <S_ModalBox>
            <CloseBtn onClick={closeModal} />
            <S_ResultIdBox>
              <S_ResultId>
                {userSuccess ? userData.nickname : 'guest'}
              </S_ResultId>
              <S_ResultImg src={nicknameText} />
            </S_ResultIdBox>
            <S_ResultTitleBox>
              <S_ResultTitle key={randomItem.title}>
                {randomItem.title}
              </S_ResultTitle>
              <S_ResultImg src={recommendText} />
            </S_ResultTitleBox>
            <S_SelectionBox>
              <S_RecommendPosterBox>
                <S_RecommendPoster src={randomItem.mainPoster} />
              </S_RecommendPosterBox>
              <S_RecommendBox>
                <S_Text>{`추천 컨텐츠가 마음에 드셨나요? \n조잉 멤버가 되면 \n더 많은 맞춤 컨텐츠를 추천해드립니다!`}</S_Text>
                <S_BtnsBox>
                  {!userSuccess && (
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
                  )}
                  {userSuccess && (
                    <RecommendBtn
                      bgColor={'#F7CD40'}
                      bgShadow={'#C17932'}
                      btnText={btnAgain}
                      onClick={onReset}
                    />
                  )}
                  <RecommendBtn
                    bgColor={'#F7CD40'}
                    bgShadow={'#C17932'}
                    btnText={btnRecommend}
                    onClick={() => {
                      navigate(`/content/${randomItem.id}`);
                      closeModal();
                    }}
                  />
                </S_BtnsBox>
              </S_RecommendBox>
            </S_SelectionBox>
            <S_ModalBackground />
          </S_ModalBox>
        </S_Wrapper>
      );
    } else {
      return (
        <S_Wrapper
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <S_ModalBox>
            <CloseBtn onClick={closeModal} />
            <S_ResultIdBox>
              <S_ResultId>
                {userSuccess ? userData.nickname : 'guest'}
              </S_ResultId>
              <S_ResultImg src={nicknameText} />
            </S_ResultIdBox>
            <S_ResultTitleBox>
              <S_ResultImg src={noContent} />
            </S_ResultTitleBox>
            <S_SelectionBox>
              <S_RecommendBox>
                <S_ResultImg src={beesad} />
                <S_Text>{`다시 컨텐츠를 찾아볼까요?`}</S_Text>
                <S_BtnsBox>
                  <RecommendBtn
                    bgColor={'#F7CD40'}
                    bgShadow={'#C17932'}
                    btnText={btnAgain}
                    onClick={onReset}
                  />
                </S_BtnsBox>
              </S_RecommendBox>
            </S_SelectionBox>
            <S_ModalBackground />
          </S_ModalBox>
        </S_Wrapper>
      );
    }
  }
};

export default QuestionResult;

const S_Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const S_ModalBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const S_ModalBackground = styled.div`
  position: absolute;
  width: 840px;
  height: 700px;
  background: #212121;
  border-radius: 240px;
  filter: blur(50px);
  z-index: -1;
`;

const S_SelectionBox = styled.div`
  display: grid;
  justify-content: center;
  padding: 20px 40px;
  width: 100%;
  background: var(--color-white-100);
  border: 5px solid var(--color-bg-100);
  border-radius: 15px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.4);
  font-family: 'inter';
`;

const S_ResultImg = styled.img``;

const S_ResultIdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const S_ResultId = styled.p`
  font-family: 'cookieRun';
  font-size: 60px;
  font-weight: 700;
  color: #f7cd40;
  text-shadow: 0 0 0px #212121, 0 0 0px #212121, 0 0 0px #212121,
    0 0 0px #212121, 5px 0 0px #212121, 5px 5px 0px #212121,
    5px -5px 0px #212121, -5px 0 0px #212121, -5px 5px 0px #212121,
    -5px -5px 0px #212121;
`;

const S_ResultTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const S_ResultTitle = styled.p`
  font-family: 'cookieRun';
  font-size: 60px;
  font-weight: 700;
  color: #f7cd40;
  text-shadow: 0 0 0px #212121, 0 0 0px #212121, 0 0 0px #212121,
    0 0 0px #212121, 5px 0 0px #212121, 5px 5px 0px #212121,
    5px -5px 0px #212121, -5px 0 0px #212121, -5px 5px 0px #212121,
    -5px -5px 0px #212121;
`;

const S_RecommendBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const S_RecommendPosterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const S_RecommendPoster = styled.img`
  width: 220px;
  height: 300px;
  background: var(--color-white-100);
  object-fit: cover;
  aspect-ratio: 3/4.2;
  border: 3px solid var(--color-bg-100);
  filter: var(--shadow-modal-m-b);
  border-radius: 10px;
  margin-bottom: 20px;
`;

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
`;

const opacityAnimation = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const rotateAnimation = keyframes`
  0% { transform: rotate(-15deg); }
  50% { transform: rotate(30deg); }
  100% { transform: rotate(-15deg); }
`;

const S_LoadMore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;

  .loadmore {
    font-size: 30px;
    font-weight: bold;
    color: var(--color-white-80);
    animation: ${opacityAnimation} 1s infinite;
  }
  img {
    width: 60px;
    padding: 20px 0 50px 0;
    animation: ${rotateAnimation} 2s infinite;
  }
`;
