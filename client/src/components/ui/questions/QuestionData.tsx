import kuroming from '../../../assets/recommendimage/kuroming.svg';
import kongdami from '../../../assets/recommendimage/kongdami.svg';
import beehappy from '../../../assets/recommendimage/beehappy.svg';

import firstQ from '../../../assets/recommendimage/firstQ.webp';
import secondQ from '../../../assets/recommendimage/secondQ.webp';
import thirdQ from '../../../assets/recommendimage/thirdQ.webp';

import netflix from '../../../assets/recommendimage/netflix.svg';
// import tving from '../../../assets/recommendimage/tving.svg';
import disney from '../../../assets/recommendimage/disney.svg';
import watcha from '../../../assets/recommendimage/watcha.svg';
import wavve from '../../../assets/recommendimage/wavve.svg';

import tv from '../../../assets/recommendimage/tv.svg';
import movie from '../../../assets/recommendimage/movie.svg';

export const questionList = [
  {
    characterImage: kuroming,
    characterName: 'kuroming',
    questionImage: firstQ,
    questionText: '어떤 OTT 서비스를 이용하고 계신가요?',
  },
  {
    characterImage: kongdami,
    characterName: 'kongdami',
    questionImage: secondQ,
    questionText: 'TV 프로그램과 영화 중 어떤 것을 추천 받고 싶으신가요?',
  },
  {
    characterImage: beehappy,
    characterName: 'beehappy',
    questionImage: thirdQ,
    questionText: '어떤 장르를 즐겨보시나요?',
  },
];

export const ottServices = [
  {
    name: '넷플릭스',
    ottname: 'netfilx',
    icon: netflix,
  },
  // {
  //   name: '티빙',
  //   ottname: 'tving',
  //   icon: tving
  // },
  { name: '디즈니플러스', ottname: 'disney', icon: disney },
  { name: '왓챠', ottname: 'watcha', icon: watcha },
  { name: '웨이브', ottname: 'wavve', icon: wavve },
];

export const category = [
  {
    name: 'TV 프로그램',
    categoryname: 'tv',
    icon: tv,
  },
  {
    name: '영화',
    categoryname: 'movie',
    icon: movie,
  },
];

export const genres = [
  '액션',
  '드라마',
  'SF',
  '스릴러',
  '애니메이션',
  '코미디',
  '가족',
  '판타지',
  '로맨스',
  '공포',
  '범죄',
  '스포츠',
  '음악',
  'Made in Europe',
  'Reality TV',
  '역사',
  '다큐멘터리',
  '전쟁',
  '서부',
];
