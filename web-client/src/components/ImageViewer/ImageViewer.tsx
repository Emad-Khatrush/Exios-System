import { useState } from "react";

type Props = {
  // title?: string
  images: any[]
}

const imgSrc = 'https://https://00f74ba44b98a155f6e929fc7c908a41c31a02d2f3-apidata.googleusercontent.com/download/storage/v1/b/exios-bucket/o/253769795_10208631213013904_9018611287682636732_n.jpg?jk=AFshE3Usnmq-zioXzwnfx7h3Ev2BH879RgfXuRjSSMwpThr5UUjoc8igcf7-ragHsgvLk3BmU8gWRjoi0uSBPMxcm7U8fV-rMGHTmkTCHE5loqWm0_u7X-x-b99TmrFwHdfmsW3AIhO-6MQTESscDpPfBH9-3dofTo8tNgpkiGAU_Ukme_cRP8wAf38jRVqR8CGLtZOmOHIfEN4JfwCADsDAffiVYoX5dPFw4NfPjffzwyJ9vgAZ2aDsxOStjjNTNovoeClvB0rZEyp5fO3wtiabE6SoGFB_uA1_O04eDqUANqxc8jdHT_jEf3h7HC5GJA2m97-xiUUkXFOxGmPEwhBSvS6JJJ13IpzFpsRfYlUfFiRN4lVvm1NZJsRZQfcSxASqU3YwcxOGdc6j1IS48cyo0EUoXkcbm1k59VmQqOI6bwIeF1mxXfq9R-KuumlBlqZ9t2k2qZazw8tyjjX_xVu6oY8sNUencQjqp7gchnQXT2iLxgbVvSx68eRJX-O9qfjZHm65b1mfRQHacQwOKnS10CbOupRqr_uXYHWB03muJcY4tWp9D3CNJnCpW9XoD9vvuXXhOGdqBTSS_EL-7f-SXuDx7szlc6li66aI6CQcDy5nglZ2yKuux3tcuN4OeUnAzkFV3Fhg6yfmdNmHW2A3HMSfoLOQl1bXbzpx6G-kes9IAWHIdTH6X0ZB-o9guiNdDyHvLRwPzM-EPvwkq-qOomO98boc4LCcpOEDw10PvZkfSSiakQj3pqRXj9eaTOqvNNG_6oHrB62DeRyQ41gP45ee-f0_HrTe3rd4z0JJxDFUekU_4xSbVzuChZTB25cCsVKmuT99HmFo24vPT9v90hcYaZo3yXvo4Hans73kE3dUoSdnbORXVyeXJJXFxN_YG1f78dxuTJMkfboMzeH_sFbQV-97cTS9_A_EirWYk0UPVtOgbR5NpfmVKQab71qzUotBC6qZi2ywUco6pzWaeSahM3lhxAM6iTbjK6TGugXvjvKCtZIPp8CLCADRaLB6-KYZ1w3-xZAROK7IktLAkHSl00if&isca=1-apidata.googleusercontent.com/download/storage/v1/b/exios-bucket/o/253769795_10208631213013904_9018611287682636732_n.jpg?jk=AFshE3XzD0KLrt06yoGVGIYJ0zMUp5LMhA2mDqEHwZyFDyI2pL6-KogIcEKJ5aXYKVkEqh29hef_7AC8Aop1qvJdezKGpg99kkwRfIKAVMis6kmo8cb_2EsePbYFSQzw6yzsHbx_2qNE7KR3RvPIP_LGzhQ0KTb5PgNXD57DmGd1ULISDZ7DrKr_LaYOiqJ18SkzIBxjCmkmxVoCzONXCZCSmt8v7j3HRDwZJq50vABMmCaSl_tCQ3iwcH3-FBkMI8i0EEhS4LH9tCrPBxjz6jhDiVFrxKQiZtSTgiXxfqRhtadnil25bDqS2wPKK8WfykjJnNcRwIr2TTQ3sCx79eoj0zrDQoGN7CkAo35lTp7fiuPSHJFc14btxUkXHszlMGPaIHSB-zOP5q4qyXMGCVtUKo9CumMskm6a9Fd-caxM2hDE5jPMOV1yn6OD5erDWtSJH_sJA06Bqr-A8rLc3dvG04y2WKp9RcniPGhUCVuvyP3cYfPOgKFz6VdpapGhBergep--CI4rn1iv1lDCrVHuZyXk78Dhjm6MvCoLlBdPQE-VH8tYiUy1C2b6_iRe8W9bJ_QYRHIv0xHKgntu6BLEly-7aWICQ44_MnXY4GxOD8fH2qTwiz5f5zMzx6LgxODUxDkM7tAMKKXipnJN5w_G5pop-JfhFRX4HBm_tcWf_n30zpMoRxEQWz9ovchkNaStX-D3g-GYOWV61MCMbFVTP3DMkqDtU_wSN3Wh1jMiT_4Dd1sSKL1hb8IhC5J9IK_VIS3DlxYmDjeb1dqPaeQgQzysNwMrYQ_eayZZAwQaZGcTnrli01XiUAQ_6qjT9vnpmxWzYQ72mFg0ddbryt8Izk4wuTPjwGj55ZOUv2eb1CtzEdlCIR3fbMLkq7FeltUr8pDLsiusoXNs_u3aOvFjlyrvKxAjCdi3hxJDbq_-JiO1Bt2PR1F-fwkeYmR6AWYYpX2qNJYv5cRWGMEaPLxtgS89ljh4T41iM7CUxEFmf6ghNhDFs-VPzj7-YmgZxEisE-xzDXJcbh1nbDO1sQqtGMhxUA7p&isca=1';

const activeImageClass = "translate-x-0 z-20";
const otherImagesClass = "translate-x-full z-10";

const activePointClass = "bg-white dark:bg-gray-800";
const otherPointsClass = "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800";

const ImageViewer = (props: Props) => {
  const { images } = props;
  const [ currentImageIndex, setCurrentImageIndex ] = useState(0);
  const imagesLength = images?.length;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex => {
      let nextIndex = prevIndex + 1;
      if (nextIndex >= imagesLength) {
        nextIndex = 0;
      }
      return nextIndex;
    }))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex => {
      let nextIndex = prevIndex - 1;
      if (nextIndex < 0) {
        nextIndex = imagesLength - 1;
      }
      return nextIndex;
    }))
  }
  
  return (
    <div id="default-carousel" className="relative" data-carousel="static">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((img, i) => (
          <div className={`duration-700 ease-in-out absolute inset-0 transition-all transform ${currentImageIndex === i ? activeImageClass : otherImagesClass}`} data-carousel-item={String(currentImageIndex)}>
            <img src={img} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {images.map((img, i) => (
          <button type="button" className={`w-3 h-3 rounded-full ${currentImageIndex === i ? activePointClass : otherPointsClass}`} aria-current={currentImageIndex === i ? 'true' : 'false'} aria-label={'Slide' + i} data-carousel-slide-to={i + 1}></button>
        ))}
      </div>

      <button onClick={prevImage} type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev={currentImageIndex - 1}>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button onClick={nextImage} type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next={currentImageIndex + 1}>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}

export default ImageViewer;
