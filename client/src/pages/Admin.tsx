import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetUser } from '../api/api';
import useIsLoggedIn from './../hooks/useIsLoggedIn';
import AdminMediaForm from '../components/admin/AdminMediaForm';

const Admin = () => {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const admin = useQuery(['user'], GetUser, { enabled: false });

  useEffect(() => {
    if (!isLoggedIn || admin?.data?.roles[0] === 'USER') {
      return navigate('/');
    }
  }, [isLoggedIn, admin, navigate]);

  return (
    <S_Wrapeer>
      <AdminMediaForm type={'add'} editData={null} contentId="" />
    </S_Wrapeer>
  );
};

export default Admin;

const S_Wrapeer = styled.div`
  display: flex;
  width: 100%;
  padding: 130px 0px 60px;
`;
