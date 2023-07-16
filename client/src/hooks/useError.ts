import { redirect } from 'react-router-dom';

export const useError = (error: string | number) => {
  console.log('에러 감지');
  if (error === 'Network Error') {
    console.log('네트워크 에러');
    return redirect('/login');
  }
};
