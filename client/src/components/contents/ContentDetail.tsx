import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import netflix from '../../assets/ott/netflix.svg';
import tving from '../../assets/ott/tving.svg';
import disney from '../../assets/ott/disney.svg';
import watcha from '../../assets/ott/watcha.svg';
import wavve from '../../assets/ott/wavve.svg';
import Bookmark from './Bookmark';
import Tag from '../ui/Tag';
import { GetDataDetail, GetUser } from './../../api/api';
import Recommend from './Recommend';
import {
  ContentDetailLoading,
  RecommendError,
} from '../ui/exceptions/contentDetail';
import DeleteMediaBtn from '../admin/DeleteMediaBtn';
import PatchMediaBtn from '../admin/PatchMediaBtn';

const ContentDetail = ({ contentId }: { contentId: string }) => {
  const ottList = [
    { name: 'Netflix', img: netflix },
    { name: 'Disney Plus', img: disney },
    { name: 'Watcha', img: watcha },
    { name: 'wavve', img: wavve },
    { name: 'Tving', img: tving },
  ];

  const { isLoading, data, error, isSuccess } = useQuery(
    ['selectedContent', contentId],
    () => GetDataDetail(contentId),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
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
          <img src={ott.img} alt={ott.name} className="" />
        </a>
      );
    } else {
      return (
        <img src={ott.img} alt={ott.name} className="dark" key={ott.name} />
      );
    }
  };

  const admin = useQuery(['user'], GetUser, { enabled: false });

  if (isLoading) return <ContentDetailLoading />;

  if (error instanceof Error) return <RecommendError />;

  if (isSuccess) {
    return (
      <S_Wrapper backgroundimage={data.mainPoster}>
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
                <div className="icon-flex">
                  <Bookmark contentId={contentId} />
                  <Recommend
                    countRecommend={data.countRecommend}
                    contentId={contentId}
                  />
                </div>
              </div>
              <S_TitleFont>
                <h1>장르</h1>
                <Tag genre={data.genre} />
                <h1>OTT</h1>
                <div className="ott">
                  {ottList.map((ott) => renderOtt(ott))}
                </div>
                <p className="bold-white">출시일: {data.releaseDate}</p>
                <p className="bold-white">
                  {data.cast ? ` 출연: ${data.cast}` : '출연: 알수없음'}
                </p>
                <p className="text">{data.content}</p>
              </S_TitleFont>
            </S_Content>
          </div>
        </div>
      </S_Wrapper>
    );
  }
};

export default ContentDetail;

const S_Wrapper = styled.section<{ backgroundimage: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0 50px 0;
  padding: 0 30px;
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
  span {
    margin-top: 20px;
    width: 1500px;
    height: 1px;
    background-color: var(--color-white-80);
  }

  @media only screen and (max-width: 940px) {
    margin-top: 140px;
  }

  @media only screen and (max-width: 620px) {
    padding: 0 40px;
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
  margin-top: 20px;

  @media only screen and (max-width: 620px) {
    display: flex;
    flex-direction: column;
  }
`;

const S_Title = styled.div`
  width: 420px;
  img {
    object-fit: cover;
  }

  @media only screen and (max-width: 620px) {
    margin-bottom: 20px;
  }
`;

const S_TitleFont = styled.div`
  width: 60%;

  .ott {
    margin: 30px 0 45px 0;
  }
  h1 {
    color: var(--color-white-100);
  }
  .bold-white {
    color: var(--color-white-80);
    font-weight: bold;
    margin-top: 10px;
  }
  .text {
    color: var(--color-white-80);
    margin: 45px 0;
  }
  img {
    box-shadow: var(--shadow-box-m-25);
    margin-right: 15px;
  }
  .dark {
    filter: saturate(0);
    opacity: 0.8;
  }
  @media only screen and (max-width: 768px) {
    .margin {
      width: 60%;
    }
    .text {
      width: 60%;
    }
  }
  @media only screen and (max-width: 620px) {
    font-size: 13px;
    width: 100%;
    h1 {
      font-size: 14px;
    }
    .margin {
      width: 100%;
    }
    .text {
      width: 100%;
    }
  }
`;

const S_Poster = styled.div`
  width: 280px;
  height: 410px;
  align-self: flex-end;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media only screen and (max-width: 620px) {
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
  height: 90px;
  align-self: flex-end;
  position: relative;

  @media only screen and (max-width: 620px) {
    justify-content: center;
  }
`;
