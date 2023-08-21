import { useRecoilState } from 'recoil';
import { recommendedContentsState } from '@/recoil/atoms/Atoms';

const useMemberOtts = () => {
  const [recommendedContents, setRecommendedContents] = useRecoilState(
    recommendedContentsState
  );

  const handleIconClick = (clickedName: string) => {
    const isSelected = recommendedContents.memberOtts.indexOf(clickedName) > -1;

    setRecommendedContents({
      ...recommendedContents,
      memberOtts: isSelected
        ? recommendedContents.memberOtts.filter((name) => name !== clickedName)
        : [...recommendedContents.memberOtts, clickedName],
    });
  };

  return { recommendedContents, handleIconClick };
};

export default useMemberOtts;
