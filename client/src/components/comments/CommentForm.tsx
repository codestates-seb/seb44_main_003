import { styled } from 'styled-components';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostComment } from '../../api/api';
import { BiPaperPlane } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';

function CommentForm() {
  const [content, setContent] = useState('');
  const isLoggedIn = useIsLoggedIn();
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const mutation = useMutation(PostComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });
  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setContent(target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ mediaId: id, content });
    setContent('');
  };

  return (
    <S_Form onSubmit={handleSubmit}>
      {isLoggedIn ? (
        <textarea onChange={handleChange} value={content} />
      ) : (
        <textarea placeholder="로그인 후 후기를 남길 수 있습니다." disabled />
      )}
      <button type="submit">
        <BiPaperPlane />
      </button>
    </S_Form>
  );
}

export default CommentForm;

const S_Form = styled.form`
  position: relative;
  padding: 0 30px;
  margin-top: 50px;
  > textarea {
    background-color: transparent;
    border: 1px solid var(--color-white-80);
    border-radius: 10px;
    width: 100%;
    height: 140px;
    font-size: 16px;
    color: var(--color-white-80);
    padding: 20px 20px;
  }
  & svg {
    position: absolute;
    right: 50px;
    bottom: 20px;
    color: var(--color-white-80);
    font-size: 28px;
  }
`;
