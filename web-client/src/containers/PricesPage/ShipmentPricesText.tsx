import InfoCard from "../../components/InfoCard/InfoCard";

const ShipmentPricesText = () => {
  return (
    <div className="grid gap-4 xl:grid-cols-2 lg:grid-cols-2 mb-5 place-items-center">
      <InfoCard 
        header="اسعار الشحن من الصين"
        imgSrc={'https://storage.googleapis.com/alghad-media/2022/01/ce11f74d-%D8%B5%D9%88%D8%B1-%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%B5%D9%8A%D9%86-%D8%B1%D9%85%D8%B2%D9%8A%D8%A7%D8%AA-%D9%88%D8%AE%D9%84%D9%81%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%B5%D9%8A%D9%86%D9%8A-1.jpg'}
        infoList={['شحن الجوي 12.5 دولار للكيلو الواحد', 'المده من 17-27 يوم من تاريخ وصوله الى مخزن الصين الى ليبيا', 'الشحن البحري 140$ للمتر المكعب (CBM)', 'المده من 50-65 يوم من تاريخ وصوله الى مخزن الصين الى بنغازي']}
        buttonLabel={'ابدا الشحن'}
        disableHoverEffect={true}
        buttonPath={'/start-shipment?shipmentFromWhere=china'}
      />

      <InfoCard 
        header="اسعار الشحن من الامارات"
        imgSrc={'https://www.albayan.ae/polopoly_fs/1.4456431.1655240227!/image/image.jpg'}
        infoList={['شحن الجوي 11 دولار للكيلو الواحد', 'المده من 7-19 يوم من تاريخ وصوله الى مخزن الامارات الى ليبيا']}
        buttonLabel={'ابدا الشحن'}
        disableHoverEffect={true}
        buttonPath={'/start-shipment?shipmentFromWhere=uae'}
      />

      <InfoCard 
        header="اسعار الشحن من امريكا"
        imgSrc={'https://d3vt78ic2w6yaz.cloudfront.net/fit-1000-545/blog/4952-%D8%A7%D9%94%D8%B3%D8%A8%D8%A7%D8%A8-%D8%A7%D9%84%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9-%D9%81%D9%8A-%D8%A7%D9%94%D9%85%D8%B1%D9%8A%D9%83%D8%A7-01.webp'}
        infoList={['شحن الجوي 15 دولار للكيلو الواحد', 'المده من 18-30 يوم من تاريخ وصوله الى مخزن الامارات الى ليبيا']}
        buttonLabel={'ابدا الشحن'}
        disableHoverEffect={true}
        buttonPath={'/start-shipment?shipmentFromWhere=usa'}
      />

      {/* Turkey Text */}
      <InfoCard 
        header="اسعار الشحن من تركيا"
        imgSrc={'https://www.alkhaleej.ae/sites/default/files/styles/d08_standard/public/2022-10/4539610.jpeg?h=10d202d3&itok=c77mDfCP'}
        infoList={['شحن الجوي 3 دولار للكيلو الواحد', 'المده من 7-14 يوم من تاريخ وصوله الى مخزن الامارات الى ليبيا']}
        buttonLabel={'ابدا الشحن'}
        disableHoverEffect={true}
        buttonPath={'/start-shipment?shipmentFromWhere=turkey'}
      />
    </div>
  )
}

export default ShipmentPricesText;
