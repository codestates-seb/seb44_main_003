import styled from 'styled-components';
import ReportDetail from '@/components/mediaDetail/report/ReportDetail';
import { useModal } from '@/hooks/useModal';
import useAdminReportQuery from '@/queries/admin/useAdminReportQuery';
import { Report } from '@/types/types';

function AdminReport() {
  const { openModal } = useModal();
  const { data, isSuccess } = useAdminReportQuery();

  const formatDate = (date: any) => {
    const dateTime = new Date(date);
    const formattedDateTime = dateTime.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    return formattedDateTime;
  };

  if (isSuccess) {
    return (
      <S_Wrapper>
        {data.data.map((report: Report) => (
          <S_Report
            key={report.id}
            onClick={() =>
              openModal({ content: <ReportDetail data={report} /> })
            }
          >
            <S_Title>{report.title}</S_Title>
            <S_Date>{formatDate(report.createdAt)}</S_Date>
          </S_Report>
        ))}
      </S_Wrapper>
    );
  }
}

export default AdminReport;

const S_Wrapper = styled.div`
  width: 500px;
  height: 800px;
  border: 1px solid var(--color-white-100);
  border-radius: 10px;
`;

const S_Report = styled.div`
  padding: 10px;
  border: 1px solid var(--color-white-100);
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: var(--color-white-60);
  }
`;

const S_Title = styled.h1`
  padding: 5px 10px;
  color: var(--color-white-100);
`;

const S_Date = styled.p`
  padding: 5px 10px;
  color: var(--color-white-100);
`;
