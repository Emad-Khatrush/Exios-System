import InfoWidget from "../../components/InfoWidget/InfoWidget";
import { FiPackage } from 'react-icons/fi';
import { FaCheck, FaFileInvoiceDollar, FaWarehouse } from "react-icons/fa";

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="container mx-auto py-10 h-64 w-11/12 px-6">
      <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2">
        <InfoWidget 
          icon={<FiPackage color="#3d3d3d" size={'46px'} />}
          description={'طلبيات النشطه'}
          total={'25'}
          bgColor={'bg-yellow-200'}
        />
        <InfoWidget 
          icon={<FaFileInvoiceDollar color="#3d3d3d" size={'40px'} />}
          description={'فواتير هذا الشهر'}
          total={'1500 $'}
          bgColor={'bg-gray-200'}
        />
        <InfoWidget 
          icon={<FaWarehouse color="#3d3d3d" size={'40px'} />}
          description={'جاهزه للتسليم'}
          total={'5'}
          bgColor={'bg-sky-100'}
        />
        <InfoWidget 
          icon={<FaCheck color="#3d3d3d" size={'40px'} />}
          description={'تم التسليم'}
          total={'12'}
          bgColor={'bg-emerald-100'}
        />
      </div>
    </div>
  )
}

export default Home;
