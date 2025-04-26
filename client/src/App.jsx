import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout';
import MoviePage from './pages/MoviePage'
import CheckoutPage from './pages/CheckoutPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import GuestRoutes from './layouts/GuestRoutes';
import MemberRoutes from './layouts/MemberRoutes';
import AdminRoutes from './layouts/AdminRoutes';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<NotFoundPage/>}>
        <Route index element={<div>movie list here</div>}/>
        <Route path="/movie/:movieId" element={<MoviePage />} />

        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Route>
        
        <Route element={<MemberRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage/>}/>
        </Route>

        <Route element={<AdminRoutes/>}>
          <Route path="/admin" element={<div>hi</div>}/>
        </Route>
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
