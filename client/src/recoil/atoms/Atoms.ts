import { atom } from 'recoil';
import { MemberLikes, ModalType } from '@/types/types';

export const profileModalState = atom<boolean>({
  key: 'profileModal',
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

export const modalState = atom<ModalType>({
  key: 'modalState',
  default: {
    isOpen: false,
    content: '',
  },
});
