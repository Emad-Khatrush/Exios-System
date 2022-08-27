import React from 'react'
import Logo from '../Logo/Logo';
import { AiOutlineClose } from 'react-icons/ai';
import image from '../../../public/images/exios-logo.png';
import { routes } from '../PrivateRoute/routes';
import ResponsiveFooterSidbar from './ResponsiveFooterSidbar';

type Props = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ResponsiveSidebar = (props: Props) => {
  const { show, setShow } = props;

  return (
    <div className={show ? "w-full h-full absolute z-40  transform  translate-x-0" : "   w-full h-full absolute z-40  transform -translate-x-full"} id="mobile-nav">
      <div className="bg-gray-800 opacity-50 absolute h-full w-full lg:hidden" onClick={() => setShow(!show)} />
        <div className="absolute z-40 sm:relative w-64 md:w-96 shadow pb-4 bg-gray-100 lg:hidden transition duration-150 ease-in-out h-full">
          <div className="flex flex-col justify-between h-full w-full">
            <div>
              <div className="flex items-center justify-between px-3">
                <div className="h-16 w-full flex items-center">
                  <Logo 
                    src={image}
                  />
                </div>
                <div id="closeSideBar" className="flex items-center justify-center h-10 w-10 cursor-pointer" onClick={() => setShow(!show)}>
                  <AiOutlineClose size='24' />
                </div>
              </div>
              <ul aria-orientation="vertical" className=" py-6">
                {routes.map(route => (
                  <li key={route.value} className="w-10/12 mr-4 pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-4 mb-4 py-2 hover:text-green-700 focus:green-indigo-700 focus:outline-none">
                    <div className="flex items-center text-2xl justify-end">
                      <span className="ml-2 mr-3 flex-none">{route.label}</span>
                      <div>
                        {route.icon}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Footer */}
            <ResponsiveFooterSidbar />
        </div>
      </div>
    </div>
  )
}

export default ResponsiveSidebar;