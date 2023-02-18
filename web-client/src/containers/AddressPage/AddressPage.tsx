import { useState } from "react";
import InfoCard from "../../components/InfoCard/InfoCard";

type Props = {}

const AddressPage = (props: Props) => {

  return (
    <div className="container mx-auto py-10 h-64 w-11/12 px-6">
      <h2 className=" text-3xl text-center font-bold mb-16">عناوين الشحن</h2>

      <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 mb-5">
        <InfoCard 
          header="عنوان الصين"
          imgSrc={'https://storage.googleapis.com/alghad-media/2022/01/ce11f74d-%D8%B5%D9%88%D8%B1-%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%B5%D9%8A%D9%86-%D8%B1%D9%85%D8%B2%D9%8A%D8%A7%D8%AA-%D9%88%D8%AE%D9%84%D9%81%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%B5%D9%8A%D9%86%D9%8A-1.jpg'}
          description={
            `
            Shipment to China </br>
            联系人：陈小林 </br>
            电话：19128651680 </br>
            仓库地址：空运和海运 </br>
            广州增槎路西州北路城市之星物流园A5仓 Exios39
            `
          }
          buttonLabel={'ابدا الشحن'}
          disableHoverEffect={true}
          buttonPath={'/start-shipment?shipmentFromWhere=china'}
        />

        <InfoCard 
          header="عنوان الامارات"
          imgSrc={'https://www.albayan.ae/polopoly_fs/1.4456431.1655240227!/image/image.jpg'}
          description={
            `
            Name: Exios </br>
            Last Name: Company </br>
            phone: +971505967929 </br>
            Address: Al ghazal building 
            Office room no : 301 (3rd floor)
            Opposite Arabic chair
            Al buteen Deira,Dubai Sq336 Code:7162-8896
            `
          }
          buttonLabel={'ابدا الشحن'}
          disableHoverEffect={true}
          buttonPath={'/start-shipment?shipmentFromWhere=uae'}
        />

        <InfoCard 
          header="عنوان امريكا"
          imgSrc={'https://d3vt78ic2w6yaz.cloudfront.net/fit-1000-545/blog/4952-%D8%A7%D9%94%D8%B3%D8%A8%D8%A7%D8%A8-%D8%A7%D9%84%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9-%D9%81%D9%8A-%D8%A7%D9%94%D9%85%D8%B1%D9%8A%D9%83%D8%A7-01.webp'}
          description={
            `
            غير متاح الشحن فقط من امريكا </br>
            يوجد فقط عملية الشراء والشحن مع بعضها </br>
            في حالة تريد شراء منتج وشحنه يرجى التواصل مع اقرب مندوب </br>
            `
          }
          disableHoverEffect={true}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 mb-5">
        <InfoCard 
          header="عنوان تركيا"
          imgSrc={'https://www.alkhaleej.ae/sites/default/files/styles/d08_standard/public/2022-10/4539610.jpeg?h=10d202d3&itok=c77mDfCP'}
          description={
            `
            غير متاح الشحن فقط من تركيا </br>
            يوجد فقط عملية الشراء والشحن مع بعضها </br>
            في حالة تريد شراء منتج وشحنه يرجى التواصل مع اقرب مندوب </br>
            `
          }
          disableHoverEffect={true}
        />

        <InfoCard 
          header="عنوان بريطانيا"
          imgSrc={'https://storage.googleapis.com/alghad-media/2021/05/image-3.jpg'}
          description={
            `
            غير متاح الشحن فقط من بريطانيا </br>
            يوجد فقط عملية الشراء والشحن مع بعضها </br>
            في حالة تريد شراء منتج وشحنه يرجى التواصل مع اقرب مندوب </br>
            `
          }
          disableHoverEffect={true}
        />
      </div>

      <br />
    </div>
  )
}

export default AddressPage;
