import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/atoms/Atoms';
import { OpenModalType } from '@/types/types';

export const useModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const closeModal = useCallback(
    () =>
      setModalDataState((prev) => {
        return { ...prev, isOpen: false };
      }),
    [setModalDataState]
  );

  const openModal = useCallback(
    ({ content }: OpenModalType) =>
      setModalDataState({
        isOpen: true,
        content: content,
      }),
    [setModalDataState]
  );

  return { modalDataState, closeModal, openModal };
};
