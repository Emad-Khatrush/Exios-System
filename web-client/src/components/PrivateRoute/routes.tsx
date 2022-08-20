import { RiDashboardLine } from 'react-icons/ri';
import { BsBox } from 'react-icons/bs';
import { MdContactSupport } from 'react-icons/md';

export const routes = [
  {
    label: 'الصفحة الرئيسية',
    value: 'home',
    icon: <RiDashboardLine />,
    path: '/'
  },
  {
    label: 'طلبياتي',
    value: 'myOrders',
    icon: <BsBox />,
    path: '/orders'
  },
  {
    label: 'تواصل معنا',
    value: 'contactUs',
    icon: <MdContactSupport />,
    path: '/contactUs'
  }
]
