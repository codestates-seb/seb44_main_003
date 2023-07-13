import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetUser } from '../api/api';
import useIsLoggedIn from './../hooks/useIsLoggedIn';
import AddMedia from '../components/admin/AddMedia';

const Admin = () => {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const admin = useQuery(['user'], GetUser);

  useEffect(() => {
    if (!isLoggedIn || admin?.data?.roles[0] === 'USER') {
      return navigate('/');
    }
  }, [isLoggedIn, admin, navigate]);

  return (
    <S_Wrapeer>
      <AddMedia />
    </S_Wrapeer>
  );
};

export default Admin;

const S_Wrapeer = styled.div`
  width: 100%;
  padding: 130px 0px 60px;
`;
