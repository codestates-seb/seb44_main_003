import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Admin from '@/pages/Admin';
import Auth from '@/pages/Auth';
import Content from '@/pages/Content';
import Error from '@/pages/Error';
import List from '@/pages/List';
import Main from '@/pages/Main';
import Member from '@/pages/Member';
import Movie from '@/pages/Movie';
import Root from '@/pages/Root';
import Search from '@/pages/Search';
import TV from '@/pages/TV';
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
