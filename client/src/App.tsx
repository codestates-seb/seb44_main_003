import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { tokenLoader } from './utils/auth';
import GlobalStyle from './styles/global-styles';
import Root from './pages/Root';
import Main from './pages/Main';
import Member from './pages/Member';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TV from './pages/TV';
import Movie from './pages/Movie';
import Content from './pages/Content';
import Search from './pages/Search';
import List from './pages/List';
import Recommend from './pages/Recommend';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'member',
        element: <Member />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
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
        path: 'medias/tv',
        element: <List />,
      },
      {
        path: 'medias/movie',
        element: <List />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'recommend',
        element: <Recommend />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
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
