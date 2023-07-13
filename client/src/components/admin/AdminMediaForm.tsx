import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { AdminPatchData, AdminPostData } from '../../api/api';
import { AddData, SelectedData } from '../../types/types';

const AdminMediaForm = ({
  type,
  editData,
  contentId,
}: {
  type: string;
  editData: SelectedData | null;
  contentId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const AddMediaMutation = useMutation({
    mutationFn: (convertedData: AddData) => AdminPostData(convertedData),
    onSuccess: () => {
      alert('등록 완료');
      navigate('/');
    },
  });

  const EditMediaMutation = useMutation({
    mutationFn: AdminPatchData,
    onSuccess: () => {
      alert('수정 완료');
      window.location.reload();
    },
  });

  const convertData = (data: Record<string, any>) => {
    const ottNames = data.ottName.split(',').map((ott: string) => ott.trim());
    const ottAddresses = data.ottAddress
      .split(',')
      .map((address: string) => address.trim());
    const convertedData: AddData = {
      title: data.title,
      content: data.content,
      category: data.category,
      creator: data.creator,
      cast: data.cast,
      mainPoster: data.mainPoster,
      titlePoster: data.titlePoster,
      releaseDate: parseInt(data.releaseDate),
      ageRate: data.ageRate,
      recent: data.recent,
      genre: data.genre.split(',').map((item: string) => item.trim()),
      mediaOtt: ottNames.map((ottName: string, index: number) => ({
        ottName: ottName,
        ottAddress: ottAddresses[index],
      })),
    };
    return convertedData;
  };

  return (
    <S_Form
      onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        const convertedData = convertData(data);
        if (type === 'add') {
          return AddMediaMutation.mutate(convertedData);
        }
        if (contentId) {
          EditMediaMutation.mutate({
            mediaId: contentId,
            mediaData: convertedData,
          });
        }
      })}
    >
      <label htmlFor="title">제목</label>
      <input
        id="title"
        type="text"
        defaultValue={type === 'edit' ? editData?.title : ''}
        placeholder="string"
        {...register('title')}
      />
      <label htmlFor="content">내용</label>
      <input
        id="content"
        type="text"
        defaultValue={type === 'edit' ? editData?.content : ''}
        placeholder="string"
        {...register('content')}
      />
      <label htmlFor="category">카테고리</label>
      <input
        id="category"
        type="text"
        defaultValue={type === 'edit' ? editData?.category : ''}
        placeholder="TV || 영화 string"
        {...register('category')}
      />
      <label htmlFor="creator">제작자</label>
      <input
        id="creator"
        type="text"
        defaultValue={type === 'edit' ? editData?.creator : ''}
        placeholder="제작자 X"
        {...register('creator')}
      />
      <label htmlFor="cast">출연진</label>
      <input
        id="cast"
        type="text"
        defaultValue={type === 'edit' ? editData?.cast : ''}
        placeholder="string"
        {...register('cast')}
      />
      <label htmlFor="mainPoster">메인 포스터</label>
      <input
        id="mainPoster"
        type="text"
        defaultValue={type === 'edit' ? editData?.mainPoster : ''}
        placeholder="string"
        {...register('mainPoster')}
      />
      <label htmlFor="titlePoster">타이틀 포스터</label>
      <input
        id="titlePoster"
        type="text"
        defaultValue={type === 'edit' ? editData?.titlePoster : ''}
        placeholder="string"
        {...register('titlePoster')}
      />
      <label htmlFor="releaseDate">개봉일</label>
      <input
        id="releaseDate"
        type="number"
        defaultValue={type === 'edit' ? editData?.releaseDate : ''}
        placeholder="4자리 number"
        {...register('releaseDate')}
      />
      <label htmlFor="ageRate">연령 등급</label>
      <input
        id="ageRate"
        type="text"
        defaultValue={type === 'edit' ? editData?.ageRate : ''}
        placeholder="연령 X"
        {...register('ageRate')}
      />
      <label htmlFor="recent">최신 여부</label>
      <input
        id="recent"
        type="checkbox"
        defaultChecked={type === 'edit' ? editData?.recent : false}
        {...register('recent')}
      />
      <label htmlFor="genre">장르</label>
      <input
        id="genre"
        type="text"
        defaultValue={type === 'edit' ? editData?.genre : ''}
        placeholder="액션,드라마,SF,스릴러,애니메이션,코미디,가족,판타지..."
        {...register('genre')}
      />
      <label htmlFor="ottName">OTT 이름</label>
      <input
        id="ottName"
        type="text"
        defaultValue={
          type === 'edit'
            ? editData?.mediaOtt.map((ott) => ott.ottName).join(',')
            : ''
        }
        placeholder="Netflix,Disney Plus,Watcha,wavve,Tving"
        {...register('ottName', { required: true })}
      />
      <label htmlFor="ottAddress">OTT 주소</label>
      <input
        id="ottAddress"
        type="text"
        defaultValue={
          type === 'edit'
            ? editData?.mediaOtt.map((ott) => ott.ottAddress).join(',')
            : ''
        }
        {...register('ottAddress', { required: true })}
      />
      {/* 이메일과 비밀번호 제거를 위한 주석 */}
      {/* <label htmlFor="email">이메일</label>
      <input id="email" type="email" {...register('email')} />

      <label htmlFor="password">비밀번호</label>
      <input id="password" type="password" {...register('password')} /> */}
      <button type="submit" disabled={isSubmitting}>
        {type === 'edit' ? '수정완료' : '생성완료'}
      </button>
    </S_Form>
  );
};

export default AdminMediaForm;

const S_Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  padding: 10px;
  margin: 0 20px;

  label {
    color: white;
    margin-top: 10px;
  }

  input {
    color: black;
    font-size: 18px;
    height: 30px;
  }

  button {
    height: 50px;
    margin: 20px 0 0;
    color: black;
    background-color: white;
  }
`;
