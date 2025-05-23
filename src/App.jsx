import { useEffect } from 'react';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import MainLayout from './components/dashboard/mainlayout/MainLayout';
import Dashboard from './pages/dashboardscrees/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CreatorsAllList from './pages/dashboardscrees/projectinitiation/CreatorsAllList';
import BrandsAllList from './pages/dashboardscrees/projectinitiation/user/BrandsAllList';
import VideoUpload from './pages/dashboardscrees/projectinitiation/VideoUpload';
import VideoList from './pages/dashboardscrees/projectinitiation/VideoList';
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
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<MainLayout />} >
            <Route index element={<Dashboard />} />
            <Route path='creators' element={<CreatorsAllList />} />
            <Route path='brands' element={<BrandsAllList />} />
            <Route path='videos-upload' element={<VideoUpload />} />

            <Route path='videos-list' element={<VideoList />} />
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
