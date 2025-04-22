import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout';
import MoviePage from './pages/MoviePage'
import CheckoutPage from './pages/CheckoutPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MoviePage />}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App
