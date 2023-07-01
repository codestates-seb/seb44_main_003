import { atom } from 'recoil';

export const profileModalState = atom<boolean>({
  key: 'profileModal',
  default: false,
});
