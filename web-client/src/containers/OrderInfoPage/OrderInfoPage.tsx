import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BiInfoCircle } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { RiShipLine } from "react-icons/ri";
import { MdExpandMore } from "react-icons/md";
import Card from "../../components/Card/Card";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import InfoDetailsCard from "../../components/InfoDetailsCard/InfoDetailsCard";
import { defaultColumns } from "./generateData";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, AvatarGroup, Typography } from "@mui/material";
import Badge from "../../components/Badge/Badge";


type Props = {}

const testData = [
  'https://storage.cloud.google.com/exios-bucket/2.jpg',
  'https://storage.cloud.google.com/exios-bucket/253769795_10208631213013904_9018611287682636732_n.jpg',
  'https://storage.cloud.google.com/exios-bucket/20220903_171451.jpg'
]

const OrderInfoPage = (props: Props) => {
  const [ activeStep, setActiveStep ] = useState(0);

  const steps = generateSteps();

  const data = [
    {
      label: 'رقم الكود',
      value: '0552-3665'
    },
    {
      label: 'اسم الزبون',
      value: 'عماد ختروش'
    },
    {
      label: 'رقم الهاتف',
      value: '09215547585'
    },
    {
      label: 'بريد الاكتروني',
      value: 'qwe.emad@hotmail.com'
    },
  ]

  const data2 = [
    {
      label: 'نوع البضائع',
      value: 'ملابس'
    },
    {
      label: 'وزن الشحنة',
      value: '23 KG'
    },
    {
      label: 'CBM',
      value: '-'
    },
    {
      label: 'نوع الشحن',
      value: 'جوي'
    }
  ]

  const columns = [...defaultColumns()];
  const list = [
    {
      id: 1,
      description: 'تم وصول البضائع الى المخزن',
      createdAt: '01-09-2022 01:55 PM',
      placedAt: 'طرابلس'
    },
    {
      id: 2,
      description: 'تم وصول البضائع الى المخزن',
      createdAt: '01-09-2022 01:55 PM',
      placedAt: 'طرابلس'
    }
  ]

  return (
    <div className="container mx-auto py-10 h-64 w-11/12 px-6">
      <Card
        className="rounded-2xl mb-5"
      >
        <CustomStepper 
          acriveStep={activeStep}
          steps={steps}
        />
      </Card>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 mb-5">
        <InfoDetailsCard 
          title="تفاصيل العميل"
          data={data as any}
        />

        <InfoDetailsCard 
          title="تفاصيل الشحنه"
          data={data2 as any}
        />

        <InfoDetailsCard 
          title="تفاصيل العميل"
          data={data as any}
        />

        <div>
          <Card
            className="rounded-2xl mb-5"
          >
            <h2 className='text-right text-2xl font-medium mb-7 mt-2'>صور متعلقة بالطلبية</h2>
            <ImageViewer
              images={testData}
            />
          </Card>
        </div>

        <div className=" col-span-1 xl:col-span-2 md:col-span-2">
          <Card
            className="rounded-2xl mb-5"
          >
            <h2 className='text-right text-2xl font-medium mb-7 mt-2'>الانشطة</h2>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={list}
                columns={columns}
                pageSize={6}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </Card>
        </div>

        <div className="col-span-1 xl:col-span-3 md:col-span-2">
          <Card
            leaned
          >
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '30%', flexShrink: 0, fontSize: '16px', fontWeight: 'bold' }}>
                  Package 1#
                </Typography>
                <Badge class=" text-base" text="وصلت الى المخزن" color="primary" />
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex items-center justify-end mb-8">
                  <p>وصلت البضائع الى مخزن</p>
                  <h3 className=" font-bold ml-5">:اخر نشاط</h3>
                </div>
                <div className="flex items-center justify-end mb-8">
                  <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                  </AvatarGroup>
                  <h3 className=" font-bold ml-5">:صور البضائع</h3>
                </div>
                
                <CustomStepper 
                  acriveStep={activeStep}
                  steps={linkSteps}
                />
              </AccordionDetails>
            </Accordion>
          </Card>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

const generateSteps = () => {
  const steps = [
    {
      label: 'تجهيز الطلبية',
      stepIcon: FaShippingFast
    },
    {
      label: 'اتمام الشراء',
      stepIcon: RiShipLine
    },
    {
      label: 'وصلت الى المخزن',
      stepIcon: BiInfoCircle
    },
    {
      label: 'وصلت الى ليبيا',
      stepIcon: RiShipLine
    },
    {
      label: 'تم التسليم',
      stepIcon: BiInfoCircle
    }
  ]
  return steps;
}

const linkSteps = [
  {
    label: 'تجهيز الطلبية',
    stepIcon: FaShippingFast
  },
  {
    label: 'وصلت الى المخزن',
    stepIcon: BiInfoCircle
  },
  {
    label: 'وصلت الى ليبيا',
    stepIcon: RiShipLine
  },
  {
    label: 'تم التسليم',
    stepIcon: BiInfoCircle
  }
]

export default OrderInfoPage;
