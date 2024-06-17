import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setUser } from '../redux/userSlice';
import Sidebar from "../Components/sidebar";
import logo from '../assets/logo.png'


const HomePage = () => {

  const user = useSelector(state => state.user);  /* It is used to extract data from the Redux store state. */
  console.log("Redux User is:", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true
      })
      dispatch(setUser(response.data.data));
      if (response.data.logout) {
        dispatch(logout());
        navigate("/verify-email");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const basePath = location.pathname === '/'

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"}`} >
        <Outlet />
      </section>


      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
        <div>
          <img
            src={logo}
            width={250}
            alt='logo'
          />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>
    </div>
  )
}

export default HomePage
