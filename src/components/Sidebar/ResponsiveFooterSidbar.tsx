import { User } from "../../models";

type Props = {
  account: User
}

const ResponsiveFooterSidbar = (props: Props) => {
  const { account } = props;

  return (
    <div className="w-full">
      <div className="border-t border-gray-300">
        <div className="w-full flex items-center justify-between px-6 pt-1">
          <div className="flex items-center">
            <img alt="profile-pic" src={account.imgUrl} className="w-8 h-8 rounded-md" />
            <p className="md:text-xl text-gray-800 text-base leading-4 ml-2">{`${account.firstName} ${account.lastName}`}</p>
          </div>
          <ul className="flex">
            <li className="cursor-pointer text-white pt-5 pb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
              </svg>
            </li>
            <li className="cursor-pointer text-white pt-5 pb-3 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveFooterSidbar;
