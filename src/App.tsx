import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import './index.css';
import HomePage from './pages/home';
import SignUpPage from './pages/sign-up';
import SignInPage from './pages/sign-in';
import SettingsPage from './pages/settings';
import ProfilePage from './pages/profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import useAuthStore from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()
function App() {
  const { authUser, checkAuth, isCheckAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({ authUser })
  if (isCheckAuth && !authUser) {
    return (
      <div className=' flex items-center justify-center h-screen'>
        <Loader2 className=' size-10 animate-spin' />
      </div>
    )
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to='sign-in'/>} />
          <Route path='/sign-up' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
        <Toaster/>
      </QueryClientProvider>
    </>
  )
}

export default App
