import { useForm } from 'react-hook-form';
import { useModal } from '../../hooks/useModal';
import { S_Modal } from '../../styles/style';
import { BiX } from 'react-icons/bi';
import { styled } from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetUser, PatchUser } from '../../api/api';
import { MemberLikes } from '../../types/types';
import { genres } from '../../constant/constantValue';

function MemberLikesModal() {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const { data } = useQuery(['user'], GetUser);
  const ottList = ['Netflix', 'Disney Plus', 'Watcha', 'Wavve'];
  /* todo: 메뉴별 이름 달기, 장르 최대 3개 선택 */
  const mutation = useMutation(PatchUser, {
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries(['user']);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const editData: MemberLikes = {
    category: data?.category || '',
    memberOtts: data?.memberOtts || [],
    interests: data?.interests || [],
  };
  const longName = ['애니메이션', '다큐멘터리', 'Made in Europe', 'Reality TV'];

  return (
    <S_Modal>
      <BiX
        onClick={() => {
          closeModal();
        }}
      />
      <h1>선호도 변경</h1>
      <h2>추천을 원하는 카테고리를 선택해 주세요.</h2>
      <S_Form onSubmit={handleSubmit((data) => console.log(data))}>
        <div>
          <label htmlFor="category">카테고리</label>
          <select id="category" placeholder="string" {...register('category')}>
            <option selected={data?.category === 'TV'}>TV</option>
            <option selected={data?.category === '영화'}>영화</option>
          </select>
        </div>
        <div className="ottDiv">
          {ottList.map((ott) => (
            <div>
              <input
                type="checkbox"
                id={ott}
                value={ott}
                defaultChecked={data?.memberOtts?.includes(ott)}
                {...register('memberOtt')}
              />
              <label htmlFor={ott}>{ott}</label>
            </div>
          ))}
        </div>
        <div>
          {genres.map((genre) => (
            <div className={longName.includes(genre) ? 'except' : 'element'}>
              <input
                type="checkbox"
                id={genre}
                value={genre}
                defaultChecked={data?.interests?.includes(genre)}
                {...register('interests')}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </div>
        <button type="submit">제출</button>
      </S_Form>
    </S_Modal>
  );
}

export default MemberLikesModal;

const S_Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  > div {
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px 5px;
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    word-break: keep-all;
    margin: 10px 0;
    > div {
      margin: 5px 10px;
    }
  }
  & div.element {
    width: 85px;
  }
  & label {
    margin-left: 6px;
  }
  & label:first-child {
    margin-right: 15px;
  }
  & button {
    color: var(--color-white-80);
    border: 1px solid var(--color-white-80);
    border-radius: 5px;
    padding: 5px 15px;
    margin: 0 20px;
    background-color: var(--color-white-80);
    color: var(--color-bg-80);
  }
`;
