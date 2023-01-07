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
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
import AlertInfo from "../../components/AlertInfo/AlertInfo";

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="container mx-auto py-10 h-64 w-11/12 px-6">
      <div className="mb-5">
        <AlertInfo 
          tint="info"
          description={`مبيعات جديدة من المشتركين السابقين - 20000$ في الإيرادات.`}
          forward={{
            link: 'https://exios-admin-frontend.web.app/',
            label: 'تفاصيل'
          }}
        />
      </div>
      
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

      <div className="grid gap-4 grid-cols-12 mb-4">
        <div className="col-span-12 2xl:col-span-6 xl:col-span-5">
          <Card>
            <h2 className=" text-end text-2xl mb-3 font-bold">سعر التصريف مقابل الدولار</h2>
            <div className="flex p-2 justify-between flex-row-reverse">
              <div className="flex flex-row-reverse">
                <img className="w-16 h-16 ml-5" src="https://static.thenounproject.com/png/2857854-200.png" alt="" />
                <div>
                  <h3 className="mb-3 font-bold">دينار الليبي</h3>
                  <h3 className="text-gray-400 font-bold text-end">د.ل</h3>
                </div>
              </div>

              <div>
                <p className="mb-3  font-bold">5.30</p>
                <p className="text-green-500 font-bold ">5%</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-12 2xl:col-span-6 xl:col-span-7">
          <Card>
            <div className="relative h-full overflow-hidden bg-cover rounded-xl" style={{ backgroundImage: `url('https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/ivancik.jpg')` }}>
              <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80"></span>
              <div className="relative z-10 flex flex-col flex-auto h-full p-4 text-end">
                <h5 className="pt-2 mb-2 font-bold text-white text-end">كود الشحن الخاص بك هو</h5>
                <div className="flex justify-end">
                  <h5 className="mb-4 font-bold text-white w-fit text-4xl rounded-lg p-1 bg-slate-400">S552</h5>
                </div>
                <p className="text-white text-end mb-5">يمكنك استعمال هذا الكود عند ارسال البضائع الى عناويننا، يعتبر هذا الكود ثابت ومخزون عليه جميع معلوماتك ماعليك الا ان تكتبه في العنوان و على صندوق</p>
                <div className="flex justify-end">
                  <Link className=" w-fit rounded-lg p-1 mt-auto bg-slate-500 mb-0 font-semibold leading-normal text-white group text-sm text-end" to={'/start-shipment'}>
                    عرض التعليمات
                    <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="col-span-12 2xl:col-span-7 xl:col-span-8">
          <AlertWidget 

          />
        </div>
        <div className="col-span-12 2xl:col-span-5 xl:col-span-4">
          <ShortcutInfoWidget 
            title={'طلبياتي'}
            description={'الخاص بنا، ايضا من خلاله ستستطيع ان ترى صور البضائع الخاصه بك وحالته واين وصلت واي اي انشطه اخرى تخص بطلبياتك X-Tracking يمكن تتبع طلبياتك عن طريق ميزة'}
            buttonLabel={'عرض'}
            imgSrc={OrderImage}
            path={"/orders"}
          />
        </div>
      </div>

      <div className="grid gap-4 2xl:gap-10 2xl:grid-cols-12">
        <div className="col-span-1 2xl:col-span-3 ">
          <ShortcutInfoWidget 
            title={'عناوننا'}
            description={'عرض جميع العناوين الخاصه بالشركة للشحن منه'}
            buttonLabel={'عرض'}
            imgSrc={Address}
            path={"/address"}
          />
        </div>
        <div className="col-span-1 2xl:col-span-3">
          <ShortcutInfoWidget 
            title={'الاسعار'}
            description={'اسعار الشراء والشحن من جميع الدول التي نتعامل معه'}
            buttonLabel={'عرض'}
            imgSrc={Prices}
            path={"/prices"}
          />
        </div>
        <div className="col-span-1 2xl:col-span-3">
          <ShortcutInfoWidget 
            title={'الشروط'}
            description={'شروط الشركة للشراء والشحن من عن طريقنا ونقاط مهمه في تفاصيل الشحن'}
            buttonLabel={'عرض'}
            imgSrc={Terms}
            path={'/terms-privacy'}
          />
        </div>
        <div className="col-span-1 2xl:col-span-3">
          <ShortcutInfoWidget 
            title={'التواصل'}
            description={'موجودين في خدمتكم على مدار 24 ساعة متواصله خلال 7 ايام'}
            buttonLabel={'عرض'}
            imgSrc={Contact}
            path={'/contact-us'}
          />
        </div>
      </div>
    </div>
  )
}

export default Home;
