import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { PostUserProfile } from '../../../api/api';
import { styled } from 'styled-components';
import preview from '../../../assets/profiles/preview.svg';
import { useSetRecoilState } from 'recoil';
import { profileModalState } from '../../../recoil/atoms/Atoms';

function ImgUpload() {
  const queryClient = useQueryClient();
  const setShowModal = useSetRecoilState(profileModalState);
  const [imgState, setImgState] = useState<Blob | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mutation = useMutation(PostUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
  const checkFileVaildity = (file: File) => {
    const maxSize = 1024 * 1024 * 20;
    const fileType = 'image';
    const submittedType = file.type.substring(0, 5);
    if (file.size > maxSize) {
      setError('최대 용량을 초과했습니다(20MB).');
      return false;
    }
    if (submittedType !== fileType) {
      setError('이미지 파일만 업로드할 수 있습니다');
      return false;
    }
    return true;
  };
  const upload = (file: File) => {
    if (!checkFileVaildity(file)) return;
    setImgState(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview(reader.result as string);
    };
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    upload(e.target.files[0]);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    upload(e.dataTransfer.files[0]);
  };
  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imgState) {
      const data = new FormData();
      data.append('file', imgState);
      mutation.mutate(data);
    }
    setError('파일이 업로드되지 않았습니다.');
  };

  return (
    <S_Wrapper onSubmit={handleSubmit}>
      <div>
        <div className="dragBox" onDrop={handleDrop} onDragOver={dragOver}>
          <div>
            <label htmlFor="img">파일을 선택</label>
            <span>하거나 파일을 여기로 드래그하세요.</span>
          </div>
          <p>(20MB 이하의 이미지만 업로드할 수 있습니다.)</p>
          <input
            onChange={handleChange}
            id="img"
            name="img"
            type="file"
            accept="image/*"
          />
        </div>
        <div className="previewBox">
          <img src={imgPreview || preview} />
        </div>
      </div>
      <div className="error">{error}</div>
      <div>
        <button type="submit">확인</button>
        <button type="button" onClick={() => setShowModal(false)}>
          취소
        </button>
      </div>
    </S_Wrapper>
  );
}

export default ImgUpload;

const S_Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  margin-top: 30px;
  > div {
    display: flex;
    align-items: center;
    padding: 10px;
  }
  & img {
    border-radius: 5px;
    width: 140px;
    height: 140px;
    border-radius: 5px;
  }
  & div.dragBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed white;
    width: 21rem;
    height: 200px;
    border-radius: 10px;
    color: var(--color-white-80);
    > div {
      margin-bottom: 5px;
    }
  }
  & div.error {
    color: var(--color-primary-yellow);
    height: 40px;
  }
  & div.previewBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
  }
  & button {
    color: var(--color-white-80);
    border: 1px solid var(--color-white-80);
    border-radius: 5px;
    padding: 5px 15px;
    margin: 0 20px;
  }
  & button:first-child {
    background-color: var(--color-white-80);
    color: var(--color-bg-80);
  }
  & label {
    cursor: pointer;
    font-weight: 700;
    text-decoration: underline;
  }
  & label:hover {
    color: white;
  }
  & input {
    display: none;
  }
`;
