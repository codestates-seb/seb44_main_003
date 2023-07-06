import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostComment } from '../../api/api';
import { useState } from 'react';
import { styled } from 'styled-components';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import { BiPaperPlane } from 'react-icons/bi';

function CommentForm({ mediaId }: { mediaId: string }) {
  const isLoggedIn = useIsLoggedIn();
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const mutation = useMutation(PostComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ mediaId, content });
  };
  return (
    <S_Form onSubmit={handleSubmit}>
      {isLoggedIn ? (
        <textarea name="content" onChange={handleInput} value={content} />
      ) : (
        <textarea placeholder="후기를 작성하려면 로그인해주세요." disabled />
      )}
      <button type="submit">
        <BiPaperPlane />
      </button>
    </S_Form>
  );
}

export default CommentForm;

const S_Form = styled.form`
  margin: 0 60px;
  position: relative;
  > textarea {
    width: 100%;
    height: 140px;
    border: 1px solid var(--color-white-80);
    border-radius: 10px;
    background-color: transparent;
    color: var(--color-white-80);
    padding: 25px 25px;
    font-size: 16px;
    @media only screen and (max-width: 480px) {
      font-size: 13px;
    }
  }
  & button {
    color: var(--color-white-80);
    font-size: 28px;
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
`;
