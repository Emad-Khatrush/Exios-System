import { MdLineStyle, MdOutlineInput } from 'react-icons/md';
import { FaFileInvoice, FaArchive } from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';
import { RiBillFill } from 'react-icons/ri';

const adminRoutes = [
    {
        title: 'Home',
        path: '/',
        icon: <MdLineStyle className="sidebar-icon" />,
    },
    {   
        title: 'Activities',
        path: '/activities',      
        icon: <HiDocumentReport className="sidebar-icon" />,
     },
     {   
        title: 'Invoices',
        path: '/invoices',      
        icon: <FaFileInvoice className="sidebar-icon" />,
     },
     {   
        title: 'Expenses',
        path: '/expenses',      
        icon: <RiBillFill className="sidebar-icon" />,
     },
     {   
        title: 'Incomes',
        path: '/incomes',      
        icon: <MdOutlineInput className="sidebar-icon" />,
     },
     {   
        title: 'X-Tracking',
        path: '/xtracking',      
        icon: <FaArchive className="sidebar-icon" />,
     }
 ];

 const employeeRoutes = [
    {
        title: 'X-Tracking',
        path: '/',
        icon: <MdLineStyle className="sidebar-icon" />,
    },
     {   
        title: 'Invoice',
        path: '/invoice/add',      
        icon: <FaFileInvoice className="sidebar-icon" />,
     },
     {   
        title: 'Expense',
        path: '/expense/add',      
        icon: <RiBillFill className="sidebar-icon" />,
     },
     {   
        title: 'Incomes',
        path: '/income/add',      
        icon: <MdOutlineInput className="sidebar-icon" />,
     }
 ];

const getRoutes = (roles: any) => {
    if (roles?.isAdmin) {
        return adminRoutes;
    } else if (roles?.isEmployee) {
        return employeeRoutes;
    }
}

export default getRoutes;