import InfoCard from "../../components/InfoCard/InfoCard";

type Props = {
  onCardClick?: any
}

const ShipToPage = (props: Props) => {
  return (
    <div className="mt-9">
      <h2 className=" text-center text-3xl mb-10 font-semibold">اختار طريقة الشحن</h2>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mb-10 place-items-center">
        <InfoCard 
          imgSrc={'https://www.hartlogistic.com/wp-content/uploads/2021/06/Air-Freight-Shipping-From-China-to-Turkey.jpg'}
          header={'شحن الجوي'}
          description={'شحن جوي هو الشحن الاسرع لكي توصلك بضائعك بسرعة'}
          infoList={['مدة الوصول 15 الى 20 يوم', 'سرعة في انجاز', 'مناسب للبضائع الخفيفة']}
          onCardClick={props.onCardClick}
          value={'air'}
        />

        <InfoCard 
          imgSrc={'https://globitexworld.com/wp-content/uploads/2020/08/ocean_freight_feat.jpg'}
          header={'شحن بحري'}
          description={'شحن بحري هو الشحن الافضل اذا بضائعك ثقيلة'}
          infoList={['مدة الوصول 45 الى 60 يوم', 'سرعة في انجاز', 'مناسب للبضائع ثقيلة']}
          onCardClick={props.onCardClick}
          value={'sea'}
        />
      </div>
      
    </div>
  )
}

export default ShipToPage;
