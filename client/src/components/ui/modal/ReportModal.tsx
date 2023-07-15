import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import { PostReport } from '../../../api/api';
import { useModal } from '../../../hooks/useModal';

function ReportModal({ contentId }: { contentId: string }) {
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const PostReportMutation = useMutation({
    mutationFn: PostReport,
    onSuccess: () => {
      alert('제보가 접수되었습니다.');
    },
  });

  const convertData = (data: Record<string, any>) => {
    const convertedData = {
      mediaId: Number(contentId),
      title: data.title,
      content: data.content,
    };
    return convertedData;
  };

  return (
    <S_Form
      onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        const convertedData = convertData(data);
        PostReportMutation.mutate(convertedData);
      })}
    >
      <label htmlFor="title">제목</label>
      <textarea
        required
        className="title"
        id="title"
        placeholder="20글자까지 작성 가능합니다."
        maxLength={20}
        {...register('title')}
      />
      <label htmlFor="content">내용</label>
      <textarea
        required
        className="content"
        id="content"
        placeholder="255글자까지 작성 가능합니다.   잘못된 정보가 있다면 적어주세요."
        maxLength={255}
        {...register('content')}
      />
      {/* 이메일과 비밀번호 제거를 위한 주석 */}
      {/* <label htmlFor="email">이메일</label>
          <input id="email" type="email" {...register('email')} />
    
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" {...register('password')} /> */}
      <div>
        <S_Button type="submit" disabled={isSubmitting}>
          전송
        </S_Button>
        <S_ButtonClose type="button" onClick={closeModal}>
          닫기
        </S_ButtonClose>
      </div>
    </S_Form>
  );
}

export default ReportModal;

const S_Form = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-white-100);
  background-color: var(--color-bg-80);

  label {
    color: white;
  }
  .title {
    padding: 10px;
    border-radius: 5px;
    color: black;
    font-size: 18px;
    height: 70px;
  }
  .content {
    padding: 10px;
    border-radius: 5px;
    color: black;
    font-size: 18px;
    height: 200px;
  }
  div {
    display: flex;
  }
`;

const S_Button = styled.button`
  width: 200px;
  height: 40px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-white-80);
  color: var(--color-white-80);
  font-weight: 300;
  background-color: #d9d9d933;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--color-white-60);
    border: 1px solid white;
    color: white;
  }
`;

const S_ButtonClose = styled(S_Button)`
  width: 100px;
  margin-left: auto;
`;
