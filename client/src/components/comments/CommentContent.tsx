import { useQueryClient, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiPaperPlane } from 'react-icons/bi';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { DeleteComment, PatchComment } from '@/api/api';
import { ADMIN_MEMBERID } from '@/constant/constantValue';
import useMemberQuery from '@/hooks/useMemberQuery';
import { Comment } from '@/types/types';
import { convertDatetime } from '@/utils/datetime';

function CommentContent({ comment }: { comment: Comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const queryClient = useQueryClient();
  const { data } = useMemberQuery(false);
  const navigate = useNavigate();

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
  const isAdmin = comment.member
    ? comment.member.memberId === ADMIN_MEMBERID
    : false;
  return (
    <S_Comment key={comment.id}>
      {comment.member ? (
        <div>
          <img
            className="avatar"
            src={comment.member.avatarUri}
            alt="member profile"
          />
        </div>
      ) : (
        <div
          role="presentation"
          onClick={() => navigate(`/content/${comment.media!.mediaId}`)}
        >
          <img
            alt="미디어 포스터"
            className="poster"
            src={comment.media!.mainPoster}
          />
        </div>
      )}
      <div>
        {comment.member && (
          <h1 className={isAdmin ? 'admin' : undefined}>
            {comment.member.nickname}
          </h1>
        )}
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
      {(!comment.member ||
        (data && data.memberId === comment.member.memberId) ||
        data?.memberId === ADMIN_MEMBERID) && (
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
  padding: 10px;
  @media only screen and (max-width: 480px) {
    padding: 10px;
  }
  & h1.admin {
    display: inline;
    background: linear-gradient(to right, #667eea, #764ba2, #6b8dd6, #8e37d7);
    background-size: 300% 300%;
    color: white;
    animation: gradient 0.5s infinite normal;
    animation-timing-function: linear;
    padding: 3px;
    border-radius: 5px;
  }
  @keyframes gradient {
    from {
      background-position-x: 0%;
    }
    to {
      background-position-x: 100%;
    }
  }

  > div:first-child {
    flex-shrink: 0;
  }
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
    @media only screen and (max-width: 480px) {
      min-width: 50px;
    }
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
