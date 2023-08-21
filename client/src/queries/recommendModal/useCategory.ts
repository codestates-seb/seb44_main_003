import { useRecoilState } from 'recoil';
import { recommendedContentsState } from '@/recoil/atoms/Atoms';

const useCategory = () => {
  const [recommendedContents, setRecommendedContents] = useRecoilState(
    recommendedContentsState
  );

  const handleIconClick = (clickedName: string) => {
    if (recommendedContents.category === clickedName) {
      setRecommendedContents({ ...recommendedContents, category: '' });
    } else {
      setRecommendedContents({ ...recommendedContents, category: clickedName });
    }
  };

  return { recommendedContents, handleIconClick };
};

export default useCategory;
