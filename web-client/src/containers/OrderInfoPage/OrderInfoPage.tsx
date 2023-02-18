import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BiInfoCircle } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { RiShipLine } from "react-icons/ri";
import { MdExpandMore } from "react-icons/md";
import Card from "../../components/Card/Card";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import InfoDetailsCard from "../../components/InfoDetailsCard/InfoDetailsCard";
import { defaultColumns, generateDataToListType } from "./generateData";
import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertColor, Avatar, AvatarGroup, Box, CircularProgress, Snackbar, Typography } from "@mui/material";
import Badge from "../../components/Badge/Badge";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { Package } from "../../models";
import moment from "moment-timezone";
import { getStatusOfPackage } from "../../utils/methods";
import AlertInfo from "../../components/AlertInfo/AlertInfo";

const currencyLabels: any = {
  USD: '$',
  LYD: 'دينار'
}

const shipmentMethodsLabels = {
  air: 'جوي',
  sea: 'بحري'
}

const OrderInfoPage = () => {
  const [ activeStep, setActiveStep ] = useState(0);
  const [order, setOrder] = useState<Package>();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    tint: 'success',
    message: ''
  });
  
  let { id: orderId } = useParams();
  const history = useNavigate();

  const fetchOrder = async () => {
    setIsLoading(true);
    const order = await api.getSingleOrder(orderId || '');
    setOrder(order.data);
    setActiveStep(order.data.orderStatus);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchOrder();
  }, [])

  const deleteUnsureOrder = async () => {
    try {
      setIsLoading(true);
      await api.deleteUnsureOrder(orderId as string);
      setAlert({
        message: 'تم حذف الطلب بنجاح',
        tint: 'success'
      });
      history('/orders');
    } catch (error) {
      console.log(error);
      setAlert({
        message: 'حدث خطا اثناء انشاء العملية',
        tint: 'error'
      });
    }
    setIsLoading(false);
  }

  const steps = generateSteps();

  if (isLoading || !order) {
    return (
      <Box className='h-full items-center justify-center' sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  const columns = [...defaultColumns()];
  const list = generateDataToListType(order.activity).reverse();

  const customerInfo = [
    {
      label: 'رقم الكود',
      value: order.orderId
    },
    {
      label: 'اسم الزبون',
      value: order.customerInfo.fullName
    },
    {
      label: 'رقم الهاتف',
      value: order.customerInfo.phone
    },
    {
      label: 'بريد الاكتروني',
      value: order.customerInfo.email || '-'
    },
  ]

  const packageInfo = [
    {
      label: 'نوع البضائع',
      value: order.productName
    },
    {
      label: 'وزن الشحنة',
      value: '-'
    },
    {
      label: 'CBM',
      value: '-'
    },
    {
      label: 'نوع الشحن',
      value: shipmentMethodsLabels[order.shipment.method]
    }
  ]

  const otherInfo = [
    {
      label: 'تاريخ الانشاء',
      value: moment(order.createdAt).format('DD/MM/YYYY')
    },
    {
      label: 'مكان التسليم',
      value: order.shipment.toWhere
    },
    {
      label: 'قيمة الفاتورة',
      value: `${order?.totalInvoice} $`
    },
    {
      label: 'ديون',
      value: order?.debt?.total > 0 ? `${order?.debt?.total} ${currencyLabels[order?.debt?.currency]}` : 'لا يوجد'
    }
  ]

  const relatedImages: any = []; 
  order.images.forEach(img => {
    relatedImages.push(img.path);
  })
console.log(order);

  const packages = order.paymentList;

  return (
    <div className="container mx-auto py-10 h-64 w-11/12 px-6">
      {order.isCanceled &&
        <div className="mb-4">
          <AlertInfo
            tint="danger"
            description={'هذه طلبية قد تم الغاءها من قبل ادارة الشركة، اذا تظن ان حدث خطا يرجى تواصل مع اقرب مندوب للشركة'}
          />
        </div>
      }

      {order.unsureOrder &&
        <Card
          className="rounded-2xl mb-5 text-end"
        >
          <p>
            بعد ادخالك ارقام التتبع تقوم الشركة بالتتبع هذه ارقام وعندى وصوله الى مخزننا سيتم تحديث الطلبية الى الحالة النشطه
          </p>
          <p>
            اذا لم ترسل بضائع الى مخزننا، او انشأت طلب تتبع الطلبية بالخطأ، يمكنك حذف الطلب عبر زر الحذف ادناه 
          </p>
          <button
            className="disabled:bg-slate-400 disabled:text-white-500 group my-1 relative py-2 px-4 mt-2 border border-transparent w-52 md:w-fit text-xs md:text-sm font-bold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={deleteUnsureOrder}
            disabled={isLoading}
          >
            حذف هذه الطلبية
          </button>
        </Card>
      }

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
          data={customerInfo as any}
        />

        <InfoDetailsCard 
          title="تفاصيل الشحنه"
          data={packageInfo as any}
        />

        <InfoDetailsCard 
          title="تفاصيل اخرى"
          data={otherInfo as any}
        />

        <div>
          <Card
            className="rounded-2xl mb-5"
          >
            <h2 className='text-right text-2xl font-medium mb-7 mt-2'>صور متعلقة بالطلبية</h2>
            <ImageViewer
              images={relatedImages}
            />
          </Card>
        </div>

        <div className=" col-span-1 xl:col-span-2 md:col-span-2">
          <Card
            className="rounded-2xl mb-5"
          >
            <h2 className='text-right text-2xl font-medium mb-7 mt-2'>الانشطة العامة</h2>
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
          {packages.length > 0 && packages.map((packageDetails, i) => {
            const { statusIndex, lastActivity } = getStatusOfPackage(packageDetails);
            const step = linkSteps[statusIndex];
            const trackingNumber = packageDetails.deliveredPackages.trackingNumber;
            return (
              <Card
                leaned
                className="mb-5"
              >
                <Accordion defaultExpanded={statusIndex !== 3}>
                  <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '30%', flexShrink: 0, fontSize: '16px', fontWeight: 'bold' }}>
                      Package { trackingNumber ? trackingNumber : i + 1}
                    </Typography>
                    <Badge class=" text-sm md:text-base" text={step.label} color={statusIndex === 3 ? 'success' : 'primary'} />
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex items-center justify-end mb-8">
                      <p>{lastActivity}</p>
                      <h3 className=" font-bold ml-5">:اخر نشاط</h3>
                    </div>
                    <div className="flex items-center justify-end mb-8">
                      <p>{trackingNumber || 'لا يوجد'}</p>
                      <h3 className=" font-bold ml-5">:{trackingNumber.length === 4 ? 'اخر 4 ارقام من رقم التتبع' : 'رقم التتبع'}</h3>
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
                      acriveStep={statusIndex}
                      steps={linkSteps}
                    />
                  </AccordionDetails>
                </Accordion>
              </Card>
            )
          })}
        </div>
      </div>
      <br />
      <br />
      <br />
      <Snackbar 
        open={!!alert.message} 
        autoHideDuration={1500}
        onClose={() => setAlert({ tint: 'success', message: ''})}
      >
        <Alert 
          severity={alert.tint as AlertColor}
          onClose={() => setAlert({ tint: 'success', message: ''})}
          style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
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
