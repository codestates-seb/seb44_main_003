import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { tokenLoader, checkAuthLoader, checkUnauthLoader } from './utils/auth';
import GlobalStyle from './styles/global-styles';
import Root from './pages/Root';
import Main from './pages/Main';
import Member from './pages/Member';
import Auth from './pages/Auth';
import TV from './pages/TV';
import Movie from './pages/Movie';
import Content from './pages/Content';
import Search from './pages/Search';
import List from './pages/List';
import Error from './pages/Error';
import Admin from './pages/Admin';
import './App.css';

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
