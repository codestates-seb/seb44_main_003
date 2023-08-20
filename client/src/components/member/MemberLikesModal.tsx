import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BiX } from 'react-icons/bi';
import { styled } from 'styled-components';
import { genres } from '@/constant/constantValue';
import { useModal } from '@/hooks/useModal';
import useMemberMutation from '@/queries/member/useMemberMutation';
import useMemberQuery from '@/queries/member/useMemberQuery';
import { S_Modal } from '@/styles/style';
import { arrToObj, objToArr } from '@/utils/convertResponse';
import { notifySuccess } from '@/utils/notify';

const ottList = [
  { name: '넷플릭스', value: 'Netflix' },
  { name: '웨이브', value: 'Wavve' },
  { name: '디즈니플러스', value: 'Disney Plus' },
  { name: '왓챠', value: 'Watcha' },
];
const longName = ['애니메이션'];

function MemberLikesModal() {
  const [error, setError] = useState<string | null>(null);
  const { closeModal } = useModal();
  const { data } = useMemberQuery(true);

  const onSuccessMutation = () => {
    notifySuccess('선호도가 변경되었습니다.');
    closeModal();
  };
  const mutation = useMemberMutation(onSuccessMutation);
  const { watch, register, handleSubmit } = useForm();
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.interests.length > 5)
        setError('장르는 최대 5개까지 선택할 수 있습니다.');
      if (value.interests.length <= 5) setError(null);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  return (
    <S_Modal>
      <BiX
        onClick={() => {
          closeModal();
        }}
      />
      <h1>선호도 변경</h1>
      <h2>추천을 원하는 카테고리를 선택해 주세요.</h2>
      <S_Form
        onSubmit={handleSubmit((formData) => {
          if (formData.memberOtts === 'Netflix')
            formData.memberOtts = ['Netflix'];
          formData.memberOtts = [...arrToObj(formData.memberOtts, 'ott')];
          formData.interests = [...arrToObj(formData.interests, 'interest')];
          mutation.mutate(formData);
        })}
      >
        <fieldset>
          <legend>카테고리</legend>
          <select
            id="category"
            placeholder="string"
            defaultValue={data?.category}
            {...register('category')}
          >
            <option>TV</option>
            <option>영화</option>
          </select>
        </fieldset>
        <fieldset className="ottDiv">
          <legend>OTT</legend>
          {ottList.map((ott) => (
            <div key={ott.value}>
              <input
                type="checkbox"
                id={ott.value}
                value={ott.value}
                defaultChecked={objToArr(data?.memberOtts || []).includes(
                  ott.value
                )}
                {...register('memberOtts')}
              />
              <label htmlFor={ott.value}>{ott.name}</label>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>장르</legend>
          {genres.map((genre) => (
            <div
              key={genre}
              className={longName.includes(genre) ? 'except' : 'element'}
            >
              <input
                type="checkbox"
                id={genre}
                value={genre}
                defaultChecked={objToArr(data?.interests || []).includes(genre)}
                {...register('interests')}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </fieldset>
        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={!!error}>
          제출
        </button>
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
  font-size: 15px;
  margin: 0 20px;
  > fieldset {
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px 5px;
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;
    width: 85%;
    word-break: keep-all;
    margin: 10px 0;
    > div {
      margin: 5px 10px;
      @media only screen and (max-width: 600px) {
        margin: 5px 15px;
      }
    }
    @media only screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  > fieldset:nth-child(3) {
    @media only screen and (max-width: 600px) {
      height: 100px;
      overflow-y: scroll;
    }
  }
  & legend {
    padding: 0 7px;
  }
  & select {
    margin-left: 20px;
    padding: 3px;
    border-radius: 5px;
  }
  & fieldset.ottDiv {
    display: flex;
    justify-content: space-between;
  }
  & div.element {
    width: 88px;
  }
  & label {
    margin-left: 6px;
    cursor: pointer;
  }
  & span.error {
    color: var(--color-primary-yellow);
  }
  & button {
    color: var(--color-white-80);
    border: 1px solid var(--color-white-80);
    border-radius: 5px;
    padding: 5px 15px;
    margin: 20px;
    background-color: var(--color-white-80);
    color: var(--color-bg-80);
  }
`;
