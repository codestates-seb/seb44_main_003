import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { AdminPostData } from '../../api/api';
import { AddData } from '../../types/types';

const AddMedia = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const AddMediaMutation = useMutation({
    mutationFn: (convertedData: AddData) => AdminPostData(convertedData),
    onSuccess: () => {
      alert('등록 완료');
    },
    onError(error) {
      console.error(error);
    },
  });

  const convertData = (data: Record<string, any>) => {
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
      recent: data.recent === 'true',
      genre: data.genre.split(',').map((item: string) => item.trim()),
      mediaOtt: [
        {
          ottName: data.ottName,
          ottAddress: data.ottAddress,
        },
      ],
    };
    return convertedData;
  };

  return (
    <S_Form
      onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        const convertedData = convertData(data);
        AddMediaMutation.mutate(convertedData);
      })}
    >
      <label htmlFor="title">제목</label>
      <input
        id="title"
        type="text"
        placeholder="string"
        {...register('title')}
      />

      <label htmlFor="content">내용</label>
      <input
        id="content"
        type="text"
        placeholder="string"
        {...register('content')}
      />

      <label htmlFor="category">카테고리</label>
      <input
        id="category"
        type="text"
        placeholder="TV || 영화 string"
        {...register('category')}
      />

      <label htmlFor="creator">제작자</label>
      <input
        id="creator"
        type="text"
        placeholder="제작자 X"
        {...register('creator')}
      />

      <label htmlFor="cast">출연진</label>
      <input id="cast" type="text" placeholder="string" {...register('cast')} />

      <label htmlFor="mainPoster">메인 포스터</label>
      <input
        id="mainPoster"
        type="text"
        placeholder="string"
        {...register('mainPoster')}
      />

      <label htmlFor="titlePoster">타이틀 포스터</label>
      <input
        id="titlePoster"
        type="text"
        placeholder="string"
        {...register('titlePoster')}
      />

      <label htmlFor="releaseDate">개봉일</label>
      <input
        id="releaseDate"
        type="number"
        placeholder="4자리 number"
        {...register('releaseDate')}
      />

      <label htmlFor="ageRate">연령 등급</label>
      <input
        id="ageRate"
        type="text"
        placeholder="연령 X"
        {...register('ageRate')}
      />

      <label htmlFor="recent">최신 여부</label>
      <input id="recent" type="checkbox" value="true" {...register('recent')} />

      <label htmlFor="genre">장르</label>
      <input
        id="genre"
        type="text"
        placeholder="액션,드라마,SF,스릴러,애니메이션,코미디,가족,판타지..."
        {...register('genre')}
      />

      <label htmlFor="ottName">OTT 이름</label>
      <input
        id="ottName"
        type="text"
        placeholder="Netflix,Disney Plus,Watcha,wavve,Tving"
        {...register('ottName')}
      />

      <label htmlFor="ottAddress">OTT 주소</label>
      <input id="ottAddress" type="text" {...register('ottAddress')} />

      {/* 이메일과 비밀번호 제거를 위한 주석 */}
      {/* <label htmlFor="email">이메일</label>
      <input id="email" type="email" {...register('email')} />

      <label htmlFor="password">비밀번호</label>
      <input id="password" type="password" {...register('password')} /> */}

      <button type="submit" disabled={isSubmitting}>
        미디어 생성
      </button>
    </S_Form>
  );
};

export default AddMedia;

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
