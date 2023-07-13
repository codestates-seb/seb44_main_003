import { styled } from 'styled-components';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { DeleteComment, GetUser, PatchComment } from '../../api/api';
import { convertDatetime } from '../../utils/datetime';
import { Comment } from '../../types/types';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BiPaperPlane } from 'react-icons/bi';
import React, { useState } from 'react';

function CommentContent({ comment }: { comment: Comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const queryClient = useQueryClient();
  const user = useQuery(['user'], GetUser, { enabled: false });

  const PatchMutation = useMutation(PatchComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });
  const DeleteMutation = useMutation(DeleteComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });
  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setContent(target.value);
  };
  const handleEdit = () => {
    setIsEditing(!isEditing);
    setContent(comment.content);
  };
  const handleSubmit = (e: React.FormEvent) => {
    const target = e.target as HTMLButtonElement;
    PatchMutation.mutate({ id: target.id, content });
    setContent('');
    setIsEditing(false);
  };

  return (
    <S_Comment key={comment.id}>
      <div>
        <img src={comment.member.avatarUri} alt="member profile" />
      </div>
      <div>
        <h1>{comment.member.nickname}</h1>
        {isEditing ? (
          <S_Form onSubmit={handleSubmit} id={comment.id}>
            <textarea onChange={handleChange} value={content} />
            <button type="submit">
              <BiPaperPlane />
            </button>
          </S_Form>
        ) : (
          <>
            <p>{comment.content}</p>
            <span>{convertDatetime(comment.createdAt)}</span>
          </>
        )}
      </div>
      {user.data && user.data.memberId === comment.member.memberId && (
        <div>
          <button type="button" onClick={handleEdit}>
            <HiOutlinePencilAlt />
          </button>
          <button
            type="button"
            onClick={() => DeleteMutation.mutate(comment.id)}
          >
            <BsFillTrash3Fill />
          </button>
        </div>
      )}
    </S_Comment>
  );
}

export default CommentContent;

const S_Comment = styled.li`
  display: flex;
  border-bottom: 1px solid white;
  padding: 10px 30px;
  > div:nth-child(2) {
    flex-grow: 1;
    > p {
      margin: 10px 0;
      word-break: break-all;
    }
    > span {
      color: var(--color-white-80);
      font-size: 13px;
    }
  }
  > div:nth-child(3) {
    min-width: 60px;
  }
`;

const S_Form = styled.form`
  position: relative;
  margin-top: 10px;
  > textarea {
    background-color: transparent;
    border: 1px solid var(--color-white-80);
    border-radius: 10px;
    width: 90%;
    font-size: 16px;
    color: var(--color-white-80);
    padding: 20px 20px;
  }
  & svg {
    position: absolute;
    left: 83%;
    bottom: 20px;
    color: var(--color-white-80);
    font-size: 28px;
  }
`;
