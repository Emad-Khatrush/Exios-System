import { useState } from "react";

type Props = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = (props: Props) => {
  const [profile, setProfile] = useState(false);
  const { show, setShow } = props;

  return (
      <>
        {/* Navigation starts */}
        <nav className="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-10">
          <div className="hidden lg:flex w-full pr-6">
            <div className="w-1/2 hidden lg:flex">
              <div className="w-full flex items-center pl-8">
                <div className="flex items-center relative cursor-pointer mr-4" onClick={() => setProfile(!profile)}>
                  <div className="rounded-full">
                    {profile && (
                        <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-2 sm:mt-10">
                            <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <circle cx={12} cy={7} r={4} />
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    </svg>
                                    <span className="text-sm ml-2">My Profile</span>
                                </div>
                            </li>
                            <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                        <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                    </svg>
                                    <span className="text-sm ml-2">Sign out</span>
                                </div>
                            </li>
                        </ul>
                    )}
                  </div>
                  <p className="text-gray-800 text-sm mx-3">عماد ختروش</p>
                  <div className="relative mr-2">
                        <img className="rounded-full h-10 w-10 object-cover" src="https://scontent-ist1-1.xx.fbcdn.net/v/t39.30808-6/253769795_10208631213013904_9018611287682636732_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oA0IawRIqS8AX_4WNiK&_nc_ht=scontent-ist1-1.xx&oh=00_AT99GysFj28c9fVFS7TfP4yT0bZ5Kt1ir_LK4p5o26k2oQ&oe=62DF2704" alt="avatar" />
                        <div className="w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto" />
                    </div>
                  <div className="cursor-pointer text-gray-600">
                    <svg aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                
                <div className="h-full w-20 flex items-center justify-center border-r border-l">
                  <div className="relative cursor-pointer text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                    <div className="w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 mt-1 mr-1 m-auto" />
                  </div>
                </div>

                <div className="h-full w-20 flex items-center justify-center border-r mr-4 cursor-pointer text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                    <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                  </svg>
                </div>
                
              </div>
            </div>

            <div className="w-1/2 h-full hidden lg:flex items-center pl-6 pr-24">
              <div className="relative w-full">
                <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx={10} cy={10} r={7} />
                    <line x1={21} y1={21} x2={15} y2={15} />
                  </svg>
                </div>
                <input className="border border-gray-100 focus:outline-none focus:border-indigo-700 rounded w-full text-sm text-gray-500 bg-gray-100 pl-12 py-2" type="text" placeholder="Search" />
              </div>
            </div>

          </div>

          <div className="text-gray-600 mr-8 visible lg:hidden relative" onClick={() => setShow(!show)}>
            {!props.show && (
              <svg aria-label="Main Menu" aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu cursor-pointer" width={30} height={30} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={4} y1={8} x2={20} y2={8} />
                <line x1={4} y1={16} x2={20} y2={16} />
              </svg>
            )}
          </div>
        </nav>
    </>
  )
}

export default Navbar;