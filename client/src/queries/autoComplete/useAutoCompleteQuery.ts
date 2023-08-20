import { useQuery } from '@tanstack/react-query';
import { GetAutoComplete } from '@/api/api';

const useAutoCompleteQuery = (userInput: string) => {
  const { data } = useQuery(
    ['searchData', userInput],
    () => GetAutoComplete(userInput),
    { keepPreviousData: true }
  );

  return data;
};

export default useAutoCompleteQuery;
