import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import styled, { keyframes } from 'styled-components';
import { GetDataDetail, GetUser } from './../../api/api';
import Bookmark from './Bookmark';
import Recommend from './Recommend';
import Tag from '../ui/Tag';
import ContentDetailLoading from '../ui/exceptions/ContentDetailLoading';
import DeleteMediaBtn from '../admin/DeleteMediaBtn';
import PatchMediaBtn from '../admin/PatchMediaBtn';
import ReportBtn from './ReportBtn';
import useMediaQuery from '../../hooks/useMediaQuery';
import Error from '../../pages/Error';

function ContentDetail({ contentId }: { contentId: string }) {
  const navigate = useNavigate();
  const ottList = [
    { name: 'Netflix', img: '/ott/netflix.webp' },
    { name: 'Disney Plus', img: '/ott/disney.webp' },
    { name: 'Watcha', img: '/ott/watcha.webp' },
    { name: 'wavve', img: '/ott/wavve.webp' },
  ];
  const isUnder900 = useMediaQuery('(max-width: 900px)');
  const { isLoading, data, error, isSuccess } = useQuery(
    ['selectedContent', contentId],
    () => GetDataDetail(contentId)
  );

  const findOtt = (ottName: string) => {
    return data?.mediaOtt.some((ott) => ott.ottName === ottName);
  };

  const renderOtt = (ott: { name: string; img: string }) => {
    const hasOtt = findOtt(ott.name);
    const ottAddress = data?.mediaOtt.find(
      (item) => item.ottName === ott.name
    )?.ottAddress;

    if (hasOtt && ottAddress) {
      return (
        <a
          href={ottAddress}
          target="_blank"
          rel="noopener noreferrer"
          key={ott.name}
        >
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}${ott.img}`}
            alt={ott.name}
            className=""
          />
        </a>
      );
    } else {
      return (
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}${ott.img}`}
          alt={ott.name}
          className="dark"
          key={ott.name}
        />
      );
    }
  };

  const admin = useQuery(['user'], GetUser, { enabled: false });

  if (isLoading) return <ContentDetailLoading />;

  if (error instanceof AxiosError) {
    if (!error.status && error.code === 'ERR_NETWORK') navigate('/error');
    if (error.response?.status === 404) return <Error code="404" />;
  }

  if (isSuccess) {
    return (
      <S_Wrapper>
        <S_Section backgroundimage={data.mainPoster}>
          {admin?.data?.roles[0] === 'ADMIN' && (
            <>
              <PatchMediaBtn editData={data} contentId={contentId} />
              <DeleteMediaBtn contentId={contentId} />
            </>
          )}
          <div className="main-flex">
            <div className="title-flex">
              <S_Title>
                {data.titlePoster ? (
                  <img src={data.titlePoster} alt="title" />
                ) : (
                  <S_TextTitle>{data.title}</S_TextTitle>
                )}
              </S_Title>
              <S_Content>
                <div className="poster-flex">
                  <S_Poster>
                    <img src={data.mainPoster} alt="poster" />
                  </S_Poster>
                  <ReportBtn contentId={contentId} />
                  <div className="icon-flex">
                    <Bookmark contentId={contentId} />
                    <Recommend
                      countRecommend={data.countRecommend}
                      contentId={contentId}
                    />
                  </div>
                </div>
                <S_TitleFont>
                  <h1 className="h1">장르</h1>
                  <Tag genre={data.genre} />
                  <h1 className="h1">컨텐츠 보러가기</h1>
                  <div className="ott">
                    {ottList.map((ott) => renderOtt(ott))}
                  </div>
                  <h1 className="bold-white">출시일: {data.releaseDate}</h1>
                  <h1 className="bold-white margin">
                    {data.cast ? ` 출연: ${data.cast}` : '출연: 알수없음'}
                  </h1>
                  {isUnder900 || <S_Text>{data.content}</S_Text>}
                </S_TitleFont>
              </S_Content>
              {isUnder900 && <S_Text>{data.content}</S_Text>}
            </div>
          </div>
        </S_Section>
      </S_Wrapper>
    );
  }
}

export default ContentDetail;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeInMoveDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-200px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const S_Section = styled.section<{ backgroundimage: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0 50px 0;
  padding: 0 60px;
  width: 100vw;

  .main-flex {
    display: flex;
    justify-content: space-between;
  }

  .title-flex {
    display: flex;
    flex-direction: column;
  }

  .poster-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon-flex {
    display: flex;
    justify-content: center;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.backgroundimage});
    filter: blur(150px);
    opacity: 0.9;
    z-index: -1;
  }

  @media only screen and (max-width: 770px) {
    margin: 50px 0;
    padding: 0 20px;
    .main-flex {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .title-flex {
      align-items: center;
    }
    .poster-flex {
      position: static;
      display: flex;
      flex-direction: column;
    }
  }
`;

const S_Content = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 50px;

  @media only screen and (max-width: 770px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const S_Title = styled.div`
  width: 420px;
  img {
    object-fit: cover;
    animation: ${fadeInMoveDown} 0.5s ease-out;
  }

  @media only screen and (max-width: 770px) {
    align-self: center;
  }
`;

const S_TextTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: 50px !important;
  font-weight: bold;
  color: var(--color-white-100);
  width: 400px;
  height: 180px;
  align-self: flex-end;
  position: relative;
  animation: ${fadeInMoveDown} 0.5s ease-out;

  @media only screen and (max-width: 770px) {
    justify-content: center;
  }
`;

const S_TitleFont = styled.div`
  width: 65%;
  animation: ${fadeIn} 1s ease-in;
  .ott {
    margin: 40px 0 60px 0;
    animation: ${slideIn} 0.5s ease-out;
  }
  .h1 {
    font-size: 24px;
    color: var(--color-white-100);
  }
  .bold-white {
    font-size: 20px;
    color: var(--color-white-80);
    font-weight: 500;
    line-height: 1.5;
    max-width: 600px;
  }
  .margin {
    margin-top: 25px;
  }
  img {
    width: 60px;
    height: 60px;
    box-shadow: var(--shadow-box-m-25);
    margin-right: 15px;
  }
  .dark {
    filter: saturate(0);
    opacity: 0.8;
  }

  @media only screen and (max-width: 770px) {
    width: 100%;
    p {
      font-size: 16px;
    }
    .h1 {
      font-size: 18px;
    }
    .margin {
      width: 100%;
    }
    .ott {
      display: flex;
      justify-content: center;
    }
    img {
      width: 50px;
      height: 50px;
      margin: 0 5px;
    }
  }
`;

const S_Poster = styled.div`
  width: 300px;
  height: 450px;
  align-self: flex-end;
  position: relative;
  z-index: 1;
  animation: ${fadeInMoveDown} 0.5s ease-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  @media only screen and (max-width: 770px) {
    align-self: center;
  }
`;

const S_Text = styled.p`
  color: var(--color-white-80);
  margin: 25px 30px 25px 0;
  line-height: 1.6;
  font-size: 19px;
  font-weight: 400;
  @media only screen and (max-width: 770px) {
    margin: 25px 0;
    font-size: 16px;
  }
`;
