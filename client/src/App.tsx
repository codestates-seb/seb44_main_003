import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// import Admin from '@/pages/Admin';
// import Content from '@/pages/Content';
// import List from '@/pages/List';
// import Search from '@/pages/Search';
import GlobalStyle from '@/styles/global-styles';
import { tokenLoader, checkAuthLoader, checkUnauthLoader } from '@/utils/auth';
import '@/App.css';

const Root = lazy(() => import('@/pages/Root'));
const Main = lazy(() => import('@/pages/Main'));
const Member = lazy(() => import('@/pages/Member'));
const Auth = lazy(() => import('@/pages/Auth'));
const TV = lazy(() => import('@/pages/TV'));
const Movie = lazy(() => import('@/pages/Movie'));
const Error = lazy(() => import('@/pages/Error'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense>
        <Root />
      </Suspense>
    ),
    loader: tokenLoader,
    errorElement: <Error code="404" />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Main />
          </Suspense>
        ),
      },
      {
        path: 'member',
        element: (
          <Suspense>
            <Member />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
      {
        path: 'login',
        element: (
          <Suspense>
            <Auth />
          </Suspense>
        ),
        loader: checkUnauthLoader,
      },
      {
        path: 'signup',
        element: (
          <Suspense>
            <Auth />
          </Suspense>
        ),
        loader: checkUnauthLoader,
      },
      {
        path: 'tv',
        element: (
          <Suspense>
            <TV />
          </Suspense>
        ),
      },
      {
        path: 'movie',
        element: (
          <Suspense>
            <Movie />
          </Suspense>
        ),
      },
      {
        path: 'error',
        element: (
          <Suspense>
            <Error code="500" />
          </Suspense>
        ),
      },
    ],
  },
]);

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     loader: tokenLoader,
//     errorElement: <Error code="404" />,
//     children: [
//       {
//         index: true,
//         element: <Main />,
//       },
//       {
//         path: 'member',
//         element: <Member />,
//         loader: checkAuthLoader,
//       },
//       {
//         path: 'login',
//         element: <Auth />,
//         loader: checkUnauthLoader,
//       },
//       {
//         path: 'signup',
//         element: <Auth />,
//         loader: checkUnauthLoader,
//       },
//       {
//         path: 'tv',
//         element: <TV />,
//       },
//       {
//         path: 'movie',
//         element: <Movie />,
//       },
//       {
//         path: 'content/:id',
//         element: <Content />,
//       },
//       {
//         path: 'tv/list',
//         element: <List />,
//       },
//       {
//         path: 'movie/list',
//         element: <List />,
//       },
//       {
//         path: 'search',
//         element: <Search />,
//       },
//       {
//         path: 'admin',
//         element: <Admin />,
//       },
//       {
//         path: 'error',
//         element: <Error code="500" />,
//       },
//     ],
//   },
// ]);

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
