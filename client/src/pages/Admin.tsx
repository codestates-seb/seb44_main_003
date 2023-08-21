import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminMediaForm from '@/components/admin/AdminMediaForm';
import AdminReport from '@/components/admin/AdminReport';
import useGetUserQuery from '@/queries/authentication/useGetUserQuery';
import useIsLoggedIn from '@/utils/isLoggedIn';

function Admin() {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const admin = useGetUserQuery();

  useEffect(() => {
    if (!isLoggedIn || admin?.data?.roles[0] === 'USER') {
      return navigate('/');
    }
  }, [isLoggedIn, admin, navigate]);

  return (
    <S_Wrapeer>
      <AdminMediaForm type={'add'} editData={null} contentId="" />
      <AdminReport />
    </S_Wrapeer>
  );
}

export default Admin;

const S_Wrapeer = styled.div`
  display: flex;
  width: 100%;
  padding: 130px 0px 60px;
`;
