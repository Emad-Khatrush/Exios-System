import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ResponsiveSidebar from '../Sidebar/ResponsiveSidebar';
import Sidebar from '../Sidebar/Sidebar';

type Props = {
}

const PrivateRoute = (props: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="w-full h-full flex flex-no-wrap flex-row-reverse">
        <Sidebar />
        <ResponsiveSidebar 
          show={show}
          setShow={setShow}
        />
        <div className="w-full overflow-auto">
          <Navbar
            show={show}
            setShow={setShow}
          />

          <Outlet />
          
        </div>
      </div>
    </div>
  )
}

export default PrivateRoute;
