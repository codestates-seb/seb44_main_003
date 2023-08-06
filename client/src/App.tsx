import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Admin from '@/components/admin/Admin';
import Auth from '@/components/authentication/Auth';
import Content from '@/components/contents/Content';
import Main from '@/components/main/Main';
import List from '@/components/media/List';
import Movie from '@/components/media/Movie';
import TV from '@/components/media/TV';
import Member from '@/components/member/Member';
import Search from '@/components/search/Search';
import Error from '@/pages/Error';
import Root from '@/pages/Root';
import GlobalStyle from '@/styles/global-styles';
import { tokenLoader, checkAuthLoader, checkUnauthLoader } from '@/utils/auth';
import '@/App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: tokenLoader,
    errorElement: <Error code="404" />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'member',
        element: <Member />,
        loader: checkAuthLoader,
      },
      {
        path: 'login',
        element: <Auth />,
        loader: checkUnauthLoader,
      },
      {
        path: 'signup',
        element: <Auth />,
        loader: checkUnauthLoader,
      },
      {
        path: 'tv',
        element: <TV />,
      },
      {
        path: 'movie',
        element: <Movie />,
      },
      {
        path: 'content/:id',
        element: <Content />,
      },
      {
        path: 'tv/list',
        element: <List />,
      },
      {
        path: 'movie/list',
        element: <List />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
      {
        path: 'error',
        element: <Error code="500" />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 2,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => console.log(error),
  }),
});

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
