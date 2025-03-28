import { useEffect } from 'react';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import MainLayout from './components/dashboard/mainlayout/MainLayout';
import Dashboard from './pages/dashboardscrees/dashboard/Dashboard';
import UserList from './pages/dashboardscrees/projectinitiation/user/UserList';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CreatorsAllList from './pages/dashboardscrees/projectinitiation/CreatorsAllList';
import BrandsAllList from './pages/dashboardscrees/projectinitiation/user/BrandsAllList';
import VideoAllList from './pages/dashboardscrees/projectinitiation/VideoAllList';
import VideoList from './pages/dashboardscrees/projectinitiation/VideoList';
import VideoallList from './pages/videos/VideoallList';
import SortsList from './pages/videos/SortsList';
import RequirementsList from './pages/videos/RequirementsList';

// const ProtectedRoute = ({ element }) => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (localStorage.getItem('tag_token')) {
//       navigate('/dashboard');
//     }
//     else{
//       navigate('/login'); 
//     }
//   }, [navigate]);

//   return element;
// };

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('tag_token');

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    }
  }, [token, navigate]);

  return token ? element : null; // Render only if token exists
};

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <div>
        {pathname.includes('/dashboard') || <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<ProtectedRoute element={<Login />} />} />
          <Route path='/signup' element={<ProtectedRoute element={<Signup />} />} />
          <Route path='/dashboard' element={<ProtectedRoute element={<MainLayout />} /> } >
            <Route index element={<Dashboard />} />
            <Route path='creators' element={<CreatorsAllList />} />
            <Route path='brands' element={<BrandsAllList />} />
            {/* <Route path='videos' element={<VideoallList />} /> */}
            {/* <Route path='videos' element={<VideoAllList />} /> */}
            <Route path='videos' element={<VideoList />} />
            <Route path='sorts-list' element={<SortsList />} />
            <Route path='brand-requirements' element={<RequirementsList />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
