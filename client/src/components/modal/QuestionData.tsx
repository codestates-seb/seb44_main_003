import kuroming from '../../assets/recommendimage/kuroming.svg';
import kongdami from '../../assets/recommendimage/kongdami.svg';
import beehappy from '../../assets/recommendimage/beehappy.svg';

import firstQ from '../../assets/recommendimage/firstQ.png';
import secondQ from '../../assets/recommendimage/secondQ.png';
import thirdQ from '../../assets/recommendimage/thirdQ.png';

import netflix from '../../assets/recommendimage/netflix.svg';
import tving from '../../assets/recommendimage/tving.svg';
import disney from '../../assets/recommendimage/disney.svg';
import watcha from '../../assets/recommendimage/watcha.svg';
import wavve from '../../assets/recommendimage/wavve.svg';

import tv from '../../assets/recommendimage/tv.png';
import movie from '../../assets/recommendimage/movie.png';

export const questionList = [
  {
    characterImage: kuroming,
    characterName: 'kuroming',
    questionImage: firstQ,
    questionText: '어떤 OTT 서비스를 이용하고 계신가요?'
  },
  {
    characterImage: kongdami,
    characterName: 'kongdami',
    questionImage: secondQ,
    questionText: 'TV 프로그램과 영화 중 어떤 것을 추천 받고 싶으신가요?'
  },
  {
    characterImage: beehappy,
    characterName: 'beehappy',
    questionImage: thirdQ,
    questionText: '어떤 장르를 즐겨보시나요?'
  }
]

export const ottServices = [
  {
    name: '넷플릭스', 
    icon: netflix 
  },
  { 
    name: '티빙', 
    icon: tving 
  },
  { name: '디즈니플러스',
    icon: disney
  },
  { name: '왓챠', 
    icon: watcha 
  },
  { name: '웨이브', 
    icon: wavve 
  },
]

export const category = [
  { 
    name: 'TV 프로그램', 
    icon: tv 
  },
  { 
    name: '영화', 
    icon: movie 
  },
]

export const genres = [
  '드라마',
  '액션',
  '로맨스',
  '음악',
  '코미디',
  '애니',
  '스릴러',
  '판타지',
  '호러',
  '다큐멘터리',
  '사극',
  '스포츠'
]