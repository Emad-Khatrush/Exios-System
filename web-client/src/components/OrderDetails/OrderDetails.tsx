import Card from "../Card/Card";
import { ImLocation2 } from 'react-icons/im';
import { FaFlag } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

type Props = {}

const OrderDetails = (props: Props) => {
  return (
    <div className="mt-8">
      <Card className="shadow-xl rounded-2xl p-0">
        <div className="flex p-4">
          <div className="w-24 h-20">
            <img className=" w-20 h-20 rounded-xl" src="https://st2.depositphotos.com/1154952/9707/i/600/depositphotos_97075074-stock-photo-ship-loading-container-in-import.jpg" alt="" />
            <p className="text-center text-gray-500 mt-1">#1</p>
          </div>
          <div className="w-full ml-3">
            <div className="flex justify-between">
              <p className=" text-gray-400">2155-2245</p>
              <h5 className=" font-bold text-zinc-800">:رقم الطلبية</h5>
            </div>
            <div className="flex justify-between">
              <p className=" text-gray-400">ملابس</p>
              <h5 className=" font-bold text-zinc-800">:نوع البضائع</h5>
            </div>
            <div className="flex justify-between">
              <p className=" text-gray-400">جوي</p>
              <h5 className=" font-bold text-zinc-800">:طريقة الشحن</h5>
            </div>
            <div className="flex justify-between">
              <p className=" text-gray-400">01/09/2022</p>
              <h5 className=" font-bold text-zinc-800">:تاريخ الانشاء</h5>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 rounded-b-xl p-3">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="flex">
                <ImLocation2 className=" text-blue-500" />
                <p className=" text-sm ml-1 text-gray-600 font-bold">الصين</p>  
              </div>
              <div className="mx-2">
                <p className=" text-gray-600">----</p>
              </div>
              <div className="flex">
                <FaFlag className=" text-blue-500" />
                <p className=" text-sm ml-2 text-gray-600 font-bold">طرابلس</p>  
              </div>
            </div>

            <div className="w-1/4">
              <Link
                to={"/order/2155-2245"}
              >
                <button
                  type="submit"
                  className="group relative w-full flex justify-center items-center py-1 border border-transparent text-md font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <AiFillEye className="h-5 w-5 mr-2 text-green-500 group-hover:text-green-400" aria-hidden="true" />
                  عرض
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

    </div>
  )
}

export default OrderDetails;
