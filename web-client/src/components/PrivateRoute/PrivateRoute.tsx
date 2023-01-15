import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ResponsiveSidebar from '../Sidebar/ResponsiveSidebar';
import Sidebar from '../Sidebar/Sidebar';

const PrivateRoute = () => {
  const [show, setShow] = useState(false);
  const session = useSelector((state: any) => state.session);
  console.log(session);
  
  if (!session.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="w-full h-full flex flex-no-wrap flex-row-reverse">
        <Sidebar account={session.account} />
        <ResponsiveSidebar 
          show={show}
          setShow={setShow}
          account={session.account}
        />
        <div className="w-full overflow-auto">
          <Navbar
            show={show}
            setShow={setShow}
            account={session.account}
          />

          <Outlet />
          
        </div>
      </div>
    </div>
  )
}

export default PrivateRoute;
