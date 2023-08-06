import { NewMember } from '@/types/types';

type OttArr = NewMember['memberOtts'];
type InterestArr = NewMember['interests'];

export const objToArr = (objArr: OttArr | InterestArr) => {
  const result: string[] = [];
  objArr.forEach((el) => {
    if ('memberOttName' in el) {
      result.push(el['memberOttName']);
    } else result.push(el['interestName']);
  });
  return result;
};

export const arrToObj = (stringArr: string[], type: string) => {
  const result: OttArr & InterestArr = [];
  if (type === 'ott')
    stringArr.forEach((el) => result.push({ memberOttName: el }));
  else stringArr.forEach((el) => result.push({ interestName: el }));
  return result;
};
