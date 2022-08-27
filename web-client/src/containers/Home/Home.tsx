import InfoWidget from "../../components/InfoWidget/InfoWidget";
import { FiPackage } from 'react-icons/fi';
import { FaCheck, FaFileInvoiceDollar, FaWarehouse } from "react-icons/fa";
import AlertWidget from "../../components/AlertWidget/AlertWidget";
import ShortcutInfoWidget from "../../components/ShortcutInfoWidget/ShortcutInfoWidget";

import OrderImage from "../../../public/images/box.png";
import Address from "../../../public/images/online-shop.png";
import Prices from "../../../public/images/cash.png";
import Terms from "../../../public/images/placeholder.png";
import Contact from "../../../public/images/24-hours.png";

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="container mx-auto py-10 h-64 w-11/12 px-6">
      <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2 mb-5">
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

      <div className="grid gap-4 2xl:grid-cols-12 mb-4">
        <div className="col-span-1 2xl:col-span-7">
          <AlertWidget 

          />
        </div>
        <div className="col-span-1 2xl:col-span-5">
          <ShortcutInfoWidget 
            title={'طلبياتي'}
            description={'الخاص بنا، ايضا من خلاله ستستطيع ان ترى صور البضائع الخاصه بك وحالته واين وصلت واي اي انشطه اخرى تخص بطلبياتك X-Tracking يمكن تتبع طلبياتك عن طريق ميزة'}
            buttonLabel={'عرض'}
            imgSrc={OrderImage}
          />
        </div>

      </div>

      <div className="grid gap-4 2xl:gap-10 2xl:grid-cols-12">
        <div className="col-span-1 2xl:col-span-3">
          <ShortcutInfoWidget 
            title={'عناوننا'}
            description={'عرض جميع العناوين الخاصه بالشركة للشحن منه'}
            buttonLabel={'عرض'}
            imgSrc={Address}
          />
        </div>
        <div className="col-span-1 2xl:col-span-3">
          <ShortcutInfoWidget 
            title={'الاسعار'}
            description={'اسعار الشراء والشحن من جميع الدول التي نتعامل معه'}
            buttonLabel={'عرض'}
            imgSrc={Prices}
          />
        </div>
        <div className="col-span-1 2xl:col-span-3">
          <ShortcutInfoWidget 
            title={'الشروط'}
            description={'شروط الشركة للشراء والشحن من عن طريقنا ونقاط مهمه في تفاصيل الشحن'}
            buttonLabel={'عرض'}
            imgSrc={Terms}
          />
        </div>
        <div className="col-span-1 2xl:col-span-3">
          <ShortcutInfoWidget 
            title={'التواصل'}
            description={'موجودين في خدمتكم على مدار 24 ساعة متواصله خلال 7 ايام'}
            buttonLabel={'عرض'}
            imgSrc={Contact}
          />
        </div>
      </div>
    </div>
  )
}

export default Home;
