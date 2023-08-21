import { useQuery } from '@tanstack/react-query';
import { GetReport } from '@/api/api';

const useAdminReportQuery = () => {
  return useQuery(['Reports'], () => GetReport());
};

export default useAdminReportQuery;
