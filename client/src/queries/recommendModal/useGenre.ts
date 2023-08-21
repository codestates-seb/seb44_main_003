import { useRecoilState } from 'recoil';
import { recommendedContentsState } from '@/recoil/atoms/Atoms';

const useGenre = () => {
  const [recommendedContents, setRecommendedContents] = useRecoilState(
    recommendedContentsState
  );

  const handleGenreCheckboxClick = (isChecked: boolean, genre: string) => {
    if (isChecked && recommendedContents.interests.length < 5) {
      setRecommendedContents({
        ...recommendedContents,
        interests: [...recommendedContents.interests, genre],
      });
    } else if (!isChecked) {
      setRecommendedContents({
        ...recommendedContents,
        interests: recommendedContents.interests.filter(
          (interest) => interest !== genre
        ),
      });
    }
  };

  return { recommendedContents, handleGenreCheckboxClick };
};

export default useGenre;
