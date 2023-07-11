import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import netflix from '../../assets/ott/netflix.svg';
import tving from '../../assets/ott/tving.svg';
import disney from '../../assets/ott/disney.svg';
import watcha from '../../assets/ott/watcha.svg';
import wavve from '../../assets/ott/wavve.svg';
import Bookmark from './Bookmark';
import Tag from '../ui/Tag';
import { GetDataDetail } from './../../api/api';
import Recommend from './Recommend';
import {
  ContentDetailLoading,
  RecommendError,
} from '../exceptions/contentDetail';

const ContentDetail = ({ contentId }: { contentId: string }) => {
  const { isLoading, data, error, isSuccess } = useQuery(
    ['selectedContent', contentId],
    () => GetDataDetail(contentId),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <ContentDetailLoading />;

  if (error instanceof Error) return <RecommendError />;

  if (isSuccess) {
    const findOtt = (ottName: string) => {
      return data.mediaOtt.includes(ottName);
    };
    return (
      <S_Wrapper backgroundimage={data.mainPoster}>
        <div className="main-flex">
          <div className="title-flex">
            <S_Title>
              <img src={data.titlePoster} alt="title" />
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
                  <img
                    src={netflix}
                    alt="Netflix"
                    className={findOtt('Netflix') ? '' : 'dark'}
                  />
                  <img
                    src={disney}
                    alt="Disney Plus"
                    className={findOtt('Disney Plus') ? '' : 'dark'}
                  />
                  <img
                    src={watcha}
                    alt="Watcha"
                    className={findOtt('Watcha') ? '' : 'dark'}
                  />
                  <img
                    src={wavve}
                    alt="wavve"
                    className={findOtt('wavve') ? '' : 'dark'}
                  />
                  <img
                    src={tving}
                    alt="Tving"
                    className={findOtt('Tving') ? '' : 'dark'}
                  />
                </div>
                <p className="bold-white">
                  크리에이터 &nbsp;&nbsp;&nbsp;{data.creator}
                </p>
                <p className="bold-white margin">
                  출연 &nbsp;&nbsp;&nbsp;{data.cast}
                </p>
                <p className="text">{data.content}</p>
                <p className="date">
                  {data.releaseDate}, {data.ageRate}
                </p>
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
  }
  .margin {
    margin-top: 10px;
  }
  .text {
    color: var(--color-white-80);
    margin: 45px 0;
  }
  .date {
    color: var(--color-white-80);
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
