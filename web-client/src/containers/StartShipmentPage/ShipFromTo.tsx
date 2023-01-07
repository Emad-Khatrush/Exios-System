import Card from "../../components/Card/Card";
import Track from "../../../public/images/delivery.png";
import Delivery from "../../../public/images/trolley.png";
import { isMobile } from "react-device-detect";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  shipFromChange: (value: string) => void
  shipToChange: (value: string) => void
}

const ShipFromTo = (props: Props) => {
  const [ searchParams ] = useSearchParams();
  const shipmentFromWhere = searchParams.get("shipmentFromWhere");
  console.log(shipmentFromWhere);
  
  useEffect(() => {
    props.shipFromChange(shipmentFromWhere || '');
  }, [shipmentFromWhere]);
  
  return (
    <div className={`flex justify-center items-center my-10 ${isMobile ? 'flex-col' : ''}`}>
      <Card
        className="h-auto rounded-lg text-center"
      >
        <img src={Track} alt="" className=" mb-6 w-28 inline" />
        <h2 className="text-2xl font-bold mb-5">الشحن من</h2>
        <p className="text-md text-gray-500 mb-3">من اي دولة تريد شحن بضائعك منه</p>
        <select name="fromCountry" id="fromCountry" onChange={(e) => props.shipFromChange(e.target.value)} defaultValue={shipmentFromWhere || ''}>
          <option disabled selected value={''}>اختار الدولة</option>
          <option value="china">الصين</option>
          <option value="UAE">الامارات</option>
          <option value="USA">امريكا</option>
          <option value="UK">بريطانيا</option>
          <option value="turkey">تركيا</option>
        </select>
      </Card>
      
      <hr className={`text-gray-500 w-100 border-dashed mx-5 border-2 ${isMobile ? ' w-20 transform rotate-90 m-14' : 'w-3/12'}`} />
      
      <Card
        className="h-auto rounded-lg text-center"
      >
        <img src={Delivery} alt="" className=" mb-6 w-28 inline" />
        <h2 className="text-2xl font-bold mb-5">الى اين</h2>
        <p className="text-md text-gray-500 mb-3">اي مدينة تريد استلام بضائعك في ليبيا</p>
        <select name="fromCountry" id="fromCountry" onChange={(e) => props.shipToChange(e.target.value)}>
          <option disabled selected>اختار المدينة</option>
          <option value="tripoli">طرابلس</option>
          <option value="benghazi">بنغازي</option>
          <option value="">مصراتة</option>
          <option value="">زليتن</option>
          <option value="">الزاوية</option>
          <option value="">زليتن</option>
        </select>
      </Card>
    </div>
  )
}

export default ShipFromTo;