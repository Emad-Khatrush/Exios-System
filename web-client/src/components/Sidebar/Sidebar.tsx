import Logo from '../Logo/Logo'
import image from '../../../public/images/exios-logo.png';
import { routes } from '../PrivateRoute/routes';

const Sidebar = () => {
  return (
    <div className="absolute lg:relative w-80 h-screen shadow bg-gray-100 hidden lg:block">
        <Logo 
          src={image}
        />
        <ul aria-orientation="vertical" className=" py-6">
          {routes.map(route => (
            <li key={route.value} className="mr-4 pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-4 mb-4 py-2 hover:text-green-700 focus:green-indigo-700 focus:outline-none">
              <div className="flex items-center text-xl justify-end">
                <span className="ml-2 mr-3">{route.label}</span>
                <div>
                  {route.icon}
                </div>
              </div>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Sidebar;
