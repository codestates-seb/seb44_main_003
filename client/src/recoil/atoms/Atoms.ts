import { atom } from 'recoil';
import { MemberLikes } from '../../types/types';

export const profileModalState = atom<boolean>({
  key: 'profileModal',
  default: false,
});

export const recommendModalState = atom<boolean>({
  key: 'recommendModal',
  default: false,
});

export const recommendedContentsState = atom<MemberLikes>({
  key: 'recommendedContents',
  default: {
    category: '',
    memberOtts: [],
    interests: [],
  },
});